// add tasks to the database
function addTask(e) {
    // e.preventDefault();
    let url = "/addUser";
    var username = document.getElementById("username").value;
    var psw = document.getElementById("password").value;
    var email = document.getElementById("emailAddress").value;
    var birthday = document.getElementById("birthdayDate").value;
    var gender = "Male";
    if (document.getElementById("femaleGender").checked) {
        gender = "Female";
    }
    // TODO: request the server to create new task
    axios.post(url, { username: username, password: psw, email: email, birthday: birthday, gender: gender }).then(() => {
        location.href = "../homepage/home.html";
    })
}


function checkForm(e) {
    e.preventDefault();
    let chekcUpper = false;
    let chefckLower = false;
    var username = document.getElementById("username").value;
    var psw = document.getElementById("password").value;
    var email = document.getElementById("emailAddress").value;
    for (let i = 0; i < psw.length; i++) {
        if (psw[i] == psw[i].toUpperCase()) {
            chekcUpper = true;
        } else if (psw[i] == psw[i].toLowerCase()) {
            chefckLower = true;
        }
    }
    if (username.length > 2 && email.length > 8) {
        if (chefckLower && chekcUpper) {

            if (username.length > 0 && psw.length > 7 && email.length > 0) {
                addTask();
            } else {
                alert("Password must have 8 characters...!")
            }
        } else if (!chefckLower) {
            alert("Password must contain lowercase letters..!");
        } else if (!chekcUpper) {
            alert("Password must contain uppercase letters..!");
        }
    } else {
        alert("Input all fill first..!")
    }


}


document.getElementById("createAccount").addEventListener("click", checkForm)