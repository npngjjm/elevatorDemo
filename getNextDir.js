function getNextDir() {
  if (elevatorState == "UPWARD") {
    if (isThereUpAbove() == TRUE) {
      return "UP";
    } else if (isThereDownAbove()) {
      elevatorState = "UPWARD";
      return "UP";
    } else if (isThereDownBelow()) {
      elevatorState = "UPWARD";
      return "UP";
    } else if (isThereUpBelow()) {
      elevatorState = "DOWNWARD";
      return "DOWN";
    } else {
      elevatorState = "IDLE";
      return "NONE";
    }
  } else if (elevatorState == "DOWNWARD") {
    if (isThereDownBelow()) {
      elevatorState = "DOWNWARD";
      return "DOWN";
    } else if (isThereUpBelow()) {
      elevatorState = "DOWNWARD";
      return "DOWN";
    } else if (isThereUpAbove()) {
      elevatorState = "UPWARD";
      return "UP";
    } else if (isThereDownAbove()) {
      elevatorState = "UPWARD";
      return "UP";
    }
  }
}
