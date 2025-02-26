type TextareaProps = {
    name: string,
    errors: string[]|undefined,
    rows?: number,
    value?: string,
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = ({ name, errors, rows, value, ...props } : TextareaProps) => {
    return (
        <textarea
            name={name}
            value={value}
            rows={rows ? rows : 4}
            { ...props }
            className={ `bg-gray-50 border border-gray-300 rounded-lg text-sm p-2 w-full ${errors ? 'border-2 border-red-500' : ''}` }
        />
    )
}

export default Textarea;
