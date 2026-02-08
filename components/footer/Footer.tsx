import { LuMail, LuPhone, LuMapPin } from 'react-icons/lu';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Our Work', href: '/work' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '#contact' },
];

const services = [
  'Research & Script Development',
  'Interview Production',
  'Drama & Docudrama',
  'Full Episode Production',
  'Voice Over',
  'Graphics',
];

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/[0.06]">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <a href="/" className="inline-block text-2xl font-bold mb-4">
              <span className="text-gradient">LUXE</span>
              <span className="text-white ml-1">FILMS</span>
            </a>
            <p className="text-zinc-500 text-sm leading-relaxed">
              A documentary production company with years of experience in research, interview production, drama, and full episode delivery across the globe.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-zinc-500 hover:text-accent text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service} className="text-zinc-500 text-sm">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div id="contact">
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <LuMail className="h-4 w-4 text-accent flex-none mt-0.5" />
                <a href="mailto:info@luxefilms.com" className="text-zinc-500 hover:text-accent text-sm transition-colors">
                  info@luxefilms.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <LuPhone className="h-4 w-4 text-accent flex-none mt-0.5" />
                <a href="tel:+201000000000" className="text-zinc-500 hover:text-accent text-sm transition-colors">
                  +20 100 000 0000
                </a>
              </li>
              <li className="flex items-start gap-3">
                <LuMapPin className="h-4 w-4 text-accent flex-none mt-0.5" />
                <span className="text-zinc-500 text-sm">Cairo, Egypt</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-zinc-600 text-sm">
            &copy; {new Date().getFullYear()} Luxe Films. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-zinc-600 hover:text-accent text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-zinc-600 hover:text-accent text-sm transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
