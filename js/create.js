const addPoint = document.querySelector(".add");
const savePoints = document.querySelector(".save");
// Defines markers in preperation for later

// Adds point-marker element to markers div
addPoint.addEventListener("click", () => {
    const pointContainer = document.querySelector(".markers");
    const node = document.createElement("point-marker");
    pointContainer.appendChild(node);
});

// Grabs all point-marker elements, grabs relevant data and adds it to data array
savePoints.addEventListener("click", () => {
    // clears data
    let data = {
        "points": []
    }
    markers = document.querySelectorAll("point-marker");
    
    // Iterates through markers
    for (i = 0; i < markers.length; i++) {    
        // Grabs all relevant info
        let name = markers[i].shadowRoot.querySelector(".name").textContent;
        let lat = markers[i].shadowRoot.querySelector(".lat").textContent;
        let long = markers[i].shadowRoot.querySelector(".long").textContent;
        let clue = markers[i].shadowRoot.querySelector("#clue").value;
        
        // Saves all relevant info in object form
        let point = {}
        point = {
            id: `${i}`,
            name: `${name}`,
            location: {
                lat: `${lat}`,
                long: `${long}` 
            },
            clue: `${clue}`
        }
        
        // Adds point to data
        data.points.push(point)
    }
    console.log(data);
    data = JSON.stringify(data);
});