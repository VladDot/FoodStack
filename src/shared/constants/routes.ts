export const routes = {
  general: {
    home: '/',
    info: '/info',
    contact: '/contact',
    premium: '/premium',
    foodsSearch: '/foods-search',
    foodDetail: (id: string | number) => `/foods-search/${id}`,
    recipes: '/recipes',
  },

  auth: {
    signIn: '/sign-in',
    signUp: '/sign-up',
  },

  user: {
    dashboard: {
      main: '/dashboard',
      diary: '/dashboard/diary',
      saved: '/dashboard/saved',
      chat: '/dashboard/chat',
      progress: '/dashboard/progress',
      settings: '/dashboard/settings-page',
    },
  },

  admin: {
    panel: '/admin',
    usersManagement: '/admin/users',
    foodDatabase: '/admin/food-database',
  },
} as const;
