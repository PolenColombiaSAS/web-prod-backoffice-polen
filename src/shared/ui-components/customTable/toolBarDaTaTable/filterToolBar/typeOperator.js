export const OperatorsType = {
    string: [
        { value: "string.contains", name: "Contiene", isValueNeed: true },
        { value: "string.ncontains", name: "No contiene", isValueNeed: true },
        { value: "string.startsWith", name: "Empieza con", isValueNeed: true },
        { value: "string.nstartsWith", name: "No empieza con", isValueNeed: true },
        { value: "string.endsWith", name: "Termina con", isValueNeed: true },
        { value: "string.nendsWith", name: "No termina con", isValueNeed: true },
    ],
    number: [
        { value: "number.eq", name: "Igual a", isValueNeed: true },
        { value: "number.neq", name: "No Igual a", isValueNeed: true },
        { value: "number.gt", name: "Mayor que", isValueNeed: true },
        // { value: "number.ngt", name: "No mayor que", isValueNeed: true },
        { value: "number.gte", name: "Mayor o igual que", isValueNeed: true },
        // { value: "number.ngte", name: "No mayor o igual que", isValueNeed: true },
        { value: "number.lt", name: "Menor que", isValueNeed: true },
        // { value: "number.nlt", name: "No menor que", isValueNeed: true },
        { value: "number.lte", name: "Menor o igual que", isValueNeed: true },
        // { value: "number.nlte", name: "No menor o igual que", isValueNeed: true },
    ],
    date: [
        { value: "date.specifiedDay", name: "Dia Específico", isValueNeed: true },
        { value: "date.today", name: "Hoy", isValueNeed: false },
        { value: "date.yesterday", name: "Ayer", isValueNeed: false },
        { value: "date.thisWeek", name: "Semana en curso", isValueNeed: false },
        { value: "date.last7days", name: "Últimos 7 días", isValueNeed: false },
        { value: "date.thisMonth", name: "Mes en curso", isValueNeed: false },
        { value: "date.last30days", name: "Últimos 30 días", isValueNeed: false },
        { value: "date.lastMonth", name: "Mes Anterior", isValueNeed: false },
        { value: "date.lastThreeMonth", name: "Últimos 3 meses", isValueNeed: false },
        { value: "date.lastSixMonth", name: "Últimos 6 meses", isValueNeed: false },
        { value: "date.thisYear", name: "Año en curso", isValueNeed: false },
        // { value: "date.neq", name: "No Igual a",isValueNeed:true },
        { value: "date.gt", name: "Mayor que", isValueNeed: true },
        // { value: "date.ngt", name: "No mayor que",isValueNeed:true },
        // { value: "date.gte", name: "Mayor o igual que",isValueNeed:true },
        // { value: "date.ngte", name: "No mayor o igual que",isValueNeed:true },
        { value: "date.lt", name: "Menor que", isValueNeed: true },
        // { value: "date.nlt", name: "No menor que",isValueNeed:true },
        // { value: "date.lte", name: "Menor o igual que",isValueNeed:true },
        // { value: "date.nlte", name: "No menor o igual que",isValueNeed:true },
    ],
    bool: [
        { value: "bool.eq", name: "True", isValueNeed: false },
        { value: "bool.neq", name: "False", isValueNeed: false }
    ]
}

export const buscarOperatorsTypePorValor = (valor) => {
    const typeOperator = valor.split(".")[0]
    const optionsOperator = OperatorsType[typeOperator];
    if (optionsOperator) {
        for (const obj of optionsOperator) {
            if (obj.value === valor) {
                return obj;
            }
        }
    }
    return null;
}