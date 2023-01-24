const usersContainer = document.querySelector(".users-list");
const follow = document.querySelector(".fl")
const unfollow = document.querySelector(".unfl")

let user = JSON.parse(localStorage.getItem('user'))
if(user == null){
    window.location.href = "./index.html"

}
function logOut() {
    localStorage.removeItem("user")
    document.location.href = "./index.html"
}

const BASE_URL = "http://localhost:8080";

const fetchData = async (route) => {
    const response = await fetch(BASE_URL + route);
    return await response.json();
};


usersContainer.innerHTML += ""
const drawUsers = async () => {
    usersContainer.innerHTML += ""
    const users = await fetchData("/accounts");



    for (const user of users) {
        usersContainer.innerHTML += `
            <div class="user_item">
                <tr>
                    <td>${user.email}</td>
                    <td>${user.name}</td>
                    <td>${user.surname}</td>
                    <td>${user.age}</td>
                    <td> <button onclick="followAd('${user._id}')" class="btn-main fl">Follow</button><br>
                    <button onclick="unFollowAuthor('${user._id}')" class="btn-main unfl">Unfollow</button></td>
                </tr>
            </div>
               
        `

    }
};
drawUsers()

async function followAd(userId) {
    const user = JSON.parse(localStorage.getItem("user"))

    const payload = {
        "newData": `${user}`
    }
    
    fetch(BASE_URL + "/accounts/follow/" + `${userId}`, {
        method: "PUT",
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(payload)
    })
    .then(() => {
        drawUsers()
    })
    .catch((err) => alert(err))
}

async function unFollowAuthor(userId) {
    const user = JSON.parse(localStorage.getItem("user"))

    const payload = {
        "newData": `${user}`
    }
    
    const ourUser = await fetchData("/accounts/" + `${userId}`)
    if (ourUser.followers.indexOf(user)) {
        fetch(BASE_URL + "/accounts/unfollow/" + `${userId}`, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(payload)
        })
        .then(() => {
            drawUsers()
        })
        .catch((err) => alert(err))
    } else {
        alert("Вы не подписаны!")
    }

    
}