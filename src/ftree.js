import f3 from "./family-chart.js"

export default function createTree(element, data) {
  const store = f3.createStore({
    data: data,
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
  const Card = f3.elements.Card({
    store,
    svg: view.svg,
    card_dim: {w:400,h:110,text_x:textX,text_y:15,img_w:imgW,img_h:imgH,img_x:5,img_y:5},
    card_display: cardDisplay,
    mini_tree: true,
    link_break: true
  })

  view.setCard(Card)
  store.setOnUpdate(props => view.update(props || {}))
  store.update.tree({initial: true})

  return {
    store: store,
    view: view
  }
}

function cardDisplay(d) {
  const data = d.data
  const first = data.lastName || ''
  const second = `${data.firstName || ''} ${data.middleName || ''}`
  const birthday = dateView(data.birthday)
  const deathday = dateView(data.deathday)
  const dates = deathday.length > 0 ? (birthday.length > 0 ? birthday : "...") + " - " + deathday : birthday 
  const adopted = data['adopted'] ? `<tspan x="0" dy="17" class="adopted">${adoptedLabel(data.gender)}</tspan>`:''
  return `
    <tspan x="0" dy="25" class="label">${first}</tspan>
    <tspan x="0" dy="25" class="label">${second}</tspan>
    <tspan x="0" dy="17" class="birth-date">${dates}</tspan>` + 
    adopted
}

const i18n = new Map()
i18n.set('UNKNOWN_M', "Неизвестен")
i18n.set('UNKNOWN_F', "Неизвестна")

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
