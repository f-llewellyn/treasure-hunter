// Declares template variable, containing the html template for the component
const template = document.createElement("template");
template.innerHTML = `
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.3/css/all.css" integrity="sha384-SZXxX4whJ79/gErwcOYf+zWLeJdY/qpuqC4cAa9rOGUstPomtqpuNWT9wdPEn2fk" crossorigin="anonymous">
    <link rel="stylesheet" href="css/style.css">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
        .point-finder {
            color: var(--tertiary-color);
            background-color: var(--secondary-color);
            padding: 2rem;
            border-radius: 20px;
            margin: 1rem 0;
        }
        
        .point-finder h2 {
            line-height: 1rem;
        }
        
        .point-finder textarea {
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
            transition: 0s;
            opacity: 100%;
        }

        .btn:active {
            opacity: 80%;
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
    <div class="const-content noSelect">
        <h2 class="name">New Point <span class="icon"></span></h2>
        <i class="fas fa-minus collapse-icon"></i>
    </div>
    <div class="coll-content">
        <p>Clue:</p>
        <p class="clue-body"></p>
        <div class="btns">
            <button class="btn loc-chk-btn noSelect">Check Location</button>
        </div>
    </div>
    </section>
`;

// Declares class PointMarker and casts it as an HTML element
class PointFinder extends HTMLElement {
    // Initialises the class every time new object is made
    constructor() {
        super();

        //  Declares shadow DOM and sets it to open
        this.attachShadow({ mode: "open" });

        this.shadowRoot.appendChild(template.content.cloneNode(true));
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

    //  Grabs device location
    getLocation() {
        function locSuccess(pos){
            let location = pos.coords;

            console.log('Your current position is:');
            console.log(`Latitude : ${location.latitude}`);
            console.log(`Longitude: ${location.longitude}`);
            console.log(`More or less ${location.accuracy} meters.`);
            latVal.textContent = `${location.latitude}`;
            longVal.textContent = `${location.longitude}`;
        }

        function locFail(err) {
            alert(`ERROR(${err.code}): ${err.message}`)
            console.warn(`ERROR(${err.code}): ${err.message}`)
        }

        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        }

        const latVal = this.shadowRoot.querySelector(".lat");
        const longVal = this.shadowRoot.querySelector(".long");
        window.navigator.geolocation.getCurrentPosition(locSuccess, locFail, options);
    }

    // // Deletes point marker
    // async deletePoint() {
    //     const coll = this.shadowRoot.querySelector(".const-content");
    //     let content = coll.nextElementSibling;
    //     content.style.maxHeight = null;
    //     setTimeout(() => {
    //         this.disconnectedCallback();
    //         this.remove();
    //     }, 250)
    // };

    // Adds event listener on all elements with class of const-content or del-btn
    connectedCallback() {
        this.shadowRoot.querySelector(".collapse-icon").addEventListener("click", () => this.expandCollapse());
        this.shadowRoot.querySelector(".loc-chk-btn").addEventListener("click", () => this.getLocation());
    };
    
    // Adds event listener on all elements with class of del-btn
    disconnectedCallback() {
        this.shadowRoot.querySelector(".collapse-icon").removeEventListener("click", () => this.expandCollapse());
        this.shadowRoot.querySelector(".loc-chk-btn").removeEventListener("click", () => this.getLocation());

    };
};

// Defines <point-marker>
window.customElements.define("point-finder", PointFinder);