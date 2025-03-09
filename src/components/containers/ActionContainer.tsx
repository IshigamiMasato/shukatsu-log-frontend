type Props = {
    children: React.ReactNode,
    className?: string,
}

const ActionContainer = ({ children, className } : Props) => {
    return (
        <div className={`font-medium rounded-3xl text-sm px-5 py-2.5 text-center inline-block cursor-pointer ${className}`}>
            { children }
        </div>
    )
}

export default ActionContainer;
