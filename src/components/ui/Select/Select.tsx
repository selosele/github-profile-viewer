import type { SelectProps } from '@/types/form'
import './Select.css'

export default function Select({ ...props }: SelectProps) {
    return (
        <>
            {props.label && (
                <label htmlFor={props.id} className='label'>
                    {props.label}
                </label>
            )}
            <select
                id={props.id}
                className={`select ${props.className ?? ''} ${props.fullWidth ? 'block' : ''}`}
                style={props.style}
                value={props.value}
                onChange={props.onChange}
            >
                {props.data?.map((data, index) => (
                    <option key={index} value={data.value}>
                        {data.text}
                    </option>
                ))}
            </select>
        </>
    )
}
