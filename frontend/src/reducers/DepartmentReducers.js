import {
    DEPARTMENT_LIST_FAIL,
    DEPARTMENT_LIST_REQUEST,
    DEPARTMENT_LIST_SUCCESS,

} from '../constants/DepartmentConstants'


export const departmentListReducer= (state={departments:[]},action)=> {
    switch(action.type){
        case DEPARTMENT_LIST_REQUEST:
            return {loading:true , departments:[]}
        case DEPARTMENT_LIST_SUCCESS:
            return {loading:false , departments:action.payload}
        case DEPARTMENT_LIST_FAIL:
            return {loading:false ,error: action.payload}

        default :
        return state
    }
}
