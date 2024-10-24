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

// Your client ID from the Google Cloud Console
const CLIENT_ID = '614843922014-990h9dl1djss2j4pb1halk14neod30bf.apps.googleusercontent.com';

function handleCredentialResponse(response) {
    const data = jwt_decode(response.credential);
    console.log('ID: ' + data.sub);
    console.log('Name: ' + data.name);
    console.log('Email: ' + data.email);
    
    // Redirect to home page after successful sign-in
    window.location.href = 'home.html';
}

function initGoogleSignIn() {
    window.google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: handleCredentialResponse
    });

    window.google.accounts.id.renderButton(
        document.getElementById("googleSignInBtn"),
        { theme: "outline", size: "large" }  // customization options
    );

    window.google.accounts.id.prompt(); // Show the One Tap prompt
}

// Initialize the Google Sign-In on page load
window.onload = initGoogleSignIn;
