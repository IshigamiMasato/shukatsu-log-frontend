type TextareaProps = {
    name: string,
    errors: string[]|undefined,
    rows?: number,
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = ({ name, errors, rows } : TextareaProps) => {
    return (
        <textarea
            name={name}
            rows={rows ? rows : 4}
            className={ `bg-gray-50 border border-gray-300 rounded-lg text-sm p-2 w-full ${errors ? 'border-2 border-red-500' : ''}` }
        />
    )
}

export default Textarea;
