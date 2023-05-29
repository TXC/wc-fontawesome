import {RawElement} from 'raw-element'

export class FontAwesomeCounter extends RawElement {
    render() {
        if (!this.renderRoot.childNodes.length) {
            this.renderRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
          position: absolute;
          text-align: center;          
          
          background-color: #ff253a;
          border-radius: 1em;
          box-sizing: border-box;
          color: #fff;
          height: 1.5em;
          line-height: 1;
          max-width: 5em;
          min-width: 1.5em;
          overflow: hidden;
          padding: 0.25em;
          right: 0;
          text-overflow: ellipsis;
          top: 0;
          transform: scale(0.25);
          transform-origin: top right;          
        }

        :host([position="bottom-left"]) {          
          bottom: 0;
          left: 0;
          right: auto;
          top: auto;
          transform: scale(0.25);
          transform-origin: bottom left;
        }

        :host([position="bottom-right"]) {
          bottom: 0;
          right: 0;
          top: auto;
          transform: scale(0.25);
          transform-origin: bottom right;
        }

        :host([position="top-left"]) {
          left: 0;
          right: auto;
          top: 0;
          transform: scale(0.25);
          transform-origin: top left;
        }
      </style>
      <slot></slot>
      `
        }
    }
}

customElements.define('fa-counter', FontAwesomeCounter)
