type LabelProps = {
    label: string,
    className?: string,
}

const Label = ({ label, className } : LabelProps) => {
    return (
        <label className={`text-sm font-medium text-left w-32 ${className || ''}`}>{ label }</label>
    )
}

export default Label;
