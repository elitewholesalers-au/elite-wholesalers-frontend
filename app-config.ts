import type { NuxtAppConfig } from 'nuxt/schema'

const appConfig: Partial<NuxtAppConfig> = {
  keepalive: true,
  head: {
    charset: 'utf-8',
    title: 'Elite Wholesalers | Australia’s Trusted Security & Electronics Suppliers',
    titleTemplate: 'Elite Wholesalers | %s',
    htmlAttrs: { lang: 'en-AU' },
    bodyAttrs: { class: 'overflow-x-hidden' },
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
      {
        'http-equiv': 'Content-Security-Policy',
        content: 'upgrade-insecure-requests'
      },
      {
        name: 'title',
        content: 'Elite Wholesalers | Australia’s Trusted Security & Electronics Suppliers'
      },
      {
        name: 'description',
        content:
          'Australia’s leading trade distributor specializing in wholesale security, surveillance, CCTV, alarms, intercoms, access control, electronic locks, networking, and smart IoT technology solutions.'
      },
      {
        property: 'og:title',
        content: 'Elite Wholesalers | Australia’s Trusted Security & Electronics Suppliers'
      },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://www.elitewholesalers.com.au' },
      {
        property: 'og:image',
        content: 'https://www.elitewholesalers.com.au/logo.png'
      },
      {
        property: 'og:image:secure_url',
        content: 'https://www.elitewholesalers.com.au/logo.png'
      },
      { property: 'og:image:type', content: 'image/png' },
      // Added: Width and height for og:image to satisfy social platforms requirements
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      {
        property: 'og:description',
        content:
          'Australia’s leading trade distributor specializing in wholesale security, surveillance, CCTV, alarms, intercoms, access control, electronic locks, networking, and smart IoT technology solutions.'
      },
      { property: 'og:locale', content: 'en_AU' },
      { property: 'og:site_name', content: 'Elite Wholesalers' },
      {
        name: 'keywords',
        content:
          'Elite Wholesalers, elite wholesalers, Elite alarms, Akuvox Intercom, PIXIE Automation, TP Link, security wholesaler Sydney, commercial security equipment supplier Australia, trade security wholesale Peakhurst, wholesale security products online store, CCTV wholesale Australia, IP cameras wholesale, network video recorders NVR, Milesight cameras Australia, Dahua security cameras, PTZ dome camera, LPR ANPR traffic cameras, fisheye security camera, super WDR pro camera, access control systems wholesale, electric strikes, keypads access control, intercom systems Australia, Bticino intercom, 2 wire video intercom kit, security alarm systems, Bosch alarm systems, Crow alarm parts, electronic door locks, frameless glass locks, automatic door hardware, PoE switches wholesale, PoE extenders, network transmission products, 5G AIoT suite, smart remote management solution, IoT devices wholesale, radar AI traffic scanner, tailgate assist, vehicle remote start, GME automotive, Milesight Australia distributor, Dahua wholesale Australia, Bosch security wholesale, Crow alarms supplier, Bticino intercoms Australia'
      },
      { name: 'language', content: 'English' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'author', content: 'Elite Wholesalers Pty Ltd' },
      { name: 'robots', content: 'index, follow' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon/favicon-16x16.png' },
      { rel: 'shortcut icon', href: '/favicon/favicon.ico' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon.png' },
      { href: 'https://fonts.googleapis.com', rel: 'dns-prefetch' },
      {
        href: 'https://fonts.gstatic.com',
        rel: 'preconnect',
        crossorigin: 'anonymous'
      },
      { rel: 'canonical', href: 'https://www.elitewholesalers.com.au' }
    ],
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Elite Wholesalers',
          alternateName: ['Elite Wholesalers Pty Ltd', 'Elite Wholesalers Online'],
          url: 'https://www.elitewholesalers.com.au',
          logo: 'https://www.elitewholesalers.com.au/logo.png',
          description:
            'Australia’s trusted commercial security equipment supplier and wholesale security products online store for CCTV, Alarms, Intercoms, Access Control, and Smart IoT Solutions.',
          address: {
            '@type': 'PostalAddress',
            streetAddress: '1/9 Stanley Street',
            addressLocality: 'Peakhurst',
            addressRegion: 'NSW',
            postalCode: '2210',
            addressCountry: 'AU'
          },
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+61-2-9533-7877',
            email: 'info@elitewholesalers.com.au',
            contactType: 'Customer Service',
            areaServed: 'AU',
            availableLanguage: 'English'
          }
        })
      }
    ]
  }
}

export default appConfig
