// ===== Portfolio Script =====
// - Dynamic Projects rendering
// - Smooth scrolling for nav links
// - Mobile navigation toggle
// - Footer year

// 1) Projects data model
// Add new projects by pushing a new object to the projects array with the
// following shape:
// {
//   title: 'Project Title',
//   image: 'path-relative-to-this-site.png', // keep paths relative for GitHub Pages
//   description: 'Short description of the project and purpose.',
//   technologies: ['HTML', 'CSS', 'JavaScript'],
//   modelLink: 'https://example.com/model', // optional, use when you want a model link instead of live demo
//   liveLink: 'https://example.com',        // optional, used if modelLink not provided
//   repoLink: 'https://github.com/username/repo'
// }

const projects = [
  {
    title: 'Built An LLM from Scratch',
    image: 'resources/project1.png',
    description: 'An end-to-end implementation of a Large Language Model from scratch, showcasing mastery of LLM design and architectures.',
    technologies: ['Python', 'PyTorch', 'Hugging Face', 'LLM'],
    modelLink: 'https://huggingface.co/DukkiZamindar/Self_Built_LLM',
    repoLink: 'https://github.com/deepankargupta856/LLM-from-Scratch'
  },
  {
    title: 'FinWiser',
    image: 'resources/project2.png',
    description: 'An automated stock data pipeline with ETL, analysis, and an interactive Streamlit dashboard for key market insights.',
    technologies: ['Python', 'BeautifulSoup', 'AWS', 'Streamlit'],
    repoLink: 'https://github.com/deepankargupta856/FinWiser'
  },
  {
    title: 'Youtube Comment Sentiment Analyzer',
    image: 'resources/project6.png',
    description: 'A project showcasing complete MLops Lifecycle and sentiment analysis',
    technologies: ['Docker', 'AWS', 'DVC', 'EDA','GitHub Actions','Light GBM'],
    liveLink: 'https://github.com/deepankargupta856/yt-plugin-frontend',
    repoLink: 'https://github.com/deepankargupta856/Yt-Comment-Sentiment-Analysis'
  },
  {
    title: 'Built a Neural Network from Scratch',
    image: 'resources/project3.png',
    description: 'An end-to-end implementation of a Neural Network from scratch using only Numpy and Pandas.',
    technologies: ['Python', 'Numpy', 'Pandas', 'Matplotlib'],
    liveLink: '#',
    repoLink: 'https://github.com/deepankargupta856/NeuralNetworkFromScratch'
  },
  
  {
    title: 'WSD Pro',
    image: 'resources/project4.png',
    description: 'Hindi Word Sense Disambiguation using NLP preprocessing and Naïve Bayes for context-based meaning prediction.',
    technologies: ['Python', 'NLP', 'Naïve Bayes', 'Numpy', 'Pandas', 'Matplotlib'],
    liveLink: '#',
    repoLink: 'https://github.com/neha-sharma4/Wsdpro'
  },
  {
    title: '99acresHousePriceEstimator',
    image: 'resources/project5.png',
    description: '99acres House Price Predictor using web-scraped data and Random Forest regression for accurate price estimation.',
    technologies: ['Python', 'BeautifulSoup', 'Random Forest', 'Numpy', 'Pandas', 'Matplotlib'],
    liveLink: '#',
    repoLink: 'https://github.com/deepankargupta856/99acresHousePriceEstimator'
  }
];

function createProjectCard(project) {
  const card = document.createElement('article');
  card.className = 'project-card';

  const img = document.createElement('img');
  img.className = 'project-thumb';
  img.alt = project.title;
  img.src = project.image;

  const body = document.createElement('div');
  body.className = 'project-body';

  const title = document.createElement('h3');
  title.className = 'project-title';
  title.textContent = project.title;

  const desc = document.createElement('p');
  desc.className = 'project-desc';
  desc.textContent = project.description;

  const techList = document.createElement('div');
  techList.className = 'tech-list';
  project.technologies.forEach((t) => {
    const chip = document.createElement('span');
    chip.className = 'tech';
    chip.textContent = t;
    techList.appendChild(chip);
  });

  const actions = document.createElement('div');
  actions.className = 'card-actions';

  // Determine primary link: prefer modelLink over liveLink
  const primaryHref = project.modelLink || project.liveLink || '#';
  const primaryLabel = project.modelLink ? 'Model' : 'Live Demo';

  const primaryBtn = document.createElement('a');
  primaryBtn.className = 'btn secondary';
  primaryBtn.href = primaryHref;
  primaryBtn.target = primaryHref && String(primaryHref).startsWith('http') ? '_blank' : '_self';
  primaryBtn.rel = 'noopener';
  primaryBtn.textContent = primaryLabel;

  const repoBtn = document.createElement('a');
  repoBtn.className = 'btn primary';
  repoBtn.href = project.repoLink || '#';
  repoBtn.target = project.repoLink && project.repoLink.startsWith('http') ? '_blank' : '_self';
  repoBtn.rel = 'noopener';
  repoBtn.textContent = 'Source Code';

  actions.appendChild(primaryBtn);
  actions.appendChild(repoBtn);

  body.appendChild(title);
  body.appendChild(desc);
  body.appendChild(techList);
  body.appendChild(actions);

  card.appendChild(img);
  card.appendChild(body);
  return card;
}

function renderProjects() {
  const container = document.getElementById('projects-container');
  if (!container) return;
  container.innerHTML = '';
  const fragment = document.createDocumentFragment();
  projects.forEach((p) => fragment.appendChild(createProjectCard(p)));
  container.appendChild(fragment);
}

// Smooth scroll (enhanced: also closes mobile nav)
function enableSmoothScroll() {
  const navLinks = document.querySelectorAll('.nav-links a');
  const navMenu = document.querySelector('.nav-links');
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        navMenu?.classList.remove('open');
        const toggle = document.querySelector('.nav-toggle');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

function enableMobileNavToggle() {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-links');
  if (!toggle || !menu) return;
  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
}

function setYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = String(new Date().getFullYear());
}

// Init
window.addEventListener('DOMContentLoaded', () => {
  renderProjects();
  enableSmoothScroll();
  enableMobileNavToggle();
  setYear();
}); 