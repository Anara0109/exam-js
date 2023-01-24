const postsContainer = document.querySelector(".posts");

let user = JSON.parse(localStorage.getItem('user'))
if (user == null) {
    window.location.href = "./index.html"

}
const BASE_URL = "http://localhost:8080";

const fetchData = async (route) => {
    const response = await fetch(BASE_URL + route);
    return await response.json();
};
function logOut() {
    localStorage.removeItem("user")
    document.location.href = "./index.html"
}


    
const drawNews = async () => {
    postsContainer.innerHTML = ""
    const allPosts = await fetchData("/posts");
    
    allPosts.forEach(post => {
        postsContainer.innerHTML += `
            <div class="post_item">
                <h4>${post.email}</h4>
                <h3>${post.title}</h3>
                <p class="text_post">${post.post}</p>
                <div>
                    <div>
                        
                        ${post.like}
                        <button onclick="likePost('${post._id}')">+</button>
                        <button onclick="unlikePost('${post._id}')">-</button>
                    </div> 
                    <p class="text_date"><i>${post.date}</i></p>
                    
                </div>
            </div>      
        `
    });
}


const likePost = async (postId) => {
    await fetch(BASE_URL + `/posts/like/${postId}`);
    drawNews()
    
}
const unlikePost = async (postId) =>{
    await fetch(BASE_URL + `/posts/unlike/${postId}`);
    drawNews()
}
drawNews()