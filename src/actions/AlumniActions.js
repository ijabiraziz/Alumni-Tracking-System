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
import axios from 'axios';

export const addAlumni = (
    name,
    email,
    department,
    location,
    phone,
    company,
    position,
    cgpa,
    is_employed,
    is_student,
    batch,
    program
    ) => async (dispatch)=>{

    var bodyFormData = new FormData();
    bodyFormData.append('name', name);
    bodyFormData.append('email', email);
    bodyFormData.append('department',department);
    bodyFormData.append('location', location);
    bodyFormData.append('phone', phone);
    bodyFormData.append('company', company);
    bodyFormData.append('position', position);
    bodyFormData.append('cgpa', cgpa);
    bodyFormData.append('is_employed', is_employed);
    bodyFormData.append('is_student', is_student);
    bodyFormData.append('batch', batch);
    bodyFormData.append('program', program);

    
        dispatch({
            type: ALUMNI_REQUEST
        })


        axios({
            method: "post",
            url: "http://127.0.0.1:8000/add-alumni/",
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
          })
            .then(function (response) {
                dispatch({ 
                    type:   ALUMNI_SUCCESS,
                    payload:response
                })
                   
            })
            .catch(function (response) {
              //handle error
              dispatch({
                type:ALUMNI_FAIL,
                payload:response.response && response.response.data.detail
                ? response.response.data.detail
                :response.message,
            })
            });

}


export const add_bulk_Alumni = (
    title,
    description,
    file
    ) => async (dispatch)=>{
    var bodyFormData = new FormData();
    bodyFormData.append('title', title);
    bodyFormData.append('description',description);
    bodyFormData.append('file_url', file);

        dispatch({
            type: BULK_ALUMNI_REQUEST
        })

        axios({
            method: "post",
            url: "http://127.0.0.1:8000/add-bulk-alumni/",
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
          })
            .then(function (response) {
                dispatch({ 
                    type:   BULK_ALUMNI_SUCCESS,
                    payload:response
                })
                   
            })
            .catch(function (response) {
              //handle error
              dispatch({
                type:BULK_ALUMNI_FAIL,
                payload:response.response && response.response.data.detail
                ? response.response.data.detail
                :response.message,
            })
            });

}


export const listAllAlumnis = () => async(dispatch) =>{
    try{
        dispatch({type:LIST_ALL_ALUMNI_REQUEST})
        const {data} = await axios.get('http://127.0.0.1:8000/list-alumnis/')
        dispatch({
            type:LIST_ALL_ALUMNI_SUCCESS,
            payload:data
        })
    }
    catch(error){
        dispatch({
            type:LIST_ALL_ALUMNI_FAIL,
            payload:error.response && error.response.data.detail
            ? error.response.data.detail
            :error.message,
        })
    }
}

export const search_alumni = (name_d, location_d, company_d, position_d, phone_d, email_d) => async(dispatch) =>{
    try{
      
        const {data} = await axios.post(`http://127.0.0.1:8000/search-alumni/?name=${name_d}&location=${location_d}&company=${company_d}&position=${position_d}&phone=${phone_d}&email=${email_d}`)
        dispatch({
            type:ALUMNI_SEARCH_SUCCESS,
            payload:data
        })
    }
    catch(error){
        dispatch({
            type:ALUMNI_SEARCH_FAIL,
            payload:error.response && error.response.data.detail
            ? error.response.data.detail
            :error.message,
        })
    }
}


export const get_search_alumni = () => async(dispatch) =>{
    try{
        dispatch({type:ALUMNI_SEARCH_REQUEST})
        const {data} = await axios.get(`http://127.0.0.1:8000/search-alumni/`)
        dispatch({
            type:ALUMNI_SEARCH_SUCCESS,
            payload:data
        })
    }
    catch(error){
        dispatch({
            type:ALUMNI_SEARCH_FAIL,
            payload:error.response && error.response.data.detail
            ? error.response.data.detail
            :error.message,
        })
    }
}


export const listBatches = () => async(dispatch) =>{
    try{
        dispatch({type:LIST_BATCH_REQUEST})
        const {data} = await axios.get('http://127.0.0.1:8000/list-batch/')
        dispatch({
            type:LIST_BATCH_SUCCESS,
            payload:data
        })
    }
    catch(error){
        dispatch({
            type:LIST_BATCH_FAIL,
            payload:error.response && error.response.data.detail
            ? error.response.data.detail
            :error.message,
        })
    }
}

export const listPrograms = () => async(dispatch) =>{
    try{
        dispatch({type:LIST_PROGRAM_REQUEST})
        const {data} = await axios.get('http://127.0.0.1:8000/list-program/')
        dispatch({
            type:LIST_PROGRAM_SUCCESS,
            payload:data
        })
    }
    catch(error){
        dispatch({
            type:LIST_PROGRAM_FAIL,
            payload:error.response && error.response.data.detail
            ? error.response.data.detail
            :error.message,
        })
    }
}


export const listBsAlumnis = () => async(dispatch) =>{
    try{
        dispatch({type:LIST_BS_ALUMNI_REQUEST})
        const {data} = await axios.get('http://127.0.0.1:8000/list-bs-alumnis/')
        dispatch({
            type:LIST_BS_ALUMNI_SUCCESS,
            payload:data
        })
    }
    catch(error){
        dispatch({
            type:LIST_BS_ALUMNI_FAIL,
            payload:error.response && error.response.data.detail
            ? error.response.data.detail
            :error.message,
        })
    }
}

export const listMsAlumnis = () => async(dispatch) =>{
    try{
        dispatch({type:LIST_MS_ALUMNI_REQUEST})
        const {data} = await axios.get('http://127.0.0.1:8000/list-ms-alumnis/')
        dispatch({
            type:LIST_MS_ALUMNI_SUCCESS,
            payload:data
        })
    }
    catch(error){
        dispatch({
            type:LIST_MS_ALUMNI_FAIL,
            payload:error.response && error.response.data.detail
            ? error.response.data.detail
            :error.message,
        })
    }
}

export const listPhdAlumnis = () => async(dispatch) =>{
    try{
        dispatch({type:LIST_PHD_ALUMNI_REQUEST})
        const {data} = await axios.get('http://127.0.0.1:8000/list-phd-alumnis/')
        dispatch({
            type:LIST_PHD_ALUMNI_SUCCESS,
            payload:data
        })
    }
    catch(error){
        dispatch({
            type:LIST_PHD_ALUMNI_FAIL,
            payload:error.response && error.response.data.detail
            ? error.response.data.detail
            :error.message,
        })
    }
}

export const retriveAlumni= (hash) => async(dispatch) =>{
    try{
        dispatch({type:ALUMNI_DATA_REQUEST})
        const {data} = await axios.get(`http://127.0.0.1:8000/update-alumni/${hash}`)
        dispatch({
            type:ALUMNI_DATA_SUCCESS,
            payload:data
        })
    }
    catch(error){
        dispatch({
            type:ALUMNI_DATA_FAIL,
            payload:error.response && error.response.data.detail
            ? error.response.data.detail
            :error.message,
        })
    }
}
export const updateAlumni = (
    hash,
    name,
    email,
    department,
    location,
    phone,
    company,
    position,
    cgpa,
    is_employed,
    is_student,
    batch,
    program
    ) => async (dispatch)=>{

    var bodyFormData = new FormData();
    bodyFormData.append('name', name);
    bodyFormData.append('email', email);
    bodyFormData.append('department',department);
    bodyFormData.append('location', location);
    bodyFormData.append('phone', phone);
    bodyFormData.append('company', company);
    bodyFormData.append('position', position);
    bodyFormData.append('cgpa', cgpa);
    bodyFormData.append('is_employed', is_employed);
    bodyFormData.append('is_student', is_student);
    bodyFormData.append('batch', batch);
    bodyFormData.append('program', program);

    
        dispatch({
            type: ALUMNI_UPDATE_REQUEST
        })


        axios({
            method: "patch",
            url: `http://127.0.0.1:8000/update-alumni/${hash}/`,
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
          })
            .then(function (response) {
                dispatch({ 
                    type:   ALUMNI_UPDATE_SUCCESS,
                    payload:response
                })
                   
            })
            .catch(function (response) {
              //handle error
              dispatch({
                type:ALUMNI_UPDATE_FAIL,
                payload:response.response && response.response.data.detail
                ? response.response.data.detail
                :response.message,
            })
            });

}