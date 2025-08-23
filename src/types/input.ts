import type { CommonProps } from './common'

export interface InputProps extends CommonProps {
    type?: string
    placeholder?: string
    fullWidth?: boolean
    value?: string | number
    onChange?: (e: InputChangeEvent) => void
    onKeyUp?: (e: InputKeyboardEvent) => void
}

export type InputChangeEvent = React.ChangeEvent<HTMLInputElement>
export type InputKeyboardEvent = React.KeyboardEvent<HTMLInputElement>
