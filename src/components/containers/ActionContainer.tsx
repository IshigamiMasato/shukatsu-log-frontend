type Props = {
    children: React.ReactNode,
    className?: string,
}

const ActionContainer = ({ children, className } : Props) => {
    return (
        <div className={`bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-3xl text-sm px-5 py-2.5 text-center inline-block ${className}`}>
            { children }
        </div>
    )
}

export default ActionContainer;
