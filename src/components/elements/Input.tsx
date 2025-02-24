type InputProps = {
    type: string,
    name: string,
    errors: string[]|undefined,
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = ({ type, name, errors, ...props } : InputProps) => {
    return (
        <input
            type={type}
            name={name}
            { ...props }
            className={ `${errors ? 'border-red-500' : ''}` }
        />
    )
}

export default Input;
