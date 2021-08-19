const CompressionWebpackPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = ["js", "css"];
import nuxtEnv from "./nuxt_env.js";
console.log("nuxt config", process.env.MODE, nuxtEnv);

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "h5-ssr",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    script: [{ src: "https://cdn.jsdelivr.net/npm/dsbridge/dist/dsbridge.js" }]
  },
  srcDir: "src/",
  css: [
    "assets/css/public.less",
    "assets/css/font.css",
    "vant/lib/index.css",
    "element-ui/lib/theme-chalk/index.css"
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "@/plugins/vant",
    { src: "@/plugins/element-ui", ssr: true },
    "@/plugins/header",
    "@/plugins/title-directive"
  ],

  env: {},
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/router"],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios", "@nuxtjs/router"],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    vendor: ["element-ui"],
    extractCSS: true,
    plugins: [
      new CompressionWebpackPlugin({
        filename: "[path].gz[query]", // 提示compression-webpack-plugin@2.0.0的话filename改为asset
        algorithm: "gzip",
        test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
        threshold: 1024, //内容超过10KB进行压缩
        minRatio: 0.8
      })
    ],
    babel: {
      plugins: [
        [
          "component",
          {
            libraryName: "element-ui",
            styleLibraryName: "theme-chalk"
          }
        ]
      ],
      comments: true
    },
    transpile: ["vant/es/locale/lang/en-US"],
    loaders: {
      vue: {
        transformAssetUrls: {
          video: ["poster", "src"]
        }
      }
    },
    extend(config, { isClient, loaders: { vue } }) {
      if (isClient) {
        vue.transformAssetUrls = {
          link: "href",
          video: ["poster", "src"]
        };
      }
    }
  }
};
