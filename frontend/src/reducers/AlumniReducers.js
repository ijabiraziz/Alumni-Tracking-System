import {
    ALUMNI_FAIL,
    ALUMNI_REQUEST,
    ALUMNI_SUCCESS,
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