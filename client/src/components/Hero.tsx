import { motion } from 'framer-motion';
import { HiArrowDown } from 'react-icons/hi';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { SiReact, SiTypescript, SiPython, SiNodedotjs, SiFastapi, SiTailwindcss } from 'react-icons/si';
import resumeData from '../data/resume.json';

/* Floating code visual for right side of hero on desktop */
function HeroVisual() {
    return (
        <div className="relative w-full h-full min-h-[320px] flex items-center justify-center">
            {/* Glow backdrop */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-accent-500/5 to-transparent rounded-3xl blur-2xl" />

            {/* Main card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="relative glass rounded-2xl p-6 w-full max-w-sm animate-code-float"
            >
                {/* Terminal header */}
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <div className="w-3 h-3 rounded-full bg-green-500/60" />
                    <span className="ml-2 text-xs text-zinc-500 font-mono">portfolio.tsx</span>
                </div>

                {/* Code content */}
                <div className="font-mono text-sm space-y-1.5">
                    <p><span className="text-accent-400">const</span> <span className="text-cyan-300">developer</span> <span className="text-zinc-500">=</span> <span className="text-zinc-400">{'{'}</span></p>
                    <p className="pl-4"><span className="text-zinc-400">name:</span> <span className="text-emerald-400">"{resumeData.name}"</span>,</p>
                    <p className="pl-4"><span className="text-zinc-400">role:</span> <span className="text-emerald-400">"{resumeData.title}"</span>,</p>
                    <p className="pl-4"><span className="text-zinc-400">skills:</span> <span className="text-amber-400">[</span><span className="text-emerald-400">"React"</span>, <span className="text-emerald-400">"TypeScript"</span>, <span className="text-zinc-500">...</span><span className="text-amber-400">]</span>,</p>
                    <p className="pl-4"><span className="text-zinc-400">hireable:</span> <span className="text-primary-400">true</span> <span className="text-zinc-600">✓</span></p>
                    <p><span className="text-zinc-400">{'}'}</span>;</p>
                </div>

                {/* Floating tech icons */}
                <div className="flex gap-3 mt-5 pt-4 border-t border-white/5">
                    {[SiReact, SiTypescript, SiPython, SiNodedotjs, SiFastapi, SiTailwindcss].map((Icon, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 + i * 0.1 }}
                            className="text-zinc-500 hover:text-cyan-400 transition-colors"
                        >
                            <Icon size={18} />
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}

export default function Hero() {
    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Animated Background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-surface-950 via-surface-900 to-surface-950" />
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/8 rounded-full blur-[120px] animate-float" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-500/8 rounded-full blur-[100px] animate-float" style={{ animationDelay: '3s' }} />
                <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-primary-400/5 rounded-full blur-[80px] animate-float" style={{ animationDelay: '1.5s' }} />
            </div>

            {/* Grid Pattern */}
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '60px 60px',
                }}
            />

            {/* Content — split layout on desktop */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left — Text */}
                    <div className="text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase text-cyan-400 glass mb-6">
                                Available for Opportunities
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight mb-4"
                        >
                            Hi, I'm{' '}
                            <span className="gradient-text">{resumeData.name}</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="text-xl md:text-2xl text-zinc-300 font-light mb-3"
                        >
                            {resumeData.title}
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.7 }}
                            className="text-base text-zinc-400 max-w-xl mx-auto lg:mx-0 mb-10"
                        >
                            {resumeData.tagline}
                        </motion.p>

                        {/* Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.9 }}
                            className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 mb-12"
                        >
                            <a
                                href="#projects"
                                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold text-sm hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-300 hover:-translate-y-0.5 text-center"
                            >
                                View My Work
                            </a>
                            <a
                                href="#contact"
                                className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-white/15 text-zinc-300 font-semibold text-sm hover:bg-white/5 hover:border-white/25 transition-all duration-300 hover:-translate-y-0.5 text-center"
                            >
                                Get In Touch
                            </a>
                        </motion.div>

                        {/* Social Links */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 1.1 }}
                            className="flex items-center justify-center lg:justify-start gap-2"
                        >
                            {[
                                { href: resumeData.contact.github, icon: <FaGithub size={20} />, label: 'GitHub' },
                                { href: resumeData.contact.linkedin, icon: <FaLinkedin size={20} />, label: 'LinkedIn' },
                                { href: `mailto:${resumeData.contact.email}`, icon: <FaEnvelope size={20} />, label: 'Email' },
                            ].map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-11 h-11 rounded-xl flex items-center justify-center text-zinc-400 hover:text-cyan-400 hover:bg-white/5 transition-all duration-200"
                                    aria-label={s.label}
                                >
                                    {s.icon}
                                </a>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right — Visual (hidden on mobile, visible on lg+) */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="hidden lg:block"
                    >
                        <HeroVisual />
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <a href="#about" className="flex flex-col items-center gap-2 text-zinc-400 hover:text-cyan-400 transition-colors">
                    <span className="text-xs tracking-widest uppercase font-medium">Scroll</span>
                    <HiArrowDown className="animate-bounce-slow" size={18} />
                </a>
            </motion.div>
        </section>
    );
}
