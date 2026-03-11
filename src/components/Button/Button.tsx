import clsx from 'clsx'
import type { ButtonProps } from './Button.types'
import styles from './Button.module.scss'

function Button({
    href,
    label,
    theme = 'dark',
    openInNewTab = true,
    className,
}: ButtonProps) {
    return (
        <a
            href={href}
            className={clsx(
                styles.button,
                styles[`button--${theme}`],
                className
            )}
            target={openInNewTab ? '_blank' : undefined}
            rel={openInNewTab ? 'noopener noreferrer' : undefined}
        >
            {label}
        </a>
    )
}

export default Button
