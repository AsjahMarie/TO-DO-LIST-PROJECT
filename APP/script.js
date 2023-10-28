// Function to validate the password format
function validatePassword(password) {
    // Password regex pattern: At least 10 characters, 1 special character, and 1 number
    const passwordPattern = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d).{10,}$/;
    return passwordPattern.test(password);
}

// Function to handle form submission
document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (usernameTaken(username)) {
        showError('Username is already taken');
    } else if (!validatePassword(password)) {
        showError('Password must be at least 10 characters with at least 1 special character and 1 number');
    } else {
        // Register the user (proceed to the registration process)
        registerUser(username, password);
    }
});

// Function to show error messages
function showError(message) {
    document.getElementById('error-msg').innerText = message;
}

// Simulated function to register the user
function registerUser(Username, Password) {
    // Replace this with your actual registration process
    console.log('User registered:', Username, Password);
    // This is where you would proceed to the actual registration process (e.g., send data to server)
}

// Function to handle successful login
function handleSuccessfulLogin() {
    // Redirect to the homepage after successful login
    window.location.href = 'HomePage.html'; 
}

// Function to handle successful signup
function handleSuccessfulSignup() {
    // Redirect to the homepage after successful signup
    window.location.href = 'HomePage.html'; 
}

