import { Action } from '../actions'

const initialState = {
    user: {}, // {id: // token: //}
    profile: {}, //
    // wishlist: [],
    // cart: [],
    // orders: []
}

export const UserReducer  = (state = initialState, action) => {

    switch(action.type){
        case Action.SIGNUP:
        case Action.LOGIN:
            console.log("=======> "+ JSON.stringify(action))
            return {
                ...state, 
                user: action.payload
            };
        case Action.LOGOUT:
            return {
                ...state, 
                user: {},
                profile: {},
            };
        case Action.PROFILE:
            console.log("=======> "+ JSON.stringify(action))
            return {
                ...state, 
                profile: action.payload,
                address: action.payload.address,
            };
        case Action.ADDED_NEW_ADDRESS:
            return {
                ...state,
                address: action.payload.address
            }
   
        default: 
            return state;


    }

}
