document.getElementById("creQuiz").addEventListener("click", () =>{
    location.href = "../add quesions/add question.html"
})
document.getElementById("playQuiz").addEventListener("click", () =>{
    location.href = "../collectQuestions/collectQuestion.html"
})

document.getElementById("singOut").addEventListener("click", () =>{
    location.href ="../../index.html"
})

document.getElementById("viewQuiz").addEventListener("click", () =>{
    location.href = "../viewQuestions/view.html"
})

let URL = "http://localhost:3000/dataUsers/"+localStorage.getItem("userID");
axios.get(URL).then((response) =>{
    document.getElementById("name_user").textContent = response.data.username;
})

