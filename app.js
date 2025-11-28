// API endpoint for backend services
const API_BASE = "https://lf2yqlztrf.execute-api.eu-north-1.amazonaws.com";

// Fetch news from AWS backend and display on home page
async function loadNews() {
  try {
    console.log("Fetching news from AWS...");
    const response = await fetch(`${API_BASE}/news`);
    const newsItems = await response.json();
    
    const container = document.getElementById("news-container");
    container.innerHTML = newsItems.map(item => `
      <div class="news-card">
        <div class="news-icon">${item.icon}</div>
        <div class="news-title">${item.title}</div>
        <div class="news-subtitle">${item.subtitle}</div>
      </div>
    `).join("");
  } catch (error) {
    console.error("News Error:", error);
    document.getElementById("news-container").innerHTML = `<p style="color:red;">Failed to load news</p>`;
  }
}

// Display current matches on the home page
function loadCurrentMatches() {
  const mockMatches = [
    { name: "Sarah O'Connor" },
    { name: "Michael Chen" },
    { name: "Emma Rodriguez" }
  ];
  
  const container = document.getElementById("matches-container");
  container.innerHTML = mockMatches.map(match => `
    <div class="profile-card">
      <div class="profile-avatar"></div>
      <div class="profile-name">${match.name}</div>
    </div>
  `).join("");
}

// Store match data by category on the discover page
const matches = {
  accepted: [
    { name: 'Sophie Turner', updated: 'Today' },
    { name: 'James Mitchell', updated: 'Yesterday' }
  ],
  potential: [
    { name: 'Olivia Hayes', updated: 'Updated today' },
    { name: 'Liam Connor', updated: 'Updated yesterday' },
    { name: 'Emma Walsh', updated: 'Updated 2 days ago' },
    { name: 'Noah Blake', updated: 'Updated today' },
    { name: 'Ava Murphy', updated: 'Updated yesterday' },
    { name: 'Ethan Cole', updated: 'Updated 2 days ago' },
    { name: 'Isabella Grant', updated: 'Updated today' },
    { name: 'Mason Riley', updated: 'Updated yesterday' },
    { name: 'Sophia Bennett', updated: 'Updated today' },
    { name: 'Lucas Foster', updated: 'Updated yesterday' }
  ],
  rejected: [
    { name: 'Harper Stewart', updated: 'Last week' },
    { name: 'Benjamin Cross', updated: '2 weeks ago' }
  ]
};

// Filter matches by category and update the grid display
function filterMatches(category, event) {
  // Update the active chip to show which filter is selected
  document.querySelectorAll('.chip').forEach(chip => chip.classList.remove('active'));

  // Prefer the event's element, otherwise find chip by category
  const activeChip = (event && (event.currentTarget || event.target)) || document.querySelector(`.chip[data-filter="${category}"]`);
  if (activeChip) activeChip.classList.add('active');

  // Populate grid with proper HTML structure
  const grid = document.getElementById('matchesGrid');
  const items = matches[category] || [];
  if (grid) {
    grid.innerHTML = items.map(item => `
      <div class="match-item">
        <div class="match-avatar"></div>
        <p class="match-name">${item.name}</p>
        <p class="match-updated">${item.updated}</p>
      </div>
    `).join('');
  }
}

// Set up click handlers for filter chips when page loads
document.addEventListener('DOMContentLoaded', () => {
  const chips = document.querySelectorAll('.chip');
  chips.forEach(chip => {
    chip.addEventListener('click', (e) => filterMatches(chip.dataset.filter, e));
  });
});

// Handle conversation selection in the messenger
function selectConversation(event) {
  const el = event.currentTarget || event; // allow calling with element or event
  // Remove active from all
  document.querySelectorAll('.conversation, .conversation-item').forEach(item => {
    item.classList.remove('active');
  });

  // Add active to clicked
  el.classList.add('active');

  // Update chat header name (use first line of text)
  const nameText = (el.textContent || '').split('\n')[0].trim();
  const header = document.getElementById('chat-name') || document.getElementById('chatName');
  if (header) header.textContent = nameText;
}

// Load the default potential matches tab when discover page loads
document.addEventListener('DOMContentLoaded', () => {
  const matchesGrid = document.getElementById('matchesGrid');
  if (matchesGrid) {
    // Trigger default tab by simulating a click on the default chip
    const defaultChip = document.querySelector('.chip.active') || document.querySelector('.chip[data-filter="potential"]');
    if (defaultChip) defaultChip.click();
  }
});

// Store mock conversation data for the messenger
const conversationsData = [
  { id: 1, name: 'Olivia Hayes', preview: 'Supporting...' },
  { id: 2, name: 'Liam Connor', preview: 'Supporting...' },
  { id: 3, name: 'Emma Walsh', preview: 'Would like to...' }
];

// Store mock messages for each conversation
const messagesData = {
  1: [
    { sender: 'them', text: 'Hey! How are you?' },
    { sender: 'me', text: 'Great! How about you?' },
    { sender: 'them', text: 'Thanks! I\'ll send mine soon as well' }
  ],
  2: [
    { sender: 'them', text: 'Interested in meeting?' },
    { sender: 'me', text: 'Sure, let\'s chat first' }
  ],
  3: [
    { sender: 'me', text: 'Hi there!' },
    { sender: 'them', text: 'Hello!' }
  ]
};

let currentConversationId = null;

// Load all conversations and attach click listeners
function loadConversations() {
  const container = document.getElementById('conversations-container');
  if (!container) return;
  
  container.innerHTML = conversationsData.map(conv => `
    <div class="conversation ${conv.id === 1 ? 'active' : ''}" data-id="${conv.id}">
      <div class="conversation-name">${conv.name}</div>
      <div class="conversation-preview">${conv.preview}</div>
    </div>
  `).join('');
  
  document.querySelectorAll('.conversation').forEach(el => {
    el.addEventListener('click', () => {
      document.querySelectorAll('.conversation').forEach(c => c.classList.remove('active'));
      el.classList.add('active');
      loadMessages(parseInt(el.dataset.id));
    });
  });
  
  if (conversationsData.length > 0) loadMessages(1);
}

// Load and display messages for a specific conversation
function loadMessages(conversationId) {
  currentConversationId = conversationId;
  const conversation = conversationsData.find(c => c.id === conversationId);
  
  if (conversation) {
    document.getElementById('chat-name').textContent = conversation.name;
  }
  
  const messages = messagesData[conversationId] || [];
  const container = document.getElementById('messages-container');
  
  container.innerHTML = messages.map(msg => `
    <div class="message ${msg.sender === 'me' ? 'sent' : 'received'}">
      ${msg.text}
    </div>
  `).join('');
  
  container.scrollTop = container.scrollHeight;
}

// Handle sending messages in the chat
const sendBtn = document.getElementById('send-btn');
const messageInput = document.getElementById('message-input');

if (sendBtn && messageInput) {
  const sendMessage = () => {
    const text = messageInput.value.trim();
    if (!text || !currentConversationId) return;
    
    const container = document.getElementById('messages-container');
    const messageEl = document.createElement('div');
    messageEl.className = 'message sent';
    messageEl.textContent = text;
    container.appendChild(messageEl);
    
    messageInput.value = '';
    container.scrollTop = container.scrollHeight;
    console.log(`Sent: "${text}"`);
  };
  
  sendBtn.addEventListener('click', sendMessage);
  messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });
}

// Initialize all page components when DOM loads
document.addEventListener('DOMContentLoaded', () => {
  console.log('Page loaded');
  
  // Set up home page with news and matches
  if (document.getElementById('news-container')) {
    loadCurrentMatches();
    loadNews();
  }
  if (document.getElementById('matchesGrid')) {
    filterMatches('potential');
  }
  if (document.getElementById('conversations-container')) {
    loadConversations();
  }

  // Toggle sidebar navigation on mobile
  const menuBtn = document.querySelector('.menu-btn');
  const nav = document.querySelector('.nav');

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      nav.classList.toggle('nav-collapsed');
    });
  }
});