import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './Button';
import { ButtonProps } from './Button.types';

jest.mock('./Button.module.scss', () => ({
    button: 'base-button',
    'button--dark': 'dark-theme',
    'button--light': 'light-theme',
}));

const defaultProps: ButtonProps = {
    href: 'https://example.com',
    label: 'Test Button',
    theme: 'dark',
    openInNewTab: true,
    className: 'custom-class'
};

describe('Button', () => {
    test('renders with default props', () => {
        render(<Button {...defaultProps} />);
        const link = screen.getByRole('link');
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', defaultProps.href);
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
        expect(link).toHaveTextContent(defaultProps.label);
    });

    test('renders light theme', () => {
        render(<Button {...defaultProps} theme="light" />);
        const link = screen.getByRole('link');
        expect(link).toHaveClass('base-button', 'light-theme', 'custom-class');
    });

    test('renders without new tab', () => {
        render(<Button {...defaultProps} openInNewTab={false} />);
        const link = screen.getByRole('link');
        expect(link).not.toHaveAttribute('target');
        expect(link).not.toHaveAttribute('rel');
    });

    test('applies custom className', () => {
        render(<Button {...defaultProps} />);
        const link = screen.getByRole('link');
        expect(link).toHaveClass('base-button', 'dark-theme', 'custom-class');
    });

    test('all code paths covered', () => {
        const { container } = render(<Button href="" label="" theme="light" openInNewTab={false} className="" />);
        const link = container.querySelector('a');
        expect(link).toBeInTheDocument();
        expect(link).toHaveClass('base-button', 'light-theme');
        expect(link).toHaveAttribute('href', '');
        expect(link).not.toHaveAttribute('target');
        expect(link).not.toHaveAttribute('rel');
    });

    test('renders with default theme and openInNewTab values', () => {
        render(<Button href="https://example.com" label="Default Test" />);
        const link = screen.getByRole('link');
        expect(link).toHaveClass('base-button', 'dark-theme');
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
});