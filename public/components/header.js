class Header extends HTMLElement {

    constructor() {
        super();
    }


    connectedCallback() {
        const pathToPublic = this.getAttribute('pathToPublic')

        this.innerHTML = `
        
        <div class="header">
            <a href="${pathToPublic}index.html" class="logo">RT35 Oslo</a>
            
            <input class="side-menu" type="checkbox" id="side-menu"/>
            <label class="hamb" for="side-menu"><span class="hamb-line"></span></label>

            <div class="header-right">
                <a href="${pathToPublic}index.html" >Home</a>
                <a href="${pathToPublic}pages/gettingThere.html" >Transport</a>
                <a href="${pathToPublic}pages/accomodation.html" >Accomodation</a>
                <a href="${pathToPublic}pages/participants.html" >Participants</a>
                <a href="${pathToPublic}pages/register.html" >Register</a>
                <a href="${pathToPublic}pages/schedule.html" >Schedule</a>
                <a href="${pathToPublic}pages/contact.html" >Contact us</a>
                <a href="${pathToPublic}pages/faq.html" >FAQ</a>
            </div>
        </div>
        `
    }
}
customElements.define('header-component', Header);