type SelectProps = {
    errors?: string[]|undefined,
    className?: string,
    children: React.ReactNode,
} & React.SelectHTMLAttributes<HTMLSelectElement>;

const Select = ({ name, value, onChange, children, errors, className, ...props } : SelectProps) => {
    return (
        <select
            name={ name }
            value={ value }
            onChange={ onChange }
            { ...props }
            className={ `bg-gray-50 border border-gray-300 rounded-lg text-sm p-2 w-full ${errors ? 'border-2 border-red-500' : ''} ${className}` }
        >
            { children }
        </select>
    )
}

export default Select;
