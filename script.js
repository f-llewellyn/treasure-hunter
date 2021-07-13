// const coll = document.querySelectorAll(".const-content");
// const delPoint = document.querySelectorAll(".del-btn");
const addPoint = document.querySelector(".add")

// for (i = 0; i < coll.length; i++) {
//   coll[i].nextElementSibling.style.maxHeight = `${coll[i].nextElementSibling.scrollHeight + 30}px`;
//   coll[i].addEventListener("click", function() {
//     let content = this.nextElementSibling;
//     console.log(content.style.maxHeight)
//     if (!content.style.maxHeight) {
//       content.style.maxHeight = `${content.scrollHeight + 30}px`;
//     } else {
//       content.style.maxHeight = null;
//     }
//   });
// }

// for (i = 0; i < delPoint.length; i++) {
//   delPoint[i].addEventListener("click", function() {
//     let pointMarker = this.parentNode.parentNode.parentNode;
//     pointMarker.parentNode.removeChild(pointMarker);
//   });
// }

addPoint.addEventListener("click", () => {
    const pointContainer = document.querySelector(".markers");
    const node = document.createElement("point-marker");

    pointContainer.appendChild(node)
})