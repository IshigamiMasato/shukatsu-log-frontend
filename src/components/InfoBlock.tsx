const InfoBlock = ({ label, children } : { label: string, children: React.ReactNode }) => {
    return (
        <div className="space-y-2 mb-5 text-sm">
            <h3 className="font-semibold border-b-2">{ label }</h3>
            <p className="whitespace-pre-line">{ children }</p>
        </div>
    )
}

export default InfoBlock;
