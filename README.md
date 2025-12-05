# CALCUTRON - Professional Scientific Calculator

A **stunning**, fully-featured web-based scientific calculator with calculus operations, real-time history, sound effects, and particle animations. Built with cutting-edge web technologies.

![Calculator Preview](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Version](https://img.shields.io/badge/Version-2.0-blue)

##  Features

### **Core Mathematics**
- ✅ **Basic Operations**: Addition, subtraction, multiplication, division
- ✅ **Scientific Functions**: sin, cos, tan, log, exp, sqrt
- ✅ **Advanced Math**: Power operations (xʸ), parentheses
- ✅ **Mathematical Constants**: π (pi), e (Euler's number)
- ✅ **Variable Support**: Use 'x' for algebraic expressions

### **Calculus Operations**
- ✅ **Differentiation** (d/dx): Automatic symbolic differentiation
- ✅ **Integration** (∫dx): Symbolic integration with constant

### **Premium User Experience**
- 🎨 **Futuristic Dark Theme**: Cyberpunk-inspired design with neon accents
- 🎵 **Sound Effects**: Toggle-able click sounds and audio feedback
- 📊 **Calculation History**: Side panel with last 50 calculations
- ✨ **Particle Background**: Animated particle network effect
- ⌨️ **Full Keyboard Support**: Type naturally with shortcuts
- 📱 **Fully Responsive**: Works perfectly on mobile, tablet, and desktop
- 💾 **Persistent History**: Calculations saved to browser storage

### **Visual Excellence**
- Custom "Orbitron" and "Rajdhani" fonts for that sci-fi feel
- Glowing neon effects on all interactive elements
- Smooth animations and micro-interactions
- Color-coded button categories for instant recognition
- Expression preview line above main display

##  Live Demo

 `https://zahra58.github.io/professional-calculator/`

##  Quick Start

### Deployment to GitHub Pages

**Step 1: Create Repository**
```bash
1. Go to GitHub.com
2. Click "+" → "New repository"
3. Name it "calculator"
4. Make it public
5. Click "Create repository"
```

**Step 2: Upload Files**
```bash
# Using Git Command Line
cd path/to/calculator/files

git init
git add .
git commit -m " Deploy CALCUTRON"
git remote add origin https://github.com/YOUR-USERNAME/calculator.git
git branch -M main
git push -u origin main
```

**Step 3: Enable GitHub Pages**
```bash
1. Go to repository Settings
2. Click "Pages" in sidebar
3. Source: Select "main" branch
4. Folder: Select "/ (root)"
5. Click "Save"
6. Wait 2-3 minutes
7. Visit: https://YOUR-USERNAME.github.io/calculator/
```

##  Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `0-9` | Number input |
| `+ - * /` | Basic operators |
| `( )` | Parentheses |
| `.` | Decimal point |
| `Enter` | Calculate result |
| `Escape` | Clear display |
| `Backspace` | Delete last character |
| `x` | Add variable x |
| `p` | Add π (pi) |
| `e` | Add e constant |

##  Color Scheme

- **Primary Glow**: #00ffaa (Neon Green)
- **Numbers**: Dark Gray (#252b4a)
- **Operators**: Orange/Red (#ff6b35)
- **Equals**: Green (#00ffaa) - MEGA emphasis
- **Functions**: Blue (#3b82f6)
- **Calculus**: Purple (#a855f7)
- **Clear**: Red (#ef4444)
- **Constants**: Teal (#14b8a6)
- **Variable**: Purple (#8b5cf6)

##  Technologies Used

- **HTML5**: Semantic structure
- **CSS3**: Advanced animations, gradients, and effects
- **JavaScript (ES6+)**: Modern async programming
- **Math.js**: Mathematical computations and calculus
- **Web Audio API**: Sound system
- **Canvas API**: Particle animation background
- **LocalStorage**: History persistence

##  Browser Compatibility

Tested and working on:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

##  Usage Examples

### Basic Calculation
```
Input: 25 * 4 + 10
Output: 110
```

### Scientific Functions
```
Input: sin(45)
Output: 0.85

Input: sqrt(144)
Output: 12

Input: log(100)
Output: 2
```

### Calculus Operations
```
Differentiation:
Input: x^3
Click: d/dx
Output: 3*x^2

Integration:
Input: x^2
Click: ∫
Output: x^3/3 + C
```

### Using Constants
```
Input: pi * 2
Output: 6.28

Input: e^2
Output: 7.39
```

## ⚡ Performance Features

- **Optimized Animations**: 60 FPS particle system
- **Efficient DOM Updates**: Minimal repaints
- **Lazy Loading**: Resources loaded on demand
- **Mobile Optimized**: Touch-friendly buttons
- **Lightweight**: < 100KB total size

## 🎛️ Customization

### Change Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --primary-glow: #00ffaa;
    --secondary-glow: #00ddff;
    --accent-glow: #ff00ff;
}
```

### Adjust Particle Count
In `script.js`:
```javascript
const particleCount = 80; // Change this number
```

### Modify Sound Effects
In `script.js`, edit frequency values in `playSound()` function

##  File Structure

```
calculator/
│
├── index.html          # Main HTML structure
├── styles.css          # Complete styling & animations
├── script.js           # All functionality & logic
└── README.md           # This file
```

##  Known Issues

- Symbolic integration limited to basic functions
- Complex nested expressions may need parentheses
- History limited to 50 most recent calculations

##  Future Enhancements

- [ ] Matrix operations
- [ ] Graphing calculator mode
- [ ] Custom themes
- [ ] Export calculation history
- [ ] Scientific notation toggle
- [ ] More advanced integration

## 🤝 Contributing

Feel free to fork and improve! Some ideas:
- Add more mathematical functions
- Improve integration algorithm
- Create additional themes
- Add unit converter
- Implement memory functions (M+, M-, MR, MC)

## 📄 License

Free to use and modify for personal and commercial projects.

##  Acknowledgments

- **Math.js** - Powerful math library
- **Google Fonts** - Orbitron & Rajdhani fonts
- **Web Audio API** - Sound system
- **You** - For using CALCUTRON!

---

**Built with 💚 and lots of ☕**

Made with passion for mathematics and beautiful UI design.

Enjoy your CALCUTRON! 🧮✨

