const homePageName = document.querySelector(".hpName");
const homePageSurname = document.querySelector(".hpSurname");
const homePageAge = document.querySelector(".hpAge");

const BASE_URL = "http://localhost:8080";

const fetchData = async (route) => {
    const response = await fetch(BASE_URL + route);
    return await response.json();
};

let user = JSON.parse(localStorage.getItem('user'))


homePageName.textContent += user.name
homePageSurname.textContent += user.surname
homePageAge.textContent += user.age

function logOut() {
    localStorage.removeItem("user")
    document.location.href = "./index.html"
}
let bl = document.querySelector(".edit-data")
let bl2 = document.querySelector(".back-block")
let b = document.querySelector("body")
let blPost = document.querySelector(".edit-data2")
let bl2Post = document.querySelector(".back-block2")


function cancelBtn() {
    bl2.style.display = "none";
    bl2Post.style.display = "none";


}

function editProf() {
    bl2.style.display = "block";
    bl.style.display = "block";
    bl2.style.backgroundColor = "rgb(196, 193, 193, 0.5)"


}
function saveNewData() {
    let users = JSON.parse(localStorage.getItem("Users"))
    let user = JSON.parse(localStorage.getItem("user"))
    let edName = document.querySelector("#edName").value
    let edSurname = document.querySelector("#edSurname").value
    let edAge = document.querySelector("#edAge").value


    if (edName == "") {
        user.name = (homePageName.textContent = user.name)
    } else user.name = (homePageName.textContent = edName)

    if (edSurname == "") {
        user.surname = (homePageSurname.textContent = user.surname)
    } else user.surname = (homePageSurname.textContent = edSurname)
    if (edAge == "") {
        user.age = (homePageAge.textContent = user.age)
    } else user.age = (homePageAge.textContent = edAge)



    for (let i = 0; i < users.length; i++) {
        if (user.email == users[i].email) {
            users[i].name = user.name
            users[i].surname = user.surname
            users[i].age = user.age
        }
    }
    localStorage.setItem("user", JSON.stringify(user))
    localStorage.setItem("Users", JSON.stringify(users))
    bl2.style.display = "none";
    const userId = user._id;



    fetch(BASE_URL + `/accounts/${userId}`, {

        method: "PUT",
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(user)
    })

}



function addPost() {

    const titlePost = document.querySelector(".post-title").value
    const textPost = document.querySelector(".post-text").value
    const payload = {
        email: user.email,
        title: titlePost,
        post: textPost,
    }
    fetch(BASE_URL + "/posts", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "post",
        body: JSON.stringify(payload)
    })
        .then(() => alert("post added!"))
        .then(() => drawMyPosts())

        .catch(() => alert("err"))
    localStorage.setItem("user", JSON.stringify(user))


}
const myPosts = document.querySelector(".my_posts");
const drawMyPosts = async () => {
    const posts = await fetchData("/posts");
    let myPostsOnly = []
    for (let i = 0; i < posts.length; i++) {
        if (posts[i].email == user.email) {
            myPostsOnly.push(posts[i])
        }
    }
    myPosts.innerHTML = ""
    

    for (const p of myPostsOnly) {
        myPosts.innerHTML += `
            <div class="post_item">
            <h4>${p.email} </h4>
            <h3 class="text_title">${p.title}</h3>
            <p class="text_post">${p.post}</p>
            <div>
                <div>
                <img class="like-img" src="./img/like (1).png" alt="">
                ${p.like}
                </div> 
                <p class="text_date"><i>${p.date}</i></p>
                <button onclick="changePost('${p._id}')" class="change_post">Редактировать пост</button>
                <button onclick="deletePost('${p._id}')" class="delete_post">Удалить пост</button>

                
            </div>
                
        
            </div>
               
        `
          
    }
};
drawMyPosts()

function deletePost(id) {
    fetch(BASE_URL + "/posts/" + id, { method: "DELETE" })
        .then(() => alert("Delete"))
        .then(() => drawMyPosts())
        .catch(() => alert("err"))
}
function changePost(id) {
    bl2Post.style.display = "block";
    blPost.style.display = "block";
    bl2Post.style.backgroundColor = "rgb(196, 193, 193, 0.5)"
    
    localStorage.setItem("idChangePost", JSON.stringify(id))
}

let id = JSON.parse(localStorage.getItem("idChangePost"))
function saveNewPost() {
    const newTitle = document.querySelector("#edTitle").value
    const newPost = document.querySelector("#edPost").value

    const payload = {
        title: newTitle,
        post: newPost,

    }
    fetch(BASE_URL + "/posts/" + id, {
        method: "PUT",
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(payload)
    }) .then(() => drawMyPosts())
        .then(() => alert("Ok"))
        .catch(() => alert("err"))
    bl2Post.style.display = "none";
   
}
