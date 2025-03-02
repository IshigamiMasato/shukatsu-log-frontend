type Props = {
    children: React.ReactNode,
    className?: string,
}

const ActionContainer = ({ children, className } : Props) => {
    return (
        <div className={`bg-white font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-block border border-gray-300 ${className}`}>
            { children }
        </div>
    )
}

export default ActionContainer;
