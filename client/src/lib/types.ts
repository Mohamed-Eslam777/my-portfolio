// Type definitions for portfolio data

export interface Project {
    id: number;
    title: string;
    slug: string;
    description: string;
    techTags: string[];
    role: string;
    repoLink: string | null;
    demoLink: string | null;
    screenshots: string[] | null;
    features: string[] | null;
    problem: string | null;
    solution: string | null;
    architecture: string[] | null;
}

export interface Experience {
    id: number;
    title: string;
    company: string;
    period: string;
    description: string;
}

export interface Skill {
    id: number;
    category: string;
    items: string[];
}

export interface Service {
    id: number;
    title: string;
    description: string;
}

export interface Review {
    id: number;
    name: string;
    role: string | null;
    text: string;
}

export interface Education {
    id: number;
    institution: string;
    degree: string;
    year: string;
    description: string;
}
