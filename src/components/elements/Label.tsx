import { cn } from "@/utils";

type Props = {
    children: React.ReactNode,
} & React.LabelHTMLAttributes<HTMLLabelElement>;

const Label = ({ className, children, ...props  } : Props) => {
    return (
        <label
            className={cn(
                'font-medium text-left w-32',
                className,
            )}
            { ...props }
        >
            { children }
        </label>
    )
}

export default Label;
