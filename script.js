document.addEventListener("DOMContentLoaded", () => {
    loadEmojiData();
    generateCard();
});

let selectedCard = [];
let cardData = {};
// selectedCard.push("xh401");
// selectedCard.push("xh402");
// selectedCard.push("xh403");
// selectedCard.push("xh404");

// console.log(selectedCard.shift());
// console.log(selectedCard.shift());
// console.log(selectedCard);


let cardTotal = 12 / 2;
const cardContainer = document.querySelector("#card-container");

function generateCard() {
    cardContainer.innerHTML = '';
    const cardDataEntries = Object.entries(cardData);

    for (let i = 0; i < 12; i++) {
        const id = cardDataEntries[i][0];
        const emoji = cardDataEntries[i][1].emoji;

        cardContainer.innerHTML += `<div class="card-wrapper transition-all duration-600">
            <div class="h-full rounded-md group cursor-pointer border border-white p-3 bg-stone-800 flex items-center justify-center transition-all duration-600 hover:shadow-[0_0_15px_rgba(255,255,255,0.35)]"
                id="card" name="${id}">
                <div
                    class="text-white text-5xl font-bold opacity-75 transition-opacity duration-200 group-hover:opacity-100">
                    ?</div>
                <div id="card-back-content" class="card-back text-white text-5xl rounded-md">${emoji}</div>
            </div>
        </div>`;
    }

    document.querySelectorAll("#card").forEach(element => {
        element.addEventListener("click", (event) => {
            let targetElement = event.currentTarget;
            let attribute = targetElement.getAttribute("name");

            if (selectedCard.length < 2 && !selectedCard.includes(attribute)) {
                selectedCard.push(attribute);
                targetElement.classList.add("rotate180");
                targetElement.classList.add("pointer-events-none");

                if (selectedCard.length === 2) {
                    const card1 = cardData[selectedCard[0]]?.name;
                    const card2 = cardData[selectedCard[1]]?.name;

                    if (card1 === card2) {
                        console.log("Kartu sama! +5");
                        cardTotal -= 1;
                        setTimeout(removeMatchedCard, 500);
                    } else {
                        console.log("Kartu berbeda!");
                        setTimeout(resetFlippedCard, 500);
                    }
                }
            }

            if (cardTotal === 0) {
                setTimeout(() => alert("Gameover!"), 1500);
            }
        });
    });
}

function loadEmojiData() {
    cardData = {
        "xh401": { "name": "apple", "emoji": "🍎" },
        "xh402": { "name": "banana", "emoji": "🍌" },
        "xh403": { "name": "grape", "emoji": "🍇" },
        "xh404": { "name": "orange", "emoji": "🍊" },
        "xh405": { "name": "watermelon", "emoji": "🍉" },
        "xh406": { "name": "strawberry", "emoji": "🍓" },

        // pasangan
        "xh407": { "name": "apple", "emoji": "🍎" },
        "xh408": { "name": "banana", "emoji": "🍌" },
        "xh409": { "name": "grape", "emoji": "🍇" },
        "xh410": { "name": "orange", "emoji": "🍊" },
        "xh411": { "name": "watermelon", "emoji": "🍉" },
        "xh412": { "name": "strawberry", "emoji": "🍓" },
    };
}

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