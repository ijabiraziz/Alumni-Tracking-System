import {
    DEPARTMENT_LIST_FAIL,
    DEPARTMENT_LIST_REQUEST,
    DEPARTMENT_LIST_SUCCESS,

} from '../constants/DepartmentConstants'

import axios  from 'axios';


export const listDepartments = () => async(dispatch) =>{
    try{
        dispatch({type:DEPARTMENT_LIST_REQUEST})
        const {data} = await axios.get('http://127.0.0.1:8000/list-departments/')
        dispatch({
            type:DEPARTMENT_LIST_SUCCESS,
            payload:data
        })
    }
    catch(error){
        dispatch({
            type:DEPARTMENT_LIST_FAIL,
            payload:error.response && error.response.data.detail
            ? error.response.data.detail
            :error.message,
        })
    }
}
