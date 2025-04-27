type Props = {
    error: string
}

const ErrorMsg = ({ error } : Props) => {
    return (
        <div className="bg-red-100 text-red-500 p-2 rounded-lg my-3">{ error }</div>
    )
}

export default ErrorMsg;
