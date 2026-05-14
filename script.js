let selectedCard = [];
let cardId = {
    "xh401": "apple",
    "xh402": "banana",
    "xh403": "apple",
    "xh404": "banana"
};

document.querySelectorAll("#card").forEach(element => {
    element.addEventListener("click", (event) => {
        let targetElement = event.currentTarget;
        let attribute = targetElement.getAttribute("name");

        if (selectedCard.length < 2 && !selectedCard.includes(attribute)) {
            selectedCard.push(attribute);
            targetElement.classList.add("rotate180");
            targetElement.classList.add("pointer-events-none");

            if (selectedCard.length === 2) {
                let card1 = cardId[selectedCard[0]];
                let card2 = cardId[selectedCard[1]];

                if (card1 === card2) {
                    console.log("Kartu sama! +5");
                    setTimeout(removeMatchedCard, 1000);
                } else {
                    console.log("Kartu berbeda! -5");
                    setTimeout(resetFlippedCard, 1000);
                }
            }
        }
    });
});

function resetFlippedCard() {
    document.querySelector(`[name="${selectedCard[0]}"]`).classList.remove("rotate180");
    document.querySelector(`[name="${selectedCard[0]}"]`).classList.remove("pointer-events-none");
    document.querySelector(`[name="${selectedCard[1]}"]`).classList.remove("rotate180");
    document.querySelector(`[name="${selectedCard[1]}"]`).classList.remove("pointer-events-none");
    selectedCard.length = [];
}

function removeMatchedCard() {
    document.querySelector(`[name="${selectedCard[0]}"]`).parentElement.classList.add("opacity-0");
    document.querySelector(`[name="${selectedCard[1]}"]`).parentElement.classList.add("opacity-0");
    selectedCard.length = [];
}