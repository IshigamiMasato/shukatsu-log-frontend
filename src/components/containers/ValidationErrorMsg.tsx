type ValidationErrorMsgProps = {
    errors: string[],
};

const ValidationErrorMsg = ({ errors } : ValidationErrorMsgProps) => {
    return (
        <p className="text-red-500">{ errors.join(',') }</p>
    )
}

export default ValidationErrorMsg;
