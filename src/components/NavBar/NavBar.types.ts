export type NavBarTheme = 'dark' | 'light';

export interface NavBarLink {
    label: string;
    href: string;
}

export interface NavBarProps {
    theme?: NavBarTheme;
    links: NavBarLink[];
    onThemeToggle?: () => void;
    openMenuLabel?: string;
    closeMenuLabel?: string;
    className?: string;
}