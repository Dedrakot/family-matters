export default function infoComponent(wikiUrl) {
    return {
        button: (info, card_dim) => {
            return ` 
            <image class="info" style="cursor: pointer" href="img/info.svg"
                x="${card_dim.w-28}px" y="${card_dim.h-28}px">
                <title>Ссылка на wiki</title>
            </image>`
        },
        listener: (store, {card, d}) => {
            const item = d.data
            window.open(wikiUrl + '/' + (item.data.info || ("люди/" + item.id)), "_self");
        },
        querySelector: '.info'
    }
}