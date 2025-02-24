type ErrorMsgProps = {
    error: string
}

const ErrorMsg = ({ error } : ErrorMsgProps) => {
    return (
        <div className="bg-red-100">{ error }</div>
    )
}

export default ErrorMsg;
