const allDeleteBtn = document.body;
allDeleteBtn.addEventListener("click",(e) => {
    let getQuiz = "http://localhost:3000/quiz"
    axios.get(getQuiz).then((response) =>{
        let datas = response.data[response.data.length-1];
        for (let value in datas) {
            if (value == "questions"){
                for (let v of datas[value]){
                    quesID = v._id;
                }
            }
        }
        if(e.target.className == "delete"){
            e.target.parentElement.parentElement.remove();
            DeleteQuestion();
        }else if(e.target.className == "update"){
            updateQuestion();
        }
    })
})


var title = document.getElementById("title");
var question = document.getElementById("question");
var ans1 = document.getElementById("a1")
var ans2 = document.getElementById("a2")
var ans3 = document.getElementById("a3")
var ans4 = document.getElementById("a4")
var correcrtAns = "";
var scores = document.getElementById("score");
var choices = document.getElementById("choices");

var titleID = "";
let quesID = "";
var contentQue = document.getElementById("question-content");

function addQuestions() {
    let ifCompleted = false;
    let URL = "http://localhost:3000/addQuestions/"+titleID;
    if (document.querySelector('input[name="choice"]:checked')) {
        correcrtAns = document.querySelector('input[name="choice"]:checked').id;
    }
    if(correcrtAns == "1"){
        correcrtAns =ans1.value;
    }
    else if(correcrtAns == "2"){
        correcrtAns =ans2.value;
    }
    else if(correcrtAns == "3"){
        correcrtAns =ans3.value;
    }
    else if(correcrtAns == "4"){
        correcrtAns =ans4.value;
    }
    if(question.value.length>0 & ans1.value.length>0 & ans2.value.length>0 & ans3.value.length>0 & ans4.value.length>0 & correcrtAns.length>0 & scores.value>0){
        ifCompleted = true;
        console.log(ifCompleted);
    }
    if(ifCompleted){
            axios.post(URL,{question:question.value,answer:{answer1:ans1.value,answer2:ans2.value,answer3:ans3.value,answer4:ans4.value},correctAnswer:correcrtAns,score:scores.value}).then(() =>{
                    displayQuestion();
            })
    }
    else if(!ifCompleted){
        alert("Please complete all field...!")
    }
}

function addTitle(){
    if (document.getElementById("title").value.length>0){
        title.style.display="none";
        document.getElementById("quiztitle").style.display="none";
        document.getElementById("addTitle").style.display = "none";
        document.getElementById("formQue").style.display = "block";
        let URL = "http://localhost:3000/title";
        axios.post(URL, {title:title.value,userID:localStorage.getItem("userID")}).then((response) =>{
                titleID = response.data._id;
            })
        }
    else if (document.getElementById("title").value.length==0){
        alert("Please complete your title quiz...!")
    }
}


// display question after added
function displayQuestion(){

}

function DeleteQuestion(e){
        let URL = "http://localhost:3000/deleteQuestion/"+titleID+"/"+quesID;
        axios.post(URL);
}

function updateQuestion(){
    let URL = "http://localhost:3000/updateQuestion/"+btnUpdate.className+"/"+btnUpdate.id;
}


document.getElementById("addTitle").addEventListener("click",addTitle)
document.getElementById("btn-add-question").addEventListener("click",addQuestions)
