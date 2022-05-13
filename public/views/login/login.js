const btn_login = document.getElementById("btn-login");


// show and hide password after click button show password
var show_password = document.getElementById('showPSW').addEventListener('click', event => {
    if (event.target.checked) {
        psw.type = "text";
        document.getElementById("shPSW").textContent = "Hide password";
    } else {
        psw.type = "password";
        document.getElementById("shPSW").textContent = "Show password";

    }
});

function checkLogin(e) {
    e.preventDefault();
    var username = document.getElementById("username").value;
    var psw = document.getElementById("psw").value;
    var URL = "/dataUsers/" + psw + "/" + username;
    axios.get(URL).then(function(response) {
        var tasks = response.data;
        if (tasks.length <= 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'wrong password or username!',
            })
        } else {
            localStorage.clear();
            localStorage.setItem("userID", tasks._id);
            location.href = "views/homepage/home.html";
        }

    });
}

btn_login.addEventListener("click", checkLogin);