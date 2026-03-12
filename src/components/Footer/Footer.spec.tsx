import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Footer from './Footer'
import type { FooterProps } from './Footer.types'

jest.mock('./Footer.module.scss', () => ({
    footer: 'footer',
    'footer--dark': 'footer--dark',
    'footer--light': 'footer--light',
    footer__top: 'footer__top',
    footer__bottom: 'footer__bottom',
    footer__links: 'footer__links',
    footer__tagline: 'footer__tagline',
    footer__social: 'footer__social',
    footer__copyright: 'footer__copyright',
}))

const defaultProps: FooterProps = {
    theme: 'dark',
    links: [
        { label: 'Home', href: '#home' },
        { label: 'Projects', href: '#projects' },
        { label: 'Contact', href: '#contact' },
    ],
    socialLinks: [
        { label: 'GitHub', href: 'https://github.com', icon: 'github' },
        { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'linkedin' },
        { label: 'Twitter', href: 'https://twitter.com', icon: 'twitter' },
        { label: 'Email', href: 'mailto:test@test.com', icon: 'email' },
    ],
    tagline: 'Building things that matter.',
    copyright: '© 2024 Sergio Valer',
    className: 'custom-class',
}

describe('Footer', () => {
    test('renders with required props', () => {
        render(<Footer {...defaultProps} />)
        expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    })

    test('renders with dark theme', () => {
        render(<Footer {...defaultProps} theme="dark" />)
        expect(screen.getByRole('contentinfo')).toHaveClass('footer--dark')
    })

    test('renders with light theme', () => {
        render(<Footer {...defaultProps} theme="light" />)
        expect(screen.getByRole('contentinfo')).toHaveClass('footer--light')
    })

    test('renders with custom className', () => {
        render(<Footer {...defaultProps} />)
        expect(screen.getByRole('contentinfo')).toHaveClass('custom-class')
    })

    test('renders nav links', () => {
        render(<Footer {...defaultProps} />)
        expect(screen.getByText('Home')).toBeInTheDocument()
        expect(screen.getByText('Projects')).toBeInTheDocument()
        expect(screen.getByText('Contact')).toBeInTheDocument()
    })

    test('renders links with correct href', () => {
        render(<Footer {...defaultProps} />)
        expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '#home')
        expect(screen.getByText('Projects').closest('a')).toHaveAttribute('href', '#projects')
    })

    test('renders tagline', () => {
        render(<Footer {...defaultProps} />)
        expect(screen.getByText('Building things that matter.')).toBeInTheDocument()
    })

    test('renders all social links', () => {
        render(<Footer {...defaultProps} />)
        expect(screen.getByRole('link', { name: 'GitHub' })).toBeInTheDocument()
        expect(screen.getByRole('link', { name: 'LinkedIn' })).toBeInTheDocument()
        expect(screen.getByRole('link', { name: 'Twitter' })).toBeInTheDocument()
        expect(screen.getByRole('link', { name: 'Email' })).toBeInTheDocument()
    })

    test('social links open in new tab', () => {
        render(<Footer {...defaultProps} />)
        expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute('target', '_blank')
        expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute('rel', 'noopener noreferrer')
    })

    test('renders all four social icons', () => {
        render(<Footer {...defaultProps} />)
        const svgs = screen.getByRole('contentinfo').querySelectorAll('svg')
        expect(svgs.length).toBe(4)
    })

    test('renders copyright text', () => {
        render(<Footer {...defaultProps} />)
        expect(screen.getByText('© 2024 Sergio Valer')).toBeInTheDocument()
    })

    test('renders with default theme when not provided', () => {
        render(
            <Footer
                links={defaultProps.links}
                socialLinks={defaultProps.socialLinks}
                tagline={defaultProps.tagline}
                copyright={defaultProps.copyright}
            />
        )
        expect(screen.getByRole('contentinfo')).toHaveClass('footer--dark')
    })
})