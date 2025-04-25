import { cn } from "@/utils";

type Props = {
    className?: string,
    children: React.ReactNode,
}

const FormContainer = ({ className, children } : Props) => {
    return (
        <div className={cn(
            'w-full sm:max-w-lg max-w-sm p-4 bg-white mx-auto rounded-lg border',
            className,
        )}>
            { children }
        </div>
    )
}

export default FormContainer;
