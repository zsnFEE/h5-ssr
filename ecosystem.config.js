module.exports = {
  apps: [
    {
      name: "123",
      script: "./node_modules/nuxt/bin/nuxt.js",
      append_env_to_name: true,
      // cwd: "/var/www/beidou-web",
      // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
      args: "start",
      instances: 2,
      exec_mode: "cluster",
      autorestart: true,
      watch: true,
      port: 3593,
      max_memory_restart: "500M",
      env: {
        COMMON_VARIABLE: "true"
      },
      env_production: {
        NODE_ENV: "production"
      }
    }
  ],
  deploy: {
    production: {
      user: "zhaosinan",
      host: "0.0.0.0",
      ref: "origin/ssr-official",
      repo: "git@git.beidouclass.cn:web/beidou-official.git",
      path: "/Users/zhaosinan/Desktop/beidouclass/beidou-official",
      ssh_options: "StrictHostKeyChecking=no",
      "post-deploy":
        "rm -rf node_modules && export PATH=$PATH:/Users/zhaosinan/.nvm/versions/node/v12.18.3/bin && npm install && npm run build && pm2 list &&  pm2 startOrReload /Users/zhaosinan/Desktop/beidouclass/beidou-official/ecosystem.config.js --env production  && pm2 list && echo $?"
    }
  }
};
