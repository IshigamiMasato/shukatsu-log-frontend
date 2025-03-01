type Props = {
    children: React.ReactNode,
}

const FormTitle = ({ children } : Props) => {
    return (
        <h2 className="text-lg font-semibold mb-5">{ children }</h2>
    )
}

export default FormTitle;
