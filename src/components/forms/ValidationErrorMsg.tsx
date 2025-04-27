type Props = {
    errors: string[],
};

const ValidationErrorMsg = ({ errors } : Props) => {
    return (
        <p className="text-red-500">{ errors.join(',') }</p>
    )
}

export default ValidationErrorMsg;
