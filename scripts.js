document.addEventListener('DOMContentLoaded', () => {
  // Navigation
  const navButtons = document.querySelectorAll('.nav-btn');
  const sections = document.querySelectorAll('.main-section');
  
  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      navButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const target = btn.getAttribute('data-section');
      sections.forEach(s => {
        s.classList.toggle('active', s.id === target);
      });
    });
  });

  // Dynamic Matches Data
  const matchesData = [
    { name: 'Name1 Surname1', image: 'assets/profile_pic.png' },
    { name: 'Name2 Surname2', image: 'assets/profile_pic.png' },
    { name: 'Name3 Surname3', image: 'assets/profile_pic.png' },
    { name: 'Name4 Surname4', image: 'assets/profile_pic.png' },
    { name: 'Name5 Surname5', image: 'assets/profile_pic.png' },
    { name: 'Name6 Surname6', image: 'assets/profile_pic.png' }
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

  // Dynamic News Data
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
});
