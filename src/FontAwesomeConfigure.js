import {config} from '@fortawesome/fontawesome-svg-core'

/**
 * @typedef FontAwesomeConfig
 * @type {config}
 * @property {boolean} shadowDom Use ShadowDom
 */

export class FontAwesomeConfigure {
    static useShadowDom = false

    /**
     * @param {FontAwesomeConfig} options
     */
    static configure = (options) => {
        const { shadowDom = true } = options
        FontAwesomeConfigure.useShadowDom = shadowDom
        config.autoAddCss = !shadowDom
    }
}

/**
 * Backward compatability function
 * @param {FontAwesomeConfig} options
 */
export const configure = (options) => FontAwesomeConfigure.configure(options)
