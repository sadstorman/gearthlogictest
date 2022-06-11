import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { startCheking } from "../actions/auth"
import { LoginScreen } from "../components/auth/LoginScreen"
import { ProductScreen } from "../components/ProductScreen"
import { SpinnerCheck } from "../components/ui/SpinnerCheck"
import { PrivateRoute } from "./PrivateRoute"
import { PublicRoute } from "./PublicRoute"


export const Navigation = () => {

    const dispatch = useDispatch();
    const { uid, checking } = useSelector(state => state.auth)
    useEffect(() => {
        dispatch(startCheking());
    }, [dispatch])

    if (checking) {
        return (<SpinnerCheck/>)
    }

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route exact path='/login' element={
                        <PublicRoute uid={uid} >
                            <LoginScreen />
                        </PublicRoute>
                    }
                    />

                    <Route exact path='/'
                        element={
                            <PrivateRoute uid={uid}>
                                <ProductScreen />
                            </PrivateRoute>
                        }
                    />

                    <Route path="/*" element={<Navigate to="/" replace />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}
