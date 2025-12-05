let expression = "";
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

// Add click event listeners to all buttons
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        handleButtonClick(value);
    });
});

// Handle button clicks
function handleButtonClick(value) {
    switch(value) {
        case '=':
            calculateResult();
            break;
        case 'Clear':
        case 'delete':
            clearDisplay();
            break;
        case '<':
            backspace();
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
            break;
        case '^':
            expression += '^';
            updateDisplay();
            break;
        default:
            expression += value;
            updateDisplay();
    }
}

// Update display
function updateDisplay() {
    display.value = expression;
}

// Clear display
function clearDisplay() {
    expression = "";
    display.value = "";
    display.classList.remove('error');
}

// Backspace
function backspace() {
    expression = expression.slice(0, -1);
    updateDisplay();
}

// Calculate result
function calculateResult() {
    if (!expression) return;
    
    try {
        display.classList.add('calculating');
        
        // Convert expression for math.js
        let processedExpression = expression
            .replace(/\^/g, '^')
            .replace(/sqrt/g, 'sqrt')
            .replace(/log/g, 'log10')
            .replace(/exp/g, 'exp');
        
        // Evaluate the expression
        let result = math.evaluate(processedExpression);
        
        // Format result to 2 decimal places
        if (typeof result === 'number') {
            result = Math.round(result * 100) / 100;
        }
        
        expression = result.toString();
        display.value = result;
        
        setTimeout(() => {
            display.classList.remove('calculating');
        }, 300);
        
    } catch (error) {
        showError();
        console.error('Calculation error:', error);
    }
}

// Differentiate expression with respect to x
function differentiate() {
    if (!expression) return;
    
    try {
        display.classList.add('calculating');
        
        // Parse the expression
        const node = math.parse(expression);
        
        // Differentiate with respect to 'x'
        const derivative = math.derivative(node, 'x');
        
        // Simplify and convert to string
        const simplified = math.simplify(derivative);
        const result = simplified.toString();
        
        expression = result;
        display.value = result;
        
        setTimeout(() => {
            display.classList.remove('calculating');
        }, 300);
        
    } catch (error) {
        showError();
        console.error('Differentiation error:', error);
    }
}

// Integrate expression with respect to x
function integrate() {
    if (!expression) return;
    
    try {
        display.classList.add('calculating');
        
        // Note: math.js doesn't have symbolic integration
        // We'll provide numerical integration or a simplified approach
        // For symbolic integration, we can handle basic cases
        
        const result = symbolicIntegrate(expression);
        
        expression = result;
        display.value = result;
        
        setTimeout(() => {
            display.classList.remove('calculating');
        }, 300);
        
    } catch (error) {
        showError();
        console.error('Integration error:', error);
    }
}

// Simple symbolic integration for basic functions
function symbolicIntegrate(expr) {
    // Handle basic integration cases
    expr = expr.trim();
    
    // Power rule: x^n -> x^(n+1)/(n+1)
    if (expr.match(/^x\^(\d+)$/)) {
        const n = parseInt(expr.match(/^x\^(\d+)$/)[1]);
        if (n === -1) return "log(x)";
        return `x^${n+1}/${n+1}`;
    }
    
    // x -> x^2/2
    if (expr === 'x') {
        return 'x^2/2';
    }
    
    // Constant
    if (!expr.includes('x')) {
        return `${expr}*x`;
    }
    
    // sin(x) -> -cos(x)
    if (expr === 'sin(x)') {
        return '-cos(x)';
    }
    
    // cos(x) -> sin(x)
    if (expr === 'cos(x)') {
        return 'sin(x)';
    }
    
    // 1/x -> log(x)
    if (expr === '1/x') {
        return 'log(x)';
    }
    
    // exp(x) -> exp(x)
    if (expr === 'exp(x)') {
        return 'exp(x)';
    }
    
    // For more complex expressions, show message
    return "∫(" + expr + ")dx";
}

// Show error
function showError() {
    display.value = "Error";
    display.classList.add('error');
    display.classList.remove('calculating');
    
    setTimeout(() => {
        display.classList.remove('error');
        expression = "";
    }, 1500);
}

// Keyboard support
document.addEventListener('keydown', (event) => {
    const key = event.key;
    
    if (key >= '0' && key <= '9') {
        expression += key;
        updateDisplay();
    } else if (key === '.') {
        expression += '.';
        updateDisplay();
    } else if (['+', '-', '*', '/', '(', ')'].includes(key)) {
        expression += key;
        updateDisplay();
    } else if (key === 'Enter') {
        calculateResult();
    } else if (key === 'Escape') {
        clearDisplay();
    } else if (key === 'Backspace') {
        backspace();
    }
});

// Prevent default form submission if Enter is pressed in display
display.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        calculateResult();
    }
});
