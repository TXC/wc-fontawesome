import {RawElement} from 'raw-element'
import objectWithKey from './utils/object-with-key'
import {parse, text} from '@fortawesome/fontawesome-svg-core'

export class FontAwesomeText extends RawElement {
    transformRegex = /transform:(.*?);/
    static get properties() {
        return {
            transform: {},
        }
    }

    extractTransformStyle = (abstract) => {
        let result
        const style = abstract[0].attributes.style
        if (style) {
            const match = this.transformRegex.exec(String(style))
            result = match && match[1]
        }
        return result || ''
    }

    render() {
        if (!this.renderRoot.childNodes.length) {
            this.renderRoot.innerHTML = `
      <style>
        :host {          
          display: inline-block;
          position: absolute;
          text-align: center;          
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          transform-origin: center center;
        }

        :host([inverse]) {
          color: #fff;
        }
      </style>
      <slot></slot>
      `
        }

        const transform = objectWithKey(
            'transform',
            typeof this.transform === 'string'
                ? parse.transform(this.transform)
                : this.transform
        )
        // by copying transformForCss could make more efficient. Use public API for now
        const renderedText = text('', transform)
        this.style.transform = this.extractTransformStyle(renderedText.abstract)
    }
}

customElements.define('fa-text', FontAwesomeText)
