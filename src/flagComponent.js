export default function flagComponent() {
    const flags = new Map([
        ['russia_empire', 'jpg'], ['ussr', 'svg']
    ])

    const posMap = new Map(require("./flags-positions.json"))
    return {
        images: (flags, card_dim, i18n) => {
            return flags?.length > 0 ? flags.map( (flag, idx, array) => {
                let x = card_dim.w - 24 *(array.length - idx) - 3
                let imgPath
                if (imgPath = getSeparateFlag(flag)) {
                    return `<image x="${x}px" y="5px" width="22px" height="16px" href="${imgPath}"><title>${i18n(flag)}</title></image>`
                }
                return `<svg x="${x}px" y="5px" width="22px" height="16px" viewBox="${posMap.get(flag)} 22 16">
                    <image href="img/flags.png"><title>${i18n(flag)}</title></image>
                </svg>`
            }).join('\n') : ''
        }
    }

    function getSeparateFlag(flag) {
        let ext
        if (ext = flags.get(flag)) {
            return 'img/' + flag + '.' + ext
        }
        return null
    }
}