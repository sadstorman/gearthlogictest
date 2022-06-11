import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";


export const productStartLoading = () => {

    const token = localStorage.getItem('token') || ''
    const url = `https://gearthlogicadmision-default-rtdb.firebaseio.com/products.json?auth=${token}`

    return async (dispatch) => {
        try {

            const resp = await fetchConToken(url)
            const body = await resp.json()
            const productos = Object.keys(body).map(key => ({ [key]: body[key] }))
            dispatch(productLoad(productos))

        } catch (error) {
            console.log(error);
        }
    }
}

const productLoad = (productos) => ({
    type: types.startLoadingProducts,
    payload: productos
})

export const productAddNew = (product) => {

    const token = localStorage.getItem('token') || ''
    const url = `https://gearthlogicadmision-default-rtdb.firebaseio.com/products.json?auth=${token}`

    return async (dispatch) => {
        try {
            const resp = await fetchConToken(url, product, 'POST')
            const body = await (await resp).json()
            if (!body.error) {
                dispatch(addNew(product))
                Swal.fire('Producto agregado', 'ok', 'success')
            } else {
                Swal.fire('Error', 'Algo salio mal', 'error')
            }
        } catch (error) {
            console.log(error);
        }
    }

}

export const productUpdate = (product) => {

    return async (dispatch, getState) => {
        const id = getState().products.activeProduct
        const token = localStorage.getItem('token') || ''
        const url = `https://gearthlogicadmision-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}`

        try {
            const resp = await fetchConToken(url, product , 'PATCH')
            const body = await resp.json()

            if (body != null) {
                dispatch(productUpdated())
                Swal.fire('Producto actualizado', 'ok', 'success')
            } else {
                Swal.fire('Error', 'error')
            }
        } catch (error) {
            console.log(error);
        }

    }

}
export const productRemoveActive = () => ({
    type: types.productRemoveActive
})

const productUpdated = (product) => ({
    type: types.updateProduct,
    payload: product
})

const addNew = (product) => ({
    type: types.addNewProduct,
    payload: product
})

export const productSetActive = (product) => ({
    type: types.productSetActive,
    payload: product
})

export const productStartDelete = () => {
    return async (dispatch, getState) => {
        const id = getState().products.activeProduct
        const token = localStorage.getItem('token') || ''
        const url = `https://gearthlogicadmision-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}`

        try {
            const resp = await fetchConToken(url, {}, 'DELETE')
            const body = await resp.json()

            if (body == null) {
                dispatch(productDeleted())
                Swal.fire('Producto eliminado','ok', 'success')
            } else {
                Swal.fire('Error','Ocurrio un error', 'error')
            }
        } catch (error) {
            console.log(error);
        }

    }
}
const productDeleted = () => ({
    type: types.deleteProduct
})