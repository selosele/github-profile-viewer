import type { CheckboxGroupProps } from '@/types/form'
import './CheckboxGroup.css'

export default function CheckboxGroup({ ...props }: CheckboxGroupProps) {
    return (
        <>
            <div className={`checkbox-group ${props.className ?? ''}`} style={props.style}>
                <span className='label'>{props.label}</span>
                <div>{props.children}</div>
            </div>
        </>
    )
}
