const btn = document.querySelector(".btn");

const BASE_URL = "http://localhost:8080";

const fetchData = async (route) => {
    const response = await fetch(BASE_URL + route);
    return await response.json();
};


btn.addEventListener("click",  () => {
    let email = document.querySelector('.email').value;
    let password = document.querySelector('.password').value;

    fetch(BASE_URL + "/accounts").then(response => response.json())
   
        .then(result => {
            localStorage.setItem('Users', JSON.stringify(result))
        })
        .catch(() => console.log(err));
    const users = JSON.parse(localStorage.getItem('Users'))

        
    for (let i = 0; i <= users.length - 1; i++) {
        if (!validateEmail(email)) {
            alert("Incorrect email!")
            break
        } else if (email == users[i].email && password == users[i].password) {
            localStorage.setItem('user', JSON.stringify(users[i]))

            document.location.href = "./homePage.html"
        }
    }
});

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};
const validatePassword = (password) => {
    return String(password)
        .match(
            /^\S*(?=.*[A-Z])(?=.*[0-9])(?=.*[/$!*])[a-zA-Z0-9*/$!]{8,}\S*$/g
        );
};