class Covheader extends HTMLElement{
  connectedCallback() {
    this.src = this.getAttribute("src") || null;
    this.alt = this.getAttribute("alt") || null;
    this.caption = this.getAttribute("caption") || null;

    this.innerHTML = `
    <nav class="navbar navbar-light bg-dark">
      <span class="navbar-brand mb-0 h1 text-light">${this.caption}</span>
    </nav>
    `;
  }

}
customElements.define("cov-header", Covheader);
