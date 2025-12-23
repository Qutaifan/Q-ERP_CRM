<?php
/* Copyright (C) 2025 Antigravity */

/**
 *  \file       htdocs/custom/qutaifancrm/theme/minimalist/style.css.php
 *  \brief      File for CSS style sheet Minimalist 2025
 */

// Load eldy theme first
require DOL_DOCUMENT_ROOT . '/theme/eldy/style.css.php';

?>

/* Minimalist 2025 Overrides */

:root {
--primary: #3B82F6;
--primary-hover: #2563EB;
--bg-deep: #1A1B2E;
--bg-card: rgba(255, 255, 255, 0.05);
--border: rgba(255, 255, 255, 0.1);
--text-main: #F8FAFC;
--text-dim: #94A3B8;
--glass-blur: blur(12px);
--transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

/* Dolibarr variable overrides */
--colorbackbody: var(--bg-deep);
--colorbackhmenu1: #111827; /* Darker header */
--colorbackvmenu1: #111827; /* Darker sidebar */
--colortext: var(--text-main);
--colortextlink: var(--primary);
--colortexttitle: var(--text-main);
--inputbackgroundcolor: rgba(255, 255, 255, 0.03);
--inputbordercolor: var(--border);
}

body, .side-nav, .side-nav-vert, #id-top, .vmenu, .menu_titre {
background-color: var(--bg-deep) !important;
color: var(--text-main) !important;
font-family: 'Outfit', sans-serif !important;
}

/* Glassmorphism for Dolibarr boxes */
.box, .info-box, .boxstatsborder, .tabBar, .fichehalfleft, .fichehalfright, .fichehalfright-div, .fichehalfleft-div {
background: var(--bg-card) !important;
backdrop-filter: var(--glass-blur) !important;
-webkit-backdrop-filter: var(--glass-blur) !important;
border: 1px solid var(--border) !important;
border-radius: 12px !important;
box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37) !important;
}

/* Modern Input Fields */
input, select, textarea {
background-color: var(--inputbackgroundcolor) !important;
border: 1px solid var(--inputbordercolor) !important;
border-radius: 8px !important;
color: var(--text-main) !important;
padding: 8px 12px !important;
transition: var(--transition) !important;
}

input:focus, select:focus, textarea:focus {
border-color: var(--primary) !important;
box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2) !important;
outline: none !important;
}

/* Menu Overrides */
.side-nav, .side-nav-vert {
background: #111827 !important;
}

#id-top {
background: #111827 !important;
border-bottom: 1px solid var(--border) !important;
}

/* Scrollbar */
::-webkit-scrollbar {
width: 8px;
}
::-webkit-scrollbar-track {
background: transparent;
}
::-webkit-scrollbar-thumb {
background: rgba(255, 255, 255, 0.1);
border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
background: rgba(255, 255, 255, 0.2);
}