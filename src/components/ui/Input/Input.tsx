import type { GlobalProps } from '@/types/global';
import './Input.css'

interface InputProps extends GlobalProps {
    type?: string;
    placeholder?: string;
    className?: string;
}

export default function Input({ type = 'text', ...props }: InputProps) {
    return (
        <input
            type={type}
            placeholder={props.placeholder}
            className={`input ${props.className}`}
        />
    )
}