import autocomplete from "./autocomplete"

export default function initSearch(cont, store, updateIdFn) {

  const topEl = cont.appendChild(document.createElement("div"))
  topEl.classList.add('top-el')
  const searchField = topEl.appendChild(document.createElement("div"))
  searchField.classList.add("search-field")
  searchField.innerHTML = (`<input type="text" id="autocomplete-input" class="autocomplete">
    <label for="autocomplete-input">Поиск</label>
    <div class="hints" style="display: none">
      <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
    </div>`)

    // style="color: #9e9e9e"

  const search = autocomplete(searchField, makeCompletionItems(store.state.data), updateIdFn)
  const idField = topEl.appendChild(document.createElement("div"))
  idField.classList.add("id-field")
  idField.classList.add("content")
  idField.innerHTML = (`      
    <input id="id-input" type="text" value="${store.state.main_id}">
    <label for="id-input">ID:</label>`)
  
  cont.addEventListener('focusin', (event) => {
    const classList = event.target.parentElement.classList
    classList.add('active')
    classList.add('content')
    // cont.classList.add('active')
  })

  cont.addEventListener('focusout', (event) => {
    const el = event.target
    const classList = el.parentElement.classList
    classList.remove('active')
    if (el.value.trim().length === 0) {
      classList.remove('content')
    }
  })

  searchField.addEventListener('focusin', () => search.show())
  // searchField.addEventListener('focusout', () => search.hide())

  idField.addEventListener('focusin', () => search.hide())
  idField.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      const text = event.srcElement.value.trim()
      const id = parseInt(text)
      updateIdFn(isNaN(id) || id != text ? text : id)
    }
  })

  return {
    updateIdField: (value) => {
      idField.firstElementChild.value = value
      if (value.length === 0) {
        idField.classList.remove('content')  
      } else {
        idField.classList.add('content')
      }
    }
  }
}

function makeCompletionItems(data) {
  return data.map((item) => {
    let d = item.data
    let text = (d.lastName || '')
    text = addWord(text, d.firstName)
    text = addWord(text, d.middleName)
    return { 
      id: item.id,
      text: text
    }
  })
}

function addWord(result, word) {
  if (word && word.length > 0) {
    return result + ' ' + word
  }
  return result
}