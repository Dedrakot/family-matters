export default function initSearch(cont, data, updateFn) {
    cont.innerHTML = (`
    <div class="input-field">
      <input type="text" id="autocomplete-input" class="autocomplete" style="color: #fff;">
      <label for="autocomplete-input">Поиск</label>
      <div class="lds-roller-input-cont" style="display: none">
        <div class="lds-roller" style="color: #9e9e9e"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      </div>
    </div>
  `)
  
//   const inputEl = document.getElementById('autocomplete-input')
  cont.addEventListener('focusin', () => {
    cont.classList.add('active')
  })

  cont.addEventListener('focusout', () => {
    cont.classList.remove('active')
  })
    
}