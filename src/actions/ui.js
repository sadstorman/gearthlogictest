import { types } from "../types/types";


export const startRefresh = () => ({
    type: types.uiChecking
})

export const finishRefresh = () => ({
    type: types.uiFinishChecking
})

export const uiOpenModal = ( ) => ({
    type: types.uiOpenModal
})
export const uiCloseModal = ( ) => ({
    type: types.uiCloseModal
})