import {actions} from "./actions"

const reducer = (state, payload)=>{
    switch (payload.action) {
        case actions.SET_PRO_RESP:
            return {...state, profResp: payload.value}
        case actions.NEXT_PAGE:
            return {...state, page: state.page+1}

        case actions.PREV_PAGE:
            return {...state, page: state.page-1}

        case actions.SET_PLANTEAMIENTO:
            return {...state, planteamiento: payload.value}
        
        case actions.SET_JUSTIFICACION:
            return {...state, justificacion: payload.value}
        
        case actions.SET_ALCANCES:
            return {...state, alcances: payload.value}

        case actions.SET_LIM_RES:
            return {...state, limityRest: payload.value}
            
        case actions.SET_TIPO_PROYECTO:
            return {...state, tipoProyecto: payload.value}

        case actions.SET_INSTITUCION:
            return {...state, institucion: payload.value}

        case actions.ADD_DEP:
            const doc = state.departamentos.find( deps => deps.dep === payload.value.dep )
            if(doc)
                return {...state}
            else
                return {...state, departamentos: [...state.departamentos, payload.value]}

        case actions.REMOVE_DEP:
            return {...state, departamentos: state.departamentos.filter(dep => dep !== payload.value)}

        case actions.SET_CLIENTE:
            return {...state, cliente: payload.value}
        
        case actions.SET_TITULO_PRO:
            return {...state, tituloProInt: payload.value}
        case actions.SET_COLAB:
            return {...state, colab: payload.value}

        case actions.SET_TIPO_EJEC:
            return payload.value !== '-1' ? {...state, tipoEjec: payload.value} : {...state}

        case actions.SET_AREA_CONOC:
            return payload.value !== '-1' ? {...state, areaConoc: payload.value} : {...state}

        case actions.SET_INICIO_PERIODO:
            return {...state, periodo: {...state.periodo, inicio: payload.value}}
        
        case actions.SET_FIN_PERIODO:
            return {...state, periodo: {...state.periodo, fin: payload.value}}

        case actions.SET_MATERIA_EJE:
            return {...state, materiaEje: payload.value}

        case actions.ADD_COMPETENCIA:
            const isIn = state.asignaturas.find( asi => asi.nombre == payload.value.nombre )
            return  isIn ? {...state} : {...state, asignaturas:[...state.asignaturas, payload.value]}

        case actions.REMOVE_COMPETENCIA:
            const filtered = state.asignaturas.filter(asig => asig.nombre != payload.value)
            return {...state, asignaturas : filtered}

        case actions.ADD_COMPETENCIA_ETAPA_1:
            const newComp = state.asignaturas.map(comp=>{
                if( comp.nombre == payload.value.nombre ){
                    comp.etapa_one = payload.value.etapa
                    return comp
                }else
                    return comp
            })
            return {...state, asignaturas: newComp}
        
        case actions.ADD_COMPETENCIA_ETAPA_2:
            const newCompTwo = state.asignaturas.map(comp=>{
                if( comp.nombre == payload.value.nombre ){
                    comp.etapa_two = payload.value.etapa
                    return comp
                }else
                    return comp
            })
            return {...state, asignaturas: newCompTwo}

        case actions.ADD_COMPETENCIA_ETAPA_3:
            const newCompThree = state.asignaturas.map(comp=>{
                if( comp.nombre == payload.value.nombre ){
                    comp.etapa_three = payload.value.etapa
                    return comp
                }else
                    return comp
            })
            return {...state, asignaturas:newCompThree}
            
        case actions.ADD_ALUMNO:
            const isInAlumno = state.alumnos.find(alu => alu.ncontrol == payload.value.ncontrol)
            return isInAlumno ? {...state} :{...state, alumnos:[...state.alumnos, payload.value]}

        case actions.REMOVE_ALUMNO:
            
            const filteredAlumns = state.alumnos.filter(alu => alu.ncontrol != payload.value)
            return {...state, alumnos: filteredAlumns}
        case actions.ADD_ACTIVITY:
            console.log('ADDING ACTIVITY', {...state, cronograma: [...state.cronograma, { nactividad: payload.value, responsables:[] }]});
            return {...state, cronograma: [...state.cronograma, { nactividad: payload.value, responsables:[] }]}

        case actions.SET_NAME_ACTIVITY:
            const nameModified = state.cronograma.map(act =>{
                if(act.nactividad === payload.nactividad){
                    act.nombreActividad = payload.value
                    return act
                }else{
                    return act
                }
            })
            return { ...state, cronograma: nameModified }
        case actions.SET_DATE_ACTIVITY:
            const dateModified = state.cronograma.map(act =>{
                if(act.nactividad === payload.nactividad){
                    act.entrega = payload.value
                    return act
                }else{
                    return act
                }
            })
            return { ...state, cronograma: dateModified }
            
        case actions.ADD_ALUMN_ACTIVITY:
            console.log('ACTIVITY ADDED', payload)
            const alumnModified = state.cronograma.map(act =>{
                if(act.nactividad === payload.nactividad){
                    act.responsables =  act.responsables.find(alu => alu == payload.value) ? [...act.responsables] :[...act.responsables, payload.value]
                    return act
                }else{
                    return act
                }
            })
            return { ...state, cronograma: alumnModified }

        case actions.REMOVE_ALUMN_ACTIVITY:
            const alumnRemoved = state.cronograma.map(act =>{
                if(act.nactividad === payload.nactividad){
                    act.responsables = act.responsables.filter(alumn => alumn != payload.value)
                    return act
                }else{
                    return act
                }
            })
            return { ...state, cronograma: alumnRemoved }
        case actions.REMOVE_ACTIVITY_FROM_CRONO:
            const filteredCronograma = state.cronograma.filter(activity => activity.nactividad !== payload.value)
            console.log(filteredCronograma);
            return {...state, cronograma : filteredCronograma}

        case actions.SET_IMPACTO_PROYECTO:
            return {...state, impactoProyecto: payload.value}

        case actions.SET_PRODUCTIVIDAD_ACADEMICA:
            const isInProduct = state.productoEntrega.find( prod => prod == payload.value )
            return  isInProduct ? {...state} :{...state, productoEntrega: [...state.productoEntrega, payload.value]}

        case actions.REMOVE_PRODUCTIVIDAD_ACADEMICA:
            const newProduct = state.productoEntrega.filter(prod => prod != payload.value )
            return {...state, productoEntrega: newProduct}

        default:
            return state;
    }
}

export default reducer