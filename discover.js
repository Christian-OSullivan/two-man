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

function filterMatches(category, e) {
  // Deactivate all chips
  document.querySelectorAll('.chip').forEach(chip => chip.classList.remove('active'));

  // Activate the correct chip
  const activeChip = e?.target || document.querySelector(`[data-category="${category}"]`);
  activeChip?.classList.add('active');

  // Render matches
  const grid = document.getElementById('matchesGrid');
  grid.innerHTML = (matches[category] || []).map(item => `
    <div class="match-item">
      <div class="match-avatar"></div>
      <p class="match-name">${item.name}</p>
      <p class="match-updated">${item.updated}</p>
    </div>
  `).join('');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => filterMatches('potential'));