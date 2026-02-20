import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { HiCode, HiAcademicCap, HiLightningBolt, HiClock } from 'react-icons/hi';
import resumeData from '../data/resume.json';

export default function About() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const stats = [
        { icon: <HiCode size={28} />, label: 'Projects Built', value: `${resumeData.projects.length}+`, color: 'from-cyan-500/20 to-blue-500/20' },
        { icon: <HiLightningBolt size={28} />, label: 'Technologies', value: `${Object.values(resumeData.skills).flat().length}+`, color: 'from-violet-500/20 to-purple-500/20' },
        { icon: <HiAcademicCap size={28} />, label: 'Education', value: resumeData.education[0]?.degree?.split(' ').pop() || 'B.Tech', color: 'from-amber-500/20 to-orange-500/20' },
        { icon: <HiClock size={28} />, label: 'Experience', value: `${resumeData.experience.length}+ yr`, color: 'from-emerald-500/20 to-green-500/20' },
    ];

    return (
        <section id="about" className="relative section-glow-cyan" ref={ref}>
            <div className="relative z-10 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-2">
                        About <span className="gradient-text">Me</span>
                    </h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full mb-10" />
                </motion.div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {/* Bio — spans 2 cols on lg */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="md:col-span-2 lg:col-span-2 lg:row-span-2"
                    >
                        <div className="glass rounded-2xl p-6 md:p-8 h-full flex flex-col justify-between">
                            <div>
                                <h3 className="text-lg font-bold text-zinc-100 mb-4 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                                    Who I Am
                                </h3>
                                <p className="text-zinc-300 text-base leading-relaxed mb-6">
                                    {resumeData.about}
                                </p>
                            </div>
                            <div className="space-y-4 pt-4 border-t border-white/5">
                                {resumeData.education.map((edu, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center shrink-0">
                                            <HiAcademicCap className="text-cyan-400" size={20} />
                                        </div>
                                        <div>
                                            <p className="text-zinc-200 font-medium text-sm">{edu.degree} in {edu.field}</p>
                                            <p className="text-zinc-400 text-xs">{edu.school} • {edu.year}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Stat Cards — fill remaining grid slots */}
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                        >
                            <div className="glass rounded-2xl p-6 h-full flex flex-col items-center justify-center text-center group hover:scale-[1.03] transition-all duration-300 hover:border-white/15">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3 text-cyan-400 group-hover:scale-110 transition-transform`}>
                                    {stat.icon}
                                </div>
                                <p className="text-2xl font-bold text-zinc-100">{stat.value}</p>
                                <p className="text-xs text-zinc-400 uppercase tracking-wider mt-1">{stat.label}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
