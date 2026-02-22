let selectedCards = [];

document.querySelectorAll("#memory-card[data-value]").forEach((card) => {
    card.addEventListener("click", (event) => {
        if(selectedCards.length === 2) {
            checkMatch();
            return;
        }

        selectedCards.push(card);
    })
});

function checkMatch() {

}