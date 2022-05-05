
const allButtonCliked = document.body
let scoreUser = 0;
let totalScore = 0;
let clicked = 0;
allButtonCliked.addEventListener("click", (e)=>{
    let userAnswer = "";
    if (e.target.id == "answer1" || e.target.id == "answer2" || e.target.id == "answer3" || e.target.id == "answer4"){
        userAnswer = e.target.textContent;
        clicked +=1;
    }
    var form_question = e.target.parentNode;
    var target = e.target .parentNode.parentNode
    var tagetID =e.target.parentNode.parentNode.id
    document.getElementById(tagetID).style = "pointer-events:none;"
    var targetAnswer = e.target 
    target.onclick =false;
    console.log("Hello"); 
    let question = target.childNodes[0].textContent;       
    let URL = "http://localhost:3000/quiz/"+localStorage.getItem("titleID");
    let arrAnswer = [];
    for(let i = 0; i < form_question.childNodes.length; i++){
        arrAnswer.push(form_question.childNodes[i]);
        console.log(form_question.childNodes[i].textContent);
    }
    axios.get(URL).then(function(response) {
        let allQues = response.data.questions;
        for (let value of allQues) {
            totalScore += value.score;
            if (value.question == question){
                if(userAnswer == value.correctAnswer){
                    targetAnswer.style.backgroundColor ="blue"
                    scoreUser += value.score;
                }
                else if (userAnswer != value.correctAnswer){
                        targetAnswer.style.backgroundColor ="red"
                        if(arrAnswer[0].textContent == value.correctAnswer){
                            arrAnswer[0].style.backgroundColor ="blue"
                            arrAnswer[1].style.backgroundColor ="red"
                            arrAnswer[2].style.backgroundColor ="red"
                            arrAnswer[3].style.backgroundColor ="red"
                        }
                        else if(arrAnswer[1].textContent == value.correctAnswer){
                            arrAnswer[0].style.backgroundColor ="red"
                            arrAnswer[1].style.backgroundColor ="blue"
                            arrAnswer[2].style.backgroundColor ="red"
                            arrAnswer[3].style.backgroundColor ="red"
                        }
                       else  if(arrAnswer[2].textContent == value.correctAnswer){
                        arrAnswer[0].style.backgroundColor ="red"
                        arrAnswer[1].style.backgroundColor ="red"
                        arrAnswer[2].style.backgroundColor ="blue"
                        arrAnswer[3].style.backgroundColor ="red"
                        }
                       else  if(arrAnswer[3].textContent == value.correctAnswer){
                        arrAnswer[0].style.backgroundColor ="red"
                        arrAnswer[1].style.backgroundColor ="red"
                        arrAnswer[2].style.backgroundColor ="red"
                        arrAnswer[3].style.backgroundColor ="blue"
                        }
                    
                }
                
            }
        }
    })
    if (clicked == indexQuestions) {
            localStorage.setItem("scoreUser", scoreUser);
            localStorage.setItem("totalScore", totalScore);
            alert("Your score is: "+localStorage.getItem("scoreUser"));
    }
})


let indexQuestions = 0;
function createFormQuiz() {
    let URL = "http://localhost:3000/quiz/"+localStorage.getItem("titleID");
    axios.get(URL).then((response) => {
        let QueAns = response.data.questions;

        for (let vlaue of QueAns) {
            indexQuestions ++
            let container = document.getElementById("container");

            let form_que = document.createElement("div");
            form_que.className = "form_que";
            form_que.id = vlaue._id

            let h3 = document.createElement("h3");
            h3.id = "question";
            h3.textContent = vlaue.question;

            let form_quiz = document.createElement("div");
            form_quiz.className = "form_quiz";

            let ans1 = document.createElement("p");
            ans1.textContent = vlaue.answer.answer1;
            ans1.id = "answer1";

            let ans2 = document.createElement("p");
            ans2.textContent = vlaue.answer.answer2;
            ans2.id = "answer2";

            let ans3 = document.createElement("p");
            ans3.textContent = vlaue.answer.answer3;
            ans3.id = "answer3";

            let ans4 = document.createElement("p");
            ans4.textContent = vlaue.answer.answer4;
            ans4.id = "answer4";

            let score = document.createElement("p");
            score.id = "score";
            score.textContent = "Score "+vlaue.score;
            let br = document.createElement("br")

            form_que.appendChild(h3);
            form_quiz.appendChild(ans1)
            form_quiz.appendChild(ans2)
            form_quiz.appendChild(ans3)
            form_quiz.appendChild(ans4)
            form_que.appendChild(form_quiz);
            form_que.appendChild(score);
            container.appendChild(form_que);
            container.appendChild(br)

            
        }


    })


}
createFormQuiz();