export default defineNuxtConfig({
  devtools: { enabled: false },
  compatibilityDate: '2024-11-01',
  app: {
    head: {
      title: 'ZEITVERTRIEB',
      meta: [
        { charset: 'utf-8' },
        { name: 'author', content: 'realitysoftware.ca' }
      ],
      link: [
        { rel: 'stylesheet', href: '/css/style.css' }
      ]
    }
  },
  css: ['~/assets/css/main.css']
})
