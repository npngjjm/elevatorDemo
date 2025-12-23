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
let upward = [];
let upward_below = [];
let downward = [];
let downward_above = [];
function updateOnClickButtonNum(num) {
  elevatorBtns[num - 1].addEventListener("click", async () => {
    if (num > curFloor) {
      if (!upward.includes(num)) {
        upward.push(num);
        upward.sort();
        if (elevatorState == "IDLE") {
          elevatorState = "UPWARD";
          await moveByStep();
        }
      }
    } else if (num < curFloor) {
      if (!downward.includes(num)) {
        downward.push(num);
        downward.sort().reverse();
        if (elevatorState == "IDLE") {
          elevatorState = "DOWNWARD";
          await moveByStep();
        }
      }
    }
  });
}
function onClickButtonUp(num) {
  elevatorUpBtns[num - 1].addEventListener("click", async () => {
    if (curFloor > num) {
      if (!upward_below.includes(num)) {
        upward_below.push(num);
        upward_below.sort();
        if (elevatorState == "IDLE") {
          elevatorState = "UPWARD";
          await moveByStep();
        }
      }
    } else if (curFloor < num) {
      if (!upward.includes(num)) {
        upward.push(num);
        upward.sort();
        if (elevatorState == "IDLE") {
          elevatorState = "UPWARD";
          await moveByStep();
        }
      }
    }
  });
}
function onClickButtonDown(num) {
  elevatorDownBtns[num - 1].addEventListener("click", async () => {
    if (curFloor > num) {
      if (!downward.includes(num)) {
        downward.push(num);
        downward.sort().reverse();
        if (elevatorState == "IDLE") {
          elevatorState = "DOWNWARD";
          await moveByStep();
        }
      }
    } else if (curFloor < num) {
      if (!downward.includes(num)) {
        downward_above.push(num);
        downward_above.sort().reverse();
        if (elevatorState == "IDLE") {
          elevatorState = "DOWNWARD";
          await moveByStep();
        }
      }
    }
  });
}

async function moveByStep() {
  const dir = getNextDir();
  if (dir == "UP") {
    await moveUp();
  } else if (dir == "DOWN") {
    await moveDown();
  } else if (dir == "NONE") {
    console.log(elevatorState);
    return;
  }
  moveByStep();
}

function getNextDir() {
  if (elevatorState == "UPWARD") {
    if (upward.length > 0) {
      return "UP";
    } else {
      if (downward.length > 0) {
        elevatorState = "DOWNWARD";
        return "DOWN";
      } else if (upward_below.length > 0) {
        elevatorState = "DOWNWARD";
        return "DOWN";
      } else {
        elevatorState = "IDLE";
        return "NONE";
      }
    }
  } else if (elevatorState == "DOWNWARD") {
    if (downward.length > 0) {
      return "DOWN";
    } else {
      if (upward.length > 0) {
        elevatorState = "UPWARD";
        return "UP";
      } else if (downward_above.length > 0) {
        elevatorState = "UPWARD";
        return "UP";
      } else {
        elevatorState = "IDLE";
        return "NONE";
      }
    }
  }
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
      if (curFloor == downward[0]) console.log("arrived", downward.shift());
      elevator.style.bottom = `${70 + curFloor * 200}px`;
      resolve();
    }, 2000);
  });
}
