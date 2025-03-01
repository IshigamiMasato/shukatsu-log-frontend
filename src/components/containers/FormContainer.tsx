type Props = {
    children: React.ReactNode,
    className?: string,
}

const FormContainer = ({ children, className } : Props) => {
    return (
        <div className={`w-full sm:max-w-lg max-w-sm p-4 bg-white mx-auto ${className}`}>
            { children }
        </div>
    )
}

export default FormContainer;
