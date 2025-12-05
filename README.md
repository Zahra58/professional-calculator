# Professional Calculator

A fully-featured web-based scientific calculator with calculus operations, built with HTML, CSS, and JavaScript.

## Features

- **Basic Operations**: Addition, subtraction, multiplication, division
- **Scientific Functions**: sin, cos, tan, log, exp, sqrt
- **Advanced Math**: Power operations (^), parentheses
- **Calculus Operations**: 
  - Differentiation (d/dx)
  - Integration (∫)
- **User-Friendly Interface**:
  - Responsive design
  - Interactive button animations
  - Keyboard support
  - Clear and backspace functionality

## Live Demo

Once deployed, your calculator will be available at: `https://your-username.github.io/calculator/`

## Deployment Instructions for GitHub Pages

### Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name your repository (e.g., "calculator")
5. Make it public
6. Click "Create repository"

### Step 2: Upload Files

**Option A: Using GitHub Web Interface**

1. In your new repository, click "uploading an existing file"
2. Drag and drop these files:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `README.md`
3. Click "Commit changes"

**Option B: Using Git Command Line**

```bash
# Navigate to your project folder
cd path/to/your/calculator/files

# Initialize git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit: Professional Calculator"

# Add remote repository (replace YOUR-USERNAME and REPO-NAME)
git remote add origin https://github.com/YOUR-USERNAME/REPO-NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on "Settings" tab
3. Scroll down to "Pages" in the left sidebar
4. Under "Source", select "main" branch
5. Select "/ (root)" folder
6. Click "Save"
7. Wait a few minutes for deployment
8. Your site will be live at: `https://YOUR-USERNAME.github.io/REPO-NAME/`

## Usage

### Basic Operations
- Click number buttons and operators to build expressions
- Press `=` to calculate result
- Use `Clear` or `AC` to reset
- Use `←` to backspace

### Scientific Functions
- Click function buttons (sin, cos, tan, etc.)
- They automatically add opening parenthesis
- Add your value and closing parenthesis
- Example: `sin(45)`, `sqrt(16)`

### Calculus Operations
- **Differentiation**: Enter an expression with variable `x`, then click `d/dx`
  - Example: `x^2` → click `d/dx` → Result: `2*x`
- **Integration**: Enter an expression with variable `x`, then click `∫`
  - Example: `x` → click `∫` → Result: `x^2/2`

### Keyboard Shortcuts
- Numbers and operators: Type directly
- `Enter`: Calculate result
- `Escape`: Clear display
- `Backspace`: Delete last character

## Technologies Used

- **HTML5**: Structure
- **CSS3**: Styling and animations
- **JavaScript**: Functionality
- **Math.js**: Mathematical computations and calculus

## Browser Compatibility

Works on all modern browsers:
- Chrome
- Firefox
- Safari
- Edge

## File Structure

```
calculator/
│
├── index.html          # Main HTML file
├── styles.css          # CSS styling and animations
├── script.js           # JavaScript functionality
└── README.md           # Documentation
```

## Customization

You can customize the calculator by editing:

- **Colors**: Modify the gradient and button colors in `styles.css`
- **Button Layout**: Change the grid structure in `index.html`
- **Functions**: Add more mathematical functions in `script.js`

## License

Free to use and modify for personal and commercial projects.

## Support

If you encounter any issues, please create an issue in the GitHub repository.

---

**Enjoy your Professional Calculator! 🧮**
