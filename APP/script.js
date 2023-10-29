const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('register')

// Register button event listener
registerBtn.addEventListener('click', () => {

    container.classList.add("active");
});
    
loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

