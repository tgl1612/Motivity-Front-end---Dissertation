import axios from '../../axios-instance';

import * as actionTypes from './actionTypes';

export const authStart = ()=>{
    return{
        type:actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId)=>{
    return{
        type:actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId,
    };
};

export const authFail = (error)=>{
    return{
        type:actionTypes.AUTH_FAIL,
        error:error
    };
};

export const logout = () =>{
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('id');


    return{
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime)=>{
    return dispatch =>{
        setTimeout(()=>{
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const authCheckState = () =>{
    return dispatch =>{
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logout());
        }else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate <= new Date()){
                dispatch(logout());
            }else{
                const userId = localStorage.getItem('id');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }
        }
    };
};

export const auth = (user, pass) =>{
    return dispatch =>{
        dispatch(authStart());
        const authData ={
            user: user,
            pass: pass,
        }
        axios.post('auth/login', authData)
        .then(response=>{
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn *1000)
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('id', response.data.userId);

            dispatch(authSuccess(response.data.token, response.data.userId));
            dispatch(checkAuthTimeout(response.data.expiresIn));
        })
        .catch(err=>{
            dispatch(authFail(err.response.data.message));
        });
    
    };
};