import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,

    USER_LOGOUT,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,

    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET,
    

    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_RESET,

    USER_UPDATE_PASSWORD_REQUEST,
    USER_UPDATE_PASSWORD_SUCCESS,
    USER_UPDATE_PASSWORD_FAIL,

} from  '../constants/UserConstants';
import axios  from 'axios';

export const login = (email , password) => async (dispatch)=>{

    var bodyFormData = new FormData();
    bodyFormData.append('email', email);
    bodyFormData.append('password',password);
    

    const config =  {

        headers :{
            'Content-type':'multipart/form-data'
        }
    }
  
    
    
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        
        axios({
            method: "post",
            url: "http://127.0.0.1:8000/login/",
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
          })
            .then(function (response) {
              //handle success
              dispatch(
                { 
                 type: USER_LOGIN_SUCCESS,
                 payload:response
             }
             )
             localStorage.setItem('userInfo',JSON.stringify(response))
            })
            .catch(function (error) {
              //handle error
              dispatch({
                type:USER_LOGIN_FAIL,
                payload:error.response && error.response.data.detail
                ? error.response.data.detail
                :error.message,
            })
            });

    }


export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({type:USER_LOGOUT} )
    dispatch({type:USER_DETAILS_RESET} )
}



export const getUserDetails = (token) => async(dispatch) =>{


    try{
        dispatch({type:USER_DETAILS_REQUEST})

        const config =  {

            headers :{
                'Content-type':'application/json',
                Authorization : `Bearer ${token}`
            }
        }


        const {data} = await axios.get('http://127.0.0.1:8000/user-profile/',config)
        dispatch({
            type:USER_DETAILS_SUCCESS,
            payload:data
        })
    }
    catch(error){
        dispatch({
            type:USER_DETAILS_FAIL,
            payload:error.response && error.response.data.detail
            ? error.response.data.detail
            :error.message,
        })
    }
}


export const updateUserProfile = (name, email, token) => async (dispatch)=>{
    try{

        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST
        })

   
        const config =  {

            headers :{
                'Content-type':'application/json',
                Authorization : `Bearer ${token}`
            }
        }
        const {data} = await axios.put(
            `http://127.0.0.1:8000/update-user/`,
            {'name':name, 'email':email},
            config
        )
        dispatch({ 
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload:data
        })
        dispatch({ 
            type: USER_LOGIN_SUCCESS,
            payload:data
        })
        localStorage.setItem('userInfo',JSON.stringify(data))


    } 
    catch(error){

        dispatch({
            type:USER_UPDATE_PROFILE_FAIL,
            payload:error.response && error.response.data.detail
            ? error.response.data.detail
            :error.message,
        })

    }
}


export const register = (name,department_id, email , password) => async (dispatch)=>{
    var bodyFormData = new FormData();
    bodyFormData.append('name', name);
    bodyFormData.append('department_id',department_id);
    bodyFormData.append('email', email);
    bodyFormData.append('password',password);

    var bodyFormData1 = new FormData();
    bodyFormData1.append('email', email);
    bodyFormData1.append('password',password);
    

        dispatch({
            type: USER_REGISTER_REQUEST
        })


        axios({
            method: "post",
            url: "http://127.0.0.1:8000/register/",
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
          })
            .then(function (response) {
                dispatch({ 
                    type: USER_REGISTER_SUCCESS,
                    payload:response
                })

                axios({
                    method: "post",
                    url: "http://127.0.0.1:8000/login/",
                    data: bodyFormData1,
                    headers: { "Content-Type": "multipart/form-data" },
                  })
                    .then(function (response) {
                      //handle success
                      dispatch(
                        { 
                         type: USER_LOGIN_SUCCESS,
                         payload:response
                     }
                     )
                     localStorage.setItem('userInfo',JSON.stringify(response))
                    })
                    .catch(function (error) {
                      //handle error
                      dispatch({
                        type:USER_LOGIN_FAIL,
                        payload:error.response && error.response.data.detail
                        ? error.response.data.detail
                        :error.message,
                    })
                    });
        
                

                localStorage.setItem('userInfo',JSON.stringify(response))
              console.log(response);
            })
            .catch(function (response) {
              //handle error
              dispatch({
                type:USER_REGISTER_FAIL,
                payload:response.response && response.response.data.detail
                ? response.response.data.detail
                :response.message,
            })
              console.log(response);
            });

}



export const changePassword = (currentPassword , newPassword, token) => async (dispatch)=>{

    var bodyFormData = new FormData();
    bodyFormData.append('current_password', currentPassword);
    bodyFormData.append('new_password',newPassword);
    

  
    try{

        dispatch({
            type: USER_UPDATE_PASSWORD_REQUEST
        })

        const config =  {

            headers :{
                'Content-Type': 'application/json',
                Authorization : `Bearer ${token}`
            }
        }

        const {data} =axios({
            method: "put",
            url: "http://127.0.0.1:8000/change-password/",
            data: bodyFormData,
            headers: config,
          })

        dispatch({ 
            type: USER_UPDATE_PASSWORD_SUCCESS,
            payload:data
        })


    }
    catch(error){

        dispatch({
            type:USER_UPDATE_PASSWORD_FAIL,
            payload:error.response && error.response.data.detail
            ? error.response.data.detail
            :error.message,
        })

    }
}


