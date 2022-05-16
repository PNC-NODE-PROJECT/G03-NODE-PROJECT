const displayQue = document.getElementById("displayViewQuestions");
const allButtonBack = document.body

function createCard() {
    let URL = "/quiz"
    let getAllData = [];
    axios.get(URL).then((response) => {
        getAllData = response.data;
        for (let value of getAllData) {
            if (value.userID == localStorage.getItem("userID")) {
                let collectQuestion = document.createElement('div');
                collectQuestion.className = "collectQue";

                let card = document.createElement('div');
                card.classList = "card"
                card.id = value._id;

                let img = document.createElement('img')
                img.classList = "card-img-top";
                img.src = "../../image/quiz-game-word-yellow-ads-banner-with-copy-space-text-quizz-promo-background_361816-3536.webp";

                let card_body = document.createElement('div');
                card_body.classList = "card-body";

                let card_title = document.createElement('h5');
                card_title.className = "card-title";
                card_title.id = "title";

                let list_group = document.createElement("ul");
                list_group.classList = "list-group list-group-flush";

                let list_group_item = document.createElement("li")
                list_group_item.classList = "list-group-item";
                list_group_item.id = "numberOfQue"

                let divLink = document.createElement("div");
                divLink.className = "card-body";

                let titleID = document.createElement("span");
                titleID.id = value._id;
                titleID.style.display = "none";

                let button = document.createElement("button");
                button.className = "btn btn-primary";
                button.id = value._id;
                button.textContent = "View"



                card_body.append(card_title);
                card.appendChild(card_body);
                card.appendChild(img);
                list_group.appendChild(list_group_item)
                divLink.appendChild(button);
                card.appendChild(list_group)
                card.appendChild(list_group_item)
                card.appendChild(titleID)
                card.appendChild(divLink)
                document.getElementById("viewQuestions").appendChild(card)
                list_group_item.style.color = "blue"
                list_group_item.textContent = value.questions.length + "  Questions";
                card_title.style.color = "green"
                card_title.textContent = "Title : " + value.title;
            }
        }

    })

}

// display questions

function displayQuestion() {
    displayQue.style.display = "block";
    let URL = "/quiz/" + title_id;
    console.log(URL);
    axios.get(URL).then((response) => {
        let datas = response.data.questions
        for (let value of datas) {

            let form = document.createElement("div");
            form.id = "displayViewQuestion";

            let question = document.createElement("p");
            question.textContent = value.question
            question.className = "que"
            question.style.color = "blue"
            question.style.fontSize = "160%"

            let ans1 = document.createElement("p");
            ans1.textContent = value.answer.answer1
            ans1.className = "answer";
            ans1.id = "an1"
            ans1.style.backgroundColor = "red";
            ans1.style.color = "white";

            let ans2 = document.createElement("p");
            ans2.textContent = value.answer.answer2;
            ans2.className = "answer";
            ans2.id = "an2"
            ans2.style.backgroundColor = "red";
            ans2.style.color = "white";

            let ans3 = document.createElement("p");
            ans3.textContent = value.answer.answer3;
            ans3.className = "answer";
            ans3.id = "an3"
            ans3.style.backgroundColor = "red";
            ans3.style.color = "white";


            let ans4 = document.createElement("p");
            ans4.textContent = value.answer.answer4
            ans4.className = "answer";
            ans4.id = "an4"
            ans4.style.backgroundColor = "red";
            ans4.style.color = "white";

            if (value.correctAnswer == ans1.textContent) {
                ans1.style.backgroundColor = "green";
            }
            if (value.correctAnswer == ans2.textContent) {
                ans2.style.backgroundColor = "green";
            }
            if (value.correctAnswer == ans3.textContent) {
                ans3.style.backgroundColor = "green";
            }
            if (value.correctAnswer == ans4.textContent) {
                ans4.style.backgroundColor = "green";
            }



            form.appendChild(question);
            form.appendChild(ans1);
            form.appendChild(ans2);
            form.appendChild(ans3);
            form.appendChild(ans4);
            displayQue.appendChild(form);

        }


    })

}

let title_id = "";
const allButtonView = document.body;
allButtonView.addEventListener("click", (e) => {
    title_id = e.target.parentElement.parentElement.id;
    if (title_id.length > 20) {
        document.querySelector(".input-group").style.display = "none";
        document.getElementById("viewQuestions").style.display = "none";
        displayQuestion();
    }
})


function searchTitle() {
    let allCard = document.querySelectorAll(".card");
    let allTitle = document.querySelectorAll("#title")
    let valueText = document.getElementById("vlaueText").value;
    for (let i = 0; i < allCard.length; i++) {
        let Lengstr = allCard[i].textContent.length;
        let getTitle = allTitle[i].textContent.substring(8, Lengstr);
        let getParentEle = allTitle[i].parentElement.parentElement;
        if (getTitle.indexOf(valueText) >= 0) {
            getParentEle.style.display = "block";
        } else {
            getParentEle.style.display = "none";
        }
        console.log(typeof(valueText));
    }


}


createCard();