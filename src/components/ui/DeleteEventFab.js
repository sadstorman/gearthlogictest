import React from 'react'
import { useDispatch } from 'react-redux'
import { productStartDelete, productStartLoading } from '../../actions/products'
import { finishRefresh, startRefresh } from '../../actions/ui'
import '../../styles/fab.css'
export const DeleteEventFab = () => {

    const dispatch = useDispatch()

    const handleDelete = () => {
        dispatch(productStartDelete())

        dispatch(startRefresh())

        setTimeout(() => {
            dispatch(finishRefresh())
        }, 500);
    }

    return (
        <button
            className='btn btn-danger fab-danger animate__animated animate__backInLeft'
            onClick={handleDelete}
        >
            <i className='fas fa-trash'></i>
            <span> Borrar producto</span>
        </button>
    )
}
