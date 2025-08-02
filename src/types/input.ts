import type { GlobalProps } from './common'

export interface InputProps extends GlobalProps {
    type?: string
    placeholder?: string
    className?: string
    fullWidth?: boolean
    value?: string | number
    onChange?: (e: InputChangeEvent) => void
    onKeyUp?: (e: InputKeyboardEvent) => void
}

export type InputChangeEvent = React.ChangeEvent<HTMLInputElement>
export type InputKeyboardEvent = React.KeyboardEvent<HTMLInputElement>
