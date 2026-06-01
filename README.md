# Angel Decorators

> Premium event & wedding decoration services – a modern, responsive business website.

## 🏗 Project Structure

```
/
├── index.html                 # Main entry point (thin shell)
├── README.md
├── .gitignore
│
├── css/
│   ├── style.css              # Global tokens, reset, navbar, buttons, shared utilities
│   ├── home.css               # Hero / Home section
│   ├── services.css           # Services & Counters sections
│   ├── gallery.css            # Gallery & Lightbox
│   ├── contact.css            # Contact section & form
│   └── footer.css             # Footer section
│
├── js/
│   ├── script.js              # Main orchestrator – loads sections & initialises modules
│   ├── home.js                # Hero particles & parallax
│   ├── services.js            # Dynamic service cards & counter animation
│   ├── gallery.js             # Dynamic gallery, filters & lightbox
│   └── contact.js             # Contact form & toast notifications
│
├── sections/
│   ├── home.html              # Hero section partial
│   ├── services.html          # Services + Counters section partial
│   ├── gallery.html           # Gallery + Lightbox section partial
│   ├── contact.html           # Contact + Toast section partial
│   └── footer.html            # Footer + Floating buttons partial
│
├── assets/
│   ├── images/                # All decoration photos
│   ├── icons/                 # Icon assets (future use)
│   └── logo/                  # Logo assets (future use)
│
└── data/
    ├── services.json          # Service card data (rendered dynamically)
    ├── gallery.json           # Gallery item data (rendered dynamically)
    └── testimonials.json      # Testimonials data (ready for future use)
```

## ✨ Features

- **Mobile-first responsive design** with smooth animations
- **Dynamic section loading** – HTML partials fetched at runtime
- **Data-driven content** – services & gallery rendered from JSON
- **Lightbox** with keyboard & touch swipe navigation
- **Floating WhatsApp & Call** buttons with pulse animation
- **Counter animations** with eased count-up
- **SEO-friendly** meta tags & semantic HTML5

## 🚀 Getting Started

> **Important:** Because sections are loaded via `fetch()`, the site must be served over HTTP (not opened as a local `file://` URI).

### Option 1 – VS Code Live Server
1. Install the **Live Server** extension in VS Code.
2. Right-click `index.html` → **Open with Live Server**.

### Option 2 – Python
```bash
python -m http.server 8000
```
Then open `http://localhost:8000`.

### Option 3 – Node.js
```bash
npx serve .
```

## 📝 Customisation

| What to change       | Where                                                   |
|----------------------|---------------------------------------------------------|
| Business name        | `index.html` (title, navbar), `sections/home.html`      |
| Phone / WhatsApp     | Search `919876543210` across all HTML files              |
| Email / Address      | `sections/contact.html`, `sections/footer.html`         |
| Services             | `data/services.json`                                    |
| Gallery images       | `data/gallery.json` + add images to `assets/images/`    |
| Colours & fonts      | `css/style.css` (`:root` custom properties)             |

## 📄 License

© 2025 Angel Decorators. All Rights Reserved.
