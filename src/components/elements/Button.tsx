type ButtonProps = {
    onClick?: () => void,
    className?: string,
    children: React.ReactNode,
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ onClick, className, children, ...props } : ButtonProps) => {
    return (
        <button
            className={`font-medium rounded-lg text-sm px-5 py-2.5 text-center ${className}`}
            onClick={onClick}
            { ...props }
        >
            { children }
        </button>
    )
}

export default Button;
