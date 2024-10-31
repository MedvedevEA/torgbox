module.exports = source;

const regExp=/\D*(\d{4}|\d{2}|\d)[^а-я\d]*(?:([а-я]{3,})|(\d{2}))\D*(\d{4}|\d{2})[^+\d]*(\d{2}:\d{2})?[^+\d]*(\d{2})?[^+\d]*(\d{3})?[^+]*(\+\d{2}:\d{2})?/i
const months={"янв":"01","фев":"02","мар":"03","апр":"04","мая":"05","июн.":"06","июл.":"07","авг":"08","сен":"09","окт":"10","ноя":"11","дек":"12"}

function source(obj) {
    str=obj.src[obj.options]
    r=regExp.exec(str)
    return `${r[1].length == 4 ? r[1] : r[4]}-${r[3] ?? months[r[2].slice(0,3)]}-${r[4].length < 3 ? r[4] : r[1].padStart(2,"0")}T${r[5]??"00:00"}:${r[6]??"00"}.${r[7]??"000"}${r[8]??"Z"}`
}

