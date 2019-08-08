import reducer from './reducer';
import * as actionTypes from '../actions/actionTypes';

//Unit tests on the reducer

describe('Reducer Unit Tests', ()=>{
    it('should return the initial state', ()=>{
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false
        })
    })
    it('should store the token upon login', ()=>{
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false
        },{
            type:actionTypes.AUTH_SUCCESS,
            token: 'abc',
            userId:'1'
        })).toEqual({
            token: 'abc',
            userId: '1',
            error: null,
            loading: false
        })
    })
    it('should change state of loading to true', ()=>{
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false
        }
            ,{
                type:actionTypes.AUTH_START
            }
        )).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: true
        })
    })
    it('should asign a value to error if auth fails',()=>{
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false
        }
            ,{
                type:actionTypes.AUTH_FAIL,
                error: 'ERROR'
            }
        )).toEqual({
            token: null,
            userId: null,
            error: "ERROR",
            loading: false
        })
    })
    it('should change value of token and userId to null on logout',()=>{
        expect(reducer({
            token: 'abc',
            userId: '1',
            error: null,
            loading: false
        }
            ,{
                type:actionTypes.AUTH_LOGOUT,
            }
        )).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false
        })
    })




})

