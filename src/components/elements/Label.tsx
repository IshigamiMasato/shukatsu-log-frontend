type LabelProps = {
    label: string,
}

const Label = ({ label } : LabelProps) => {
    return (
        <label>{ label }</label>
    )
}

export default Label;
