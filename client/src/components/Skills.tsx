import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
    SiTypescript, SiReact, SiNextdotjs,
    SiTailwindcss, SiNodedotjs, SiFastapi, SiPostgresql, SiMongodb,
    SiSqlite, SiGit, SiDocker, SiVercel, SiPython,
} from 'react-icons/si';
import { HiCode, HiServer, HiCog, HiChip, HiShieldCheck, HiDatabase, HiMail, HiLightningBolt } from 'react-icons/hi';
import resumeData from '../data/resume.json';

const iconMap: Record<string, React.ReactNode> = {
    // Frontend
    'Next.js 14': <SiNextdotjs />, 'React 18': <SiReact />,
    'TypeScript': <SiTypescript />, 'Tailwind CSS 4': <SiTailwindcss />,
    'TanStack Query': <HiLightningBolt />, 'Shadcn UI': <HiCode />,
    'Framer Motion': <HiLightningBolt />, 'Zustand': <HiChip />,
    // Backend
    'Node.js': <SiNodedotjs />, 'Express.js': <HiServer />,
    'Python': <SiPython />, 'FastAPI': <SiFastapi />,
    'RESTful APIs': <HiServer />, 'Inngest': <HiCog />,
    'Nodemailer': <HiMail />, 'Better Auth': <HiShieldCheck />,
    'Axios': <HiServer />,
    // Databases
    'MongoDB': <SiMongodb />, 'PostgreSQL': <SiPostgresql />,
    'Drizzle ORM': <HiDatabase />, 'NeonDB': <HiDatabase />,
    'SQLite': <SiSqlite />,
    // DevOps & Tools
    'Git': <SiGit />, 'GitHub': <SiGit />,
    'Vercel': <SiVercel />, 'Railway': <HiServer />,
    'Docker': <SiDocker />, 'Postman': <HiCog />,
    'VS Code': <HiCode />,
    // Core Skills
    'Data Structures & Algorithms': <HiCode />, 'System Design': <HiChip />,
    'Component Architecture': <HiCode />, 'Unit Testing': <HiShieldCheck />,
};

const categoryMeta: Record<string, { label: string; color: string; iconColor: string }> = {
    frontend: { label: 'Frontend', color: 'from-violet-500/20 to-purple-500/20', iconColor: 'text-violet-400' },
    backend: { label: 'Backend', color: 'from-emerald-500/20 to-green-500/20', iconColor: 'text-emerald-400' },
    databases: { label: 'Databases', color: 'from-amber-500/20 to-orange-500/20', iconColor: 'text-amber-400' },
    devops_tools: { label: 'DevOps & Tools', color: 'from-rose-500/20 to-pink-500/20', iconColor: 'text-rose-400' },
    core_skills: { label: 'Core Skills', color: 'from-cyan-500/20 to-blue-500/20', iconColor: 'text-cyan-400' },
};

export default function Skills() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="skills" className="relative section-glow-violet" ref={ref}>
            <div className="relative z-10 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-2">
                        Tech <span className="gradient-text">Stack</span>
                    </h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full mb-10" />
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {Object.entries(resumeData.skills).map(([category, skills], catIndex) => {
                        const meta = categoryMeta[category] || { label: category, color: 'from-zinc-500/20 to-zinc-600/20', iconColor: 'text-zinc-400' };
                        return (
                            <motion.div
                                key={category}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: 0.1 * catIndex }}
                                className="glass rounded-2xl p-6 hover:bg-surface-800/80 transition-all duration-300 group hover:scale-[1.02] hover:border-white/15"
                            >
                                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r ${meta.color} mb-5`}>
                                    <span className="text-xs font-semibold text-zinc-200 uppercase tracking-wider">
                                        {meta.label}
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-2.5">
                                    {skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 text-sm text-zinc-300 hover:bg-white/10 transition-all duration-200 cursor-default group/skill`}
                                        >
                                            <span className={`text-base opacity-70 group-hover/skill:opacity-100 ${meta.iconColor} transition-opacity`}>
                                                {iconMap[skill] || <HiCode />}
                                            </span>
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
