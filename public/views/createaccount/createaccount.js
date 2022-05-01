// add tasks to the database
function addTask(e) {
    e.preventDefault();
    let url = "http://localhost:3000/addUser";
    var username = document.getElementById("username").value;
    var psw = document.getElementById("password").value;
    var email = document.getElementById("emailAddress").value;
    var birthday = document.getElementById("birthdayDate").value;
    var gender = "Male";
    if (document.getElementById("femaleGender").checked){
        gender = "Female";
    }
    // TODO: request the server to create new task
    axios.post(url,{username:username, password:psw,email:email,birthday:birthday,gender:gender}).then(() =>  {
        location.href = "../homepage/home.html";
})}

document.getElementById("createAccount").addEventListener("click",addTask);