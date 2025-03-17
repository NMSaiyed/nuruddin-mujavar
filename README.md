# Dashboard-Style Portfolio

A modern, interactive portfolio website with a dashboard UI design. This portfolio template includes data visualization, organized project display, and a sleek user interface with dark/light theme options.

![Dashboard Portfolio Preview](images/preview.jpg)

## Features

- 📊 Dashboard-style layout with sidebar navigation
- 🌓 Dark/light theme toggle with system preference detection
- 📱 Fully responsive design for all device sizes
- 📈 Interactive skill visualization with Chart.js
- 🎨 Modern card-based UI components
- 🔄 Content filtering capabilities for projects
- 📝 Animated timeline for experience section
- 📋 Multi-section layout with smooth transitions
- 📃 Dynamic skill progress bars
- 📬 Contact form with validation

## Technologies Used

- HTML5, CSS3 with CSS Variables for theming
- JavaScript (vanilla)
- Chart.js for data visualization
- CSS Grid and Flexbox for layout
- IntersectionObserver API for scroll animations
- LocalStorage for theme persistence
- Font Awesome for icons
- Google Fonts (DM Sans & Inter)

## Getting Started

1. Clone or download this repository
2. Open `index.html` in your browser
3. Navigate through the dashboard sections using the sidebar

## Customization

### Changing Theme Colors

This portfolio uses CSS variables for all colors and styling. To customize the color scheme:

1. Open `css/styles.css`
2. Modify the color variables in both the `:root` (light theme) and `[data-theme="dark"]` (dark theme) sections:

```css
:root {
    --primary-color: #4f46e5;  /* Main brand color */
    --primary-light: #6366f1;  /* Lighter shade of primary */
    --primary-dark: #4338ca;   /* Darker shade of primary */
    /* More color variables... */
}

[data-theme="dark"] {
    --bg-color: #0f172a;       /* Dark theme background */
    --bg-card: #1e293b;        /* Dark theme card background */
    /* More dark theme variables... */
}
```

### Customizing Chart Data

To update the skills radar chart with your own data:

1. Open `js/charts.js`
2. Modify the `skillData` object with your own skill proficiency values:

```javascript
const skillData = {
    frontend: 85,  // Your frontend skill level (0-100)
    backend: 78,   // Your backend skill level
    design: 65,    // Your design skill level
    // More skills...
};
```

### Updating Content

To personalize the portfolio:

1. Edit the sections in `index.html` to include your own information
2. Replace images in the `images` folder with your own photos and screenshots
3. Update project details, experience, education, and contact information

## Browser Support

This portfolio is optimized for modern browsers with support for:

- CSS Grid and Flexbox
- CSS Variables
- IntersectionObserver API
- ES6+ JavaScript

## Credits

- Chart.js for the skill radar visualization
- Font Awesome for icons
- Google Fonts for typography
- All images should be replaced before deployment 