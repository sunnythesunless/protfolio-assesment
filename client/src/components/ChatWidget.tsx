import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { HiChat, HiX, HiPaperAirplane } from 'react-icons/hi';
import { sendChatMessage, type ChatMessage } from '../services/api';

/* ── Quick-start suggestions ── */
const SUGGESTIONS = [
    { icon: '💼', label: 'Skills & expertise' },
    { icon: '🚀', label: 'Projects' },
    { icon: '🎓', label: 'Education' },
    { icon: '📧', label: 'Contact info' },
];

/* ── Typing dots animation ── */
function TypingDots() {
    return (
        <div className="chat-typing">
            <div className="chat-typing-dots">
                {[0, 1, 2].map((i) => (
                    <span
                        key={i}
                        className="chat-dot"
                        style={{ animationDelay: `${i * 0.2}s` }}
                    />
                ))}
            </div>
            <span className="chat-typing-label">Thinking…</span>
        </div>
    );
}

/* ── Time formatter ── */
function formatTime(ts: string) {
    return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

/* ── Code block with copy button ── */
function CodeBlock({ children, className }: { children?: React.ReactNode; className?: string }) {
    const [copied, setCopied] = useState(false);
    const codeText = String(children).replace(/\n$/, '');

    return (
        <div className="chat-code-wrap">
            <pre className={className}>
                <code>{children}</code>
            </pre>
            <button
                onClick={() => {
                    navigator.clipboard.writeText(codeText);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                }}
                className="chat-copy-btn"
            >
                {copied ? '✓ Copied' : 'Copy'}
            </button>
        </div>
    );
}

/* ── Main ChatWidget ── */
export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    /* Auto-scroll on new messages */
    const scrollToBottom = useCallback(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    useEffect(() => { scrollToBottom(); }, [messages, isLoading, scrollToBottom]);

    /* Focus input & lock body scroll on mobile */
    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    /* Auto-resize textarea */
    useEffect(() => {
        const el = inputRef.current;
        if (el) {
            el.style.height = 'auto';
            el.style.height = `${Math.min(el.scrollHeight, 96)}px`;
        }
    }, [input]);

    /* ── Send handler ── */
    const handleSend = async (text?: string) => {
        const msg = (text || input).trim();
        if (!msg || isLoading) return;

        setInput('');
        setError(null);

        const userMsg: ChatMessage = {
            role: 'user',
            content: msg,
            timestamp: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, userMsg]);
        setIsLoading(true);

        const result = await sendChatMessage(msg, [...messages, userMsg]);

        if (result.error) {
            setError(result.error);
        } else {
            setMessages((prev) => [
                ...prev,
                { role: 'assistant', content: result.response, timestamp: new Date().toISOString() },
            ]);
        }
        setIsLoading(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    /* ── Render ── */
    return (
        <>
            {/* ━━ Floating trigger button ━━ */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, rotate: -30 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 30 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.92 }}
                        onClick={() => setIsOpen(true)}
                        className="chat-fab"
                        aria-label="Open AI Chat"
                    >
                        <HiChat size={22} />
                        <span className="chat-fab-badge">AI</span>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* ━━ Chat panel ━━ */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop (mobile) */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="chat-backdrop"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Panel */}
                        <motion.div
                            initial={{ opacity: 0, y: 24, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 24, scale: 0.96 }}
                            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
                            className="chat-panel"
                        >
                            {/* ── Header ── */}
                            <header className="chat-header">
                                <div className="chat-header-info">
                                    <div className="chat-avatar">
                                        <HiChat size={16} />
                                    </div>
                                    <div>
                                        <h3 className="chat-title">AI Assistant</h3>
                                        <p className="chat-status">
                                            <span className="chat-status-dot" />
                                            Online
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="chat-close-btn"
                                    aria-label="Close chat"
                                >
                                    <HiX size={18} />
                                </button>
                            </header>

                            {/* ── Messages ── */}
                            <div className="chat-messages">
                                {/* Welcome */}
                                {messages.length === 0 && !isLoading && (
                                    <div className="chat-welcome">
                                        <div className="chat-welcome-icon">
                                            <HiChat size={24} />
                                        </div>
                                        <h4>Hey there! 👋</h4>
                                        <p>Ask me anything about my skills, projects, or experience.</p>
                                        <div className="chat-suggestions">
                                            {SUGGESTIONS.map((s) => (
                                                <button
                                                    key={s.label}
                                                    onClick={() => handleSend(`${s.icon} ${s.label}`)}
                                                    className="chat-suggestion-chip"
                                                >
                                                    <span className="chat-chip-icon">{s.icon}</span>
                                                    {s.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Message bubbles */}
                                {messages.map((msg, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.25, ease: 'easeOut' }}
                                        className={`chat-row ${msg.role}`}
                                    >
                                        <div className={`chat-bubble ${msg.role}`}>
                                            {msg.role === 'assistant' ? (
                                                <div className="chat-markdown">
                                                    <ReactMarkdown
                                                        components={{
                                                            pre: ({ children }) => <>{children}</>,
                                                            code: ({ className, children }) => {
                                                                if (className?.includes('language-')) {
                                                                    return <CodeBlock className={className}>{children}</CodeBlock>;
                                                                }
                                                                return <code className={className}>{children}</code>;
                                                            },
                                                        }}
                                                    >
                                                        {msg.content}
                                                    </ReactMarkdown>
                                                </div>
                                            ) : (
                                                <p>{msg.content}</p>
                                            )}
                                            <time className="chat-time">{formatTime(msg.timestamp)}</time>
                                        </div>
                                    </motion.div>
                                ))}

                                {/* Typing indicator */}
                                {isLoading && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="chat-row assistant"
                                    >
                                        <div className="chat-bubble assistant">
                                            <TypingDots />
                                        </div>
                                    </motion.div>
                                )}

                                {/* Error toast */}
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="chat-error"
                                    >
                                        <span className="chat-error-icon">⚠</span>
                                        <span className="chat-error-text">{error}</span>
                                        <button
                                            onClick={() => {
                                                setError(null);
                                                const lastUser = [...messages].reverse().find((m) => m.role === 'user');
                                                if (lastUser) handleSend(lastUser.content);
                                            }}
                                            className="chat-error-retry"
                                        >
                                            Retry
                                        </button>
                                    </motion.div>
                                )}

                                <div ref={bottomRef} />
                            </div>

                            {/* ── Input area ── */}
                            <footer className="chat-input-area">
                                <div className="chat-input-row">
                                    <textarea
                                        ref={inputRef}
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Ask about my resume…"
                                        rows={1}
                                        className="chat-input"
                                    />
                                    <button
                                        onClick={() => handleSend()}
                                        disabled={!input.trim() || isLoading}
                                        className="chat-send-btn"
                                        aria-label="Send message"
                                    >
                                        <HiPaperAirplane size={15} className="rotate-90" />
                                    </button>
                                </div>
                                <p className="chat-footer-note">
                                    Powered by AI · Answers based on my resume
                                </p>
                            </footer>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
