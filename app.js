// ============ CONFIG ============
const API_BASE = "https://lf2yqlztrf.execute-api.eu-north-1.amazonaws.com";

// ============ HOME PAGE: Real AWS Backend ============

async function loadNews() {
  try {
    console.log("📡 Fetching news from AWS...");
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
    console.error("❌ News Error:", error);
    document.getElementById("news-container").innerHTML = `<p style="color:red;">Failed to load news</p>`;
  }
}

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

// ============ DISCOVER PAGE: Mock Data ============

const matches = {
  accepted: [
    { name: 'Alice Johnson', updated: 'Today' },
    { name: 'Bob Smith', updated: 'Yesterday' }
  ],
  potential: [
    { name: 'fullName1', updated: 'Updated today' },
    { name: 'fullName2', updated: 'Updated yesterday' },
    { name: 'fullName3', updated: 'Updated 2 days ago' },
    { name: 'fullName4', updated: 'Updated today' },
    { name: 'fullName5', updated: 'Updated yesterday' },
    { name: 'fullName6', updated: 'Updated 2 days ago' },
    { name: 'fullName7', updated: 'Updated today' },
    { name: 'fullName8', updated: 'Updated yesterday' },
    { name: 'fullName9', updated: 'Updated today' },
    { name: 'fullName10', updated: 'Updated yesterday' }
  ],
  rejected: [
    { name: 'Charlie Brown', updated: 'Last week' },
    { name: 'Diana Prince', updated: '2 weeks ago' }
  ]
};

function filterMatches(category, event) {
  // Update active chip
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

// Attach chip listeners
document.addEventListener('DOMContentLoaded', () => {
  const chips = document.querySelectorAll('.chip');
  chips.forEach(chip => {
    chip.addEventListener('click', (e) => filterMatches(chip.dataset.filter, e));
  });
});

// Messenger - Select conversation
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

// Load potential matches on discover page load (trigger default tab)
document.addEventListener('DOMContentLoaded', () => {
  const matchesGrid = document.getElementById('matchesGrid');
  if (matchesGrid) {
    // Trigger default tab by simulating a click on the default chip
    const defaultChip = document.querySelector('.chip.active') || document.querySelector('.chip[data-filter="potential"]');
    if (defaultChip) defaultChip.click();
  }
});

// ============ MESSENGER PAGE: Mock Data ============

const conversationsData = [
  { id: 1, name: 'fullName1', preview: 'Supporting...' },
  { id: 2, name: 'fullName2', preview: 'Supporting...' },
  { id: 3, name: 'fullName3', preview: 'Would like to...' }
];

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

// ============ MESSAGE SENDING ============

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
    console.log(`📤 Sent: "${text}"`);
  };
  
  sendBtn.addEventListener('click', sendMessage);
  messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });
}

// ============ INITIALIZATION ============

document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Page loaded');
  
  // Existing initialisation...
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

  // NEW: sidebar menu toggle
  const menuBtn = document.querySelector('.menu-btn');
  const nav = document.querySelector('.nav');

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      nav.classList.toggle('nav-collapsed');
    });
  }
});

