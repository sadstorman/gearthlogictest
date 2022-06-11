import { types } from "../types/types"

const initialState = {
    products: [],
    activeProduct: null
}


export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.startLoadingProducts:
            return {
                ...state,
                products: [...action.payload]
            }
        case types.addNewProduct:
            return {
                ...state,
                products: [
                    ...state.products,
                    action.payload
                ]
            }
        case types.productRemoveActive:
            return {
                ...state,
                activeProduct: null
            }
        case types.deleteProduct:
            return {
                ...state,
                products: state.products.filter(
                    e => (e !== state.activeProduct.id)
                ),
                activeProduct: null
            }
        case types.productSetActive:
            return {
                ...state,
                activeProduct: action.payload
            }
        default:
            return state;
    }
}