import { cn } from "@/utils";

type Props = {
    children: React.ReactNode,
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ className, children, ...props } : Props) => {
    return (
        <button
            className={cn(
                'font-medium rounded-lg text-sm px-5 py-2.5 text-center',
                className,
            )}
            { ...props }
        >
            { children }
        </button>
    )
}

export default Button;
