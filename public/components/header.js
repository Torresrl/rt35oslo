class Header extends HTMLElement {

    constructor() {
        super();
    }


    connectedCallback() {
        const pathToPublic = this.getAttribute('pathToPublic')

        this.innerHTML = `
        
        <div class="header">
            <a href="${pathToPublic}index.html" class="logo">RT35 Oslo</a>
            <div class="header-right">
                <a href="${pathToPublic}index.html" >General</a>
                <a href="${pathToPublic}pages/gettingThere.html" >Getting There</a>
                <a href="${pathToPublic}pages/participants.html" >Participants</a>
                <a href="${pathToPublic}pages/register.html" >Register</a>
                <a href="${pathToPublic}pages/schedule.html" >Schedule</a>
                <a href="${pathToPublic}pages/contact.html" >Contackt us</a>
            </div>
        </div>
        `
    }
}
customElements.define('header-component', Header);