type FormItemProps = {
    children: React.ReactNode
}

const FormItem = ({ children } : FormItemProps) => {
    return (
        <div className="mb-5">
            { children }
        </div>
    )
}

export default FormItem;
