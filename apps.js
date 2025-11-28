const API_BASE = "https://lf2yqlztrf.execute-api.eu-north-1.amazonaws.com";

// ============ HOME PAGE: Real AWS Backend ============

/**
 * REAL BACKEND: GET /news
 * Frontend calls AWS Lambda via API Gateway
 * Lambda returns JSON array of news items
 */
async function loadNews() {
  try {
    console.log("📡 Fetching news from AWS...");
    
    const response = await fetch(`${API_BASE}/news`);
    const newsItems = await response.json();
    
    console.log("✅ News loaded:", newsItems);

    const container = document.getElementById("news-container");
    
    container.innerHTML = newsItems.map(item => `
      <div class="news-card">
        <div class="news-icon">${item.icon}</div>
        <div class="news-title">${item.title}</div>
        <div class="news-subtitle">${item.subtitle}</div>
      </div>
    `).join("");
    
  } catch (error) {
    console.error("❌ Error:", error);
    document.getElementById("news-container").innerHTML = `<p style="color: red;">Failed to load news.</p>`;
  }
}

// ============ DISCOVER PAGE: Mock Data ============

/**
 * MOCK DATA: In production, this would call GET /api/matches/discover?filter=X
 * Backend would query MATCHES table and apply compatibility scoring
 */
const discoverData = {
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

function loadDiscoverMatches(filter = 'potential') {
  const matches = discoverData[filter] || [];
  const container = document.getElementById('discover-container');
  
  container.innerHTML = matches.map(match => `
    <div class="match-item">
      <div class="match-avatar"></div>
      <div class="match-name">${match.name}</div>
      <div class="match-updated">${match.updated}</div>
    </div>
  `).join('');
}

// Filter chip event listeners
if (document.querySelectorAll('.chip').length > 0) {
  document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      loadDiscoverMatches(chip.dataset.filter);
    });
  });
}

// ============ MESSENGER PAGE: Mock Data ============

/**
 * MOCK DATA: In production, this would call GET /api/conversations
 * Backend would query CONVERSATIONS table and return user's chats
 */
const conversationsData = [
  { id: 1, name: 'fullName1', preview: 'Supporting...' },
  { id: 2, name: 'fullName2', preview: 'Supporting...' },
  { id: 3, name: 'fullName3', preview: 'Would like to...' }
];

/**
 * MOCK DATA: In production, this would call GET /api/messages/:conversationId
 * Backend would query MESSAGES table for that conversation
 */
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
      const convId = parseInt(el.dataset.id);
      loadMessages(convId);
    });
  });
  
  // Load first conversation by default
  if (conversationsData.length > 0) {
    loadMessages(1);
  }
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

// Send message handler
const sendBtn = document.getElementById('send-btn');
const messageInput = document.getElementById('message-input');

if (sendBtn && messageInput) {
  sendBtn.addEventListener('click', () => {
    const text = messageInput.value.trim();
    
    if (!text || !currentConversationId) return;
    
    // Add message to UI
    const container = document.getElementById('messages-container');
    const messageEl = document.createElement('div');
    messageEl.className = 'message sent';
    messageEl.textContent = text;
    container.appendChild(messageEl);
    
    messageInput.value = '';
    container.scrollTop = container.scrollHeight;
    
    console.log(`📤 Message sent (would POST to /api/messages): "${text}"`);
  });
  
  messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendBtn.click();
  });
}

// ============ INITIALIZATION ============

document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Page loaded');
  
  // Home page
  if (document.getElementById('news-container')) {
    loadNews();
  }
  
  // Discover page
  if (document.getElementById('discover-container')) {
    loadDiscoverMatches('potential');
  }
  
  // Messenger page
  if (document.getElementById('conversations-container')) {
    loadConversations();
  }
});
