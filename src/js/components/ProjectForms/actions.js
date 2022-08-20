const actions = 
{
    NEXT_PAGE: "NEXT_PAGE",
    PREV_PAGE: "PREV_PAGE",
    SET_PLANTEAMIENTO: "SET_PLANTEAMIENTO",
    SET_JUSTIFICACION: "SET_JUSTIFICACION",
    SET_ALCANCES: "SET_ALCANCES",
    SET_LIM_RES: "SET_LIM_RES",
    SET_TIPO_PROYECTO: "SET_TIPO_PROYECTO",
    SET_INSTITUCION: "SET_INSTITUCION",
    ADD_DEP: "ADD_DEP",
    REMOVE_DEP: "REMOVE_DEP",
    SET_PLAN: "SET_PLAN",
    SET_CLIENTE: "SET_CLIENTE",
    SET_AREA_CONOC: "SET_AREA_CONOC",
    SET_TIPO_EJEC: "SET_TIPO_EJEC",
    SET_INICIO_PERIODO: "SET_INICIO_PERIODO",
    SET_FIN_PERIODO: "SET_FIN_PERIODO",
    SET_MATERIA_EJE: "SET_MATERIA_EJE",
    ADD_COMPETENCIA: "ADD_COMPETENCIA",
    REMOVE_COMPETENCIA: "REMOVE_COMPETENCIA",
    SET_TITULO_PRO: "SET_TITULO_PRO",
    ADD_COMPETENCIA_ETAPA_1: "ADD_COMPETENCIA_ETAPA_1",
    ADD_COMPETENCIA_ETAPA_2: "ADD_COMPETENCIA_ETAPA_2",
    ADD_COMPETENCIA_ETAPA_3: "ADD_COMPETENCIA_ETAPA_3",
    ADD_ALUMNO: "ADD_ALUMNO",
    REMOVE_ALUMNO: "REMOVE_ALUMNO",
    ADD_ACTIVITY: "ADD_ACTIVITY",
    SET_NAME_ACTIVITY: "SET_NAME_ACTIVITY",
    SET_DATE_ACTIVITY: "SET_DATE_ACTIVITY",
    ADD_ALUMN_ACTIVITY: "ADD_ALUMN_ACTIVITY",
    REMOVE_ALUMN_ACTIVITY: "REMOVE_ALUMN_ACTIVITY",
    SET_IMPACTO_PROYECTO: "SET_IMPACTO_PROYECTO",
    SET_PRODUCTIVIDAD_ACADEMICA: "SET_PRODUCTIVIDAD_ACADEMICA",
    REMOVE_PRODUCTIVIDAD_ACADEMICA: "REMOVE_PRODUCTIVIDAD_ACADEMICA",
    SET_COLAB: "SET_COLAB",
    SET_PRO_RESP: "SET_PRO_RESP",
    REMOVE_ACTIVITY_FROM_CRONO: "REMOVE_ACTIVITY_FROM_CRONO"
}

const setRangeMonths = (fDate, sDate) =>{
      const meses = [
        "enero",
        "febrero",
        "marzo",
        "abril",
        "mayo",
        "junio",
        "julio",
        "agosto",
        "septiembre",
        "octubre",
        "noviembre",
        "diciembre"
      ];
      const rangeMonths = []
      const date1 = new Date(fDate);
      const date2 = new Date(Date.parse(sDate));
      
      var i = date1.getMonth();

      while (true) {
        rangeMonths.push(meses[i % 12])
        if (meses[i % 12] === meses[date2.getMonth()]) 
          break;
        i = i + 1;
      }
      return rangeMonths
}

export {actions, setRangeMonths}