import {
    GENERATE_REPORT_FAIL,
    GENERATE_REPORT_REQUEST,
    GENERATE_REPORT_SUCCESS,

    LIST_REPORT_FAIL,
    LIST_REPORT_REQUEST,
    LIST_REPORT_SUCCESS,

} from '../constants/ReportConstants'


export const generateReportReducers= (state={},action)=> {
    switch(action.type){
        case GENERATE_REPORT_REQUEST:
            return {loading:true }
        case GENERATE_REPORT_SUCCESS:
            return {loading:false , submitedReports:action.payload}
        case GENERATE_REPORT_FAIL:
            return {loading:false ,error: action.payload}
        default :
        return state
    }
}


export const reportListReducer= (state={reports:[]},action)=> {
    switch(action.type){
        case LIST_REPORT_REQUEST:
            return {loading:true , reports:[]}
        case LIST_REPORT_SUCCESS:
            return {loading:false , reports:action.payload}
        case LIST_REPORT_FAIL:
            return {loading:false ,error: action.payload}

        default :
        return state
    }
}
