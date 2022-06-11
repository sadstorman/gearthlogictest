import { types } from "../types/types"

const initialState = {
    modalOpen: false,
    checking2: false
}

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.uiChecking:
            return {
                ...state,
                checking2: true,
            }
        case types.uiFinishChecking:
            return {
                ...state,
                checking2: false,
            }
        case types.uiOpenModal:
            return {
                ...state,
                modalOpen: true
            }
        case types.uiCloseModal:
            return {
                ...state,
                modalOpen: false
            }
        default:
            return state;
    }
}