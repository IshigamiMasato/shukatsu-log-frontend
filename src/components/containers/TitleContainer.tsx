type Props = {
    main: string,
    sub?: string,
}

const TitleContainer = ({ main, sub } : Props) => {
    return (
        <div className="container mx-auto border-b py-2 mb-6 space-y-1">
            <h2 className="text-xl font-bold">{ main }</h2>
            {sub && (
                <p className="text-sm text-gray-400 font-normal">{ sub }</p>
            )}
        </div>
    )
}

export default TitleContainer;
