const calculator = {
    add : function(a,b) {
        return a+b;
    },

    subtract : function(a,b) {
        return a-b;
    },

    multiply : function(a,b) {
        return a*b;
    },

    divide : function(a,b) {
        if(b===0)
        {
            return "cannot divide by zero"
        }

        return a/b;
    }

};
// Variables to store the parts of a calculator operation

let firstNumber = null;
let operator = null;
let secondNumber = null;

function operate(firstNumber,operator,secondNumber){
    if( firstNumber === null || operator === null || secondNumber === null )
    {
        return "Invalid Operation: Missing Operand(s)";
    }

    switch(operator)
    {
        case '+':
            return calculator.add(firstNumber,secondNumber);
            break;

        case '-':
            return calculator.subtract(firstNumber,secondNumber);
            break;

        case '*':
            return calculator.multiply(firstNumber,secondNumber);
            break;
        
        case '/':
            return calculator.divide(firstNumber,secondNumber);
            break;
        
        default :
        return "Invalid Operator";
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const display = document.querySelector('.display');
    let displayValue = ''; // Variable to store display value

    function updateDisplay() {
        display.textContent = displayValue;
    }

    // Function to append clicked digit or operator to display value
    function appendToDisplay(value) {
        displayValue += value;
        updateDisplay();
    }

    // Function to perform calculation when equal button is clicked
    function handleEqual() {
            console.log("Display Value:", displayValue);
            const result = evaluateExpression(displayValue); // Evaluate the expression
            console.log("Result:", result);
            displayValue = result.toString(); // Update display with result
            updateDisplay();

    }

    // Function to evaluate the expression
    function evaluateExpression(expression) {
        const parts = expression.split(' '); // Split the expression into parts
        if (parts.length !== 3) {
            throw new Error('Invalid expression format'); // Throw error if invalid format
        }
        const firstNumber = parseFloat(parts[0]); // Extract first number
        const operator = parts[1]; // Extract operator
        const secondNumber = parseFloat(parts[2]); // Extract second number
        if (isNaN(firstNumber) || isNaN(secondNumber)) {
            throw new Error('Invalid numbers'); // Throw error if numbers are invalid
        }
        // Call the operate function with extracted values
        return operate(firstNumber, operator, secondNumber);
    }

    // Get all buttons
    const buttons = document.querySelectorAll('.button');

    // Add click event listener to each button
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const buttonValue = button.textContent;
            if (!isNaN(parseInt(buttonValue)) || buttonValue === '.') {
                // If the button is a digit or decimal point
                appendToDisplay(buttonValue);
            } else if (buttonValue === 'C') {
                // If the button is the clear button
                displayValue = ''; // Clear display value
                updateDisplay(); // Update display
            } else if (buttonValue === '=') {
                // If the button is the equal button
                handleEqual(); // Call function to perform calculation
            } else if(buttonValue === '<'){
                let lastIndex = displayValue.length - 1;
                if (lastIndex === '+' || lastIndex === '-'){
                    displayValue = displayValue.slice(0,-3);
                    updateDisplay();
                }
                displayValue = displayValue.slice(0,-1);
                updateDisplay();    
            } 
            else {
                // If the button is an operator
                appendToDisplay(' ' + buttonValue + ' ');
            }
        });
    });
});



