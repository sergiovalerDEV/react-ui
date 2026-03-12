import React, { useState, useEffect, useRef } from 'react'
import clsx from 'clsx'
import type { NavBarProps } from './NavBar.types'
import styles from './NavBar.module.scss'

function NavBar({
    theme = 'dark',
    links,
    onThemeToggle,
    openMenuLabel = 'Open menu',
    closeMenuLabel = 'Close menu',
    className,
}: NavBarProps) {
    const [menuOpen, setMenuOpen] = useState(false)
    const navRef = useRef<HTMLElement>(null)

    const toggleMenu = () => setMenuOpen(prev => !prev)

    useEffect(() => {
        if (!menuOpen) return

        const handleClickOutside = (e: MouseEvent | TouchEvent) => {
            if (navRef.current && !navRef.current.contains(e.target as Node)) {
                setMenuOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        document.addEventListener('touchstart', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('touchstart', handleClickOutside)
        }
    }, [menuOpen])

    return (
        <nav
            ref={navRef}
            className={clsx(
                styles.navbar,
                styles[`navbar--${theme}`],
                menuOpen && styles['navbar--open'],
                className
            )}
        >
            <div className={styles.navbar__left}>
                <button
                    className={styles.navbar__hamburger}
                    onClick={toggleMenu}
                    aria-label={menuOpen ? closeMenuLabel : openMenuLabel}
                >
                    <span className={styles['navbar__hamburger-line']}></span>
                    <span className={styles['navbar__hamburger-line']}></span>
                    <span className={styles['navbar__hamburger-line']}></span>
                </button>
            </div>

            <div className={styles.navbar__right}>
                <ul className={styles.navbar__links}>
                    {links.map((link) => (
                        <li key={link.href}>
                            <a
                                href={link.href}
                                onClick={() => setMenuOpen(false)}
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>

                {onThemeToggle && (
                    theme === 'dark' ? (
                        <svg
                            className={styles.navbar__icon}
                            onClick={onThemeToggle}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-label="Switch to light mode"
                            role="img"
                        >
                            <circle cx="12" cy="12" r="5" />
                            <line x1="12" y1="1" x2="12" y2="3" />
                            <line x1="12" y1="21" x2="12" y2="23" />
                            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                            <line x1="1" y1="12" x2="3" y2="12" />
                            <line x1="21" y1="12" x2="23" y2="12" />
                            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                        </svg>
                    ) : (
                        <svg
                            className={styles.navbar__icon}
                            onClick={onThemeToggle}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-label="Switch to dark mode"
                            role="img"
                        >
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                        </svg>
                    )
                )}
            </div>
        </nav>
    )
}

export default NavBar