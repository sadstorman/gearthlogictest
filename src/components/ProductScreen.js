import React, { useEffect, useRef, useState } from 'react'
import { Form, Formik } from 'formik';
import * as Yup from 'yup'
import { MyTextInput } from './formik/MyTextInput';
import { MySelect } from './formik/MySelect';
import { useDispatch, useSelector } from 'react-redux';
import { productStartLoading, productAddNew, productRemoveActive } from '../actions/products';
import gsap from 'gsap';
import { ProductCard } from './ui/ProductCard';
import { startLogOut } from '../actions/auth';
import { DeleteEventFab } from './ui/DeleteEventFab';
import { finishRefresh, startRefresh } from '../actions/ui';
import { SpinnerCheck } from './ui/SpinnerCheck';
import { ProductModal } from './ui/ProductModal';
import { MyImgInput } from './formik/MyImgInput';
import { useForm } from '../hooks/useForm';

export const ProductScreen = () => {

    const cartIcon = useRef()
    const [active, setActive] = useState(false)
    const { checking2 } = useSelector(state => state.ui)
    const { activeProduct, products } = useSelector(state => state.products)
    const dispatch = useDispatch()

    const initialForm = {
        filtro: ''
    }
    const [formValues, handleInputChange] = useForm(initialForm)
    const { filtro } = formValues

    useEffect(() => {
        dispatch(productStartLoading())
    }, [dispatch])

    const onEnter = () => {
        gsap.to(cartIcon.current, { y: -10, duration: 0.2, ease: 'ease.out' }).then(() => {
            gsap.to(cartIcon.current, { y: 0, duration: 0.6, ease: 'bounce.out' })
        })
    }
    const handleLogOut = () => {
        dispatch(startLogOut())
    }

    const handleRefresh = () => {
        dispatch(startRefresh())

        setTimeout(() => {
            dispatch(finishRefresh())
        }, 500);
    }

    const handleRemoveActive = () => {
        dispatch(productRemoveActive())
    }

    return (
        <div className='main__screen container'>
            <h1 className='text-center'> <a className='text-white' target="_blank" href="https://gearthlogic.com/"> GEARTHLOGIC</a> <img src='../assets/icons8-world-100.png ' className='main__screen_logo' /></h1>
            <button className='btn btn-danger btn-logout' onClick={handleLogOut}> Logout <i className="fa-solid fa-right-from-bracket"></i></button>
            <div className='row '>
                <div className='col '  onClick={handleRemoveActive}>
                    <div className='form__container'>
                        {!active && <button onClick={() => setActive(true)} onMouseEnter={onEnter} className='btn btn-danger btn__AddProduct animate__animated animate__backInLeft'><i ref={cartIcon} className="mx-1 fa-solid fa-cart-plus"></i> Agregar producto</button>}
                        {active &&
                            <Formik
                                initialValues={{
                                    nombre: '',
                                    precio: '',
                                    descripcion: '',
                                    categoria: '',
                                    imagen: ''
                                }}
                                onSubmit={(value) => {
                                    dispatch(productAddNew(value))
                                    setActive(false)
                                    handleRefresh()
                                }}
                                validationSchema={Yup.object({
                                    nombre: Yup.string().min(2, 'debe tener mas de 2 letras').required('Requerido'),
                                    precio: Yup.number().required('Requerido').positive('Tiene que ser un valor positivo').integer(),
                                    descripcion: Yup.string().max(150, 'No se aceptan mas de 150 caracteres').required('Required'),
                                    imagen: Yup.mixed().required('Required'),
                                    categoria: Yup.string().oneOf(['electrodomestico', 'computacion', 'jardineria', 'vehiculo', 'alimento']).required('Required')
                                })}
                            >
                                {(formik) => (
                                    <Form className='text-white animate__animated animate__bounceIn'>
                                        <MyTextInput label="Producto" name="nombre" type="text" placeholder="Celular" />
                                        <MyTextInput label="Precio" name="precio" type="number" placeholder="8500$" />
                                        <MyTextInput label="Descripción" name="descripcion" type="text" placeholder="Celular motorla G30 1080HD" />
                                        <MyImgInput label="Imagen" name="imagen" type="file" placeholder="motorola.jpg" />
                                        <MySelect label="Categoria" name="categoria">
                                            <option value="">Elija una categoria </option>
                                            <option value="electrodomestico">Electrodomestico </option>
                                            <option value="computacion"> Computación </option>
                                            <option value="jardineria"> Jardineria </option>
                                            <option value="vehiculo"> Vehiculo </option>
                                            <option value="alimento"> Alimento </option>
                                        </MySelect>
                                        <button className='btn btn-primary' type='submit'>Submit</button>
                                    </Form>
                                )
                                }
                            </Formik>
                        }
                    </div>
                </div>
                <div className='col text-white'>
                    <div className='row'>
                        <select className=" form-select" name="filtro" value={filtro} onChange={handleInputChange} aria-label="Default select example">
                            <option value="">Elija una categoria </option>
                            <option value="electrodomestico">Electrodomestico </option>
                            <option value="computacion"> Computación </option>
                            <option value="jardineria"> Jardineria </option>
                            <option value="vehiculo"> Vehiculo </option>
                            <option value="alimento"> Alimento </option>
                        </select>
                        {
                            (checking2)
                                ? <SpinnerCheck />
                                : products.map((producto, index) => (<ProductCard key={index} filtro={filtro} reload={checking2} props={producto} />))
                        }
                    </div>
                </div>
            </div>
            {(activeProduct) && <DeleteEventFab />}
            <ProductModal />
        </div>
    )
}
