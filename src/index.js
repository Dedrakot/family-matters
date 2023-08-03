import createTree from "./ftree.js"

const familyChartEl = document.getElementById('familyChart')
const data = selectCentralMember(
    global.centerMemberId,
    global.getFamilyData().map(path2Avatar))

console.log("Количество людей в базе: " + data.length)

createTree(familyChartEl, data)

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

function selectCentralMember(id, data) {
    if(data.length > 0 && data[0].id !== id) {
        for (let i=1; i < data.length; i++) {
            if(data[i].id === id) {
                const tmp = data[0]
                data[0] = data[i]
                data[i] = tmp
                break;
            }
        }
    }
    return data
}