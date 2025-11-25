document.addEventListener('DOMContentLoaded', () => {
  // Navigation
  const navButtons = document.querySelectorAll('.nav-btn');
  const sections = document.querySelectorAll('.main-section');
  const backButton = document.querySelector('.back-btn');
  
  function switchSection(targetSection) {
    navButtons.forEach(b => b.classList.remove('active'));
    sections.forEach(s => {
      s.classList.toggle('active', s.id === targetSection);
    });
    const matchingNavBtn = document.querySelector(`.nav-btn[data-section="${targetSection}"]`);
    if (matchingNavBtn) {
      matchingNavBtn.classList.add('active');
    }
  }
  
  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-section');
      switchSection(target);
    });
  });

  if (backButton) {
    backButton.addEventListener('click', () => {
      const target = backButton.getAttribute('data-section');
      switchSection(target);
    });
  }

  // Dynamic Matches Data (Home Page)
  const matchesData = [
    { name: 'Name1 Surname1', image: 'assets/profile_pic.jpg' },
    { name: 'Name2 Surname2', image: 'assets/profile_pic.jpg' },
    { name: 'Name3 Surname3', image: 'assets/profile_pic.jpg' },
    { name: 'Name4 Surname4', image: 'assets/profile_pic.jpg' },
    { name: 'Name5 Surname5', image: 'assets/profile_pic.jpg' },
    { name: 'Name6 Surname6', image: 'assets/profile_pic.jpg' }
  ];

  const matchesContainer = document.getElementById('matches-container');
  matchesData.forEach(match => {
    const profileDiv = document.createElement('div');
    profileDiv.className = 'profile';
    profileDiv.innerHTML = `
      <img src="${match.image}" alt="${match.name}">
      <div>${match.name}</div>
    `;
    matchesContainer.appendChild(profileDiv);
  });

  // Dynamic News Data (Home Page)
  const newsData = [
    { title: 'Housing Fair', description: 'Join us next week for DCU Housing Fair' },
    { title: 'New Features', description: 'Check out our latest app updates' },
    { title: 'Success Stories', description: 'Read about successful roommate matches' }
  ];

  const newsContainer = document.getElementById('news-container');
  newsData.forEach(news => {
    const newsCard = document.createElement('div');
    newsCard.className = 'news-card';
    newsCard.innerHTML = `
      <h4>${news.title}</h4>
      <p>${news.description}</p>
    `;
    newsContainer.appendChild(newsCard);
  });

  // Discover Page - Filter Tabs
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      loadDiscoverProfiles(filter);
    });
  });

  // Discover Page - Dynamic Profiles
  const discoverData = {
    accepted: [
      { name: 'fullName1', status: 'Updated today', image: 'assets/profile_pic.jpg' },
      { name: 'fullName2', status: 'Updated yesterday', image: 'assets/profile_pic.jpg' },
      { name: 'fullName3', status: 'Updated today', image: 'assets/profile_pic.jpg' },
      { name: 'fullName4', status: 'Updated 2 days ago', image: 'assets/profile_pic.jpg' }
    ],
    potential: [
      { name: 'fullName1', status: 'Updated today', image: 'assets/profile_pic.jpg' },
      { name: 'fullName2', status: 'Updated yesterday', image: 'assets/profile_pic.jpg' },
      { name: 'fullName3', status: 'Updated 2 days ago', image: 'assets/profile_pic.jpg' },
      { name: 'fullName4', status: 'Updated today', image: 'assets/profile_pic.jpg' },
      { name: 'fullName5', status: 'Updated yesterday', image: 'assets/profile_pic.jpg' },
      { name: 'fullName6', status: 'Updated 2 days ago', image: 'assets/profile_pic.jpg' },
      { name: 'fullName7', status: 'Updated today', image: 'assets/profile_pic.jpg' },
      { name: 'fullName8', status: 'Updated yesterday', image: 'assets/profile_pic.jpg' },
      { name: 'fullName9', status: 'Updated 2 days ago', image: 'assets/profile_pic.jpg' },
      { name: 'fullName10', status: 'Updated today', image: 'assets/profile_pic.jpg' }
    ],
    rejected: [
      { name: 'fullName1', status: 'Updated 3 days ago', image: 'assets/profile_pic.jpg' },
      { name: 'fullName2', status: 'Updated 5 days ago', image: 'assets/profile_pic.jpg' }
    ]
  };

  function loadDiscoverProfiles(filter) {
    const container = document.getElementById('discover-container');
    container.innerHTML = '';
    const profiles = discoverData[filter] || discoverData.potential;
    
    profiles.forEach(profile => {
      const profileDiv = document.createElement('div');
      profileDiv.className = 'discover-profile';
      profileDiv.innerHTML = `
        <img src="${profile.image}" alt="${profile.name}">
        <div class="name">${profile.name}</div>
        <div class="status">${profile.status}</div>
      `;
      container.appendChild(profileDiv);
    });
  }

  // Load initial discover profiles (Potential)
  loadDiscoverProfiles('potential');
});
