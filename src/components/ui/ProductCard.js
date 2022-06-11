import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { productSetActive, productStartLoading } from '../../actions/products'
import { uiOpenModal } from '../../actions/ui'
import '../../styles/card.css'

export const ProductCard = ({ reload, props, filtro }) => {
    const dispatch = useDispatch()
    const [productoID] = Object.keys(props).map(key => (key))
    const [name] = Object.keys(props).map(key => (props[key]))
    const { categoria, descripcion, imagen, nombre, precio } = name
    const url = `https://es.wikipedia.org/wiki/${nombre}`
    const url2 = `https://listado.mercadolibre.com.ar/${nombre}#D[A:${nombre}]`
    const handleDelete = () => {
        dispatch(productSetActive(productoID))
    }
    useEffect(() => {
        dispatch(productStartLoading())
    }, [reload])

    const handleModal = () => {
        dispatch(uiOpenModal())
    }

    return (
        <>
            {
                (filtro === '')
                    ? (
                        <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 card__container animate__animated animate__backInRight'>
                            <div onDoubleClick={handleModal} className="card text-black text-center mt-4 ">
                                <img onClick={handleDelete} src="https://azul.solutekla.com/photo/1/motorola/celulares/motorola_moto_z2_play_xt171006_negro/motorola_moto_z2_play_xt171006_negro_0001" className="pointer card-img-top" alt="..." />
                                <div onClick={handleDelete} className="pointer card-body">
                                    <h5 className="card-title text-left">{nombre}</h5>
                                    <p className="card-text text-black">{descripcion}</p>
                                </div>
                                <ul onClick={handleDelete} className="pointer list-group list-group-flush">
                                    <li className="list-group-item"><b>Categoria:</b> {categoria}</li>
                                    <li className="list-group-item"><b>Precio:</b> {precio} $</li>
                                </ul>
                                <div className="card-body anchor__margen">
                                    <a target="_blank" href={url2} className=" btn btn-primary btn-card btn-card-l">Comprar</a>
                                    <a target="_blank" href={url} className=" btn btn-primary btn-card"> + info</a>
                                </div>
                            </div>
                        </div>
                    )
                    : (filtro === categoria)
                        ? (<div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 card__container animate__animated animate__backInRight'>
                            <div onDoubleClick={handleModal} className="card text-black text-center mt-4 ">
                                <img onClick={handleDelete} src="https://azul.solutekla.com/photo/1/motorola/celulares/motorola_moto_z2_play_xt171006_negro/motorola_moto_z2_play_xt171006_negro_0001" className="pointer card-img-top" alt="..." />
                                <div onClick={handleDelete} className="pointer card-body">
                                    <h5 className="card-title text-left">{nombre}</h5>
                                    <p className="card-text text-black">{descripcion}</p>
                                </div>
                                <ul onClick={handleDelete} className="pointer list-group list-group-flush">
                                    <li className="list-group-item"><b>Categoria:</b> {categoria}</li>
                                    <li className="list-group-item"><b>Precio:</b> {precio} $</li>
                                </ul>
                                <div className="card-body anchor__margen">
                                    <a target="_blank" href={url2} className=" btn btn-primary btn-card btn-card-l">Comprar</a>
                                    <a target="_blank" href={url} className=" btn btn-primary btn-card"> + info</a>
                                </div>
                            </div>
                        </div>)
                        : ''
            }
        </>

    )
}
