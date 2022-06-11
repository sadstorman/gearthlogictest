import { ErrorMessage, useField } from "formik"
import '../../styles/formik.css'

export const MySelect = ({ label, ...props }) => {
    const [field] = useField(props)
    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <select className="select-input" {...field} {...props} />
            <ErrorMessage name={props.name} component="span" />
        </>
    )
}
