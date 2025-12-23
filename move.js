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
  onClickButtonDown(i);
}

let curFloor = 1;
let elevatorState = "IDLE";
const upward = [false, false, false, false, false];
const downward = [false, false, false, false, false];
let highest = -1;
let lowest = 10;

function updateOnClickButtonNum(num) {
  elevatorBtns[num - 1].addEventListener("click", async () => {
    if (num > highest) highest = num;
    if (num < lowest) lowest = num;
    if (num > curFloor) {
      upward[curFloor - 1] = true;
      if (elevatorState == "IDLE") {
        elevatorState = "UPWARD";
        await moveByStep();
      }
    } else if (num < curFloor) {
      downward[curFloor - 1] = true;
      if (elevatorState == "IDLE") {
        elevatorState = "DOWNWARD";
        await moveByStep();
      }
    }
  });
}
function onClickButtonUp(num) {
  elevatorUpBtns[num - 1].addEventListener("click", async () => {
    upward[num - 1] = true;
    if (elevatorState == "IDLE") {
      elevatorState = "UPWARD";
      await moveByStep();
    }
  });
}
function onClickButtonDown(num) {
  elevatorDownBtns[num - 1].addEventListener("click", async () => {
    downward[num - 1] = true;
    if (elevatorState == "IDLE") {
      elevatorState = "DOWNWARD";
      await moveByStep();
    }
  });
}

function setElevatorState() {
  if (elevatorState == "UPWARD") {
    if (isThereUpAbove()) {
      elevatorState = "UPWARD";
    } else if (isThereDownAbove()) {
      elevatorState = "UPWARD";
    } else if (isThereDownBelow()) {
      elevatorState = "DOWNWARD";
    } else if (isThereUpBelow()) {
      elevatorState = "DOWNWARD";
    } else {
      elevatorState = "IDLE";
    }
  } else if (elevatorState == "DOWNWARD") {
    if (isThereDownBelow()) {
      elevatorState = "DOWNWARD";
    } else if (isThereUpBelow()) {
      elevatorState = "DOWNWARD";
    } else if (isThereUpAbove()) {
      elevatorState = "UPWARD";
    } else if (isThereDownAbove()) {
      elevatorState = "UPWARD";
    } else {
      elevatorState = "IDLE";
    }
  }
}

async function moveByStep() {
  setElevatorState();
  if (elevatorState == "UPWARD") {
    await moveUp();
  } else if (elevatorState == "DOWNWARD") {
    await moveDown();
  } else if (elevatorState == "IDLE") {
    console.log(elevatorState);
    return;
  }
  moveByStep();
}

function isThereUpAbove() {
  for (i = 4; i >= curFloor; i--) {
    if (upward[i]) return true;
  }
  return false;
}
function isThereDownAbove() {
  for (i = 4; i >= curFloor; i--) {
    if (downward[i]) return true;
  }
  return false;
}
function isThereUpBelow() {
  for (i = 0; i < curFloor - 1; i++) {
    if (upward[i]) return true;
  }
  return false;
}
function isThereDownBelow() {
  for (i = 0; i < curFloor - 1; i++) {
    if (downward[i]) return true;
  }
  return false;
}

async function moveUp() {
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      curFloor++;
      console.log(curFloor);
      if (upward[curFloor - 1]) {
        console.log("arrived", curFloor);
        upward[curFloor - 1] = false;
      }
      elevator.style.bottom = `${curFloor * 200}px`;
      resolve();
    }, 2000);
  });
}
async function moveDown() {
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      curFloor--;
      console.log(curFloor);
      if (downward[curFloor - 1]) {
        console.log("arrived", curFloor);
        downward[curFloor - 1] = false;
      }
      elevator.style.bottom = `${curFloor * 200}px`;
      resolve();
    }, 2000);
  });
}
