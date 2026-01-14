import '../css/app.css';

import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import type { DefineComponent } from 'vue';
import { createApp, h } from 'vue';
import { i18nVue, trans } from 'laravel-vue-i18n';
import { initializeTheme } from './composables/useAppearance';
import './lib/route'; // Import route helper

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) => {
        if (name.startsWith('User/')) {
            const pageName = name.replace('User/', '');
            return resolvePageComponent(
                `../../packages/user/resources/js/pages/${pageName}.vue`,
                import.meta.glob<DefineComponent>('../../packages/user/resources/js/pages/**/*.vue'),
            );
        }

        if (name.startsWith('Language/')) {
            const pageName = name.replace('Language/', '');
            return resolvePageComponent(
                `../../packages/language/resources/js/pages/${pageName}.vue`,
                import.meta.glob<DefineComponent>('../../packages/language/resources/js/pages/**/*.vue'),
            );
        }

        return resolvePageComponent(
            `./pages/${name}.vue`,
            import.meta.glob<DefineComponent>('./pages/**/*.vue'),
        );
    },
    setup({ el, App, props, plugin }) {
        const app = createApp({ render: () => h(App, props) });

        app.use(plugin);

        // Get locale from Inertia shared props, fallback to 'hu'
        const locale = props.initialPage.props.locale || 'hu';

        app.use(i18nVue, {
            lang: locale,
            resolve: async (lang: string) => {
                return await import(`../../lang/${lang}.json`);
            },
        });

        // Make trans globally available
        app.config.globalProperties.$trans = trans;
        app.config.globalProperties.route = (window as any).route;

        app.mount(el);
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on page load...
initializeTheme();
