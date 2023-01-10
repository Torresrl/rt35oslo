class Header extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <div>
            <a href="../index.html" >General</a>
            <a href="./gettingThere.html" >Getting There</a>
            <a href="./participants.html" >Participants</a>
            <a href="./register.html" >Register</a>
            <a href="./schedule.html" >Schedule</a>
            <a href="./contact.html" >Contackt us</a>
        </div>
        `
    }
} 
  customElements.define('header-component', Header);