export default function flagComponent() {
    const posMap = new Map(require("./flags-positions.json"))
    return {
        // viewboxPosition: (country) => posMap.get(country),
        images: (flags, card_dim) => {
            if (flags?.length > 0) {
                return flags.map( (flag, idx, array) => {
                    return `<svg x="${card_dim.w - 24 *(array.length - idx) - 3}px" y="5px" width="22px" height="16px" viewBox="${posMap.get(flag)} 22 16">
                        <image href="img/flags.png" />
                    </svg>`
                }).join('\n')
            }
            return ''
        }
    } 
}