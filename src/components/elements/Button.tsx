type ButtonProps = {
    onClick?: () => void,
    className?: string,
    children: React.ReactNode,
}

const Button = ({ onClick, className, children } : ButtonProps) => {
    return (
        <button
            className={`w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center ${className}`}
            onClick={onClick}
        >
            { children }
        </button>
    )
}

export default Button;
