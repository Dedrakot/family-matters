import createTree from "./ftree.js"
import initSearch from "./search.js"

const familyChartEl = document.getElementById('familyChart')
const data = global.getFamilyData().map(path2Avatar)

console.log("Количество людей в базе: " + data.length)

const {store} = createTree(familyChartEl, data, global.initialMainId, treeUpdated)

const searchEl = document.getElementById('searchField')
const search = initSearch(searchEl, store, updateMainId)

function updateMainId(id) {
    if (data.find(el => el.id === id) !== undefined) {
        store.update.mainId(id);
        store.update.tree({
            tree_position: 'inherit'
        });
    } else {
        console.log(`Id {${id}} not found`)
    }
}

function treeUpdated() {
    search && search.updateIdField(store.state.main_id)
}

function path2Avatar(item) {
    const data = item.data
    let ext = data['avatar']
    if (ext !== undefined) {
        // TODO: define condition for full path
        // ext.startsWith('img/') || 
        if (ext.length > 4) {
            return item
        }
        if (ext.length === 0) {
            ext = 'jpg'
        }
        ext = '.' + ext
        let profilePath = 'img/profile_' + item.id 
        data['avatar'] = profilePath + ext   
    }
    return item
}