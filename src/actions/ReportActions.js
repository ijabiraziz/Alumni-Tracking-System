import {
    GENERATE_REPORT_FAIL,
    GENERATE_REPORT_REQUEST,
    GENERATE_REPORT_SUCCESS,

    LIST_REPORT_FAIL,
    LIST_REPORT_REQUEST,
    LIST_REPORT_SUCCESS,

} from '../constants/ReportConstants'

import axios  from 'axios';


export const generateReport = (name,list) => async(dispatch) =>{

    const config =  {

        headers :{
            "Content-Type": "multipart/form-data"
        }
    }
    
    try{
        dispatch({type:GENERATE_REPORT_REQUEST})
        const {data} = await axios.post(
            'http://127.0.0.1:8000/generate-report/',
            {'name' : name, 'search_list':list},
            config
            )
        dispatch({
            type:GENERATE_REPORT_SUCCESS,
            payload:data
        })
    }
    catch(error){
        dispatch({
            type:GENERATE_REPORT_FAIL,
            payload:error.response && error.response.data.detail
            ? error.response.data.detail
            :error.message,
        })
    }
}


export const listReports = () => async(dispatch) =>{

    const config =  {

        headers :{
            "Content-Type": "multipart/form-data"
        }
    }
    
    try{
        dispatch({type:LIST_REPORT_REQUEST})
        const {data} = await axios.get(
            'http://127.0.0.1:8000/list-reports/',
            config
            )
        dispatch({
            type:LIST_REPORT_SUCCESS,
            payload:data
        })
    }
    catch(error){
        dispatch({
            type:LIST_REPORT_FAIL,
            payload:error.response && error.response.data.detail
            ? error.response.data.detail
            :error.message,
        })
    }
}
