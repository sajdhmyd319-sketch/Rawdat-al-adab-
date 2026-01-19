document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const literaryText = document.getElementById('literary-text');
    const visitorCount = document.getElementById('visitor-count');

    // Theme System
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        applyTheme(newTheme);
    });

    function applyTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            body.classList.remove('light-mode');
        } else {
            body.classList.add('light-mode');
            body.classList.remove('dark-mode');
        }
        localStorage.setItem('theme', theme);
        updateThemeIcon(theme);
    }

    function updateThemeIcon(theme) {
        const icon = document.getElementById('theme-icon');
        if (theme === 'dark') {
            // Moon icon for dark mode
            icon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
        } else {
            // Sun icon for light mode
            icon.innerHTML = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
        }
    }

    // Fetch Data
    async function fetchData() {
        try {
            // Fetch visitor count
            const visitRes = await fetch('/api/visit');
            const visitData = await visitRes.json();
            visitorCount.textContent = visitData.count;

            // Fetch texts
            const textsRes = await fetch('/api/texts');
            const texts = await textsRes.json();

            if (texts && texts.length > 0) {
                // Display ONE RANDOM text
                const randomIndex = Math.floor(Math.random() * texts.length);
                literaryText.textContent = texts[randomIndex];
                literaryText.classList.remove('loading');
