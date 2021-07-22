const finders = document.querySelector(".finders");
const node = document.createElement("point-finder");

const testData = {
    points: [
      {
        id: "0",
        name: "Point 1",
        location: {
          lat: "53.220587599999995",
          long: "-1.4036378999999999"
        },
        clue: "Point 1"
      },
      {
        id: "1",
        name: "Point 2",
        location: {
            lat: "53.220587599999995",
            long: "-1.4036378999999999"
        },
        clue: "Point 2"
      },
      {
        id: "2",
        name: "Point 3",
        location: {
          lat: "53.220587599999995",
          long: "-1.4036378999999999"
        },
        clue: "Point 3"
      }
    ]
}


function addPoints() {
  return new Promise((resolve, reject) => {
    for (i = 0; i < (testData.points).length; i++) {
      console.log(i)
      finders.appendChild(node.cloneNode(true))
    }
    setTimeout(() => {
      resolve();
    }, 100)
  })
}

function populatePoints() {
  const markers = document.querySelectorAll("point-finder");
  for (i = 0; i < markers.length; i++) {
    console.log("populating")
    markers[i].shadowRoot.querySelector(".name").innerHTML = `${testData.points[i].name} <i class="lock-status fas fa-lock"></i>`;
    markers[i].shadowRoot.querySelector(".clue-body").textContent = testData.points[i].clue;
  }
}

addPoints()
  .then(populatePoints)
  .catch((err) => console.error(err));