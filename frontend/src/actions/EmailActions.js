import {
    SEND_EMAIL_FAIL,
    SEND_EMAIL_REQUEST,
    SEND_EMAIL_SUCCESS,



} from '../constants/EmailConstants'

import axios  from 'axios';


export const sendEMail = (list) => async(dispatch) =>{

    const config =  {

        headers :{
            "Content-Type": "multipart/form-data"
        }
    }
    
    try{
        dispatch({type:SEND_EMAIL_REQUEST})
        const {data} = await axios.post(
            'http://127.0.0.1:8000/send-email/',
            { 'ids_list':list},
            config
            )
        dispatch({
            type:SEND_EMAIL_SUCCESS,
            payload:data
        })
    }
    catch(error){
        dispatch({
            type:SEND_EMAIL_FAIL,
            payload:error.response && error.response.data.detail
            ? error.response.data.detail
            :error.message,
        })
    }
}

