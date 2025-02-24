type FormItemProps = {
    children: React.ReactNode
}

const FormItem = ({ children } : FormItemProps) => {
    return (
        <div>
            { children }
        </div>
    )
}

export default FormItem;
