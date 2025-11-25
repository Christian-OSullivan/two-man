document.addEventListener('DOMContentLoaded', () => {
  let navigationHistory = ['home'];

  const hamburgerBtn = document.getElementById('hamburger-btn');
  const sidebarNavDropdown = document.getElementById('sidebar-nav');
  
  hamburgerBtn.addEventListener('click', () => {
    const isExpanded = sidebarNavDropdown.classList.toggle('expanded');
    hamburgerBtn.setAttribute('aria-expanded', isExpanded);
  });

  const navButtons = document.querySelectorAll('.nav-btn');
  const sections = document.querySelectorAll('.main-section');
  
  function switchSection(targetSection, addToHistory = true) {
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
    
    sidebarNavDropdown.classList.remove('expanded');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
  }
  
  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-section');
      switchSection(target);
    });
  });

  const smartBackButtons = document.querySelectorAll('.smart-back');
  smartBackButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (navigationHistory.length > 1) {
        navigationHistory.pop();
        const previousPage = navigationHistory[navigationHistory.length - 1];
        switchSection(previousPage, false);
      } else {
        switchSection('home', false);
      }
    });
  });

  const clickableIcons = document.querySelectorAll('.icon-btn.clickable');
  clickableIcons.forEach(icon => {
    icon.addEventListener('click', () => {
      const target = icon.getAttribute('data-section');
      if (target) {
        switchSection(target);
      }
    });
  });

  const matchesData = [
    { name: 'Sarah Johnson', image: 'assets/profile_pic.png' },
    { name: 'Michael Chen', image: 'assets/profile_pic.png' },
    { name: 'Emma O\'Connor', image: 'assets/profile_pic.png' },
    { name: 'David Murphy', image: 'assets/profile_pic.png' },
    { name: 'Lisa Walsh', image: 'assets/profile_pic.png' },
    { name: 'James Ryan', image: 'assets/profile_pic.png' }
  ];

  const matchesContainer = document.getElementById('matches-container');
  matchesData.forEach((match, index) => {
    const profileDiv = document.createElement('div');
    profileDiv.className = 'profile';
    profileDiv.setAttribute('tabindex', '0');
    profileDiv.setAttribute('role', 'button');
    profileDiv.setAttribute('aria-label', `View profile of ${match.name}`);
    profileDiv.innerHTML = `
      <img src="${match.image}" alt="${match.name}'s profile picture">
      <div>${match.name}</div>
    `;
    profileDiv.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        profileDiv.click();
      }
    });
    matchesContainer.appendChild(profileDiv);
  });

  const newsData = [
    { title: 'Housing Fair', description: 'Join us next week for DCU Housing Fair on December 5th' },
    { title: 'New Features', description: 'Video chat now available for verified matches' },
    { title: 'Success Stories', description: '500+ successful roommate matches this semester!' }
  ];

  const newsContainer = document.getElementById('news-container');
  newsData.forEach(news => {
    const newsCard = document.createElement('div');
    newsCard.className = 'news-card';
    newsCard.setAttribute('tabindex', '0');
    newsCard.setAttribute('role', 'article');
    newsCard.innerHTML = `
      <h4>${news.title}</h4>
      <p>${news.description}</p>
    `;
    newsCard.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        newsCard.click();
      }
    });
    newsContainer.appendChild(newsCard);
  });

  const notificationsData = [
    { icon: '💬', title: 'New Message', text: 'Sarah Johnson sent you a message', time: '2 min ago', unread: true },
    { icon: '✓', title: 'Match Accepted', text: 'Michael Chen accepted your match request', time: '1 hour ago', unread: true },
    { icon: '👤', title: 'Profile View', text: 'Emma O\'Connor viewed your profile', time: '3 hours ago', unread: false },
    { icon: '⭐', title: 'New Match', text: 'You have 3 new potential matches', time: '5 hours ago', unread: false },
    { icon: '📅', title: 'Event Reminder', text: 'Housing Fair starts tomorrow at 2pm', time: '1 day ago', unread: false }
  ];

  const notificationsList = document.getElementById('notifications-list');
  notificationsData.forEach(notification => {
    const notifItem = document.createElement('div');
    notifItem.className = `notification-item ${notification.unread ? 'unread' : ''}`;
    notifItem.setAttribute('tabindex', '0');
    notifItem.setAttribute('role', 'button');
    notifItem.innerHTML = `
      <div class="notification-icon">${notification.icon}</div>
      <div class="notification-content">
        <strong>${notification.title}</strong>
        <p>${notification.text}</p>
      </div>
      <div class="notification-time">${notification.time}</div>
    `;
    notifItem.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        notifItem.classList.remove('unread');
      }
    });
    notifItem.addEventListener('click', () => {
      notifItem.classList.remove('unread');
    });
    notificationsList.appendChild(notifItem);
  });

  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      const filter = btn.getAttribute('data-filter');
      loadDiscoverProfiles(filter);
    });
  });

  const discoverData = {
    accepted: [
      { name: 'Sarah Johnson', status: 'Updated today', image: 'assets/profile_pic.png' },
      { name: 'Michael Chen', status: 'Updated yesterday', image: 'assets/profile_pic.png' },
      { name: 'Emma O\'Connor', status: 'Updated today', image: 'assets/profile_pic.png' },
      { name: 'David Murphy', status: 'Updated 2 days ago', image: 'assets/profile_pic.png' }
    ],
    potential: [
      { name: 'Lisa Walsh', status: 'Updated today', image: 'assets/profile_pic.png' },
      { name: 'James Ryan', status: 'Updated yesterday', image: 'assets/profile_pic.png' },
      { name: 'Sophie Brown', status: 'Updated 2 days ago', image: 'assets/profile_pic.png' },
      { name: 'Tom Wilson', status: 'Updated today', image: 'assets/profile_pic.png' },
      { name: 'Amy Taylor', status: 'Updated yesterday', image: 'assets/profile_pic.png' },
      { name: 'Chris Martin', status: 'Updated 2 days ago', image: 'assets/profile_pic.png' },
      { name: 'Rachel Green', status: 'Updated today', image: 'assets/profile_pic.png' },
      { name: 'Ben Collins', status: 'Updated yesterday', image: 'assets/profile_pic.png' },
      { name: 'Kate Morgan', status: 'Updated 2 days ago', image: 'assets/profile_pic.png' },
      { name: 'Alex Turner', status: 'Updated today', image: 'assets/profile_pic.png' }
    ],
    rejected: [
      { name: 'Mark Davis', status: 'Updated 3 days ago', image: 'assets/profile_pic.png' },
      { name: 'Laura Smith', status: 'Updated 5 days ago', image: 'assets/profile_pic.png' }
    ]
  };

  function loadDiscoverProfiles(filter) {
    const container = document.getElementById('discover-container');
    container.innerHTML = '';
    const profiles = discoverData[filter] || discoverData.potential;
    
    profiles.forEach(profile => {
      const profileDiv = document.createElement('div');
      profileDiv.className = 'discover-profile';
      profileDiv.setAttribute('tabindex', '0');
      profileDiv.setAttribute('role', 'button');
      profileDiv.setAttribute('aria-label', `View profile of ${profile.name}, ${profile.status}`);
      profileDiv.innerHTML = `
        <img src="${profile.image}" alt="${profile.name}'s profile picture">
        <div class="name">${profile.name}</div>
        <div class="status">${profile.status}</div>
      `;
      profileDiv.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          profileDiv.click();
        }
      });
      container.appendChild(profileDiv);
    });
  }

  loadDiscoverProfiles('potential');

  const conversationsData = [
    { id: 1, name: 'Sarah Johnson', preview: 'Sounds great! See you then', time: '2 min', image: 'assets/profile_pic.png', messages: [
      { type: 'text', sender: 'received', text: 'Hey! Are you still looking for a roommate?' },
      { type: 'text', sender: 'sent', text: 'Yes! I am. Are you interested?' },
      { type: 'text', sender: 'received', text: 'Definitely! Want to meet up this week?' },
      { type: 'text', sender: 'sent', text: 'Sounds great! How about Thursday at 3pm?' },
      { type: 'text', sender: 'received', text: 'Sounds great! See you then' }
    ]},
    { id: 2, name: 'Michael Chen', preview: 'Thanks for the info!', time: '15 min', image: 'assets/profile_pic.png', messages: [
      { type: 'text', sender: 'received', text: 'Hi! What\'s your budget range?' },
      { type: 'text', sender: 'sent', text: 'Around €500-600 per month' },
      { type: 'text', sender: 'received', text: 'Perfect, that works for me too!' },
      { type: 'text', sender: 'sent', text: 'Great! I found a few places we could check out' },
      { type: 'text', sender: 'received', text: 'Thanks for the info!' }
    ]},
    { id: 3, name: 'Emma O\'Connor', preview: 'I prefer quiet environment', time: '1 hour', image: 'assets/profile_pic.png', messages: [
      { type: 'text', sender: 'received', text: 'Do you have any preferences for living?' },
      { type: 'text', sender: 'sent', text: 'I prefer a quiet place and I\'m pretty clean' },
      { type: 'text', sender: 'received', text: 'I prefer quiet environment' }
    ]},
    { id: 4, name: 'David Murphy', preview: 'Let me check my schedule', time: '2 hours', image: 'assets/profile_pic.png', messages: [] },
    { id: 5, name: 'Lisa Walsh', preview: 'That works for me!', time: '3 hours', image: 'assets/profile_pic.png', messages: [] },
    { id: 6, name: 'James Ryan', preview: 'Sounds good', time: '5 hours', image: 'assets/profile_pic.png', messages: [] },
    { id: 7, name: 'Sophie Brown', preview: 'I\'ll get back to you', time: '1 day', image: 'assets/profile_pic.png', messages: [] },
    { 
      id: 8, 
      name: 'Tom Wilson', 
      preview: "Thanks! I'll send mine soon as well", 
      time: '2 days', 
      image: 'assets/profile_pic.png',
      messages: [
        {
          type: 'link-card',
          sender: 'sent',
          title: 'Tom Wilson - LinkedIn Profile',
          url: 'www.linkedin.com/in/tomwilson'
        },
        {
          type: 'text',
          sender: 'sent',
          text: 'Here is my LinkedIn if you want to connect!'
        },
        {
          type: 'text',
          sender: 'received',
          text: "Thanks! I'll send mine soon as well"
        }
      ]
    }
  ];

  let currentConversationId = 1;

  const conversationsList = document.getElementById('conversations-list');
  const chatMessages = document.getElementById('chat-messages');
  const chatRecipientName = document.getElementById('chat-recipient-name');
  const messageInput = document.getElementById('message-input');
  const chatForm = document.getElementById('chat-form');

  function renderConversations() {
    conversationsList.innerHTML = '';
    conversationsData.forEach(conv => {
      const convItem = document.createElement('div');
      convItem.className = `conversation-item ${conv.id === currentConversationId ? 'active' : ''}`;
      convItem.setAttribute('tabindex', '0');
      convItem.setAttribute('role', 'listitem');
      convItem.dataset.convId = conv.id;
      convItem.innerHTML = `
        <img src="${conv.image}" alt="${conv.name}'s profile picture">
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
      convItem.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          convItem.click();
        }
      });
      conversationsList.appendChild(convItem);
    });
  }

  function loadChat(conversation) {
    chatRecipientName.textContent = conversation.name;
    chatMessages.innerHTML = '';
    
    if (conversation.messages.length === 0) {
      const emptyState = document.createElement('div');
      emptyState.style.textAlign = 'center';
      emptyState.style.color = 'var(--color-text-secondary)';
      emptyState.style.padding = '2rem';
      emptyState.textContent = 'No messages yet. Start the conversation!';
      chatMessages.appendChild(emptyState);
    } else {
      conversation.messages.forEach(msg => {
        appendMessage(msg);
      });
    }
    
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function appendMessage(msg) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${msg.sender}`;
    
    if (msg.type === 'link-card') {
      messageDiv.innerHTML = `
        <div class="message-content">
          <div class="message-link-card" tabindex="0" role="link">
            <div class="link-preview" aria-hidden="true">🌐</div>
            <div class="link-title">${msg.title}</div>
            <div class="link-url">${msg.url}</div>
          </div>
        </div>
      `;
    } else {
      const avatarHTML = msg.sender === 'received' ? '<div class="message-avatar" aria-hidden="true">👤</div>' : '';
      messageDiv.innerHTML = `
        ${avatarHTML}
        <div class="message-content">
          <div class="message-bubble">${msg.text}</div>
        </div>
      `;
    }
    
    chatMessages.appendChild(messageDiv);
  }

  function sendMessage() {
    const text = messageInput.value.trim();
    if (!text) {
      messageInput.focus();
      return;
    }
    
    if (currentConversationId) {
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

  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    sendMessage();
  });

  renderConversations();
  const initialConv = conversationsData.find(c => c.id === currentConversationId);
  if (initialConv) {
    loadChat(initialConv);
  }
});
