type LabelProps = {
    children: React.ReactNode,
    className?: string,
} & React.LabelHTMLAttributes<HTMLLabelElement>;

const Label = ({ children, className, ... props } : LabelProps) => {
    return (
        <label
            className={`text-sm font-medium text-left w-32 ${className || ''}`}
            { ...props }
        >
            { children }
        </label>
    )
}

export default Label;
