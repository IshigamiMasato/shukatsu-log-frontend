type Props = {
    children: React.ReactNode,
}

const ProcessContainer = ({ children } : Props) => {
    return (
        <div className="border-l-4 border-blue-500 pl-4 py-4 mb-2 overflow-x-auto">
            <div className="bg-white p-4 shadow-md rounded-lg border">
                { children }
            </div>
        </div>
    )
}

export default ProcessContainer;
