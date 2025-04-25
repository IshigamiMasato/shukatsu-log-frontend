import { cn } from '@/utils';
import TextareaAutosize, { TextareaAutosizeProps } from 'react-textarea-autosize';

type Props = {
    errors?: string[]|undefined,
} & TextareaAutosizeProps;

const Textarea = ({ className, errors, ...props } : Props) => {
    return (
        <TextareaAutosize
            className={cn(
                'bg-gray-50 border border-gray-300 rounded-lg p-2 w-full',
                errors && 'border-2 border-red-500',
                className,
            )}
            minRows={4}
            { ...props }
        />
    )
}

export default Textarea;
