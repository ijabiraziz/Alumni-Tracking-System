import {
    ALUMNI_FAIL,
    ALUMNI_REQUEST,
    ALUMNI_SUCCESS,

    BULK_ALUMNI_FAIL,
    BULK_ALUMNI_REQUEST,
    BULK_ALUMNI_SUCCESS,

    LIST_ALL_ALUMNI_FAIL,
    LIST_ALL_ALUMNI_REQUEST,
    LIST_ALL_ALUMNI_SUCCESS,

    LIST_BS_ALUMNI_FAIL,
    LIST_BS_ALUMNI_REQUEST,
    LIST_BS_ALUMNI_SUCCESS,

    LIST_MS_ALUMNI_FAIL,
    LIST_MS_ALUMNI_REQUEST,
    LIST_MS_ALUMNI_SUCCESS,

    LIST_PHD_ALUMNI_FAIL,
    LIST_PHD_ALUMNI_REQUEST,
    LIST_PHD_ALUMNI_SUCCESS,

    LIST_BATCH_FAIL,
    LIST_BATCH_REQUEST,
    LIST_BATCH_SUCCESS,

    LIST_PROGRAM_FAIL,
    LIST_PROGRAM_REQUEST,
    LIST_PROGRAM_SUCCESS,  

    ALUMNI_UPDATE_FAIL,
    ALUMNI_UPDATE_REQUEST,
    ALUMNI_UPDATE_SUCCESS,  

    ALUMNI_DATA_FAIL,
    ALUMNI_DATA_REQUEST,
    ALUMNI_DATA_SUCCESS,  

    ALUMNI_SEARCH_FAIL,
    ALUMNI_SEARCH_REQUEST,
    ALUMNI_SEARCH_SUCCESS,  

    


} from '../constants/AlumniConstants'

export const alumniReducer= (state={},action)=> {
    switch(action.type){
        case ALUMNI_REQUEST:
            return {loading:true }
        case ALUMNI_SUCCESS:
            return {loading:false , alumni:action.payload}
        case ALUMNI_FAIL:
            return {loading:false ,error: action.payload}
        default :
        return state
    }
}

export const bulk_alumniReducer= (state={},action)=> {
    switch(action.type){
        case BULK_ALUMNI_REQUEST:
            return {loading:true }
        case BULK_ALUMNI_SUCCESS:
            return {loading:false , bulk_alumni:action.payload}
        case BULK_ALUMNI_FAIL:
            return {loading:false ,error: action.payload}
        default :
        return state
    }
}


export const ListAllAlumniReducer= (state={all_alumni:[]},action)=> {
    switch(action.type){
        case LIST_ALL_ALUMNI_REQUEST:
            return {loading:true , all_alumni:[]}
        case LIST_ALL_ALUMNI_SUCCESS:
            return {loading:false , all_alumni:action.payload}
        case LIST_ALL_ALUMNI_FAIL:
            return {loading:false ,error: action.payload}

        default :
        return state
    }
}

export const ListSearchAlumniReducer= (state={search_alumni:[]},action)=> {
    switch(action.type){
        case ALUMNI_SEARCH_REQUEST:
            return {loading:true , search_alumni:[]}
        case ALUMNI_SEARCH_SUCCESS:
            return {loading:false , search_alumni:action.payload}
        case ALUMNI_SEARCH_FAIL:
            return {loading:false ,error: action.payload}

        default :
        return state
    }
}

export const ListBatchReducer= (state={batch_list:[]},action)=> {
    switch(action.type){
        case LIST_BATCH_REQUEST:
            return {loading:true , batch_list:[]}
        case LIST_BATCH_SUCCESS:
            return {loading:false , batch_list:action.payload}
        case LIST_BATCH_FAIL:
            return {loading:false ,error: action.payload}

        default :
        return state
    }
}

export const ListProgramReducer= (state={program_list:[]},action)=> {
    switch(action.type){
        case LIST_PROGRAM_REQUEST:
            return {loading:true , program_list:[]}
        case LIST_PROGRAM_SUCCESS:
            return {loading:false , program_list:action.payload}
        case LIST_PROGRAM_FAIL:
            return {loading:false ,error: action.payload}

        default :
        return state
    }
}


export const ListBsAlumniReducer= (state={bs_alumni:[]},action)=> {
    switch(action.type){
        case LIST_BS_ALUMNI_REQUEST:
            return {loading:true , bs_alumni:[]}
        case LIST_BS_ALUMNI_SUCCESS:
            return {loading:false , bs_alumni:action.payload}
        case LIST_BS_ALUMNI_FAIL:
            return {loading:false ,error: action.payload}
        default :
        return state
    }
}

export const ListMsAlumniReducer= (state={ms_alumni:[]},action)=> {
    switch(action.type){
        case LIST_MS_ALUMNI_REQUEST:
            return {loading:true , ms_alumni:[]}
        case LIST_MS_ALUMNI_SUCCESS:
            return {loading:false , ms_alumni:action.payload}
        case LIST_MS_ALUMNI_FAIL:
            return {loading:false ,error: action.payload}
        default :
        return state
    }
}

export const ListPhdAlumniReducer= (state={phd_alumni:[]},action)=> {
    switch(action.type){
        case LIST_PHD_ALUMNI_REQUEST:
            return {loading:true , phd_alumni:[]}
        case LIST_PHD_ALUMNI_SUCCESS:
            return {loading:false , phd_alumni:action.payload}
        case LIST_PHD_ALUMNI_FAIL:
            return {loading:false ,error: action.payload}
        default :
        return state
    }
}


export const alumniRetriveReducer= (state={},action)=> {
    switch(action.type){
        case ALUMNI_DATA_REQUEST:
            return {loading:true }
        case ALUMNI_DATA_SUCCESS:
            return {loading:false , alumni:action.payload}
        case ALUMNI_DATA_FAIL:
            return {loading:false ,error: action.payload}
        default :
        return state
    }
}

export const alumniUpdateReducer= (state={},action)=> {
    switch(action.type){
        case ALUMNI_UPDATE_REQUEST:
            return {loading:true }
        case ALUMNI_UPDATE_SUCCESS:
            return {loading:false , alumni:action.payload}
        case ALUMNI_UPDATE_FAIL:
            return {loading:false ,error: action.payload}
        default :
        return state
    }
}

