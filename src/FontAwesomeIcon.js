import {RawElement} from 'raw-element'
import normalizeIconArgs from './utils/normalize-icon-args'
import objectWithKey from './utils/object-with-key'
import classList from './utils/get-class-list-from-props'
import {dom, icon, parse} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeConfigure} from './FontAwesomeConfigure'

export class FontAwesomeIcon extends RawElement {
    static styleEl
    #_iconCount
    #_hasStyleEl
    static get properties() {
        return {
            icon: { type: String },
            name: { type: String },
            symbol: { type: String },
            title: { type: String },
            size: { type: String },
            flip: { type: String },
            pull: { type: String },
            type: { type: String },
            fixedWidth: { type: Boolean, attribute: 'fixed-width' },
            listItem: { type: Boolean, attribute: 'list-item' },
            swapOpacity: { type: Boolean, attribute: 'swap-opacity' },
            sharp: { type: Boolean },
            border: { type: Boolean },
            inverse: { type: Boolean },
            spin: { type: Boolean },
            pulse: { type: Boolean },
            rotation: { type: Number },
            transform: {},
            mask: {},
        }
    }

    constructor() {
        super()
        this.#_iconCount = 0
        this.#_hasStyleEl = false
    }

    styleElNeeded = () => {
        if (!FontAwesomeIcon.styleEl) {
            FontAwesomeIcon.styleEl = document.createElement('style')
            FontAwesomeIcon.styleEl.textContent = dom.css()
        }
    }

    createRenderRoot() {
        return FontAwesomeConfigure.useShadowDom ? super.createRenderRoot() : this
    }

    render() {
        const {
            icon: iconArgs,
            name,
            mask: maskArgs,
            symbol: symbolArgs,
            className,
            title,
            type,
            sharp,
        } = this

        const iconLookup = normalizeIconArgs(name || iconArgs, type, sharp)
        const classes = objectWithKey('classes', [
            ...classList(this),
            ...className.split(' '),
        ])
        const transform = objectWithKey(
            'transform',
            typeof this.transform === 'string'
                ? parse.transform(this.transform)
                : this.transform
        )
        const mask = objectWithKey('mask', normalizeIconArgs(maskArgs))

        const symbol = symbolArgs ? symbolArgs : typeof symbolArgs === 'string'

        //const iconDef = findIcon(iconLookup)
        const renderedIcon = icon(iconLookup, {
            ...classes,
            ...transform,
            ...mask,
            symbol,
            title,
        })
        //console.log(iconDef)

        if (this.renderRoot !== this && !this.#_hasStyleEl) {
            this.styleElNeeded()

            this.renderRoot.appendChild(FontAwesomeIcon.styleEl.cloneNode(true))
            this.#_hasStyleEl = true
        }

        // remove old svg nodes
        const nodeStart = this.#_hasStyleEl ? 1 : 0
        for (let i = 0; i < this.#_iconCount; i++) {
            this.renderRoot.childNodes[nodeStart].remove()
        }

        if (!renderedIcon) {
            console.warn('Could not find icon', iconLookup)
            return
        }
        for (let i = 0; i < renderedIcon.node.length ; i++) {
            this.renderRoot.appendChild(renderedIcon.node.item(i))
        }
        this.#_iconCount = renderedIcon.node.length
    }
}

customElements.define('fa-icon', FontAwesomeIcon)
