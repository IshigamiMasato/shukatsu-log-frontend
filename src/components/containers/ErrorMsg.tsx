type ErrorMsgProps = {
    error: string
}

const ErrorMsg = ({ error } : ErrorMsgProps) => {
    return (
        <div className="bg-red-100 text-red-500 p-2 rounded-lg my-3">{ error }</div>
    )
}

export default ErrorMsg;
