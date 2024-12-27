const portfolioItems = [
    {
        title: "Fit Track",
        description: "Fit Track is a exercise monitoring application designed to help users stay on track with their fitness goals.",
        techStack: ["MongoDB", "Express", "React", "Redux", "Bootstrap", "Git", "Github"],
        features: [
            { title: "User-friendly interface", description: "An intuitive and easy-to-use interface that helps users navigate the application effortlessly." },
            { title: "Streak maintenance", description: "Keeps track of your workout streaks to motivate you to stay consistent." },
            { title: "Real-time analytics", description: "Provides real-time data and analytics to monitor your progress and performance." }
        ],
        imgSrc: "img/portfolio-01.jpg"
    },
    {
        title: "Sticky Memo",
        description: "Sticky-Memo is a sticky notes application built using React.js + Vite along with MUI. User can view the data in Boards, Notes, Table",
        techStack: ["React", "Recoil", "MUI", "Git", "Github"],
        features: [
            { title: "User-friendly interface", description: "A simple and clean interface that allows users to create and manage notes easily." },
            { title: "Variety display options", description: "Offers multiple display options such as boards, notes, and tables for better organization." },
            { title: "Data persistence", description: "Ensures that your notes are saved and can be accessed anytime." }
        ],
        imgSrc: "img/portfolio-03.jpg"
    },
    {
        title: "Nmoji",
        description: "Nmoji is a straightforward web application designed for quick emoji selection and filtering.",
        techStack: ["HTML", "CSS", "Javascript", "Git", "Github"],
        features: [
            { title: "User-friendly interface", description: "A simple interface that allows users to quickly find and select emojis." },
            { title: "Integration with wearables", description: "Supports integration with wearable devices for seamless emoji usage." },
            { title: "Real-time analytics", description: "Provides real-time analytics on emoji usage and trends." }
        ],
        imgSrc: "img/portfolio-02.jpg"
    },
    {
        title: "Contribution Cards",
        description: "This project is a fantastic way to learn about open-source contributions, improve your HTML, CSS, JS, Git skills, and showcase your creativity.",
        techStack: ["HTML", "CSS", "Javascript", "Bootstrap", "Git", "Github"],
        features: [
            { title: "User-friendly interface", description: "An easy-to-use interface that allows users to design and customize cards effortlessly." },
            { title: "Color variations", description: "Offers a variety of color options to customize the appearance of your cards." },
            { title: "Filter option", description: "Provides filtering options to easily find and manage your cards." }
        ],
        imgSrc: "img/portfolio-04.jpg"
    },
];

document.addEventListener("DOMContentLoaded", () => {
    const carouselIndicators = document.getElementById("carousel-indicators");
    const carouselInner = document.getElementById("carousel-inner");
    const portfolioModals = document.getElementById("portfolio-modals");

    portfolioItems.forEach((item, index) => {
        const isActive = index === 0 ? "active" : "";

        // Create carousel indicator
        const indicator = document.createElement("li");
        indicator.setAttribute("data-target", "#portfolioCarousel");
        indicator.setAttribute("data-slide-to", index);
        indicator.className = isActive;
        carouselIndicators.appendChild(indicator);

        // Create carousel item
        const carouselItem = document.createElement("div");
        carouselItem.className = `carousel-item ${isActive}`;
        carouselItem.innerHTML = `
            <div class="position-relative overflow-hidden mb-2">
                <img class="img-fluid rounded w-100" src="${item.imgSrc}" alt="${item.title}">
                <div class="carousel-caption">
                    <button class="btn btn-lg btn-info" data-toggle="modal" data-target="#detailsModal${index}">
                        <i class="bi bi-arrow-down-circle-fill"></i>
                    </button>
                </div>
            </div>
        `;
        carouselInner.appendChild(carouselItem);

        // Create modal
        const modal = document.createElement("div");
        modal.className = "modal fade";
        modal.id = `detailsModal${index}`;
        modal.tabIndex = -1;
        modal.setAttribute("role", "dialog");
        modal.setAttribute("aria-labelledby", `detailsModal${index}Label`);
        modal.setAttribute("aria-hidden", "true");
        modal.innerHTML = `
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-body">
                        <div class="text-center mb-4">
                            <h3 class="display-5 mb-2 text-primary">${item.title}</h3>
                            <p class="lead text-lead">${item.description}</p>
                        </div>
                        <div class="mb-4">
                            <p><strong>Tech Stack:</strong></p>
                            <ul class="list-inline">
                                ${item.techStack.map(tech => `
                                    <li class="list-inline-item">
                                        <div class="skill-card position-relative overflow-hidden mb-2" title="${tech}" data-toggle="tooltip" data-placement="bottom" title="${tech}">
                                            <img src="img/icons/${tech.toLowerCase()}-icon.png" alt="${tech}" class="img-fluid rounded skill-logo">
                                        </div>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                        <div class="mb-4">
                            <p><strong>Features:</strong></p>
                            <div class="accordion" id="featuresAccordion${index}">
                                ${item.features.map((feature, i) => `
                                    <div class="card">
                                        <div class="card-header" id="heading${index}-${i}">
                                            <h2 class="mb-0">
                                                <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapse${index}-${i}" aria-expanded="${i === 0 ? 'true' : 'false'}" aria-controls="collapse${index}-${i}">
                                                    ${feature.title}
                                                </button>
                                            </h2>
                                        </div>
                                        <div id="collapse${index}-${i}" class="collapse ${i === 0 ? 'show' : ''}" aria-labelledby="heading${index}-${i}" data-parent="#featuresAccordion${index}">
                                            <div class="card-body">
                                                ${feature.description}
                                            </div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        `;
        portfolioModals.appendChild(modal);
    });
});
