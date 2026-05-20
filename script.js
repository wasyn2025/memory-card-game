const scoreInfo = document.querySelector("#score-info");
const scoreText = document.querySelector("#score-text");
const cardContainer = document.querySelector("#card-container");
const highscoreText = document.querySelector("#highscore-text");
const highscoreInfo = document.querySelector("#highscore-info");
const currentLevel = document.querySelector("#current-level");
const cardPool = [
    { name: "apple", emoji: "🍎" },
    { name: "banana", emoji: "🍌" },
    { name: "grape", emoji: "🍇" },
    { name: "orange", emoji: "🍊" },
    { name: "watermelon", emoji: "🍉" },
    { name: "strawberry", emoji: "🍓" },
    { name: "pineapple", emoji: "🍍" },
    { name: "peach", emoji: "🍑" },
    { name: "cherry", emoji: "🍒" },
    { name: "kiwi", emoji: "🥝" },
    { name: "lemon", emoji: "🍋" },
    { name: "mango", emoji: "🥭" },
    { name: "pear", emoji: "🍐" },
    { name: "coconut", emoji: "🥥" },
    { name: "avocado", emoji: "🥑" },
    { name: "melon", emoji: "🍈" },
    { name: "carrot", emoji: "🥕" },
    { name: "corn", emoji: "🌽" },
    { name: "eggplant", emoji: "🍆" },
    { name: "pepper", emoji: "🌶️" },
    { name: "broccoli", emoji: "🥦" },
    { name: "potato", emoji: "🥔" },
    { name: "tomato", emoji: "🍅" },
    { name: "cucumber", emoji: "🥒" }
];

let selectedCard = [];
let cardData = {};
let cardTotal = 0;
let clickSound, flippedSound, matchedSound, winSound, mouseClick = null;
let score = parseInt(scoreText.textContent) || 0;
let highscore = parseInt(highscoreInfo.textContent) || 0;
let level = 1
let difficulty = { "tile": [], "maxWidth": "", "cardMark": "" };

document.addEventListener("DOMContentLoaded", () => {
    loadSoundEffect();
    loadEmojiData();
    generateCard();

    if (localStorage.getItem("memoryCardGameHighscore")) {
        highscoreText.textContent = (highscore = parseInt(localStorage.getItem("memoryCardGameHighscore")));
    }

    document.querySelector("#restart").addEventListener("click", () => {
        mouseClick.cloneNode().play();
        restart();
    });
});

function generateCard() {
    cardContainer.innerHTML = '';
    const cardDataEntries = Object.entries(cardData);
    const difficulty = getDifficulty(level);
    const mark = difficulty.cardMark;

    cardContainer.style.gridTemplateColumns = `repeat(${difficulty.tile[0]}, minmax(0, 1fr))`;
    cardContainer.style.maxWidth = difficulty.maxWidth;

    for (let i = 0; i < difficulty.tile[0] * difficulty.tile[1]; i++) {
        const id = cardDataEntries[i][0];
        const emoji = cardDataEntries[i][1].emoji;

        cardContainer.innerHTML += `<div class="card-wrapper card-size transition-all duration-600 aspect-[2/3]">
            <div class="h-full rounded-md group cursor-pointer border border-white p-3 bg-stone-800 flex items-center justify-center transition-all duration-600 hover:shadow-[0_0_15px_rgba(255,255,255,0.35)]"
                id="card" name="${id}">
                <div
                    class="text-white text-3xl md:text-5xl font-semibold opacity-50 transition-opacity duration-200 group-hover:opacity-100">
                    ${mark == "number" ? i + 1 : "?"}</div>
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
                clickSound.cloneNode().play();

                if (selectedCard.length === 2) {
                    const card1 = cardData[selectedCard[0]]?.name;
                    const card2 = cardData[selectedCard[1]]?.name;

                    if (card1 === card2) {
                        cardTotal -= 1;
                        setTimeout(removeMatchedCard, 500);
                    } else {
                        setTimeout(resetFlippedCard, 500);
                    }
                }
            }

            if (cardTotal === 0) {
                setTimeout(() => winSound.cloneNode().play(), 1000);
                setTimeout(() => nextLevel(), 3000);
            }
        });
    });
}

function nextLevel() {
    currentLevel.textContent = (level += 1);
    loadEmojiData();
    generateCard();

    if (score > highscore) {
        highscoreText.textContent = highscore + (Math.abs(score - highscore));
        localStorage.setItem("memoryCardGameHighscore", highscoreText.textContent);
        giveHighscore();
    }
}

function restart() {
    scoreText.textContent = (score = 0);
    currentLevel.textContent = (level = 1);
    loadEmojiData();
    generateCard();
}

function loadEmojiData() {
    cardData = generateCardData(getDifficulty(level).tile);
    cardTotal = Object.keys(cardData).length / 2;
}

function generateCardData(tile) {
    const totalCard = tile[0] * tile[1];
    const totalPair = totalCard / 2;
    const selectedCards = cardPool.slice(0, totalPair);
    const result = {};
    let id = 401;

    selectedCards.forEach(card => {
        // pair pertama
        result[`xh${id++}`] = {
            name: card.name,
            emoji: card.emoji
        };

        // pair kedua
        result[`xh${id++}`] = {
            name: card.name,
            emoji: card.emoji
        };
    });

    return shuffleCardData(result);
}

function giveReward() {
    scoreInfo.classList.remove("slide-fade");
    void scoreInfo.offsetWidth;
    scoreInfo.classList.add("slide-fade");

    score += 100;
    scoreText.textContent = score;
}

function giveHighscore() {
    highscoreInfo.classList.remove("slide-fade");
    void highscoreInfo.offsetWidth;
    highscoreInfo.classList.add("slide-fade");

    const scoreDifference = (highscore === 0 ? score : Math.abs(score - highscore))
    highscoreInfo.textContent = `+${scoreDifference}`;
    highscore = highscore + scoreDifference;
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
    giveReward();
    selectedCard.length = [];
}

function loadSoundEffect() {
    clickSound = new Audio('./sounds/clicksound.mp3');
    flippedSound = new Audio('./sounds/flipped.mp3')
    matchedSound = new Audio('./sounds/matched.mp3');
    winSound = new Audio('./sounds/win.mp3');
    mouseClick = new Audio("./sounds/click.mp3")
}

function getDifficulty(level) {
    if (level <= 3) {
        return {
            "tile": [2, 2],
            "maxWidth": "300px",
            "cardMark": "number"
        };
    }

    if (level <= 6) {
        return {
            "tile": [4, 3],
            "maxWidth": "400px",
            "cardMark": "number"
        };
    }

    if (level <= 12) {
        return {
            "tile": [6, 4],
            "maxWidth": "700px",
            "cardMark": "number"
        };
    }

    return {
        "tile": [8, 6],
        "maxWidth": "900px",
        "cardMark": "question"
    };
}