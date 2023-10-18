// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "url";
import VueI18nVitePlugin from "@intlify/unplugin-vue-i18n/vite";

export default defineNuxtConfig({
  ssr: true,
  routeRules: {
    "/": { prerender: true },
    // "/": { prerender: true },
  },
  runtimeConfig: {
    // The private keys which are only available within server-side
    apiSecret: "",
    // Keys within public, will be also exposed to the client-side
    public: {
      apiBase: "http://localhost:3003/api/v1",
    },
    // public: {
    //   apiBase: "http://technopark.kmutnb.ac.th/api/v1",
    // },
  },
  css: [
    "bootstrap/scss/bootstrap.scss",
    "swiper/css/bundle",
    "vue3-carousel/dist/carousel.css",
    "~/assets/scss/main.scss",
    "~/assets/css/custom.css",
  ],
  modules: [
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", ["defineStore", "definePiniaStore"]],
      },
    ],
    // "@nuxtjs/i18n",
    // "nuxt-vue-select",
  ],
  //   i18n: {
  //     lazy: true,
  //     langDir: "locales",
  //     strategy: "prefix_except_default",
  //     locales: [
  //       {
  //         code: "th-TH",
  //         iso: "th-TH",
  //         name: "ไทย",
  //         file: "th-TH.json",
  //       },
  //       {
  //         code: "en-US",
  //         iso: "en-US",
  //         name: "English(US)",
  //         file: "en-US.json",
  //       },
  //     ],
  //     defaultLocale: 'th-TH',
  //     // vueI18n: {
  //     //     fallbackLocale: 'th-TH'
  //     // },
  //   },

  build: {
    transpile: ["vue-i18n"],
  },
  vite: {
    plugins: [
      VueI18nVitePlugin({
        include: [
          resolve(dirname(fileURLToPath(import.meta.url)), "./locales/*.json"),
        ],
      }),
    ],
  },
  imports: {
    dirs: ["store"],
  },
  app: {
    head: {
      title: "SICC",
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
      script: [
        {
          src: "https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js",
          integrity:
            "sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2",
          crossorigin: "anonymous",
        },
      ],
    },
  },
});
