// Game constants
const CHOICES = {
    ROCK: { id: 1, emoji: "👊" },
    PAPER: { id: 2, emoji: "✋" },
    SCISSORS: { id: 3, emoji: "✌️" }
};

const COLORS = {
    WIN: "#00FF00",
    LOSE: "#FF3333",
    TIE: "#FFD700"
};

const OUTCOMES = {
    WIN: { text: "You win!", color: COLORS.WIN },
    LOSE: { text: "You lose!", color: COLORS.LOSE },
    TIE: { text: "It's a tie!", color: COLORS.TIE }
};

// Game statistics
let count = 0;
let wins = 0;
let ties = 0;
let losses = 0;

function calculateWinPercentage() {
    if (count === 0) return 0;
    return ((wins / count) * 100).toFixed(1);
}

function getComputerChoice() {
    const random = Math.random();
    if (random < 0.33333) return CHOICES.ROCK;
    if (random < 0.66666) return CHOICES.PAPER;
    return CHOICES.SCISSORS;
}

function getGameOutcome(playerChoice, computerChoice) {
    if (playerChoice === computerChoice.id) return OUTCOMES.TIE;
    
    const winningCombos = {
        [CHOICES.ROCK.id]: CHOICES.SCISSORS.id,
        [CHOICES.PAPER.id]: CHOICES.ROCK.id,
        [CHOICES.SCISSORS.id]: CHOICES.PAPER.id
    };
    
    return winningCombos[playerChoice] === computerChoice.id ? OUTCOMES.WIN : OUTCOMES.LOSE;
}

function updateStatistics(outcome) {
    count++;
    if (outcome === OUTCOMES.WIN) wins++;
    else if (outcome === OUTCOMES.TIE) ties++;
    else losses++;
}

function updateDisplay(computerChoice, outcome) {
    // Update statistics
    updateStatistics(outcome);
    
    // Update opponent's choice and game outcome
    document.getElementById("opponentMove").textContent = computerChoice.emoji;
    const textElement = document.getElementById("outcome");
    textElement.textContent = outcome.text;
    
    // Remove any existing animation class
    textElement.classList.remove('animate');
    
    // Trigger reflow to restart animation
    void textElement.offsetWidth;
    
    // Add animation class and set final color
    textElement.classList.add('animate');
    setTimeout(() => {
        textElement.classList.remove('animate');
        textElement.style.color = outcome.color;
    }, 10);
    
    // Update statistics display
    document.getElementById("stats").innerHTML = `
        <div class="stats">
            Games: <span style="color: #4287f5">${count}</span> | 
            Wins: <span style="color: ${COLORS.WIN}">${wins}</span> | 
            Ties: <span style="color: ${COLORS.TIE}">${ties}</span> | 
            Losses: <span style="color: ${COLORS.LOSE}">${losses}</span>
            <br>
            Win Rate: <span style="color: #4287f5">${calculateWinPercentage()}%</span>
        </div>
    `;
}

function playGame(playerChoice) {
    const computerChoice = getComputerChoice();
    const outcome = getGameOutcome(playerChoice, computerChoice);
    updateDisplay(computerChoice, outcome);
}
