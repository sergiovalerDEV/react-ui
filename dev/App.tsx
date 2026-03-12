import { Button } from '../src'
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

        </>
    )
}