const bar = document.getElementById("bar");
const close = document.getElementById("close");
const nav = document.getElementById("navbar");

if(bar){
    bar.addEventListener("click", () => {
        nav.classList.add("active");
    })
}

if(close){
    close.addEventListener("click", () => {
        nav.classList.remove("active");
    })
}

function onSignIn(googleUser) {
    try {
        var profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Don't send this to your backend
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());

        // Redirect to home page after successful sign-in
        window.location.href = 'home.html';
    } catch (error) {
        console.error('Error during sign-in: ', error);
    }
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}