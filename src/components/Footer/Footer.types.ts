import type { NavBarTheme } from '../NavBar/NavBar.types'

export type { NavBarTheme as FooterTheme }

export interface FooterLink {
    label: string;
    href: string;
}

export interface FooterSocialLink {
    label: string;
    href: string;
    icon: 'github' | 'linkedin' | 'twitter' | 'email';
}

export interface FooterProps {
    theme?: NavBarTheme;
    links: FooterLink[];
    socialLinks: FooterSocialLink[];
    tagline: string;
    copyright: string;
    className?: string;
}