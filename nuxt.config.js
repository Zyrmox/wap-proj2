
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: {
    color: 'green',
    height: '3px'
  },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/css/app.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/helpers.js',
    '~/plugins/uuid.js'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    ['@nuxtjs/eslint-module', {
      fix: true
    }],
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    // ['@nuxtjs/fontawesome', {
    //   suffix: true,
    //   icons: {
    //     solid: true
    //   }
    // }]
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/google-fonts',
    ['nuxt-supabase', {
      supabaseUrl: 'https://aomrbpbirewwgkhdbvvm.supabase.co',
      supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFvbXJicGJpcmV3d2draGRidnZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTA0NTgwMzAsImV4cCI6MTk2NjAzNDAzMH0.oxBVcGzYHknRmO7O53p5mfCh0A4Lf4Y5hViELuNQcOo'
    }],
    '@nuxtjs/date-fns',
    ['~/modules/deleteFilesCron.js']
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  components: true,
  googleFonts: {
    families: {
      Poppins: true
    }
  },
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  }
}
