import { cn } from "@/utils";

type Props = {
    className?: string,
    children: React.ReactNode,
}

const ActionContainer = ({ className, children } : Props) => {
    return (
        <div className={cn(
            'font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-block cursor-pointer',
            className,
        )}>
            { children }
        </div>
    )
}

export default ActionContainer;
