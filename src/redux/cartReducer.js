const initialState = {
    cart:[]
}

const SET_CART = 'SET_CART';

export function setCart(cartObj){
    return {
        type: SET_CART,
        payload: cartObj
    }
}

export default function reducer(state = initialState, action){
    const {type, payload} = action
    switch(type){
        case SET_CART:
            return{...state, cart: payload}
            default:
                return state
    }
}