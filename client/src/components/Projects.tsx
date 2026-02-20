import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import resumeData from '../data/resume.json';

export default function Projects() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="projects" className="relative section-glow-cyan" ref={ref}>
            <div className="relative z-10 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-2">
                        Featured <span className="gradient-text">Projects</span>
                    </h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full mb-10" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {resumeData.projects.map((project, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.15 * i }}
                            className="glass rounded-2xl group hover:border-white/15 transition-all duration-300 hover:-translate-y-1"
                        >
                            {/* Gradient Header Bar */}
                            <div className="h-1.5 rounded-t-2xl bg-gradient-to-r from-primary-500 to-accent-500 opacity-50 group-hover:opacity-100 transition-opacity" />

                            <div className="p-6 flex flex-col h-full">
                                <div className="flex items-start justify-between mb-4">
                                    <h3 className="text-lg font-bold text-zinc-100 group-hover:text-cyan-400 transition-colors">
                                        {project.name}
                                    </h3>
                                    <div className="flex gap-2 shrink-0 ml-3">
                                        {project.github && (
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-zinc-400 hover:text-cyan-400 hover:bg-white/10 transition-all"
                                                aria-label="GitHub"
                                            >
                                                <FaGithub size={16} />
                                            </a>
                                        )}
                                        {project.live && (
                                            <a
                                                href={project.live}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-zinc-400 hover:text-cyan-400 hover:bg-white/10 transition-all"
                                                aria-label="Live Demo"
                                            >
                                                <FaExternalLinkAlt size={14} />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <p className="text-zinc-300 text-sm leading-relaxed mb-5 flex-1">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {project.tech.map((t) => (
                                        <span
                                            key={t}
                                            className="px-2.5 py-1 rounded-md bg-accent-500/10 text-xs text-accent-400/90 font-medium border border-accent-500/10"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
