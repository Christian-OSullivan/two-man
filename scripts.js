document.addEventListener('DOMContentLoaded', () => {
  // Navigation history
  let navigationHistory = ['home'];

  // Sidebar Toggle (dropdown only)
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const sidebarNavDropdown = document.getElementById('sidebar-nav');
  
  hamburgerBtn.addEventListener('click', () => {
    sidebarNavDropdown.classList.toggle('expanded');
  });

  // Navigation
  const navButtons = document.querySelectorAll('.nav-btn');
  const sections = document.querySelectorAll('.main-section');
  
  function switchSection(targetSection, addToHistory = true) {
    // Add to history
    if (addToHistory && navigationHistory[navigationHistory.length - 1] !== targetSection) {
      navigationHistory.push(targetSection);
    }

    navButtons.forEach(b => b.classList.remove('active'));
    sections.forEach(s => {
      s.classList.toggle('active', s.id === targetSection);
    });
    const matchingNavBtn = document.querySelector(`.nav-btn[data-section="${targetSection}"]`);
    if (matchingNavBtn) {
      matchingNavBtn.classList.add('active');
    }
    // Close dropdown after selection
    sidebarNavDropdown.classList.remove('expanded');
  }
  
  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-section');
      switchSection(target);
    });
  });

  // Smart back buttons
  const smartBackButtons = document.querySelectorAll('.smart-back');
  smartBackButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (navigationHistory.length > 1) {
        navigationHistory.pop(); // Remove current page
        const previousPage = navigationHistory[navigationHistory.length - 1];
        switchSection(previousPage, false);
      } else {
        switchSection('home', false);
      }
    });
  });

  // Clickable icons in headers
  const clickableIcons = document.querySelectorAll('.icon.clickable');
  clickableIcons.forEach(icon => {
    icon.addEventListener('click', () => {
      const target = icon.getAttribute('data-section');
      if (target) {
        switchSection(target);
      }
    });
  });

  // Dynamic Matches Data (Home Page)
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
      { name: 'fullName1', status: 'Updated today', image: 'assets/profile_pic.png' },
      { name: 'fullName2', status: 'Updated yesterday', image: 'assets/profile_pic.png' },
      { name: 'fullName3', status: 'Updated today', image: 'assets/profile_pic.png' },
      { name: 'fullName4', status: 'Updated 2 days ago', image: 'assets/profile_pic.png' }
    ],
    potential: [
      { name: 'fullName1', status: 'Updated today', image: 'assets/profile_pic.png' },
      { name: 'fullName2', status: 'Updated yesterday', image: 'assets/profile_pic.png' },
      { name: 'fullName3', status: 'Updated 2 days ago', image: 'assets/profile_pic.png' },
      { name: 'fullName4', status: 'Updated today', image: 'assets/profile_pic.png' },
      { name: 'fullName5', status: 'Updated yesterday', image: 'assets/profile_pic.png' },
      { name: 'fullName6', status: 'Updated 2 days ago', image: 'assets/profile_pic.png' },
      { name: 'fullName7', status: 'Updated today', image: 'assets/profile_pic.png' },
      { name: 'fullName8', status: 'Updated yesterday', image: 'assets/profile_pic.png' },
      { name: 'fullName9', status: 'Updated 2 days ago', image: 'assets/profile_pic.png' },
      { name: 'fullName10', status: 'Updated today', image: 'assets/profile_pic.png' }
    ],
    rejected: [
      { name: 'fullName1', status: 'Updated 3 days ago', image: 'assets/profile_pic.png' },
      { name: 'fullName2', status: 'Updated 5 days ago', image: 'assets/profile_pic.png' }
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

  // Messenger Page - Conversations and Chat Management
  const conversationsData = [
    { id: 1, name: 'fullName1', preview: 'Supporting...', time: '10 min', image: 'assets/profile_pic.png', messages: [] },
    { id: 2, name: 'fullName 2', preview: 'Supporting...', time: '10 min', image: 'assets/profile_pic.png', messages: [] },
    { id: 3, name: 'fullName 3', preview: 'Supporting...', time: '10 min', image: 'assets/profile_pic.png', messages: [] },
    { id: 4, name: 'fullName 4', preview: 'Supporting...', time: '10 min', image: 'assets/profile_pic.png', messages: [] },
    { id: 5, name: 'fullName 5', preview: 'Supporting...', time: '10 min', image: 'assets/profile_pic.png', messages: [] },
    { id: 6, name: 'fullName6', preview: 'Supporting...', time: '10 min', image: 'assets/profile_pic.png', messages: [] },
    { id: 7, name: 'fullName 7', preview: 'Supporting...', time: '10 min', image: 'assets/profile_pic.png', messages: [] },
    { 
      id: 8, 
      name: 'fullName8', 
      preview: "Thanks! I'll send mine soon as well", 
      time: '10 min', 
      image: 'assets/profile_pic.png',
      messages: [
        {
          type: 'link-card',
          sender: 'sent',
          title: 'fullName - LinkedIn Profile',
          url: 'www.linkedin.com/fullname'
        },
        {
          type: 'text',
          sender: 'sent',
          text: 'Here is my LinkedIn if you want to connect !'
        },
        {
          type: 'text',
          sender: 'received',
          text: "Thanks! I'll send mine soon as well"
        }
      ]
    }
  ];

  let currentConversationId = 8;

  const conversationsList = document.getElementById('conversations-list');
  const chatMessages = document.getElementById('chat-messages');
  const chatRecipientName = document.getElementById('chat-recipient-name');
  const messageInput = document.getElementById('message-input');
  const sendBtn = document.getElementById('send-btn');

  // Render conversations list
  function renderConversations() {
    conversationsList.innerHTML = '';
    conversationsData.forEach(conv => {
      const convItem = document.createElement('div');
      convItem.className = `conversation-item ${conv.id === currentConversationId ? 'active' : ''}`;
      convItem.dataset.convId = conv.id;
      convItem.innerHTML = `
        <img src="${conv.image}" alt="${conv.name}">
        <div class="conversation-info">
          <div class="conversation-name">${conv.name}</div>
          <div class="conversation-preview">${conv.preview}</div>
        </div>
        <div class="conversation-time">${conv.time}</div>
      `;
      convItem.addEventListener('click', () => {
        currentConversationId = conv.id;
        loadChat(conv);
        renderConversations();
      });
      conversationsList.appendChild(convItem);
    });
  }

  // Load and display chat messages
  function loadChat(conversation) {
    chatRecipientName.textContent = conversation.name;
    chatMessages.innerHTML = '';
    
    conversation.messages.forEach(msg => {
      appendMessage(msg);
    });
    
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Append message to chat
  function appendMessage(msg) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${msg.sender}`;
    
    if (msg.type === 'link-card') {
      messageDiv.innerHTML = `
        <div class="message-content">
          <div class="message-link-card">
            <div class="link-preview">🌐</div>
            <div class="link-title">${msg.title}</div>
            <div class="link-url">${msg.url}</div>
          </div>
        </div>
      `;
    } else {
      const avatarHTML = msg.sender === 'received' ? '<div class="message-avatar">👤</div>' : '';
      messageDiv.innerHTML = `
        ${avatarHTML}
        <div class="message-content">
          <div class="message-bubble">${msg.text}</div>
        </div>
      `;
    }
    
    chatMessages.appendChild(messageDiv);
  }

  // Send Message Functionality
  function sendMessage() {
    const text = messageInput.value.trim();
    if (text && currentConversationId) {
      const newMessage = {
        type: 'text',
        sender: 'sent',
        text: text
      };
      
      const conversation = conversationsData.find(c => c.id === currentConversationId);
      if (conversation) {
        conversation.messages.push(newMessage);
        conversation.preview = text;
        appendMessage(newMessage);
        messageInput.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;
        renderConversations();
      }
    }
  }

  sendBtn.addEventListener('click', sendMessage);
  messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });

  // Initial render
  renderConversations();
  const initialConv = conversationsData.find(c => c.id === currentConversationId);
  if (initialConv) {
    loadChat(initialConv);
  }
});
