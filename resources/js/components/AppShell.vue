<script setup lang="ts">
import { SidebarProvider } from '@/components/ui/sidebar';
import { usePage } from '@inertiajs/vue3';
import { AdminToaster, useFlashMessages } from '@admin/index';

interface Props {
    variant?: 'header' | 'sidebar';
}

defineProps<Props>();

const isOpen = usePage().props.sidebarOpen;

// Initialize flash message handling
useFlashMessages();
</script>

<template>
    <div v-if="variant === 'header'" class="flex min-h-screen w-full flex-col">
        <slot />
        <AdminToaster />
    </div>
    <SidebarProvider v-else :default-open="isOpen">
        <slot />
        <AdminToaster />
    </SidebarProvider>
</template>
