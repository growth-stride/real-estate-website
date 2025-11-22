# 3D Parallax Scroll Effects - Documentation

## Overview
Enhanced parallax scroll effects have been added to your home page (`index.html`), creating an immersive 3D experience while keeping all buttons and functionality intact.

## What Was Added

### 1. **Hero Section 3D Parallax** (Top Spline Viewer)
- **Scroll-based parallax**: The 3D house model moves downward and slightly rotates as you scroll
- **Scale effect**: Gradually scales up (max 1.2x) as you scroll down
- **Mouse tracking**: Follows your mouse movement with smooth 3D rotation
- **Smooth transitions**: Uses easing for natural movement

### 2. **Property Cards 3D Parallax**
- **Scroll-based depth**: Each card moves at different speeds creating depth
- **Mouse parallax**: Cards tilt and rotate based on mouse position
- **Staggered animation**: Cards animate with slight delays for visual interest

### 3. **Spline Feature Section** (Second 3D Model)
- **Advanced scroll parallax**: Scales, rotates, and translates based on scroll position
- **3D rotation**: Rotates on Y-axis up to 30° as you scroll through the section
- **Dynamic scaling**: Starts at 80% scale and grows to 120%

### 4. **Background Parallax**
- All parallax sections move at different speeds from content
- Creates depth by having background images scroll slower

### 5. **Feature Cards Parallax**
- Individual cards move at different speeds
- Staggered effects based on card position
- Creates a layered 3D depth effect

### 6. **Floating Shapes**
- CTA section shapes respond to mouse movement
- Each shape moves at different speeds
- Creates atmospheric depth

## How It Works

### JavaScript (script.js)
The enhanced `initParallax3D()` function includes:

1. **Scroll Event Listener**:
   - Tracks scroll position
   - Applies transformations to multiple elements
   - Calculates movement based on viewport position

2. **Mouse Move Parallax**:
   - Uses `requestAnimationFrame` for smooth 60fps animation
   - Applies easing for natural motion
   - Tracks mouse position relative to viewport

3. **Element-Specific Effects**:
   - Hero visual: Translation + Scale + Rotation
   - Property cards: Vertical movement + Rotation
   - Spline embed: Complex 3D transformation
   - Feature cards: Depth-based movement

### CSS Enhancements

#### Hero Visual
```css
.hero-visual {
  transform-style: preserve-3d;
  transition: transform 0.1s ease-out;
  will-change: transform;
}
```

#### Spline Embed Container
```css
.spline-embed-container {
  transform-style: preserve-3d;
  perspective: 1000px;
  transition: transform 0.1s ease-out;
  will-change: transform;
}
```

#### Property 3D Items
```css
.property-3d-item {
  transform-style: preserve-3d;
  transition: transform 0.3s ease-out;
  will-change: transform;
}
```

## Performance Optimizations

1. **will-change**: Pre-optimizes elements for transformation
2. **transform-style: preserve-3d**: Enables hardware-accelerated 3D
3. **requestAnimationFrame**: Syncs with browser refresh rate
4. **Easing functions**: Smooth transitions instead of instant changes
5. **Conditional rendering**: Only animates elements in viewport

## Browser Compatibility

- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari
- ⚠️ Mobile browsers (simplified effects)

## Customization

### Adjust Parallax Speed
In `script.js`, modify these values:

```javascript
// Hero visual movement speed (line ~487)
const movement = (scrolled * 0.15);  // Change 0.15 to adjust speed

// Property card parallax (line ~500)
const movement = offset * 0.1;  // Change 0.1 to adjust speed

// Mouse parallax depth (line ~554)
const depth = 30;  // Change 30 to adjust mouse sensitivity
```

### Adjust 3D Rotation
```javascript
// Hero visual rotation (line ~489)
const rotate = scrolled * 0.02;  // Change 0.02 to adjust rotation speed

// Spline embed rotation (line ~515)
const rotate = (scrollProgress - 0.5) * 30;  // Change 30 to adjust max rotation
```

### Disable Effects for Mobile
The parallax effects are automatically simplified on mobile devices through CSS media queries:

```css
@media (max-width: 768px) {
  .parallax-section {
    background-attachment: scroll;
  }
}
```

## Testing

Open `index.html` in a browser and test:

1. ✅ Scroll up and down - notice 3D models moving
2. ✅ Move your mouse around - 3D models should follow
3. ✅ Hover over property cards - they should tilt
4. ✅ All buttons remain clickable and functional
5. ✅ Check on mobile - effects should be simplified

## Original Elements Preserved

✅ **All buttons work**: Buy, Rent, Sell buttons remain unchanged
✅ **Navigation**: Navbar fully functional
✅ **Spline viewers**: Both 3D models remain interactive
✅ **Stats section**: Counter animations unchanged
✅ **Testimonials**: Carousel still works
✅ **CTA buttons**: All call-to-action buttons functional

## Files Modified

1. **script.js**: Enhanced `initParallax3D()` function (lines 462-574)
2. **style.css**: Added 3D transform properties to:
   - `.hero-visual` (lines 894-922)
   - `.spline-embed-container` (lines 2213-2234)
   - `.property-3d-item` (lines 1452-1468)
   - `.feature-3d-card` (lines 1582-1606)

## Next Steps

To further enhance the parallax effects:

1. Add parallax to other pages (buy.html, rent.html, etc.)
2. Create custom parallax speeds for different sections
3. Add scroll-triggered animations for text content
4. Implement gyroscope parallax for mobile devices
5. Add particle effects that respond to mouse movement

---

**Note**: The parallax effects use modern browser APIs and may not work in very old browsers (IE11 and below).
