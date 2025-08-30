import type { CommonProps } from './common'

/** input props */
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

/** select props */
export interface SelectProps extends CommonProps {
    fullWidth?: boolean
    value?: string | number
    label?: string
    id?: string
    data?: SelectData[]
    onChange?: (e: SelectChangeEvent) => void
}

export interface SelectData {
    value: string | number
    text: string
}

export type SelectChangeEvent = React.ChangeEvent<HTMLSelectElement>
