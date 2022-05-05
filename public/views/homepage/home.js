
let URL = "http://localhost:3000/dataUsers/"+localStorage.getItem("userID");
let dataUser =[];
axios.get(URL).then((response) =>{
    dataUser = response.data;
    document.getElementById("name_user").textContent = response.data.username;
})

document.getElementById("signUp").addEventListener("click",() =>{
    location.href = "../../index.html";
})

document.getElementById("pfUser").addEventListener("click",() =>{
    console.log("Hello");
    document.getElementById("name").textContent = dataUser.username;
    document.getElementById("email").textContent ="Email : "+ dataUser.email;
    document.getElementById("password").textContent ="Password : "+ dataUser.password;
    document.getElementById("homepage").style.display = "none";
    document.getElementById("card").style.display = "block";
})

document.getElementById("btnBack").addEventListener("click",() =>{
    location.href = "home.html";
})