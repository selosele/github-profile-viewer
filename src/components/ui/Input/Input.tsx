import type { InputProps } from '@/types/input'
import './Input.css'

export default function Input({ type = 'text', ...props }: InputProps) {
    return (
        <input
            type={type}
            placeholder={props.placeholder}
            className={`input ${props.className ?? ''} ${props.fullWidth ? 'block' : ''}`}
            style={props.style}
            value={props.value}
            onChange={props.onChange}
            onKeyUp={(e) => {
                e.stopPropagation()
                e.preventDefault()
                props?.onKeyUp?.(e)
            }}
        />
    )
}
