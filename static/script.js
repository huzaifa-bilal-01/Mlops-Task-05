document.addEventListener('DOMContentLoaded', function() {
    fetchUserData();
});

function fetchUserData() {
    fetch('/users')
    .then(response => response.json())
    .then(data => {
        const userDataDiv = document.getElementById('userData');
        userDataDiv.innerHTML = '<h2>User Data:</h2>';
        data.forEach(user => {
            userDataDiv.innerHTML += `<p><strong>Username:</strong> ${user.username}, <strong>Email:</strong> ${user.email}</p>`;
        });
    })
    .catch(error => {
        console.log('Error:', error);
    });
}

document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    var formData = new FormData(this); // Get form data
    var userData = {
        username: formData.get('username'),
        email: formData.get('email')
    };
    console.log("Sending", userData)
    // Send data to Flask API
    fetch('/submit', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .catch(error => {
        console.log('Error:', error);
        alert('There was an error submitting user info!');
    });
});
