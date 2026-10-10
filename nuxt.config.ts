// https://nuxt.com/docs/api/configuration/nuxt-config
import app from './app-config'

export default defineNuxtConfig({
  ssr: true,

  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/image',
    '@compodium/nuxt',
    '@nuxtjs/google-fonts',
    '@nuxtjs/seo',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@vee-validate/nuxt',
    '@vite-pwa/nuxt',
    'nuxt-gtag',
    'nuxt-security',
    'nuxt-swiper',
    '@vueuse/nuxt',
    '@nuxt/scripts'
  ],

  devtools: {
    enabled: true
  },

  app,

  css: ['~/assets/css/main.css'],

  ui: {
    colorMode: false
  },

  scripts: {
    registry: {
      youtubePlayer: {
        trigger: 'onNuxtReady'
      }
    }
  },

  runtimeConfig: {},

  security: {
    headers: {
      contentSecurityPolicy: {
        'default-src': ["'self'"],
        'img-src': [
          "'self'",
          'data:',
          'http://localhost:5050',
          'https://cdn1.zohoecommerce.com',
          'http://api.elitewholesalers.com.au',
          'https://www.youtube.com',
          'https://www.googletagmanager.com'
        ],
        'frame-src': ["'self'", 'https://www.youtube.com', 'https://www.youtube-nocookie.com'],
        'connect-src': [
          "'self'",
          'http://localhost:5050',
          'http://api.elitewholesalers.com.au',
          'https://www.googletagmanager.com',
          'https://www.google.com',

          process.env.VITE_API_URL || ''
        ].filter(Boolean),
        'script-src': [
          "'self'",
          "'unsafe-inline'",
          "'unsafe-eval'",
          'https://www.youtube.com',
          'https://s.ytimg.com'
        ],
        'script-src-elem': [
          "'self'",
          "'unsafe-inline'",
          'https://www.youtube.com',
          'https://s.ytimg.com',
          'https://www.googletagmanager.com'
        ],
        'script-src-attr': ["'unsafe-inline'"], // Fixes the inline event handler error
        'style-src': ["'self'", "'unsafe-inline'"]
      }
    }
  },

  routeRules: {
    '/': { prerender: true },
    '/dashboard/**': { ssr: false }
  },
  site: {
    url: 'https://www.elitewholesalers.com.au',
    name: 'Elite Wholesalers',
    description: 'Australia’s trusted source for security, networking & electronics devices.',
    defaultLocale: 'en-AU'
  },

  robots: {
    groups: [
      {
        userAgent: ['*'],
        allow: ['/'],
        disallow: ['/dashboard', '/cart', '/checkout']
      }
    ]
  },
  seo: {},

  // gtag: {
  //   id: process.env.NUXT_PUBLIC_GTAG_ID || 'G-XXXXXXXXXX'
  // },

  compatibilityDate: '2026-06-30',

  vite: {
    optimizeDeps: {
      exclude: ['swiper/element/bundle']
    }
  },

  nitro: {
    externals: {
      inline: ['zod']
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  icon: {
    customCollections: [
      {
        prefix: 'icon',
        dir: './app/assets/icons'
      }
    ]
  },

  piniaPluginPersistedstate: {
    storage: 'localStorage',
    cookieOptions: {
      sameSite: 'strict',
      maxAge: 3600 * 24 * 7 // 1 week
    }
  }
})
