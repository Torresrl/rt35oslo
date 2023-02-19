class Footer extends HTMLElement {

  constructor() {
    super();
  }


  connectedCallback() {
    const pathToPublic = this.getAttribute('pathToPublic')

    this.innerHTML = `
        <footer>
            <div class="footer-container">
            <div class="footer-copyright">
            Copyright © 2023 RT 35 Oslo
          </div>
              <div class="footer-links">
                <a href="${pathToPublic}index.html" >Home</a>
                <a href="${pathToPublic}pages/gettingThere.html" >Getting There</a>
                <a href="${pathToPublic}pages/accomodation.html" >Accomodation</a>
                <a href="${pathToPublic}pages/participants.html" >Participants</a>
                <a href="${pathToPublic}pages/register.html" >Register</a>
                <a href="${pathToPublic}pages/schedule.html" >Schedule</a>
                <a href="${pathToPublic}pages/contact.html" >Contact us</a>
                <a href="${pathToPublic}pages/faq.html" >FAQ</a>
              </div>
            </div>
          </footer>
        `
  }
}
customElements.define('footer-component', Footer);