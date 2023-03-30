
const consentForm = document.getElementById("consent-form")

fetch("https://apis.scrimba.com/jsonplaceholder/posts")
    .then(response => response.json())
    .then(data => {
        const postsArr = data.slice(0,5) 
        postsArr.forEach(post => {
            document.getElementById("container").innerHTML += `
                <div class="post-el">
                    <h2>${post.title}</h2>
                    <p>${post.body}</p>
                    <hr/>
                </div>
            `
        })
    })

document.addEventListener('submit', function(e) {
    e.preventDefault()
    const formData = new FormData(consentForm)
    
    const postTitle = formData.get("post-title")
    const postBody = formData.get("post-body")

    const postData = {
        title: postTitle,
        body: postBody
    }

    fetch("https://apis.scrimba.com/jsonplaceholder/posts", {
        method: "POST",
        body: JSON.stringify({
            title: postData,
            completed: false
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => console.log(data))
})
