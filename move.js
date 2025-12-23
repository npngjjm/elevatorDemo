const elevator = document.querySelector(".elevator");
const elevatorBtnsList = [1, 2, 3, 4, 5];
const elevatorBtns = elevatorBtnsList.map((num) => {
  return document.querySelector(`#btn_${num}`);
});

let curFloor = 1;
for (i = 0; i < 5; i++) {
  elevatorBtns[i].addEventListener("click", moveTo(i + 1));
}

function moveTo(floor) {
  return async () => {
    if (floor > curFloor) {
      const floorToMove = floor - curFloor;
      for (i = 0; i < floorToMove; i++) {
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            curFloor++;
            console.log(curFloor);
            elevator.style.bottom = `${70 + curFloor * 200}px`;
            resolve();
          }, 1000);
        });
      }
    } else if (floor < curFloor) {
      const floorToMove = curFloor - floor;
      for (i = 0; i < floorToMove; i++) {
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            curFloor--;
            console.log(curFloor);
            elevator.style.bottom = `${70 + curFloor * 200}px`;
            resolve();
          }, 1000);
        });
      }
    }
  };
}
