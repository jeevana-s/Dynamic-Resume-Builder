const sections = document.querySelectorAll('.section');
const resumeArea = document.getElementById('resumeArea');
const downloadBtn = document.getElementById('downloadBtn');

const startButton = document.getElementById('startButton');
const continueButton = document.getElementById('continueButton');
const homepage = document.getElementById('homepage');
const featuresSection = document.getElementById('featuresSection');
const resumeBuilder = document.getElementById('resumeBuilder');

// Intersection Observer for scroll animations
const featureCards = document.querySelectorAll('.feature-card');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.remove('hidden');
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

featureCards.forEach(card => {
    observer.observe(card);
});

// Event listener for the "Start Now" button
startButton.addEventListener('click', () => {
    homepage.classList.add('hidden');
    featuresSection.classList.remove('hidden');
    
    featureCards.forEach(card => {
        card.classList.remove('hidden');
    });

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Event listener for the new "Continue to Builder" button
continueButton.addEventListener('click', () => {
    featuresSection.classList.add('hidden');
    resumeBuilder.classList.remove('hidden');
    
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Drag and Drop functionality
sections.forEach(section => {
    section.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData("text/plain", section.dataset.type);
    });
});

resumeArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    resumeArea.style.background = "#1e293b";
});

resumeArea.addEventListener('dragleave', () => {
    resumeArea.style.background = "#0f172a";
});

resumeArea.addEventListener('drop', (e) => {
    e.preventDefault();
    resumeArea.style.background = "#0f172a";
    const type = e.dataTransfer.getData("text/plain");
    addResumeSection(type);
});

// Photo upload functionality
document.getElementById('photoUpload').addEventListener('change', function() {
    const file = this.files && this.files.length > 0 ? this.files[0] : null;
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('profilePhoto').src = e.target.result;  
        };
        reader.readAsDataURL(file);
    }
});

// Download button functionality (UPDATED)
downloadBtn.addEventListener('click', () => {
    const profileHeader = resumeArea.querySelector('.profile-header');
    const profilePhotoSrc = document.getElementById('profilePhoto').src || '';
    const name = profileHeader ? profileHeader.querySelector('h1').innerText : 'Your Name';
    const role = profileHeader ? profileHeader.querySelector('h3').innerText : 'Your Role';
    const resumeItems = resumeArea.querySelectorAll('.resume-item');

    let leftColumnContent = '';
    let rightColumnContent = '';

    // Separate content based on the section type
    resumeItems.forEach(item => {
        const titleElement = item.querySelector('h3');
        const contentElement = item.querySelector('p');

        if (titleElement && contentElement) {
            const title = titleElement.innerText.toLowerCase();
            const content = contentElement.innerHTML;
            
            const formattedItem = `
                <div class="section">
                    <h3 class="section-title">${titleElement.innerText.toUpperCase()}</h3>
                    <p class="section-content">${content}</p>
                </div>
            `;

            // These sections will go into the left sidebar
            if (title.includes('profile') || title.includes('contact') || title.includes('language') || title.includes('volunteer')) {
                leftColumnContent += formattedItem;
            } else {
                rightColumnContent += formattedItem;
            }
        }
    });

    const win = window.open('', '', 'width=800,height=1131'); // A4 aspect ratio
    win.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${name}'s Resume</title>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
            <style>
                body {
                    font-family: 'Poppins', sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f4f4f4;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                }
                .resume-container {
                    width: 8.5in;
                    height: 11in;
                    display: flex;
                    box-shadow: 0 0 15px rgba(0,0,0,0.1);
                    background-color: #fff;
                }
                .left-column {
                    width: 35%;
                    background-color: #72958a;
                    padding: 40px 25px;
                    box-sizing: border-box;
                    color: #fff;
                    position: relative;
                }
                .right-column {
                    width: 65%;
                    padding: 0;
                    box-sizing: border-box;
                    background-color: #fff;
                }
                .profile-photo-container {
                    text-align: center;
                    position: relative;
                    top: -65px;
                    margin-bottom: -50px;
                }
                .profile-photo {
                    width: 150px;
                    height: 150px;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 5px solid #fff;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                }
                .right-header {
                    background-color: #e6c8b9;
                    padding: 40px 25px 25px;
                    min-height: 150px;
                }
                .profile-info h1 {
                    font-size: 2.2em;
                    color: #2c3e50;
                    margin: 0;
                    font-weight: 700;
                }
                .profile-info h3 {
                    font-size: 1.1em;
                    color: #5d6f7f;
                    margin: 5px 0 0;
                    font-weight: 400;
                }
                .right-content {
                    padding: 25px;
                }
                .section {
                    margin-bottom: 25px;
                }
                .left-column .section-title {
                    font-size: 1.2em;
                    color: #fff;
                    text-transform: uppercase;
                    margin-bottom: 10px;
                    font-weight: 600;
                }
                .left-column .section-content {
                    font-size: 0.95em;
                    line-height: 1.6;
                    margin: 0;
                    color: #fff;
                }
                .right-column .section-title {
                    font-size: 1.2em;
                    color: #2c3e50;
                    text-transform: uppercase;
                    margin-bottom: 10px;
                    font-weight: 600;
                }
                .right-column .section-title::before {
                    content: '▶';
                    color: #72958a;
                    margin-right: 8px;
                    font-size: 0.8em;
                    position: relative;
                    top: -2px;
                }
                .right-column .section-content {
                    font-size: 0.95em;
                    line-height: 1.6;
                    margin: 0;
                    color: #5d6f7f;
                }
                .contact-item {
                    margin-bottom: 10px;
                }
                .contact-item span {
                    font-weight: 600;
                }

                @media print {
                    /* Force colors and backgrounds to be printed */
                    .left-column {
                        -webkit-print-color-adjust: exact;
                        color-adjust: exact;
                    }
                    .right-header {
                        -webkit-print-color-adjust: exact;
                        color-adjust: exact;
                    }
                }
            </style>
        </head>
        <body>
            <div class="resume-container">
                <div class="left-column">
                    <div class="profile-photo-container">
                       ${profilePhotoSrc ? `<img src="${profilePhotoSrc}" alt="Profile Photo" class="profile-photo">` : ''}
                    </div>
                    ${leftColumnContent}
                </div>
                <div class="right-column">
                    <div class="right-header">
                        <div class="profile-info">
                            <h1>${name}</h1>
                            <h3>${role}</h3>
                        </div>
                    </div>
                    <div class="right-content">
                        ${rightColumnContent}
                    </div>
                </div>
            </div>
        </body>
        </html>
    `);
    win.document.close();
    win.print();
});

// Function to add a new section to the resume
function addResumeSection(type) {
    const dropHint = resumeArea.querySelector('.drop-hint');
    if (dropHint) {
        dropHint.remove();
    }

    const div = document.createElement('div');
    div.classList.add('resume-item');
    const templates = {
        objective: `<h3 contenteditable="true">Profile</h3><p contenteditable="true">Business Administration student.<br><br>I consider my self a responsible and orderly person.<br><br>I am looking forward for my first work experience.</p>`,
        education: `<h3 contenteditable="true">Education</h3><p contenteditable="true"><strong>MILENORA UNIVERSITY</strong><br>Business Administration career, in progress<br><br><strong>BRAYERSHIRE COLLEGE</strong><br>2017–2021</p>`,
        skills: `<h3 contenteditable="true">Computer Skills</h3><p contenteditable="true">Text processor.<br>Spreadsheet.<br>Slide presentation.</p>`,
        experience: `<h3 contenteditable="true">Experience</h3><p contenteditable="true">Your work experience here...</p>`,
        projects: `<h3 contenteditable="true">Projects</h3><p contenteditable="true">Project name and details here...</p>`,
        achievements: `<h3 contenteditable="true">Achievements</h3><p contenteditable="true">Awards or accomplishments here...</p>`,
        certifications: `<h3 contenteditable="true">Certifications</h3><p contenteditable="true">Certifications or licenses here...</p>`,
        languages: `<h3 contenteditable="true">Language</h3><p contenteditable="true">Native English.<br>Advanced Spanish.</p>`,
        contact: `<h3 contenteditable="true">Contact Me</h3><p contenteditable="true">(123) 456-7890<br>hello@reallygreatsite.com<br>123 Anywhere St.,<br>Any city, State,<br>Country 12345</p>`,
        volunteer: `<h3 contenteditable="true">Volunteer Experience</h3><p contenteditable="true"><strong>VELVEBAL FOODS INC.</strong><br>Participation in collections to distribute in low-income schools.</p>`,
    };
    div.innerHTML = templates[type] || "<h3 contenteditable='true'>Custom Section</h3><p contenteditable='true'>Add your custom content here...</p>";
    resumeArea.appendChild(div);
}