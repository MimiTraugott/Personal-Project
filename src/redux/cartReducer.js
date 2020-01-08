const initialState = {
    cart:[]
}

const SET_CART = 'SET_CART';
const CHARGE_COMPLETE ='CHARGE_COMPLETE'

export function setCart(cartObj){
    return {
        type: SET_CART,
        payload: cartObj
    }
}

export function chargeComplete(){
    return {
        type: CHARGE_COMPLETE
    }
}

export default function reducer(state = initialState, action){
    const {type, payload} = action
    switch(type){
        case SET_CART:
            return{...state, cart: payload}
            case CHARGE_COMPLETE:
                return{...state, cart: []}
            default:
                return state
    }
}