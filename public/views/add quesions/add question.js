const allDeleteBtn = document.body;
allDeleteBtn.addEventListener("click", (e) => {
    let getQuiz = "/quiz"
    axios.get(getQuiz).then((response) => {
        let datas = response.data[response.data.length - 1];
        for (let value in datas) {
            if (value == "questions") {
                for (let v of datas[value]) {
                    quesID = v._id;
                }
            }
        }
        if (e.target.className == "delete") {
            e.target.parentElement.parentElement.remove();
            DeleteQuestion();
        } else if (e.target.className == "update") {
            document.getElementById("edit-quiz").style.display = "none";
            document.getElementById("form_add").style.display = "block";
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
    let URL = "/addQuestions/" + titleID;
    if (document.querySelector('input[name="choice"]:checked')) {
        correcrtAns = document.querySelector('input[name="choice"]:checked').id;
    }
    if (correcrtAns == "1") {
        correcrtAns = ans1.value;
    } else if (correcrtAns == "2") {
        correcrtAns = ans2.value;
    } else if (correcrtAns == "3") {
        correcrtAns = ans3.value;
    } else if (correcrtAns == "4") {
        correcrtAns = ans4.value;
    }
    if (question.value.length > 0 & ans1.value.length > 0 & ans2.value.length > 0 & ans3.value.length > 0 & ans4.value.length > 0 & correcrtAns.length > 0 & scores.value > 0) {
        ifCompleted = true;
    }
    if (ifCompleted) {
        axios.post(URL, { question: question.value, answer: { answer1: ans1.value, answer2: ans2.value, answer3: ans3.value, answer4: ans4.value }, correctAnswer: correcrtAns, score: scores.value }).then(() => {
            displayQuestion();
            let clearAnswerForm = document.querySelectorAll(".clear")
            for (let clears of clearAnswerForm) {
                clears.value = ""
            }
        })
    } else if (!ifCompleted) {
        alert("Please complete all field...!")
    }
}

function addTitle() {
    if (document.getElementById("title").value.length > 0) {
        title.style.display = "none";
        document.getElementById("addTitle").style.display = "none";
        document.getElementById("quest").style.display = "none";
        document.getElementById("formQue").style.display = "block";
        let URL = "/title";
        axios.post(URL, { title: title.value, userID: localStorage.getItem("userID") }).then((response) => {
            titleID = response.data._id;
        })
    } else if (document.getElementById("title").value.length == 0) {
        alert("Please complete your title quiz...!")
    }
}


// display question after added
function displayQuestion() {
    let URL = "/quiz/" + titleID;
    let questionData;
    axios.get(URL).then((response) => {
        questionData = response.data.questions;
        for (let value of questionData) {
            console.log(value.correctAnswer);
            let ctrlBtn = document.createElement("div");
            ctrlBtn.id = "ctrlBtn"

            let btnDelete = document.createElement("button");
            btnDelete.className = "delete";
            btnDelete.textContent = 'Delete'

            let btnUpdate = document.createElement("button");
            btnUpdate.className = "update";
            btnUpdate.textContent = 'Update';
            btnUpdate.id = quesID;

            ctrlBtn.appendChild(btnDelete)
            ctrlBtn.appendChild(btnUpdate)
            let form_que = document.createElement("div");
            form_que.className = "form-que"
            form_que.id = "formContainQUe"

            let ques = document.createElement("p");
            ques.className = "titleQues";
            ques.textContent = value.question;
            let an1 = document.createElement("p");
            let an2 = document.createElement("p");
            let an3 = document.createElement("p");
            let an4 = document.createElement("p");
            let score = document.createElement("span")
            let correctAn = document.createElement("p");
            let arraAnswers = [];
            for (let eachAns in value.answer) {
                arraAnswers.push(value.answer[eachAns]);
            }
            an1.className = "answ1"
            an1.textContent = arraAnswers[0]

            an2.className = "answ2"
            an2.textContent = arraAnswers[1]

            an3.className = "answ3";
            an3.textContent = arraAnswers[2]

            an4.textContent = arraAnswers[3]
            an4.className = "answ4";

            correctAn.className = "corectans"
            correctAn.textContent = value.correctAnswer

            score.className = "scoreQue"
            score.textContent = "Score: " + value.score
            console.log(score);

            if (an1.textContent == correctAn.textContent) {
                an1.style.color = "blue";
                an2.style.color = "red";
                an3.style.color = "red";
                an4.style.color = "red";
            }
            if (an2.textContent == correctAn.textContent) {
                an2.style.color = "blue";
                an1.style.color = "red";
                an3.style.color = "red";
                an4.style.color = "red";
            }
            if (an3.textContent == correctAn.textContent) {
                an3.style.color = "blue";
                an1.style.color = "red";
                an2.style.color = "red";
                an4.style.color = "red";
            }
            if (an4.textContent == correctAn.textContent) {
                an4.style.color = "blue";
                an1.style.color = "red";
                an3.style.color = "red";
                an2.style.color = "red";
            }

            form_que.appendChild(ques);
            form_que.appendChild(score);
            form_que.appendChild(an1);
            form_que.appendChild(an2);
            form_que.appendChild(an3);
            form_que.appendChild(an4);
            form_que.appendChild(ctrlBtn);
            contentQue.appendChild(form_que);
            document.getElementById("title").textContent = "";
        }
    })
}

function DeleteQuestion() {
    let URL = "/deleteQuestion/" + titleID + "/" + quesID;
    axios.post(URL).then(() => {
        displayQuestion();

    })
}

function updateQuestion() {
    let que = document.getElementById("questionUpd");
    let ans1Upd = document.getElementById("a1Upd");
    let ans2Upd = document.getElementById("a2Upd");
    let ans3Upd = document.getElementById("a3Upd");
    let ans4Upd = document.getElementById("a4Upd");
    let socreUpd = document.getElementById("scoreUpd").value;
    let correctAnUpd = '';
    document.querySelectorAll("#choice").checked = false;
    if (document.querySelector('input[name="choiceUpd"]:checked')) {
        correctAnUpd = document.querySelector('input[name="choiceUpd"]:checked').id;
    }
    if (correctAnUpd == "1") {
        correctAnUpd = ans1Upd.value;
    } else if (correctAnUpd == "2") {
        correctAnUpd = ans2Upd.value;
    } else if (correctAnUpd == "3") {
        correctAnUpd = ans3Upd.value;
    } else if (correctAnUpd == "4") {
        correctAnUpd = ans4Upd.value;
    }
    if (ans1Upd.textContent == correctAnUpd) {
        ans1Upd.style.color = "blue";
        ans2Upd.style.color = "red";
        ans3Upd.style.color = "red";
        ans4Upd.style.color = "red";
    }
    if (ans2Upd.textContent == correctAnUpd) {
        ans2Upd.style.color = "blue";
        ans1Upd.style.color = "red";
        ans3Upd.style.color = "red";
        ans4Upd.style.color = "red";
    }
    if (ans3Upd.textContent == correctAnUpd) {
        ans3Upd.style.color = "blue";
        ans2Upd.style.color = "red";
        ans3Upd.style.color = "red";
        ans4Upd.style.color = "red";
    }
    if (ans4Upd.textContent == correctAnUpd) {
        ans4Upd.style.color = "blue";
        ans1Upd.style.color = "red";
        ans3Upd.style.color = "red";
        ans4Upd.style.color = "red";
    }
    let URL = "/updateQuestion/" + titleID + "/" + quesID + "/" + que.value + "/" + ans1Upd.value + "/" + ans2Upd.value + "/" + ans3Upd.value + "/" + ans4Upd.value + "/" + correctAnUpd + "/" + socreUpd;
    console.log(URL);
    axios.post(URL).then(() => {
        document.getElementById("edit-quiz").style.display = "block";
        document.getElementById("form_add").style.display = "none";
        document.getElementById("formContainQUe").remove();
        displayQuestion();
    });
}

document.getElementById("btn-back").addEventListener("click", () => {
    location.href = "../startCreate/start.html";
})

document.getElementById("cancel").addEventListener("click", () => {

    document.getElementById("edit-quiz").style.display = "block";
    document.getElementById("form_add").style.display = "none";
})

document.getElementById("update").addEventListener("click", () => {
    updateQuestion();
})

let URLPF = "/dataUsers/" + localStorage.getItem("userID");
axios.get(URLPF).then((response) => {
    document.getElementById("name_user").textContent = response.data.username;
})

document.getElementById("addTitle").addEventListener("click", addTitle)
document.getElementById("btn-add-question").addEventListener("click", addQuestions)