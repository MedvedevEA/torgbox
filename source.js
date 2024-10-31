module.exports = source;

const months={
    "янв":"01","фев":"02","мар":"03","апр":"04","мая":"05","июн.":"06","июл.":"07","авг":"08","сен":"09","окт":"10","ноя":"11","дек":"12",
}
const rules = [
    [
        {template:/(\d{4})[-.](\d{2})[-.](\d{2})/,toIso:(result)=>{return `${result[1]}-${result[2]}-${result[3]}` }},
        {template:/(\d{2})[-./](\d{2})[-./](\d{4})/,toIso:(result)=>{return `${result[3]}-${result[2]}-${result[1]}` }},
        {template:/["«]?(\d{1,2})["»]? ([а-я]{3,})\.? (\d{4})/,toIso:(result)=>{return `${result[3]}-${months[result[2].slice(0,3)]}-${result[1].padStart(2,"0")}` }},
        {template:/.?/,toIso:(result)=>{return `0000-00-00`}},
    ],
    [
        {template:/T(\d{2}):(\d{2}):(\d{2})\.(\d{3})/,toIso:(result)=>{return `${result[0]}`}},
        {template:/T(\d{2}):(\d{2}):(\d{2})/,toIso:(result)=>{return `${result[0]}.000`}},
        {template:/[^+](\d{2}):(\d{2})/,toIso:(result)=>{return `T${result[1]}:${result[2]}:00.000`}},
        {template:/.?/,toIso:(result)=>{return `T00:00:00.000`}}
    ],
    [
        {template:/\+(\d{2}):(\d{2})/,toIso:(result)=>{return `${result[0]}`}},
        {template:/.?/,toIso:(result)=>{return `Z`}}
    ]
]

function source(obj) {
    str=obj.src[obj.options]
    var response=""
    rules.forEach ( (ruleGroup) =>{
        var rule;
        for (rule of ruleGroup) {
            result=rule.template.exec(str)
            if (result) {
                response+=rule.toIso(result)
                break
            }
        }
    } )
    return response
}

