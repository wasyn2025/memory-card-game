let selectedCard = [];
let cardData = {};
let cardTotal = 0;
const cardContainer = document.querySelector("#card-container");
let clickSound, flippedSound, matchedSound, winSound, mouseClick = null;
let backButton = document.querySelector("#back-button");
const scoreInfo = document.querySelector("#score-info");

function playAnimation() {
    scoreInfo.classList.remove("reward-animation");
    void scoreInfo.offsetWidth;
    scoreInfo.classList.add("reward-animation");
}

document.addEventListener("DOMContentLoaded", () => {
    loadSoundEffect();
    loadEmojiData();
    generateCard();

    document.querySelectorAll("#card").forEach(element => {
        element.addEventListener("click", (event) => {
            let targetElement = event.currentTarget;
            let attribute = targetElement.getAttribute("name");

            if (selectedCard.length < 2 && !selectedCard.includes(attribute)) {
                selectedCard.push(attribute);
                targetElement.classList.add("rotate180");
                targetElement.classList.add("pointer-events-none");
                clickSound.cloneNode().play();

                if (selectedCard.length === 2) {
                    const card1 = cardData[selectedCard[0]]?.name;
                    const card2 = cardData[selectedCard[1]]?.name;

                    if (card1 === card2) {
                        cardTotal -= 1;
                        winSound.cloneNode().play(); setTimeout(removeMatchedCard, 500);
                    } else {
                        setTimeout(resetFlippedCard, 500);
                    }
                }
            }

            if (cardTotal === 0) {
                setTimeout(() => winSound.cloneNode().play(), 1000);
                setTimeout(() => {
                    loadEmojiData();
                    generateCard();
                }, 3000);
            }
        });
    });

    backButton.addEventListener("click", () => {
        mouseClick.cloneNode().play();
        playAnimation();
    });
});

function generateCard() {
    cardContainer.innerHTML = '';
    const cardDataEntries = Object.entries(cardData);

    for (let i = 0; i < cardTotal * 2; i++) {
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
}

function loadEmojiData() {
    cardData = {
        "xh401": { "name": "apple", "emoji": "🍎" },
        "xh402": { "name": "banana", "emoji": "🍌" },
        "xh403": { "name": "grape", "emoji": "🍇" },
        "xh404": { "name": "orange", "emoji": "🍊" },
        "xh405": { "name": "watermelon", "emoji": "🍉" },
        "xh406": { "name": "strawberry", "emoji": "🍓" },
        "xh407": { "name": "apple", "emoji": "🍎" },
        "xh408": { "name": "banana", "emoji": "🍌" },
        "xh409": { "name": "grape", "emoji": "🍇" },
        "xh410": { "name": "orange", "emoji": "🍊" },
        "xh411": { "name": "watermelon", "emoji": "🍉" },
        "xh412": { "name": "strawberry", "emoji": "🍓" },
    };
    cardTotal = Object.keys(cardData).length / 2;
    cardData = shuffleCardData(cardData);
}

function shuffleCardData(cardData) {
    const entries = Object.entries(cardData);

    for (let i = entries.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [entries[i], entries[randomIndex]] = [entries[randomIndex], entries[i]];
    }

    return Object.fromEntries(entries);
}

function resetFlippedCard() {
    document.querySelector(`[name="${selectedCard[0]}"]`).classList.remove("rotate180");
    document.querySelector(`[name="${selectedCard[0]}"]`).classList.remove("pointer-events-none");
    document.querySelector(`[name="${selectedCard[1]}"]`).classList.remove("rotate180");
    document.querySelector(`[name="${selectedCard[1]}"]`).classList.remove("pointer-events-none");
    flippedSound.cloneNode().play();
    selectedCard.length = [];
}

function removeMatchedCard() {
    document.querySelector(`[name="${selectedCard[0]}"]`).parentElement.classList.add("opacity-0");
    document.querySelector(`[name="${selectedCard[1]}"]`).parentElement.classList.add("opacity-0");
    matchedSound.cloneNode().play();
    selectedCard.length = [];
}

function loadSoundEffect() {
    clickSound = new Audio('./sounds/clicksound.mp3');
    flippedSound = new Audio('./sounds/flipped.mp3')
    matchedSound = new Audio('./sounds/matched.mp3');
    winSound = new Audio('./sounds/win.mp3');
    mouseClick = new Audio("./sounds/click.mp3")
}

function rewardSection() {

}