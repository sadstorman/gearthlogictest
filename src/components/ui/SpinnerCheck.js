import React from 'react'
import { Spinner } from 'react-bootstrap'

export const SpinnerCheck = () => {
    return (
        <div className='text-center'>
            <div className='spinner text-center'>
            <h2 className='text-white'>Cargando...</h2>
                <Spinner animation="border" variant="primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        </div>

    )
}
