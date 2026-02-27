
const message = document.getElementById("message");
const input = document.getElementById("answer");

let stage = 0;
let currentText = "";

async function fetchWord(index) {
    const res = await fetch("data/step" + index + ".txt");
    const text = await res.text();
    return text.trim();
}

async function process() {

    if (stage === 0) {
        currentText = await fetchWord(stage + 1);
        message.innerText = currentText;
        stage++;
        input.value = "";
        return;
    }

    if (input.value.trim() === currentText) {

        if (stage === 5) {
            revealFlag();
            return;
        }

        currentText = await fetchWord(stage + 1);
        message.innerText = currentText;
        stage++;

    } else {
        stage = 0;
        currentText = "";
        message.innerText = "Reset.";
    }

    input.value = "";
}

async function revealFlag() {
    const res = await fetch("flag.txt");
    const data = await res.text();
    message.innerText = atob(data.trim());
}
