
const blogFeed = document.getElementById("container")
const form = document.getElementById("consent-form")
let postsArr = []

function render() {
    postsArr.forEach(post => {
        blogFeed.innerHTML += `
            <div class="post-el">
                <h2>${post.title}</h2>
                <p>${post.body}</p>
                <hr/>
            </div>
        `
    })
}

fetch("https://apis.scrimba.com/jsonplaceholder/posts")
    .then(response => response.json())
    .then(data => {
        postsArr = data.slice(0,5) 
        render()
    })

form.addEventListener('submit', function(e) {
    e.preventDefault()
    const formData = new FormData(form)
    
    const postTitle = formData.get("post-title")
    const postBody = formData.get("post-body")

    const postData = {
        title: postTitle,
        body: postBody
    }

    fetch("https://apis.scrimba.com/jsonplaceholder/posts", {
        method: "POST",
        body: JSON.stringify(postData),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        postsArr.unshift(data)
        blogFeed.innerHTML = ''
        render()
        form.reset()
    })
})