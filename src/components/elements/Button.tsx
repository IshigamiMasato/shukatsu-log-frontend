type ButtonProps = {
    name: string,
    onClick?: () => void,
    className?: string,
}

const Button = ({ name, onClick, className } : ButtonProps) => {
    return (
        <button
            className={`w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center ${className}`}
            onClick={onClick}
        >
            { name }
        </button>
    )
}

export default Button;
