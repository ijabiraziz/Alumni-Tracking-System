import {
    DASHBOARD_FAIL,
    DASHBOARD_REQUEST,
    DASHBOARD_SUCCESS,

    DASHBOARD_TABLE_FAIL,
    DASHBOARD_TABLE_REQUEST,
    DASHBOARD_TABLE_SUCCESS,
    
} from '../constants/DashboardConstants'


import axios  from 'axios';


export const getDashboardstats = () => async(dispatch) =>{


    try{
        dispatch({type:DASHBOARD_REQUEST})
        const {data} = await axios.get('http://127.0.0.1:8000/dashboard-stats/')
        dispatch({
            type:DASHBOARD_SUCCESS,
            payload:data
        })
    }
    catch(error){
        dispatch({
            type:DASHBOARD_FAIL,
            payload:error.response && error.response.data.detail
            ? error.response.data.detail
            :error.message,
        })
    }
}

export const listRecentAlumnis = () => async(dispatch) =>{
    try{
        dispatch({type:DASHBOARD_TABLE_REQUEST})
        const {data} = await axios.get('http://127.0.0.1:8000/recent_alumnis/')
        dispatch({
            type:  DASHBOARD_TABLE_SUCCESS,
            payload:data
        })
    }
    catch(error){
        dispatch({
            type:  DASHBOARD_TABLE_FAIL,
            payload:error.response && error.response.data.detail
            ? error.response.data.detail
            :error.message,
        })
    }
}
