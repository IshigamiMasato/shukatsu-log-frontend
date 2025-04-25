import { ChangeEvent } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

type TextareaProps = {
    name: string,
    value?: string,
    className?: string,
    errors?: string[]|undefined,
    onChange: ( e: ChangeEvent<HTMLTextAreaElement> ) => void,
};

const Textarea = ({ name, value, className, errors, onChange } : TextareaProps) => {
    return (
        <TextareaAutosize
            name={name}
            value={value}
            onChange={onChange}
            className={ `bg-gray-50 border border-gray-300 rounded-lg p-2 w-full ${errors ? 'border-2 border-red-500' : ''} ${className}` }
            minRows={4}
        />
    )
}

export default Textarea;
