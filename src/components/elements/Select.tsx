import { cn } from "@/utils";

type Props = {
    errors?: string[]|undefined,
    children: React.ReactNode,
} & React.SelectHTMLAttributes<HTMLSelectElement>;

const Select = ({ className, errors, children, ...props } : Props) => {
    return (
        <select
            className={cn(
                'bg-gray-50 border border-gray-300 rounded-lg p-2 w-full appearance-none',
                errors && 'border-2 border-red-500',
                className,
            )}
            { ...props }
        >
            { children }
        </select>
    )
}

export default Select;
