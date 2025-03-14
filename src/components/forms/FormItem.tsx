type FormItemProps = {
    className?: string,
    children: React.ReactNode
}

const FormItem = ({ children, className } : FormItemProps) => {
    return (
        <div className={`mb-5 ${className || ''}`}>
            { children }
        </div>
    )
}

export default FormItem;
