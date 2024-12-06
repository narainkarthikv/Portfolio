// Skill data
const skills = [
    { name: "Ansible", category: "tools", progress: 10, icon: "../img/icons/ansible-icon.png" },
    { name: "Bootstrap", category: "frontend", progress: 70, icon: "../img/icons/bootstrap-icon.png" },
    { name: "C", category: "programming", progress: 80, icon: "../img/icons/c-icon.png" },
    { name: "Canva", category: "tools", progress: 60, icon: "../img/icons/canva-icon.png" },
    { name: "Confluence", category: "tools", progress: 30, icon: "../img/icons/confluence-icon.png" },
    { name: "C++", category: "programming", progress: 70, icon: "../img/icons/cpp-icon.png" },
    { name: "CSS", category: "frontend", progress: 80, icon: "../img/icons/css-icon.png" },
    { name: "Da Vinci", category: "tools", progress: 20, icon: "../img/icons/davinci-icon.png" },
    { name: "Docker", category: "tools", progress: 20, icon: "../img/icons/docker-icon.png" },
    { name: "ExpressJS", category: "backend", progress: 50, icon: "../img/icons/express-icon.png" },
    { name: "Figma", category: "tools", progress: 60, icon: "../img/icons/figma-icon.png" },
    { name: "Git", category: "tools", progress: 40, icon: "../img/icons/git-icon.png" },
    { name: "GitHub Actions", category: "tools", progress: 25, icon: "../img/icons/github_actions-icon.png" },
    { name: "GitHub", category: "tools", progress: 40, icon: "../img/icons/github-icon.png" },
    { name: "GitLab", category: "tools", progress: 40, icon: "../img/icons/gitlab-icon.png" },
    { name: "HTML", category: "frontend", progress: 90, icon: "../img/icons/html-icon.png" },
    { name: "JavaScript", category: "programming", progress: 80, icon: "../img/icons/javascript-icon.png" },
    { name: "Jira", category: "tools", progress: 30, icon: "../img/icons/jira-icon.png" },
    { name: "Kubernetes", category: "tools", progress: 10, icon: "../img/icons/kubernetes-icon.png" },
    { name: "Linux CLI", category: "tools", progress: 70, icon: "../img/icons/linux-cli-icon.png" },
    { name: "Markdown", category: "frontend", progress: 90, icon: "../img/icons/markdown-icon.png" },
    { name: "Microsoft Excel", category: "tools", progress: 60, icon: "../img/icons/microsoft_excel-icon.png" },
    { name: "Microsoft PowerPoint", category: "tools", progress: 70, icon: "../img/icons/microsoft_powerpoint-icon.png" },
    { name: "Microsoft Word", category: "tools", progress: 90, icon: "../img/icons/microsoft_word-icon.png" },
    { name: "MongoDB", category: "backend", progress: 70, icon: "../img/icons/mongodb-icon.png" },
    { name: "MUI", category: "frontend", progress: 60, icon: "../img/icons/mui-icon.png" },
    { name: "NodeJS", category: "backend", progress: 30, icon: "../img/icons/nodejs-icon.png" },
    { name: "Notion", category: "tools", progress: 80, icon: "../img/icons/notion-icon.png" },
    { name: "Postman API", category: "tools", progress: 40, icon: "../img/icons/postman-icon.png" },
    { name: "ReactJS", category: "frontend", progress: 70, icon: "../img/icons/react-icon.png" },
    { name: "WordPress", category: "tools", progress: 40, icon: "../img/icons/wordpress-icon.png" },
  ];
  
  const skillsContainer = document.querySelector(".skill-container");

    skills.forEach((skill) => {
    const skillItem = document.createElement("div");
    skillItem.className = `skill-item ${skill.category}`;
    skillItem.setAttribute("data-aos", "zoom-in-up");
    skillItem.setAttribute("data-aos-duration", "1000");

    skillItem.innerHTML = `
        <div class="skill-progress" data-progress="${skill.progress}" title="${skill.progress}%" data-toggle="tooltip" data-placement="right" title="${skill.progress}">
            <div class="skill-card position-relative overflow-hidden mb-2" title="${skill.name}" data-toggle="tooltip" data-placement="bottom" title="${skill.name}">
                <img src="${skill.icon}" alt="${skill.name}" class="img-fluid rounded skill-logo">
            </div>
        </div>
    `;

    skillsContainer.appendChild(skillItem);

    const skillProgress = skillItem.querySelector(".skill-progress");
    skillProgress.style.setProperty("--progress", skill.progress);
    });
  