type TextareaProps = {
    name: string,
    errors?: string[]|undefined,
    rows?: number,
    value?: string,
    className?: string,
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = ({ name, errors, rows, value, className, ...props } : TextareaProps) => {
    return (
        <textarea
            name={name}
            value={value}
            rows={rows ? rows : 4}
            { ...props }
            className={ `bg-gray-50 border border-gray-300 rounded-lg p-2 w-full ${errors ? 'border-2 border-red-500' : ''} ${className}` }
        />
    )
}

export default Textarea;
