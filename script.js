// ============================================
// STATE MANAGEMENT
// ============================================
let expression = "";
let soundEnabled = true;
let historyVisible = true;
let calculationHistory = [];
let currentTheme = 'dark'; // 'dark' or 'light'

// ============================================
// DOM ELEMENTS
// ============================================
const display = document.getElementById('display');
const expressionDisplay = document.getElementById('expressionDisplay');
const buttons = document.querySelectorAll('.btn');
const soundToggle = document.getElementById('soundToggle');
const historyToggle = document.getElementById('historyToggle');
const themeToggle = document.getElementById('themeToggle');
const historyPanel = document.getElementById('historyPanel');
const historyList = document.getElementById('historyList');
const clearHistoryBtn = document.getElementById('clearHistory');

// ============================================
// SOUND SYSTEM - Simple Web Audio API
// ============================================
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {
    if (!soundEnabled) return;
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Different sounds for different actions
    switch(type) {
        case 'click':
            oscillator.frequency.value = 800;
            gainNode.gain.value = 0.1;
            break;
        case 'equals':
            oscillator.frequency.value = 1200;
            gainNode.gain.value = 0.15;
            break;
        case 'clear':
            oscillator.frequency.value = 400;
            gainNode.gain.value = 0.12;
            break;
        case 'error':
            oscillator.frequency.value = 200;
            gainNode.gain.value = 0.15;
            break;
    }
    
    oscillator.start();
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    oscillator.stop(audioContext.currentTime + 0.1);
}

// ============================================
// PARTICLE BACKGROUND ANIMATION
// ============================================
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 80;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }
    
    draw() {
        ctx.fillStyle = `rgba(0, 255, 170, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw connections
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
                ctx.strokeStyle = `rgba(0, 255, 170, ${0.15 * (1 - distance / 150)})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
    
    // Update and draw particles
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

initParticles();
animateParticles();

// ============================================
// HISTORY MANAGEMENT
// ============================================
function addToHistory(expr, result) {
    const historyItem = { expression: expr, result: result, timestamp: new Date() };
    calculationHistory.unshift(historyItem);
    
    // Keep only last 50 calculations
    if (calculationHistory.length > 50) {
        calculationHistory.pop();
    }
    
    renderHistory();
    saveHistory();
}

function renderHistory() {
    if (calculationHistory.length === 0) {
        historyList.innerHTML = '<div class="history-empty">No calculations yet</div>';
        return;
    }
    
    historyList.innerHTML = calculationHistory.map((item, index) => `
        <div class="history-item" data-index="${index}">
            <div class="expression">${item.expression}</div>
            <div class="result">= ${item.result}</div>
        </div>
    `).join('');
    
    // Add click handlers to history items
    document.querySelectorAll('.history-item').forEach(item => {
        item.addEventListener('click', () => {
            const index = parseInt(item.getAttribute('data-index'));
            const historyItem = calculationHistory[index];
            expression = historyItem.result.toString();
            updateDisplay();
            playSound('click');
        });
    });
}

function clearHistory() {
    calculationHistory = [];
    renderHistory();
    localStorage.removeItem('calculatorHistory');
    playSound('clear');
}

function saveHistory() {
    localStorage.setItem('calculatorHistory', JSON.stringify(calculationHistory));
}

function loadHistory() {
    const saved = localStorage.getItem('calculatorHistory');
    if (saved) {
        calculationHistory = JSON.parse(saved);
        renderHistory();
    }
}

// ============================================
// EVENT LISTENERS
// ============================================
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        button.classList.add('btn-pressed');
        setTimeout(() => button.classList.remove('btn-pressed'), 300);
        handleButtonClick(value);
    });
});

soundToggle.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    const soundOn = soundToggle.querySelector('.sound-on');
    const soundOff = soundToggle.querySelector('.sound-off');
    
    if (soundEnabled) {
        soundOn.style.display = 'block';
        soundOff.style.display = 'none';
        playSound('click');
    } else {
        soundOn.style.display = 'none';
        soundOff.style.display = 'block';
    }
});

historyToggle.addEventListener('click', () => {
    historyVisible = !historyVisible;
    if (historyVisible) {
        historyPanel.classList.remove('hidden');
    } else {
        historyPanel.classList.add('hidden');
    }
    playSound('click');
});

themeToggle.addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.body.classList.toggle('light-theme');
    
    // Save preference
    localStorage.setItem('calculatorTheme', currentTheme);
    playSound('click');
});

clearHistoryBtn.addEventListener('click', clearHistory);

// ============================================
// CALCULATOR LOGIC
// ============================================
function handleButtonClick(value) {
    switch(value) {
        case '=':
            calculateResult();
            break;
        case 'Clear':
            clearDisplay();
            playSound('clear');
            break;
        case 'delete':
            clearDisplay();
            playSound('clear');
            break;
        case '<':
            backspace();
            playSound('click');
            break;
        case 'd/dx':
            differentiate();
            break;
        case '∫':
            integrate();
            break;
        case 'sin':
        case 'cos':
        case 'tan':
        case 'log':
        case 'exp':
        case 'sqrt':
            expression += value + '(';
            updateDisplay();
            playSound('click');
            break;
        case '^':
            expression += '^';
            updateDisplay();
            playSound('click');
            break;
        case 'pi':
            expression += 'pi';
            updateDisplay();
            playSound('click');
            break;
        case 'e':
            expression += 'e';
            updateDisplay();
            playSound('click');
            break;
        case 'x':
            expression += 'x';
            updateDisplay();
            playSound('click');
            break;
        default:
            expression += value;
            updateDisplay();
            playSound('click');
    }
}

function updateDisplay() {
    display.value = expression;
    expressionDisplay.textContent = expression;
}

function clearDisplay() {
    expression = "";
    display.value = "";
    expressionDisplay.textContent = "";
    display.classList.remove('error');
}

function backspace() {
    expression = expression.slice(0, -1);
    updateDisplay();
}

function calculateResult() {
    if (!expression) return;
    
    try {
        playSound('equals');
        display.classList.add('calculating');
        
        const originalExpression = expression;
        
        // Convert expression for math.js
        let processedExpression = expression
            .replace(/\^/g, '^')
            .replace(/sqrt/g, 'sqrt')
            .replace(/log/g, 'log10')
            .replace(/exp/g, 'exp')
            .replace(/pi/g, 'pi')
            .replace(/e(?![a-z])/g, 'e'); // e constant but not exp
        
        // Evaluate the expression
        let result = math.evaluate(processedExpression);
        
        // Format result to 2 decimal places for display
        if (typeof result === 'number') {
            result = Math.round(result * 100) / 100;
        }
        
        addToHistory(originalExpression, result);
        
        expression = result.toString();
        display.value = result;
        expressionDisplay.textContent = originalExpression + ' =';
        
        setTimeout(() => {
            display.classList.remove('calculating');
        }, 300);
        
    } catch (error) {
        showError();
        console.error('Calculation error:', error);
    }
}

function differentiate() {
    if (!expression) return;
    
    try {
        playSound('equals');
        display.classList.add('calculating');
        
        const originalExpression = expression;
        
        // Parse the expression
        const node = math.parse(expression);
        
        // Differentiate with respect to 'x'
        const derivative = math.derivative(node, 'x');
        
        // Simplify and convert to string
        const simplified = math.simplify(derivative);
        const result = simplified.toString();
        
        addToHistory(`d/dx(${originalExpression})`, result);
        
        expression = result;
        display.value = result;
        expressionDisplay.textContent = `d/dx(${originalExpression}) =`;
        
        setTimeout(() => {
            display.classList.remove('calculating');
        }, 300);
        
    } catch (error) {
        showError();
        console.error('Differentiation error:', error);
    }
}

function integrate() {
    if (!expression) return;
    
    try {
        playSound('equals');
        display.classList.add('calculating');
        
        const originalExpression = expression;
        const result = symbolicIntegrate(expression);
        
        addToHistory(`∫(${originalExpression})dx`, result);
        
        expression = result;
        display.value = result;
        expressionDisplay.textContent = `∫(${originalExpression})dx =`;
        
        setTimeout(() => {
            display.classList.remove('calculating');
        }, 300);
        
    } catch (error) {
        showError();
        console.error('Integration error:', error);
    }
}

function symbolicIntegrate(expr) {
    expr = expr.trim();
    
    // Power rule: x^n -> x^(n+1)/(n+1)
    if (expr.match(/^x\^(\d+)$/)) {
        const n = parseInt(expr.match(/^x\^(\d+)$/)[1]);
        if (n === -1) return "log(x) + C";
        return `x^${n+1}/${n+1} + C`;
    }
    
    // x -> x^2/2
    if (expr === 'x') {
        return 'x^2/2 + C';
    }
    
    // Constant
    if (!expr.includes('x')) {
        return `${expr}*x + C`;
    }
    
    // sin(x) -> -cos(x)
    if (expr === 'sin(x)') {
        return '-cos(x) + C';
    }
    
    // cos(x) -> sin(x)
    if (expr === 'cos(x)') {
        return 'sin(x) + C';
    }
    
    // 1/x -> log(x)
    if (expr === '1/x') {
        return 'log(x) + C';
    }
    
    // exp(x) -> exp(x)
    if (expr === 'exp(x)') {
        return 'exp(x) + C';
    }
    
    // For complex expressions
    return "∫(" + expr + ")dx + C";
}

function showError() {
    playSound('error');
    display.value = "Error";
    display.classList.add('error');
    display.classList.remove('calculating');
    
    setTimeout(() => {
        display.classList.remove('error');
        expression = "";
        expressionDisplay.textContent = "";
    }, 1500);
}

// ============================================
// ENHANCED KEYBOARD SUPPORT
// ============================================
document.addEventListener('keydown', (event) => {
    const key = event.key;
    
    // Prevent default for calculator keys
    if (['+', '-', '*', '/', 'Enter', 'Escape', 'Delete'].includes(key) || 
        (key >= '0' && key <= '9') || key === '.') {
        event.preventDefault();
    }
    
    // Numbers
    if (key >= '0' && key <= '9') {
        expression += key;
        updateDisplay();
        playSound('click');
    } 
    // Decimal point
    else if (key === '.') {
        expression += '.';
        updateDisplay();
        playSound('click');
    } 
    // Addition
    else if (key === '+' || key === '=') {
        if (event.shiftKey && key === '=') {
            expression += '+';
            updateDisplay();
            playSound('click');
        }
    }
    // Subtraction
    else if (key === '-') {
        expression += '-';
        updateDisplay();
        playSound('click');
    }
    // Multiplication - Support both * and × (Alt+X on some keyboards)
    else if (key === '*' || key === '×') {
        expression += '*';
        updateDisplay();
        playSound('click');
    }
    // Division - Support both / and ÷
    else if (key === '/' || key === '÷') {
        expression += '/';
        updateDisplay();
        playSound('click');
    }
    // Parentheses
    else if (key === '(' || key === ')') {
        expression += key;
        updateDisplay();
        playSound('click');
    }
    // Calculate - Enter or =
    else if (key === 'Enter' || (!event.shiftKey && key === '=')) {
        calculateResult();
    }
    // Clear - Escape or Delete
    else if (key === 'Escape' || key === 'Delete') {
        clearDisplay();
        playSound('clear');
    }
    // Backspace
    else if (key === 'Backspace') {
        backspace();
        playSound('click');
    }
    // Variable x
    else if (key.toLowerCase() === 'x') {
        expression += 'x';
        updateDisplay();
        playSound('click');
    }
    // Pi constant - p key
    else if (key.toLowerCase() === 'p') {
        expression += 'pi';
        updateDisplay();
        playSound('click');
    }
    // Euler's constant - e key (but not Ctrl+E)
    else if (key.toLowerCase() === 'e' && !event.ctrlKey && !event.metaKey) {
        expression += 'e';
        updateDisplay();
        playSound('click');
    }
    // Square root - s key
    else if (key.toLowerCase() === 's') {
        expression += 'sqrt(';
        updateDisplay();
        playSound('click');
    }
    // Power - ^ key
    else if (key === '^') {
        expression += '^';
        updateDisplay();
        playSound('click');
    }
});

// Prevent form submission if Enter is pressed in display
display.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        calculateResult();
    }
});

// ============================================
// INITIALIZATION
// ============================================
function loadTheme() {
    const savedTheme = localStorage.getItem('calculatorTheme');
    if (savedTheme === 'light') {
        currentTheme = 'light';
        document.body.classList.add('light-theme');
    }
}

loadTheme();
loadHistory();

console.log('🚀 CALCUTRON v2.0 initialized!');
console.log('');
console.log('💡 Keyboard shortcuts:');
console.log('  • 0-9: Numbers');
console.log('  • + - × * ÷ /: Operators');
console.log('  • ( ): Parentheses');
console.log('  • .: Decimal point');
console.log('  • Enter or =: Calculate');
console.log('  • Escape or Delete: Clear all');
console.log('  • Backspace: Delete last');
console.log('  • x: Add variable x');
console.log('  • p: Add π (pi)');
console.log('  • e: Add e constant');
console.log('  • s: Add sqrt(');
console.log('  • ^: Power operator');
console.log('');
console.log('🎨 Pro Tips:');
console.log('  • Click history items to reuse results');
console.log('  • Toggle theme for light/dark mode');
console.log('  • Sound effects can be toggled on/off');
console.log('  • History auto-saves to browser storage');
