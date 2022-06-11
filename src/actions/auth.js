
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { fetchConToken, fetchSinToken } from "../helpers/fetch"
import { types } from "../types/types"

export const startLogin = (email, password) => {

    const key = "AIzaSyA8IjCdIg54Lb4K5N3IcIxk4x-fZ_a6KS4"
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`

    return async (dispatch) => {
        const resp = await fetchSinToken(url, { email, password, returnSecureToken: true }, 'POST');
        const body = await resp.json()

        if (!body.error) {
            localStorage.setItem('refreshToken', body.refreshToken);
            localStorage.setItem('token', body.idToken);

            dispatch(login({
                uid: body.localId,
                name: body.displayName
            }))
        } else {
            Swal.fire('Error', body.msg, 'error')
        }

    }
}

const login = (user) => ({
    type: types.authLogin,
    payload: user
})


export const startLogOut = () => {
    return (dispatch) => {
        localStorage.clear()
        dispatch(logout())
    }
}

const logout = () => ({
    type: types.authLogout
})

export const startCheking = () => {
    
    const key = "AIzaSyA8IjCdIg54Lb4K5N3IcIxk4x-fZ_a6KS4"
    const url = `https://securetoken.googleapis.com/v1/token?key=${key}`
    const url2 = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${key}`

    return async (dispatch) => {
        const refresh_token = localStorage.getItem('refreshToken') || ''
        const resp = await fetchConToken(url, { "grant_type": "refresh_token", "refresh_token": refresh_token }, 'POST');
        const body = await resp.json()

        if (!body.error) {
            const resp = await fetchConToken(url2, { "idToken": body.id_token }, 'POST');
            const cuerpo = await resp.json()
            dispatch(login({
                uid: cuerpo.users[0].localId,
                name: cuerpo.users[0].displayName || ''
            }))

        } else {
            dispatch(checkingFinish())
            localStorage.clear()
        }
    }
}

const checkingFinish = () => ({
    type: types.authCheckingFinish,
    payload: null
})
