let selectedCard = [];
let cardId = {
    "xh401": "apple",
    "xh402": "banana"
};

document.querySelectorAll("#card").forEach(element => {
    element.addEventListener("click", (event) => {
        if (selectedCard.length < 2) {
            selectedCard.push(event.currentTarget.getAttribute("name"));
            event.currentTarget.classList.add("rotate180");

            if (selectedCard.length === 2) {
                let card1 = cardId[selectedCard[0]];
                let card2 = cardId[selectedCard[1]];
                (card1 === card2) ? alert("Kartu sama! +5") : alert("Kartu berbeda! -5");

                removeMatchedCard();
            }
        }
    });
});

function resetFlippedCard() {
    
}

function removeMatchedCard() {
    selectedCard.length = [];
}