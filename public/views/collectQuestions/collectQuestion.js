const allButtonPlay = document.body;
allButtonPlay.addEventListener("click", (e) =>{
    let titleID = e.target.id;
    localStorage.setItem("titleID", titleID);
    location.href = "../quiz/quiz.html"
})

// create card
function createCard() {
    let URL = "http://localhost:3000/quiz"
    let getAllData = [];
    axios.get(URL).then((response) => {
        getAllData = response.data;
    
    for (let value of getAllData) {
            let collectQuestion = document.createElement('div');
            collectQuestion.className = "collectQue";

            let card = document.createElement('div');
            card.classList = "card"

            let img = document.createElement('img')
            img.classList = "card-img-top";
            img.src = "../../image/quiz.jpg";

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
            button.textContent = "Play now"

                        
            
            card_body.append(card_title);
            card.appendChild(card_body);
            card.appendChild(img);
            list_group.appendChild(list_group_item)
            divLink.appendChild(button);
            card.appendChild(list_group)
            card.appendChild(list_group_item)
            card.appendChild(titleID)
            card.appendChild(divLink)
            document.getElementById("collectQuestion").appendChild(card)
            list_group_item.style.color = "blue"
            list_group_item.textContent = value.questions.length+"  Questions";
            card_title.style.color = "green"
            card_title.textContent ="Title : "+ value.title;
    }
})

}
createCard();

