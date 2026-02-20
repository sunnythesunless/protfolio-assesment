import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaPaperPlane, FaCheck } from 'react-icons/fa';
import resumeData from '../data/resume.json';

export default function Contact() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [showToast, setShowToast] = useState(false);

    const validate = () => {
        const errs: Record<string, string> = {};
        if (!formData.name.trim()) errs.name = 'Name is required';
        if (!formData.email.trim()) errs.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Invalid email format';
        if (!formData.message.trim()) errs.message = 'Message is required';
        else if (formData.message.trim().length < 10) errs.message = 'Message must be at least 10 characters';
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
        const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`);
        window.open(`mailto:${resumeData.contact.email}?subject=${subject}&body=${body}`);

        setShowToast(true);
        setFormData({ name: '', email: '', message: '' });
        setErrors({});
        setTimeout(() => setShowToast(false), 3000);
    };

    const socials = [
        { icon: <FaGithub size={24} />, href: resumeData.contact.github, label: 'GitHub' },
        { icon: <FaLinkedin size={24} />, href: resumeData.contact.linkedin, label: 'LinkedIn' },
        { icon: <FaEnvelope size={24} />, href: `mailto:${resumeData.contact.email}`, label: 'Email' },
    ];

    const inputClasses = (field: string) =>
        `w-full px-4 py-3.5 rounded-xl bg-surface-900/80 border text-zinc-200 text-sm focus:outline-none focus:ring-1 transition-all placeholder:text-zinc-500 ${errors[field]
            ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/30'
            : 'border-zinc-700/50 focus:border-cyan-500/50 focus:ring-cyan-500/30 hover:border-zinc-600/50'
        }`;

    return (
        <section id="contact" className="relative" ref={ref}>
            {/* Toast */}
            <AnimatePresence>
                {showToast && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-sm font-medium backdrop-blur-lg shadow-lg"
                    >
                        <FaCheck size={14} />
                        Message sent! I'll get back to you soon.
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="relative z-10 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-2">
                        Get In <span className="gradient-text">Touch</span>
                    </h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full mb-10" />
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* Contact Form — takes 3 cols on large */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-3"
                    >
                        <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 md:p-8 space-y-5" noValidate>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2 block">Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => { setFormData({ ...formData, name: e.target.value }); if (errors.name) setErrors({ ...errors, name: '' }); }}
                                        className={inputClasses('name')}
                                        placeholder="Your name"
                                    />
                                    {errors.name && <p className="text-xs text-red-400 mt-1.5">{errors.name}</p>}
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2 block">Email</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => { setFormData({ ...formData, email: e.target.value }); if (errors.email) setErrors({ ...errors, email: '' }); }}
                                        className={inputClasses('email')}
                                        placeholder="your@email.com"
                                    />
                                    {errors.email && <p className="text-xs text-red-400 mt-1.5">{errors.email}</p>}
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2 block">Message</label>
                                <textarea
                                    rows={5}
                                    value={formData.message}
                                    onChange={(e) => { setFormData({ ...formData, message: e.target.value }); if (errors.message) setErrors({ ...errors, message: '' }); }}
                                    className={inputClasses('message') + ' resize-none'}
                                    placeholder="Your message..."
                                />
                                {errors.message && <p className="text-xs text-red-400 mt-1.5">{errors.message}</p>}
                            </div>
                            <button
                                type="submit"
                                className="w-full sm:w-auto px-10 py-3.5 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold text-sm hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-0.5"
                            >
                                <FaPaperPlane size={14} />
                                Send Message
                            </button>
                        </form>
                    </motion.div>

                    {/* Info + Socials — 2 cols on large */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="lg:col-span-2 flex flex-col gap-5"
                    >
                        <div className="glass rounded-2xl p-6 md:p-8 flex-1">
                            <h3 className="text-xl font-bold text-zinc-100 mb-4">Let's Connect</h3>
                            <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                                I'm always open to discussing new opportunities, interesting projects,
                                or collaborations. Feel free to reach out!
                            </p>
                            <div className="flex items-center gap-3 text-zinc-300 text-sm px-4 py-3 rounded-xl bg-white/[0.03]">
                                <FaEnvelope className="text-cyan-400 shrink-0" />
                                <a href={`mailto:${resumeData.contact.email}`} className="hover:text-cyan-400 transition-colors">
                                    {resumeData.contact.email}
                                </a>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            {socials.map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="glass rounded-xl py-5 flex flex-col items-center gap-2.5 text-zinc-400 hover:text-cyan-400 hover:bg-surface-800/80 hover:border-white/15 transition-all duration-200 hover:-translate-y-0.5"
                                >
                                    {s.icon}
                                    <span className="text-xs font-medium">{s.label}</span>
                                </a>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Footer */}
                <div className="mt-16 pt-8 border-t border-white/5 text-center">
                    <p className="text-sm text-zinc-500">
                        © {new Date().getFullYear()} {resumeData.name}. Built with React, TypeScript & ❤️
                    </p>
                </div>
            </div>
        </section>
    );
}
