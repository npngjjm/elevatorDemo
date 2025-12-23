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
const upward = [];
const downward = [];
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
function onClickButtonDown(num) {
  elevatorDownBtns[num - 1].addEventListener("click", async () => {
    if (!downward.includes(num)) {
      downward.push(num);
      downward.sort().reverse();
      if (elevatorState == "IDLE") {
        elevatorState = "DOWNWARD";
        await moveByStep();
      }
    }
  });
}

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
    } else if (downward.length > 0) {
      elevatorState = "DOWNWARD";
      return "DOWN";
    } else {
      elevatorState = "IDLE";
      return "NONE";
    }
  } else if (elevatorState == "DOWNWARD") {
    if (downward.length > 0) {
      return "DOWN";
    } else if (upward.length > 0) {
      elevatorState = "UPWARD";
      return "UP";
    } else {
      elevatorState = "IDLE";
      return "NONE";
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
