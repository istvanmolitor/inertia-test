// Route helper for user admin routes
// Simple implementation without wayfinder dependency

type RouteParams = Record<string, string | number> | string | number;

export function route(name: string, params?: RouteParams): string {
    const routeMap: Record<string, (params?: any) => string> = {
        'user.admin.users.index': () => '/admin/user/users',
        'user.admin.users.create': () => '/admin/user/users/create',
        'user.admin.users.edit': (id: number) => `/admin/user/users/${id}/edit`,
        'user.admin.users.destroy': (id: number) => `/admin/user/users/${id}`,
        'user.admin.users.update': (id: number) => `/admin/user/users/${id}`,
        'user.admin.users.store': () => `/admin/user/users`,
        'user.admin.user-groups.index': () => '/admin/user/user-groups',
        'user.admin.user-groups.create': () => '/admin/user/user-groups/create',
        'user.admin.user-groups.edit': (id: number) => `/admin/user/user-groups/${id}/edit`,
        'user.admin.user-groups.destroy': (id: number) => `/admin/user/user-groups/${id}`,
        'user.admin.user-groups.update': (id: number) => `/admin/user/user-groups/${id}`,
        'user.admin.user-groups.store': () => `/admin/user/user-groups`,
        'user.admin.permissions.index': () => '/admin/user/permissions',
        'user.admin.permissions.create': () => '/admin/user/permissions/create',
        'user.admin.permissions.edit': (id: number) => `/admin/user/permissions/${id}/edit`,
        'user.admin.permissions.destroy': (id: number) => `/admin/user/permissions/${id}`,
        'user.admin.permissions.update': (id: number) => `/admin/user/permissions/${id}`,
        'user.admin.permissions.store': () => `/admin/user/permissions`,
    };

    const routeFn = routeMap[name];
    if (!routeFn) {
        console.warn(`Route "${name}" not found`);
        return '#';
    }

    return routeFn(params);
}

// Make it available globally
if (typeof window !== 'undefined') {
    (window as any).route = route;
}

