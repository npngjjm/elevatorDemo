const upward = [0, 0, 0, 0, 0];
const downward = [0, 0, 0, 0, 0];
function setElevatorState() {
  if (elevatorState == "UPWARD") {
    if (isThereUpAbove()) {
      elevatorState = "UPWARD";
    } else if (isThereDownAbove()) {
      elevatorState = "UPWARD";
    } else if (isThereDownBelow()) {
      elevatorState = "UPWARD";
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
  for (i = 4; i > curFloor; i--) {
    if (upward[i]) return true;
  }
  return false;
}
function isThereDownAbove() {
  for (i = 4; i > curFloor; i--) {
    if (downward[i]) return true;
  }
  return false;
}
function isThereUpBelow() {
  for (i = 0; i < curFloor; i++) {
    if (upward[i]) return true;
  }
  return false;
}
function isThereDownBelow() {
  for (i = 0; i < curFloor; i++) {
    if (downward[i]) return true;
  }
  return false;
}
