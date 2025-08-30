import type { CheckboxProps } from '@/types/form'
import './Checkbox.css'

export default function Checkbox({ ...props }: CheckboxProps) {
    return (
        <>
            <label className={`checkbox ${props.className ?? ''}}`}>
                <input
                    type={'checkbox'}
                    style={props.style}
                    value={props.value}
                    checked={props.checked}
                    onChange={props.onChange}
                />
                {props.text}
            </label>
        </>
    )
}
