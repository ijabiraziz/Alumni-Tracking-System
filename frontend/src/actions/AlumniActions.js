import {
    ALUMNI_FAIL,
    ALUMNI_REQUEST,
    ALUMNI_SUCCESS,
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
