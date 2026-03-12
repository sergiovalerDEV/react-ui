import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import NavBar from './NavBar'
import type { NavBarProps } from './NavBar.types'

jest.mock('./NavBar.module.scss', () => ({
    navbar: 'navbar',
    'navbar--dark': 'navbar--dark',
    'navbar--light': 'navbar--light',
    'navbar--open': 'navbar--open',
    navbar__left: 'navbar__left',
    navbar__right: 'navbar__right',
    navbar__links: 'navbar__links',
    navbar__hamburger: 'navbar__hamburger',
    'navbar__hamburger-line': 'navbar__hamburger-line',
    navbar__icon: 'navbar__icon',
}))

const defaultProps: NavBarProps = {
    theme: 'dark',
    links: [
        { label: 'Home', href: '#home' },
        { label: 'Projects', href: '#projects' },
    ],
    onThemeToggle: jest.fn(),
    openMenuLabel: 'Open menu',
    closeMenuLabel: 'Close menu',
    className: 'custom-class',
}

describe('NavBar', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('renders with required links prop', () => {
        render(<NavBar {...defaultProps} />)
        expect(screen.getByRole('navigation')).toBeInTheDocument()
    })

    test('renders with dark theme', () => {
        render(<NavBar {...defaultProps} theme="dark" />)
        const nav = screen.getByRole('navigation')
        expect(nav).toHaveClass('navbar--dark')
    })

    test('renders with light theme', () => {
        render(<NavBar {...defaultProps} theme="light" />)
        const nav = screen.getByRole('navigation')
        expect(nav).toHaveClass('navbar--light')
    })

    test('renders custom links', () => {
        render(<NavBar {...defaultProps} />)
        expect(screen.getByText('Home')).toBeInTheDocument()
        expect(screen.getByText('Projects')).toBeInTheDocument()
    })

    test('renders with custom className', () => {
        render(<NavBar {...defaultProps} />)
        expect(screen.getByRole('navigation')).toHaveClass('custom-class')
    })

    test('opens menu when hamburger is clicked', () => {
        render(<NavBar {...defaultProps} />)
        const button = screen.getByRole('button')
        fireEvent.click(button)
        expect(screen.getByRole('navigation')).toHaveClass('navbar--open')
    })

    test('closes menu when hamburger is clicked again', () => {
        render(<NavBar {...defaultProps} />)
        const button = screen.getByRole('button')
        fireEvent.click(button)
        fireEvent.click(button)
        expect(screen.getByRole('navigation')).not.toHaveClass('navbar--open')
    })

    test('shows closeMenuLabel when menu is open', () => {
        render(<NavBar {...defaultProps} />)
        const button = screen.getByRole('button')
        fireEvent.click(button)
        expect(button).toHaveAttribute('aria-label', 'Close menu')
    })

    test('shows openMenuLabel when menu is closed', () => {
        render(<NavBar {...defaultProps} />)
        expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Open menu')
    })

    test('closes menu when a link is clicked', () => {
        render(<NavBar {...defaultProps} />)
        const button = screen.getByRole('button')
        fireEvent.click(button)
        expect(screen.getByRole('navigation')).toHaveClass('navbar--open')
        fireEvent.click(screen.getByText('Home'))
        expect(screen.getByRole('navigation')).not.toHaveClass('navbar--open')
    })

    test('closes menu when clicking outside the navbar', () => {
        render(
            <div>
                <NavBar {...defaultProps} />
                <div data-testid="outside">Outside</div>
            </div>
        )
        const button = screen.getByRole('button')
        fireEvent.click(button)
        expect(screen.getByRole('navigation')).toHaveClass('navbar--open')
        fireEvent.mouseDown(screen.getByTestId('outside'))
        expect(screen.getByRole('navigation')).not.toHaveClass('navbar--open')
    })

    test('closes menu on touchstart outside the navbar', () => {
        render(
            <div>
                <NavBar {...defaultProps} />
                <div data-testid="outside">Outside</div>
            </div>
        )
        const button = screen.getByRole('button')
        fireEvent.click(button)
        fireEvent.touchStart(screen.getByTestId('outside'))
        expect(screen.getByRole('navigation')).not.toHaveClass('navbar--open')
    })

    test('does not close menu when clicking inside the navbar', () => {
        render(<NavBar {...defaultProps} />)
        const button = screen.getByRole('button')
        fireEvent.click(button)
        fireEvent.mouseDown(screen.getByRole('navigation'))
        expect(screen.getByRole('navigation')).toHaveClass('navbar--open')
    })

    test('renders sun icon when theme is dark', () => {
        render(<NavBar {...defaultProps} theme="dark" />)
        expect(screen.getByRole('img', { name: 'Switch to light mode' })).toBeInTheDocument()
    })

    test('renders moon icon when theme is light', () => {
        render(<NavBar {...defaultProps} theme="light" />)
        expect(screen.getByRole('img', { name: 'Switch to dark mode' })).toBeInTheDocument()
    })

    test('calls onThemeToggle when icon is clicked', () => {
        const onThemeToggle = jest.fn()
        render(<NavBar {...defaultProps} onThemeToggle={onThemeToggle} />)
        fireEvent.click(screen.getByRole('img', { name: 'Switch to light mode' }))
        expect(onThemeToggle).toHaveBeenCalledTimes(1)
    })

    test('does not render theme icon when onThemeToggle is not provided', () => {
        render(<NavBar {...defaultProps} onThemeToggle={undefined} />)
        expect(screen.queryByRole('img')).not.toBeInTheDocument()
    })

    test('renders with default theme, openMenuLabel and closeMenuLabel', () => {
        render(<NavBar links={defaultProps.links!} />)
        const nav = screen.getByRole('navigation')
        expect(nav).toHaveClass('navbar--dark')
        const button = screen.getByRole('button')
        expect(button).toHaveAttribute('aria-label', 'Open menu')
        fireEvent.click(button)
        expect(button).toHaveAttribute('aria-label', 'Close menu')
    })

    test('removes event listeners when menu closes', () => {
        const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener')
        render(<NavBar {...defaultProps} />)
        const button = screen.getByRole('button')
        fireEvent.click(button)
        fireEvent.click(button)
        expect(removeEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function))
        expect(removeEventListenerSpy).toHaveBeenCalledWith('touchstart', expect.any(Function))
        removeEventListenerSpy.mockRestore()
    })
})