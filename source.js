module.exports = source;

const regExp=/\D*(?:(\d{4})|(\d{2})|(\d))[^а-я\d]*(?:([а-я.]{3,})|(\d{2}))\D*(?:(\d{4})|(\d{2}))[^+\d]*(\d{2}:\d{2})?[^+\d]*(\d{2})?[^+\d]*(\d{3})?[^+]*(\+\d{2}:\d{2})?/i
const months={"янв":"01","фев":"02","мар":"03","апр":"04","мая":"05","июн.":"06","июл.":"07","авг":"08","сен":"09","окт":"10","ноя":"11","дек":"12"}

function source(obj) {
    str=obj.src[obj.options]
    reArr=regExp.exec(str)
    return reArr
        ? `${reArr[1] ?? reArr[6]}-${reArr[5] ?? months[reArr[4].slice(0,3)]}-${reArr[2] ?? reArr[7] ?? "0"+reArr[3]}T${reArr[8]??"00:00"}:${reArr[9]??"00"}.${reArr[10]??"000"}${reArr[11]??"Z"}`
        : null
}

