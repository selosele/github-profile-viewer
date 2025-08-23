import type { ContainerProps } from '@/types/container'
import './Container.css'

export default function Container(props: ContainerProps) {
    return (
        <div className={`container ${props.className ?? ''}`}>
            {props.children}
        </div>
    )
}
