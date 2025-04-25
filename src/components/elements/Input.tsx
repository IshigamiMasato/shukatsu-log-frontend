import { cn } from "@/utils";

type Props = {
    errors?: string[]|undefined,
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = ({ className, errors, ...props } : Props) => {
    return (
        <input
            className={cn(
                'bg-gray-50 border border-gray-300 rounded-lg p-2 w-full appearance-none min-h-10',
                errors && 'border-2 border-red-500',
                className,
            )}
            { ...props }
        />
    )
}

export default Input;
