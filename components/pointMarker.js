// Declares template variable, containing the html template for the component
const template = document.createElement("template");
template.innerHTML = `
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.3/css/all.css" integrity="sha384-SZXxX4whJ79/gErwcOYf+zWLeJdY/qpuqC4cAa9rOGUstPomtqpuNWT9wdPEn2fk" crossorigin="anonymous">
    <link rel="stylesheet" href="css/style.css">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
        .point-marker {
            color: var(--tertiary-color);
            background-color: var(--secondary-color);
            padding: 2rem;
            border-radius: 20px;
            margin: 1rem 0;
        }
        
        .point-marker h2 {
            line-height: 1rem;
        }
        
        .point-marker textarea {
            width: 100%;
            height: 100px;
            border-radius: 20px;
            resize: vertical;
            padding: .5rem;
            margin: 1rem 0;
        }
        
        .btn {
            background-color: var(--primary-color);
            border: none;
            padding: .5rem 1rem;
            min-width: 200px;
            color: var(--tertiary-color);
            border-radius: 10px;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: medium;
            cursor: pointer;
        }
        
        .del-btn {
            background-color: var(--fail-color);
        }
        
        .btns {
            display: flex;
            width: 100%;
            justify-content: space-evenly;
        }
        
        .coll-content {
            max-height: 0;
            overflow: hidden;
            transition: max-height 250ms ease-in-out;
        }
        
        .collapse-icon {
            font-size: large;
        }
        
        .const-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            cursor: pointer;
        }
    </style>

    <section class="point-marker">
    <div class="const-content">
        <h2 class="name">New Point</h2>
        <i class="fas fa-minus collapse-icon"></i>
    </div>
    <div class="coll-content">
        <p>Location:</p>
        <p>Clue:</p>
        <textarea name="clue" id="clue" cols="30" rows="10"></textarea>
        <div class="btns">
            <button class="btn loc-btn">SET CURRENT LOCATION</button>
            <button class="btn del-btn">DELETE POINT</button>
        </div>
    </div>
    </section>
`;

// Declares class PointMarker and casts it as an HTML element
class PointMarker extends HTMLElement {
    // Initialises the class every time new object is made
    constructor() {
        super();

        //  Declares shadow DOM and sets it to open
        this.attachShadow({ mode: "open" });

        this.shadowRoot.appendChild(template.content.cloneNode(true));


        setTimeout(() => {
            const coll = this.shadowRoot.querySelector(".const-content");
            coll.nextElementSibling.style.maxHeight = `${coll.nextElementSibling.scrollHeight}px`;
        }, 100)


    };

    // Collapses or expands the collapsable content
    expandCollapse() {
        const coll = this.shadowRoot.querySelector(".const-content");
        let content = coll.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
          } else {
            content.style.maxHeight = `${content.scrollHeight + 30}px`;
          };
    };

    // Deletes point marker
    deletePoint() {
        const delPoint = this.shadowRoot.querySelector(".del-btn");
        let pointMarker = delPoint.parentNode.parentNode.parentNode;
        pointMarker.parentNode.removeChild(pointMarker);
    };

    // Adds event listener on all elements with class of const-content or del-btn
    connectedCallback() {
        this.shadowRoot.querySelector(".const-content").addEventListener("click", () => this.expandCollapse());
        this.shadowRoot.querySelector(".del-btn").addEventListener("click", () => this.deletePoint());
    };
    
    // Adds event listener on all elements with class of del-btn
    disconnectedCallback() {
        this.shadowRoot.querySelector(".const-content").removeEventListener();
        this.shadowRoot.querySelector(".del-btn").removeEventListener();
    };
};

// Defines <point-marker>
window.customElements.define("point-marker", PointMarker);