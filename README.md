# COSMO - Premium Cosmic T-Shirts E-commerce Website

A professional space-themed e-commerce website for selling cosmic-themed t-shirts with advanced customization options and interactive user experience.

## Features

- Immersive cosmic theme with animated stars, planets, and shooting stars
- Responsive design with modern UI for all devices
- Advanced loader with progress animation
- Custom cursor with interactive hover effects
- Product carousel with dynamic navigation
- 3D hover effects for product cards
- Interactive T-shirt customizer with color selection
- Quick view modal for product details
- Animated timeline for brand journey
- Parallax scrolling effects using Locomotive Scroll
- GSAP animations tied to scroll position
- Advanced CSS animations and transitions
- Form submissions with success notifications
- Mobile-friendly navigation with animated menu

## Project Structure

```
COSMO/
├── index.html          # Main HTML file with structured semantic markup
├── styles.css          # Advanced CSS with variables, animations, and effects
├── script.js           # JavaScript for interactivity, animations, and features
└── images/             # Directory for website images and media
    └── README.md       # Details about required images
```

## Setup Instructions

1. **Required Libraries**:
   - The website uses the following CDN libraries:
     - Locomotive Scroll for smooth scrolling
     - GSAP and ScrollTrigger for advanced animations
     - Font Awesome for icons
   - All necessary CDN links are already included in the HTML file

2. **Google Forms Setup**:
   - Create two Google Forms:
     - Order Form: Include fields for customer details, t-shirt selection, size, quantity, etc.
     - Customize Form: Include fields for customer details and an option to upload custom images
   - Get the embed URLs for both forms
   - Replace the placeholder URLs in index.html:
     - Replace `YOUR_GOOGLE_FORM_ID` with your Order Form ID
     - Replace `YOUR_CUSTOMIZE_FORM_ID` with your Customize Form ID

3. **Images**:
   - Add all required images to the `images/` directory (see images/README.md for details)
   - The main required images are:
     - space-bg.mp4 (hero section background video)
     - tshirt1.jpg through tshirt4.jpg (product images)
     - custom-tshirt.png (customizable t-shirt template)
     - about-img.jpg (about section image)
     - Various alternate views of products

4. **Running the Website**:
   - Open index.html in a web browser
   - For local development, use a local web server to avoid CORS issues with video content
   - For production deployment, upload all files to your web hosting provider

## Customization

- Color Scheme: Edit the CSS variables in styles.css to change the color scheme
- Products: Add or remove product cards in the index.html file
- Animations: Adjust animation parameters in script.js to change timing and effects
- Content: Update text content in index.html to match your brand

## Advanced Features

### Custom Cursor
The website uses a custom cursor that reacts to hoverable elements, creating an interactive experience.

### Smooth Scrolling
Locomotive Scroll provides premium smooth scrolling with parallax effects tied to scroll position.

### Interactive Product Cards
Product cards feature 3D hover effects, quick view functionality, and add-to-cart options.

### T-shirt Customizer
An interactive customizer allows users to see their t-shirt in different colors before ordering.

### Animated Timeline
The brand journey is presented through an animated timeline with hover effects and parallax scrolling.

### Modal System
A comprehensive modal system for order placement, customization, and product quick views.

### Performance Optimization
The website uses modern JavaScript practices for optimal performance, including:
- Lazy loading for images
- Efficient event handling
- Optimized animations

## Technologies Used

- HTML5 with semantic markup
- CSS3 (custom properties, flex, grid, animations)
- JavaScript (ES6+, modules, event handling)
- Locomotive Scroll for smooth scrolling
- GSAP and ScrollTrigger for advanced animations
- Google Forms for order processing and customization
- Intersection Observer API for scroll-based animations
- Font Awesome for iconography

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Android Chrome)

## License

This project is available for use under the MIT License.

---

Designed and developed for COSMO T-Shirts. © 2023 All rights reserved. 