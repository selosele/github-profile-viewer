import type { GlobalProps } from '@/types/global'
import './Container.css'

interface ContainerProps extends GlobalProps {}

export default function Container(props: ContainerProps) {
    return (
        <div className="container">
            {props.children}
        </div>
    )
}