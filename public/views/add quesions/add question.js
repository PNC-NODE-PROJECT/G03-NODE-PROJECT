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
                    let clearAnswerForm=document.querySelectorAll(".clear")
                    for(let clears of clearAnswerForm){
                        clears.value=""
                    }
            })
    }
    else if(!ifCompleted){
        alert("Please complete all field...!")
    }
}

function addTitle(){
    if (document.getElementById("title").value.length>0){
        title.style.display="none";
        document.getElementById("addTitle").style.display = "none";
        document.getElementById("quest").style.display="none"
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

    let ctrlBtn = document.createElement("div");
    ctrlBtn.id = "ctrlBtn"
    
    let btnDelete = document.createElement("button");
    btnDelete.className = "delete";
    btnDelete.textContent = 'Delete'

    let btnUpdate = document.createElement("button");
    btnUpdate.className = titleID;
    btnUpdate.classList.add("updatebtn")
    btnUpdate.textContent = 'Update';
    btnUpdate.id = quesID;

    ctrlBtn.appendChild(btnDelete)
    ctrlBtn.appendChild(btnUpdate)
    let form_que = document.createElement("div");
    form_que.className = "form-que"

    let ques = document.createElement("p");
    ques.className = "titleQues";
    ques.textContent = question.value
    let an1 = document.createElement("p");
    let an2 = document.createElement("p");
    let an3 = document.createElement("p");
    let an4 = document.createElement("p");
    let score = document.createElement("span")
    let correctAn = document.createElement("p");
    an1.className="answ1"
    an1.textContent = ans1.value

    an2.className="answ2"
    an2.textContent =ans2.value

    an3.className="answ3";
    an3.textContent = ans3.value

    an4.textContent = ans4.value
    an4.className="answ4";

    correctAn.className="corectans"
    correctAn.textContent =correcrtAns

    score.className = "scoreQue"
    score.textContent ="Score: " + scores.value
                    
    if(an1.textContent == correctAn.textContent){
        an1.style.color = "green";
        an2.style.color = "red";
        an3.style.color = "red";
        an4.style.color = "red";
    }
    if(an2.textContent == correctAn.textContent){
        an2.style.color = "green";
        an1.style.color = "red";
        an3.style.color = "red";
        an4.style.color = "red";
    }
    if(an3.textContent == correctAn.textContent){
        an3.style.color = "green";
        an1.style.color = "red";
        an2.style.color = "red";
        an4.style.color = "red";
    }
    if(an4.textContent == correctAn.textContent){
        an4.style.color = "green";
        an1.style.color = "red";
        an3.style.color = "red";
        an2.style.color = "red";
    }
    
    
    
    
    form_que.appendChild(ques);
    form_que.appendChild(score)
    form_que.appendChild(an1);
    form_que.appendChild(an2);
    form_que.appendChild(an3);
    form_que.appendChild(an4);
    form_que.appendChild(ctrlBtn);
    contentQue.appendChild(form_que);

    
}

function DeleteQuestion(){
        let URL = "http://localhost:3000/deleteQuestion/"+titleID+"/"+quesID;
        axios.post(URL);
}

function updateQuestion(){
    let URL = "http://localhost:3000/updateQuestion/"+btnUpdate.className+"/"+btnUpdate.id;
}


document.getElementById("addTitle").addEventListener("click",addTitle)
document.getElementById("btn-add-question").addEventListener("click",addQuestions)
