import { LuMail, LuPhone, LuMapPin } from 'react-icons/lu';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const services = [
  'Research & Script Development',
  'Interview Production',
  'Drama & Docudrama',
  'Full Episode Production',
  'Voice Over',
  'Graphics',
];

const navigation = [
  { label: 'Home', href: '/' },
  { label: 'Our Work', href: '/work' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks = [
  { icon: FaFacebookF, href: '#', label: 'Facebook' },
  { icon: FaInstagram, href: '#', label: 'Instagram' },
  { icon: FaLinkedinIn, href: '#', label: 'LinkedIn' },
];

export default function Footer() {
  return (
    <footer className="bg-zinc-950">
      {/* Top accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      {/* Main footer content */}
      <div className="relative w-full px-8 sm:px-12 lg:px-20 xl:px-28 pt-16 pb-8">
        {/* Top section - Brand + Contact info */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-10 mb-14">
          <div className="max-w-md">
            <a href="/" className="inline-block text-2xl font-bold mb-4">
              <span className="text-gradient">LUXE</span><span className="text-white">FILMS</span>
            </a>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              A documentary production company with years of experience in research, interview production, drama, and full episode delivery across the globe.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="text-zinc-500 hover:text-accent transition-colors duration-200"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h4 className="text-base font-semibold text-white mb-6">Services</h4>
            <ul className="space-y-4">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-zinc-400 text-sm hover:text-white transition-colors duration-200 cursor-default">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Navigation */}
          <div>
            <h4 className="text-base font-semibold text-white mb-6">Company</h4>
            <ul className="space-y-4">
              {navigation.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-zinc-400 text-sm hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div id="contact">
            <h4 className="text-base font-semibold text-white mb-6">Contact Info</h4>
            <ul className="space-y-5">
              <li className="flex items-center gap-3">
                <LuMapPin className="h-4 w-4 text-accent shrink-0" />
                <span className="text-zinc-400 text-sm">Cairo, Egypt</span>
              </li>
              <li className="flex items-center gap-3">
                <LuPhone className="h-4 w-4 text-accent shrink-0" />
                <a href="tel:+201000000000" className="text-zinc-400 text-sm hover:text-white transition-colors duration-200">
                  +20 100 000 0000
                </a>
              </li>
              <li className="flex items-center gap-3">
                <LuMail className="h-4 w-4 text-accent shrink-0" />
                <a href="mailto:info@luxefilms.com" className="text-zinc-400 text-sm hover:text-white transition-colors duration-200">
                  info@luxefilms.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="h-px bg-white/[0.06] mt-16 mb-8" />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-zinc-600 text-sm">
            &copy; {new Date().getFullYear()} Luxe Films. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-zinc-600 hover:text-zinc-400 text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-zinc-600 hover:text-zinc-400 text-sm transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
