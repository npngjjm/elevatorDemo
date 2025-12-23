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
