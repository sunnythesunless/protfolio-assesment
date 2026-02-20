const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
}

export interface ChatResponse {
    response: string;
    error?: string;
}

export interface ResumeData {
    name: string;
    title: string;
    tagline: string;
    about: string;
    education: Array<{
        degree: string;
        field: string;
        school: string;
        year: string;
        highlights: string[];
    }>;
    skills: Record<string, string[]>;
    experience: Array<{
        role: string;
        company: string;
        duration: string;
        highlights: string[];
    }>;
    projects: Array<{
        name: string;
        description: string;
        tech: string[];
        github: string;
        live: string;
    }>;
    contact: {
        email: string;
        github: string;
        linkedin: string;
    };
}

export async function sendChatMessage(
    message: string,
    history: ChatMessage[]
): Promise<ChatResponse> {
    try {
        const res = await fetch(`${API_BASE}/api/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message, history }),
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            return { response: '', error: errorData.error || 'Something went wrong. Please try again.' };
        }

        return await res.json();
    } catch {
        return { response: '', error: 'Unable to connect to the server. Please try again later.' };
    }
}

export async function fetchResume(): Promise<ResumeData | null> {
    try {
        const res = await fetch(`${API_BASE}/api/resume`);
        if (!res.ok) return null;
        return await res.json();
    } catch {
        return null;
    }
}
