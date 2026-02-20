import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { HiBriefcase, HiCalendar } from 'react-icons/hi';
import resumeData from '../data/resume.json';

export default function Experience() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="experience" className="relative section-glow-violet" ref={ref}>
            <div className="relative z-10 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-2">
                        Work <span className="gradient-text">Experience</span>
                    </h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full mb-10" />
                </motion.div>

                <div className="space-y-6">
                    {resumeData.experience.map((exp, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.2 * i }}
                            className="glass rounded-2xl p-6 md:p-8 hover:border-white/15 transition-all duration-300"
                        >
                            {/* Header — two-column on desktop */}
                            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center shrink-0">
                                        <HiBriefcase className="text-cyan-400" size={22} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-zinc-100">{exp.role}</h3>
                                        <p className="text-sm text-cyan-400/80 font-medium">{exp.company}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-zinc-400 text-sm lg:shrink-0">
                                    <HiCalendar size={16} className="text-zinc-500" />
                                    <span>{exp.duration}</span>
                                </div>
                            </div>

                            {/* Highlights — two-column grid on desktop */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                                {exp.highlights.map((h, j) => (
                                    <div key={j} className="flex items-start gap-3 px-4 py-3 rounded-xl bg-white/[0.02] hover:bg-white/5 transition-colors">
                                        <span className="text-cyan-500/70 mt-0.5 shrink-0">▹</span>
                                        <span className="text-sm text-zinc-300 leading-relaxed">{h}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
