const elevator = document.querySelector(".elevator");
const elevatorBtnsList = [1, 2, 3, 4, 5];
const elevatorBtns = elevatorBtnsList.map((num) => {
  return document.querySelector(`#btn_${num}`);
});
const elevatorUpBtns = elevatorBtnsList.map((num) => {
  return document.querySelector(`#floor_${num} .btnUp`);
});
const elevatorDownBtns = elevatorBtnsList.map((num) => {
  return document.querySelector(`#floor_${num} .btnDown`);
});

for (i = 1; i <= 5; i++) {
  updateOnClickButtonNum(i);
  onClickButtonUp(i);
}

function updateOnClickButtonNum(num) {
  elevatorBtns[num - 1].addEventListener("click", async () => {
    moveTo(num);
  });
}
const upward = [];
function onClickButtonUp(num) {
  elevatorUpBtns[num - 1].addEventListener("click", async () => {
    if (!upward.includes(num)) {
      upward.push(num);
      upward.sort();
      if (elevatorState == "IDLE") {
        elevatorState = "UPWARD";
        await moveByStep();
      }
    }
  });
}

let curFloor = 1;
let elevatorState = "IDLE";
async function moveTo(floorToMove) {
  if (floorToMove > curFloor) {
    while (curFloor < floorToMove) {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          curFloor++;
          console.log(curFloor);
          elevator.style.bottom = `${70 + curFloor * 200}px`;
          resolve();
        }, 1000);
      });
    }
    console.log("arrived");
  } else if (floorToMove < curFloor) {
    while (curFloor > floorToMove) {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          curFloor--;
          console.log(curFloor);
          elevator.style.bottom = `${70 + curFloor * 200}px`;
          resolve();
        }, 1000);
      });
    }
    console.log("arrived");
  }
}

async function moveByStep() {
  const dir = getNextDir();
  if (dir == "UP") {
    await moveUp();
    if (upward.length > 0) await moveByStep();
  } else if (dir == "DOWN") moveDown();
}
function getNextDir() {
  return "UP";
}
async function moveUp() {
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      curFloor++;
      console.log(curFloor);
      if (curFloor == upward[0]) console.log("arrived", upward.shift());
      elevator.style.bottom = `${70 + curFloor * 200}px`;
      resolve();
    }, 2000);
  });
}
async function moveDown() {
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      curFloor--;
      console.log(curFloor);
      elevator.style.bottom = `${70 + curFloor * 200}px`;
      resolve();
    }, 2000);
  });
}
