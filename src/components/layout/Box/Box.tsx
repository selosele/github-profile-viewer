import type { BoxProps } from '@/types/box'
import './Box.css'

export default function Box(props: BoxProps) {
    return (
        <div className={`box ${props.className ?? ''}`} style={props.style}>
            {props.children}
        </div>
    )
}
