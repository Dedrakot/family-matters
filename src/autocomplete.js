import {Index} from "flexsearch"

export default function autocomplete(cont, items, updateIdFn) {
    const index = new Index({
        preset: "default",
        tokenize: "forward",
        encode: function(val) {
            return val.toLowerCase().replace("ё", "е").split(' ')
        }
    });

    items.forEach((item) => index.add(item.id, item.text))
    const idMap = new Map(items.map(item => [item.id, item.text])) 
    
    var currentFocus = -1
    var lastCallTime = performance.now()
    var inputEl = cont.firstElementChild
    var hintsEl = cont.lastElementChild
    const limit = hintsEl.children.length
    inputEl.addEventListener("input", function(e) {
        let val = this.value

        if (val.trim().length == 0) {
            clearHints()
            hintsEl.style.display = 'none'
            return    
        }

        if (callLimitExeeds(val)) return

        console.log("Test: " + lastCallTime)

        clearHints()

        let searchResult = index.search(val, limit).map(id => {
            return {id: id, text: idMap.get(id)}
        })

        if(searchResult.length > 0) {
            setHints(searchResult)
            hintsEl.style.display = 'block'
        } else {
            hintsEl.style.display = 'none'
        }
    })

    inputEl.addEventListener("keydown", keyboardSelection)

    document.addEventListener("click", (e) => {
        if (e.target !== inputEl) {
            hide()
        }
    });

    function callLimitExeeds(val) {
        var callTime = performance.now()
        if (callTime - lastCallTime < 300) return true
        lastCallTime = callTime
        return false
    }

    function setHints(searchResult) {
        for(let i=0; i < searchResult.length; i++) {
            const child = hintsEl.children[i]
            child.textContent = searchResult[i].text
            const id = searchResult[i].id
            child.onclick = () => {
                moveCurrent(i)
                updateIdFn(id)
            }
            child.style.display = 'block'
        }
    }

    function clearHints() {
        removeCurrent()
        currentFocus = -1
        for (let i = 0; i < hintsEl.children.length; i++) {
            const child = hintsEl.children[i]
            child.style.display = 'none'
            child.textContent = ""
            child.onclick = () => {}
        }
    }

    function hide() {
        hintsEl.style.display = 'none'
    }

    return {
        show: () => {
            if (hasSearchResults()) {
                hintsEl.style.display = 'block'
            }
        },
        hide
    }

    function hasSearchResults() {
        for (let i = 0; i < hintsEl.children.length; i++) {
            const child = hintsEl.children[i]
            if (child.innerText) return true
        }
        return false
    }

    function keyboardSelection(e) {
        if (e.keyCode == 40) {
            if (currentFocus + 1 < hintsEl.children.length) {
                moveCurrent(currentFocus + 1)
            }
        } else if (e.keyCode == 38)  {
            if (currentFocus > -1) {
                moveCurrent(currentFocus - 1)
            }
        } else if (e.keyCode == 13) {
            e.preventDefault();
            if (currentFocus > -1) {
                hintsEl.children[currentFocus].click();
            }
          }
    }

    function removeCurrent() {
        if (currentFocus >= 0) {
            hintsEl.children[currentFocus].classList.remove('current')
        }
    }

    function setCurrent() {
        if (currentFocus >= 0) {
            hintsEl.children[currentFocus].classList.add('current')
        }
    }

    function moveCurrent(nextCurrent) {
        removeCurrent()
        currentFocus = nextCurrent
        setCurrent()
    }
}