import React from 'react'
import '../../styles/login.css'
import '../../styles/buttons.css'
import { useDispatch } from 'react-redux'
import { startLogin } from '../../actions/auth'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { MyTextInput } from '../formik/MyTextInput'

export const LoginScreen = () => {

    const dispatch = useDispatch()

    return (
        <div className='auth__main'>
            <div className='auth__box-container animate__animated animate__fadeIn'>
                <img className='logo' src='./assets/icons8-world-100.png' alt='logo'/>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    onSubmit={({email, password}) => {
                        dispatch(startLogin(email, password))
                    }}
                    validationSchema={Yup.object({
                        email: Yup.string().required('Requerido'),
                        password: Yup.string().required('Requerido'),
                    })}
                >
                    {(formik) => (
                        <Form className='text-white'>
                            <MyTextInput className="mb-2"  name="email" type="email" placeholder="Email" />
                            <MyTextInput className="my-2"  name="password" type="text" placeholder="Password" />
                            <button className='auth__button btn btn-primary'>Login <i className="fa-solid fa-angle-right"></i></button>
                        </Form>
                    )
                    }
                </Formik>
            </div>
        </div>

    )
}
