import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../styles/modal.css'
import Modal from 'react-modal';
import { finishRefresh, startRefresh, uiCloseModal } from '../../actions/ui';
import { Form, Formik } from 'formik';
import { MyTextInput } from '../formik/MyTextInput';
import { MySelect } from '../formik/MySelect';
import * as Yup from 'yup'
import { productUpdate } from '../../actions/products';
import { MyImgInput } from '../formik/MyImgInput';
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        height: '500px'
    }
};
Modal.setAppElement('#root');

export const ProductModal = () => {
    const dispatch = useDispatch()
    const { modalOpen } = useSelector(state => state.ui)
    const closeModal = () => {
        dispatch(uiCloseModal())
    }
    return (
        <Modal
            isOpen={modalOpen}
            onRequestClose={closeModal}
            style={customStyles}
            closeTimeoutMS={200}
            className="modal"
            overlayClassName="modal-fondo"
        >
            <Formik
                initialValues={{
                    nombre: '',
                    precio: '',
                    descripcion: '',
                    categoria: '',
                    imagen: ''
                }}
                onSubmit={(value) => {
                    dispatch(productUpdate(value))
                    dispatch(startRefresh())
                    setTimeout(() => {
                        dispatch(finishRefresh())
                    }, 500);
                    closeModal()
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
                    <Form className='modal-container text-white animate__animated animate__bounceIn'>
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
                )}
            </Formik>
        </Modal>
    )
};