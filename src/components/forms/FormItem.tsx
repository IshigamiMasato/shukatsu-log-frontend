import { cn } from "@/utils";

type Props = {
    className?: string,
    children: React.ReactNode
}

const FormItem = ({ className, children } : Props) => {
    return (
        <div className={cn(
            'mb-5',
            className,
        )}>
            { children }
        </div>
    )
}

export default FormItem;
