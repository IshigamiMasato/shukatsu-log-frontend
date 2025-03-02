type Props = {
    children: React.ReactNode,
}

const IndexPageTitle = ({ children } : Props) => {
    return (
        <h2 className="container mx-auto border-b px-8 py-2 mb-6 text-lg font-semibold">
            { children }
        </h2>
    )
}

export default IndexPageTitle;
