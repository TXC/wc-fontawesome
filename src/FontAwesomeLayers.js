export class FontAwesomeLayers extends HTMLElement {
    constructor() {
        super()
        const faClassName = 'fa-icon',
            shadow = this.attachShadow({ mode: 'open' })
        shadow.innerHTML = `
      <style>
        :host {
          display: inline-block;
          height: 1em;
          position: relative;
          text-align: center;
          vertical-align: -0.125em;
          width: 1em;
        }
        :host(.fa-fw) {
          text-align: center;
          width: 1.25em;
        }
        ::slotted(${faClassName}) {
          bottom: 0;
          left: 0;
          margin: auto;
          position: absolute;
          right: 0;
          top: 0;
        }
      </style>
      <slot></slot>
    `
    }
}

customElements.define('fa-layers', FontAwesomeLayers)
