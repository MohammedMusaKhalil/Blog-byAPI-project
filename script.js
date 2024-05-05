function fetchPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(posts => {
            const postListElement = document.getElementById('postList');
            posts.forEach(post => {
                const postItem = document.createElement('div');
                postItem.innerHTML = `
                <h2>${post.title}</h2>
                <p>${post.body}</p>
               
            `;
                postItem.addEventListener('click',()=>showPostDetails(post.id));
                postListElement.appendChild(postItem);
            });
        })
        .catch(error => console.error('Error fetching posts:', error));
}

function showPostDetails(postId) {
    window.location.href = `post-details.html?id=${postId}`;
}

document.addEventListener('DOMContentLoaded', getDetails);

function getDetails() {
    const postId = getParameterByName('id');

    if (postId) {
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
            .then(response => response.json())
            .then(post => {
                displayDetails(post);
                return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
            })
            .then(response => response.json())
            .then(comments => displayComments(comments))
            .catch(error => console.error('Error fetching post details and comments:', error));
    } else {
        console.error('Post ID not found in the URL.');
    }
}
function displayDetails(post) {
    const postDetailsCon = document.getElementById('post-details');

    const postDetails = document.createElement('div');
    postDetails.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.body}</p>
    `;

    postDetailsCon.appendChild(postDetails);
}

function displayComments(comments) {
    const postDetailsContainer = document.getElementById('post-details');

    const commentsSection = document.createElement('div');
    commentsSection.innerHTML = '<h3>Comments</h3>';

    const commentsList = document.createElement('ul');

    comments.forEach(comment => {
        const commentItem = document.createElement('li');
        commentItem.innerHTML = `
            <strong>${comment.name}</strong> (${comment.email}):<br>
            ${comment.body}
        `;
        commentsList.appendChild(commentItem);
    });

    commentsSection.appendChild(commentsList);
    postDetailsContainer.appendChild(commentsSection);
}

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`),
        results = regex.exec(url);

    if (!results) return null;
    if (!results[2]) return '';

    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

document.addEventListener('DOMContentLoaded', () => {
    const newPostForm = document.getElementById('new-post-form');
    newPostForm.addEventListener('submit', createPost);
});

function createPost(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title,
            body,
            userId: 1, 
        }),
    })
    .then(response => response.json())
    .then(post => {
        alert('New post created successfully!');
        window.location.href = 'index.html';
    })
    .catch(error => console.error('Error creating new post:', error));
}
