import { ErrorMessage, useField } from "formik"
import '../../styles/formik.css'

export const MyImgInput = ({ label, ...props }) => {

    const [field] = useField(props)
    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <input type="file" accept="image/*"  className="text-input margenes" {...field} {...props} />
            <ErrorMessage name={props.name} component="span" />
        </>
    )
}
