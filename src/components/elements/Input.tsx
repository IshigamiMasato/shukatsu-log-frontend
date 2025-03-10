type InputProps = {
    type: string,
    name: string,
    errors?: string[]|undefined,
    className?: string,
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = ({ type, name, errors, className, ...props } : InputProps) => {
    return (
        <input
            type={type}
            name={name}
            { ...props }
            className={ `bg-gray-50 border border-gray-300 rounded-lg text-sm p-2 w-full ${errors ? 'border-2 border-red-500' : ''} ${className || ''}` }
        />
    )
}

export default Input;
