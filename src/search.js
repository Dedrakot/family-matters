export default function initSearch(cont, store, updateIdFn) {

  const topEl = cont.appendChild(document.createElement("div"))
  topEl.classList.add('top-el')
  const searchField = topEl.appendChild(document.createElement("div"))
  searchField.classList.add("search-field")
  searchField.innerHTML = (`<input type="text" id="autocomplete-input" class="autocomplete">
    <label for="autocomplete-input">Поиск</label>
    <div class="lds-roller-input-cont" style="display: none">
      <div class="lds-roller" style="color: #9e9e9e"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>`)
  const idField = topEl.appendChild(document.createElement("div"))
  idField.classList.add("id-field")
  idField.classList.add("content")
  idField.innerHTML = (`      
    <input id="id-input" type="text" value="${store.state.main_id}">
    <label for="id-input">ID:</label>`)
  
//   const inputEl = document.getElementById('autocomplete-input')
  cont.addEventListener('focusin', (event) => {
    const classList = event.srcElement.parentElement.classList
    classList.add('active')
    classList.add('content')
    // cont.classList.add('active')
  })

  cont.addEventListener('focusout', (event) => {
    const el = event.srcElement
    const classList = el.parentElement.classList
    classList.remove('active')
    if (el.value.trim().length === 0) {
      classList.remove('content')
    }
  })

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