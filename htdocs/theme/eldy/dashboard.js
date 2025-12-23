/**
 * Qutaifan ERP - Premium Dashboard Enhancements
 * Global Command Bar (Ctrl+K) and Dashboard Widgets
 */

(function() {
    'use strict';

    // Command Bar Search Items
    const commandItems = [
        { icon: 'fa-home', text: 'Dashboard', url: '/index.php', shortcut: 'D' },
        { icon: 'fa-box', text: 'Products', url: '/product/list.php', shortcut: 'P' },
        { icon: 'fa-users', text: 'Customers', url: '/societe/list.php?type=c', shortcut: 'C' },
        { icon: 'fa-file-invoice', text: 'Invoices', url: '/compta/facture/list.php', shortcut: 'I' },
        { icon: 'fa-shopping-cart', text: 'Orders', url: '/commande/list.php', shortcut: 'O' },
        { icon: 'fa-warehouse', text: 'Stock', url: '/product/stock/movement_list.php', shortcut: 'S' },
        { icon: 'fa-chart-line', text: 'Reports', url: '/compta/stats/index.php', shortcut: 'R' },
        { icon: 'fa-calculator', text: 'Accounting', url: '/compta/index.php', shortcut: 'A' },
        { icon: 'fa-cog', text: 'Settings', url: '/admin/index.php', shortcut: '' },
        { icon: 'fa-plus-circle', text: 'New Customer', url: '/societe/card.php?action=create&type=c', shortcut: '' },
        { icon: 'fa-plus-circle', text: 'New Invoice', url: '/compta/facture/card.php?action=create', shortcut: '' },
        { icon: 'fa-plus-circle', text: 'New Product', url: '/product/card.php?action=create', shortcut: '' },
        { icon: 'fa-plus-circle', text: 'New Order', url: '/commande/card.php?action=create', shortcut: '' },
    ];

    let selectedIndex = 0;
    let filteredItems = [...commandItems];

    // Create Command Bar HTML
    function createCommandBar() {
        const overlay = document.createElement('div');
        overlay.className = 'qutaifan-command-bar-overlay';
        overlay.innerHTML = `
            <div class="qutaifan-command-bar">
                <input type="text" placeholder="Search commands... (type to filter)" autofocus>
                <div class="qutaifan-command-results"></div>
            </div>
        `;
        document.body.appendChild(overlay);

        // Close on overlay click
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeCommandBar();
            }
        });

        // Input handling
        const input = overlay.querySelector('input');
        input.addEventListener('input', (e) => {
            filterCommands(e.target.value);
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                selectNext();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                selectPrev();
            } else if (e.key === 'Enter') {
                e.preventDefault();
                executeSelected();
            } else if (e.key === 'Escape') {
                closeCommandBar();
            }
        });

        renderResults();
    }

    function filterCommands(query) {
        query = query.toLowerCase();
        filteredItems = commandItems.filter(item => 
            item.text.toLowerCase().includes(query)
        );
        selectedIndex = 0;
        renderResults();
    }

    function renderResults() {
        const results = document.querySelector('.qutaifan-command-results');
        if (!results) return;

        results.innerHTML = filteredItems.map((item, index) => `
            <div class="qutaifan-command-item ${index === selectedIndex ? 'selected' : ''}" data-index="${index}">
                <i class="fas ${item.icon}"></i>
                <span>${item.text}</span>
                ${item.shortcut ? `<kbd>${item.shortcut}</kbd>` : ''}
            </div>
        `).join('');

        // Add click handlers
        results.querySelectorAll('.qutaifan-command-item').forEach(item => {
            item.addEventListener('click', () => {
                selectedIndex = parseInt(item.dataset.index);
                executeSelected();
            });
        });
    }

    function selectNext() {
        selectedIndex = (selectedIndex + 1) % filteredItems.length;
        renderResults();
    }

    function selectPrev() {
        selectedIndex = (selectedIndex - 1 + filteredItems.length) % filteredItems.length;
        renderResults();
    }

    function executeSelected() {
        if (filteredItems[selectedIndex]) {
            window.location.href = filteredItems[selectedIndex].url;
        }
    }

    function openCommandBar() {
        const overlay = document.querySelector('.qutaifan-command-bar-overlay');
        if (overlay) {
            overlay.classList.add('active');
            filteredItems = [...commandItems];
            selectedIndex = 0;
            renderResults();
            const input = overlay.querySelector('input');
            input.value = '';
            input.focus();
        }
    }

    function closeCommandBar() {
        const overlay = document.querySelector('.qutaifan-command-bar-overlay');
        if (overlay) {
            overlay.classList.remove('active');
        }
    }

    // Create shortcut hint
    function createShortcutHint() {
        const hint = document.createElement('div');
        hint.className = 'qutaifan-shortcut-hint';
        hint.innerHTML = `
            Press <kbd>Ctrl</kbd> + <kbd>K</kbd> to search
        `;
        document.body.appendChild(hint);

        // Hide after 5 seconds
        setTimeout(() => {
            hint.style.opacity = '0';
            hint.style.transition = 'opacity 0.5s ease';
            setTimeout(() => hint.remove(), 500);
        }, 5000);
    }

    // Global keyboard shortcut
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            openCommandBar();
        }
    });

    // Initialize
    document.addEventListener('DOMContentLoaded', () => {
        createCommandBar();
        createShortcutHint();
    });

})();
