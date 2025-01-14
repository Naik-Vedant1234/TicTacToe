let boxes = document.querySelectorAll(".block");
let reset = document.querySelector("#reset");
let message = document.querySelector(".message");
let msg = document.querySelector(".msg");
let nxt = document.querySelector("#next");
let player_1 = document.querySelector("#player_1");
let player_2 = document.querySelector("#player_2");
let score_1 = document.querySelector("#score_1");
let score_2 = document.querySelector("#score_2");
let score = document.querySelector(".score");
let submit = document.querySelector("#submit");
let p1, p2;
let turn = true;
let end = true;
let count = 0;
let p1_count = 0;
let p2_count = 0;

let win = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("button was clicked");
        
        if(turn){
            box.innerText = "O";
            box.style.fontSize = '30px';
            box.style.fontWeight = 'bold';
            turn = false;
            count++;
        } else {
            box.innerText = "X";
            box.style.fontSize = '30px';
            box.style.fontWeight = 'bold';
            turn = true;
            count++;
        }
        box.disabled = true;

        checkWinner();
    });
});

submit.addEventListener("click", () => {
    p1 = document.querySelector("#p1").value || "Player 1";
    p2 = document.querySelector("#p2").value || "Player 2";
    player_1.innerText = p1;
    player_2.innerText = p2;
    score.classList.remove("hide");
});

reset.addEventListener("click", () => {
    for (box of boxes) {
        box.disabled = false;
        box.innerText = "";
        turn = true;
        count = 0;
    }
});

nxt.addEventListener("click", () => {
    for (box of boxes) {
        box.disabled = false;
        box.innerText = "";
        msg.classList.add("hide");
        turn = end;
        count = 0;
    }
});

const disablebtns = () => {
    for (box of boxes) {
        box.disabled = true;
    }
};

const stateWinner = (position) => {
    disablebtns();
    console.log(position);
    msg.classList.remove("hide");
    if (position === "O") {
        end = false;
        p1_count++;
        score_1.innerText = p1_count;
        message.innerText = `Congratulations: ${p1} (O) is the winner!`;
    } else if (position === "X") {
        end = true;
        p2_count++;
        score_2.innerText = p2_count;
        message.innerText = `Congratulations: ${p2} (X) is the winner!`;
    }
};

const checkWinner = () => {
    for (i of win) {
        let first = boxes[i[0]].innerText;
        let second = boxes[i[1]].innerText;
        let third = boxes[i[2]].innerText;

        if (first !== "" && second !== "" && third !== "") {
            if (first === second && second === third) {
                stateWinner(first);
                return;
            }
        }
    }

    if (count === 9) {
        msg.classList.remove("hide");
        message.innerText = "It is a Draw";
        count = 0;
        turn = !turn;
    }
};

console.log(p1);
