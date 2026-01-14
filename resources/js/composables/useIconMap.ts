import {
    Users,
    List,
    UserCog,
    Shield,
    LayoutGrid,
    Languages,
    type LucideIcon,
} from 'lucide-vue-next';
import type { Component } from 'vue';

const iconMap: Record<string, LucideIcon> = {
    users: Users,
    list: List,
    'users-cog': UserCog,
    'shield-alt': Shield,
    'layout-grid': LayoutGrid,
    language: Languages,
};

export function useIconMap() {
    const getIcon = (iconName: string | LucideIcon | undefined | Component): LucideIcon | Component | undefined => {
        if (!iconName) return undefined;
        if (typeof iconName !== 'string') return iconName;
        return iconMap[iconName] || undefined;
    };

    return {
        getIcon,
    };
}

