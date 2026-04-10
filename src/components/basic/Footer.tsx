import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Youtube, Mail, Phone } from 'lucide-react';

const socials = [
    { name: 'Instagram', href: 'https://instagram.com', icon: <Instagram size={18} /> },
    { name: 'Facebook', href: 'https://facebook.com', icon: <Facebook size={18} /> },
    { name: 'X / Twitter', href: 'https://x.com', icon: <Twitter size={18} /> },
    { name: 'YouTube', href: 'https://youtube.com', icon: <Youtube size={18} /> },
];

const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Products', to: '/products' },
    { label: 'Cart', to: '/cart' },
    { label: 'My Orders', to: '/orders' },
    { label: 'Profile', to: '/profile' },
];

export default function Footer() {
    return (
        <footer className="bg-[#1a1a1a] text-white font-poppins">
            <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12 items-center">

                {/* Left — nav links */}
                <div className="flex flex-col gap-3">
                    <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-1">Quick Links</p>
                    {navLinks.map(link => (
                        <Link key={link.to} to={link.to} className="text-sm text-white/70 hover:text-white transition-colors">
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Center — logo */}
                <div className="flex flex-col items-center gap-4">
                    <img src="/images/logo.png" alt="Altuva" className="h-24 md:h-32 object-contain" />
                    <p className="text-xs text-white/40 text-center max-w-[200px]">Pure. Natural. Made with love.</p>
                </div>

                {/* Right — socials + contact */}
                <div className="flex flex-col items-start md:items-end gap-4">
                    <p className="text-xs font-semibold uppercase tracking-widest text-white/40">Follow Us</p>
                    <div className="flex gap-3">
                        {socials.map(s => (
                            <a
                                key={s.name}
                                href={s.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={s.name}
                                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white transition-all duration-200"
                            >
                                {s.icon}
                            </a>
                        ))}
                    </div>
                    <div className="mt-2 flex flex-col gap-2 text-sm text-white/50 md:items-end">
                        <a href="mailto:hello@altuva.co.in" className="flex items-center gap-2 hover:text-white transition-colors">
                            <Mail size={14} /> hello@altuva.co.in
                        </a>
                        <a href="tel:+911234567890" className="flex items-center gap-2 hover:text-white transition-colors">
                            <Phone size={14} /> +91 12345 67890
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/10">
                <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/30">
                    <span>© {new Date().getFullYear()} Altuva. All rights reserved.</span>
                    <div className="flex gap-4">
                        <Link to="/privacy" className="hover:text-white/60 transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-white/60 transition-colors">Terms of Use</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
