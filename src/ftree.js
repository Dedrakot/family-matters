import f3 from "./family-chart.js"
import flagComponent from "./flagComponent.js"

export default function createTree(element, data, mainId, updateFn) {
  const store = f3.createStore({
    data: data,
    main_id: mainId,
    node_separation: 450,
    level_separation: 150,
    i18n: i18n,
    defaultMaleAvatar: "img/no_image_male.jpg",
    defaultFemaleAvatar: "img/no_image_female.svg",
    // defaultAvatar: "img/no_image.jpg"
  })
  const view = f3.d3AnimationView({
    store,
    cont: element
  })
  const imgW = 100, imgH = 100
  const textX = imgW + 10
  const flags = flagComponent()
  const Card = f3.elements.Card({
    store,
    svg: view.svg,
    card_dim: {w:400,h:110,text_x:textX,text_y:5,img_w:imgW,img_h:imgH,img_x:5,img_y:5},
    card_display: cardDisplay,
    mini_tree: true,
    link_break: true,
    custom_elements: [{el: (d, card_dim) => flags.images(d.data.flags, card_dim, store.methods.i18n)}],
  })

  view.setCard(Card)
  store.setOnUpdate(props => {
    updateFn && updateFn()
    view.update(props || {})
  })
  store.update.tree({initial: true})

  return {
    store: store,
    view: view
  }
}

function cardDisplay(d) {
  const data = d.data
  const firstLine = data.lastName || ''
  const firstName = data.firstName || ''
  const middleName = data.middleName || ''
  let secondLine
  let thirdLine
  // TODO: calculate based on font symbol sizes
  if (firstName.length + middleName.length > 20) {
      secondLine = firstName
      thirdLine = middleName
  } else {
      secondLine = firstName + ' ' + middleName
      thirdLine = ''
  }
  const birthday = dateView(data.birthday)
  const deathday = dateView(data.deathday)
  const dates = deathday.length > 0 ? (birthday.length > 0 ? birthday : "...") + " - " + deathday : birthday 
  const adopted = data['adopted'] ? `<tspan x="0" dy="17" class="adopted">${adoptedLabel(data.gender)}</tspan>`:''
  return `
    <tspan x="0" dy="25" class="label">${firstLine}</tspan>
    <tspan x="0" dy="25" class="label">${secondLine}</tspan>
    <tspan x="0" dy="25" class="label">${thirdLine}</tspan>
    <tspan x="0" dy="20" class="birth-date">${dates}</tspan>` + 
    adopted
}

function dateView(dateS) {
  if (dateS) {
    const d = dateS.split('-')
    let result = ''
    if (d.length > 2) {
      result = d[2]+'.' +d[1]+'.'
      // result = parseInt(d[2]) + ' ' + monthsWithDate[parseInt(d[1])-1] + ' '
    } else if(d.length > 1) {
      result = d[1]+'.'//months[parseInt(d[1])-1] + ' '
    }
    if(d.length > 0) {
      result += d[0]
    }
    return result
  } else {
    return ''
  }
}

function isMan(gender) {
  return gender === 'M'
} 

function adoptedLabel(gender) {
  return isMan(gender) ? "приёмный" : "приёмная"   
}

const i18n = new Map()
i18n.set('UNKNOWN_M', "Неизвестен")
i18n.set('UNKNOWN_F', "Неизвестна")
// country flags
i18n.set('russia', "РФ")
i18n.set('ussr', "СССР")
i18n.set('usa', "США")
i18n.set('germany', "ФРГ")
i18n.set('russia_empire', "Российская империя")