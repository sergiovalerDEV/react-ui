import { Button } from '../src'
import Footer from '../src/components/Footer/Footer'
import { NavBar } from '../src/components/NavBar'

export default function App() {

    return (
        <>
            <Button href={'aaaaa'} label={'Contacto'} />
            <Button theme='light' href={'aaaaa'} label={'Contacto'} />

            <NavBar
                theme="dark"
                links={[
                    { label: 'Home', href: 'https://google.com' },
                    { label: 'Experience', href: 'https://google.com' },
                    { label: 'Projects', href: 'https://google.com' },
                    { label: 'Education', href: 'https://google.com' },
                    { label: 'Contact', href: 'https://google.com' },
                ]}
            />
            <NavBar
                theme="light"
                links={[
                    { label: 'Home', href: 'https://google.com' },
                    { label: 'Experience', href: 'https://google.com' },
                    { label: 'Projects', href: 'https://google.com' },
                    { label: 'Education', href: 'https://google.com' },
                    { label: 'Contact', href: 'https://google.com' },
                ]}
            />

            <NavBar
                theme="dark"
                links={[
                    { label: 'Home', href: '#home' },
                    { label: 'Experience', href: '#experience' },
                    { label: 'Projects', href: '#projects' },
                    { label: 'Contact', href: '#contact' },
                ]}
            />

            <Footer
                theme="light"
                links={[
                    { label: 'Home', href: '#home' },
                    { label: 'Projects', href: '#projects' },
                    { label: 'Contact', href: '#contact' },
                ]}
                socialLinks={[
                    { label: 'GitHub', href: 'https://github.com/sergiovalerDEV', icon: 'github' },
                    { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'linkedin' },
                    { label: 'Email', href: 'mailto:sergio@example.com', icon: 'email' },
                ]}
                tagline="Building things that matter."
                copyright="© 2026 Sergio Valer"
            />

            <Footer
                theme="dark"
                links={[
                    { label: 'Home', href: '#home' },
                    { label: 'Projects', href: '#projects' },
                    { label: 'Contact', href: '#contact' },
                ]}
                socialLinks={[
                    { label: 'GitHub', href: 'https://github.com/sergiovalerDEV', icon: 'github' },
                    { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'linkedin' },
                    { label: 'Email', href: 'mailto:sergio@example.com', icon: 'email' },
                ]}
                tagline="Building things that matter."
                copyright="© 2026 Sergio Valer"
            />

        </>
    )
}