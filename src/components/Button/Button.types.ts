export type ButtonTheme = 'dark' | 'light'

export interface ButtonProps {
    href: string
    label: string
    theme?: ButtonTheme
    openInNewTab?: boolean
    className?: string
}