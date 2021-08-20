module.exports = {
  apps: [
    {
      name: "standard",
      script: "./node_modules/nuxt/bin/nuxt.js",
      append_env_to_name: true,
      args: "start",
      instances: 2,
      exec_mode: "cluster",
      autorestart: true,
      watch: true,
      port: 3593,
      max_memory_restart: "500M"
    }
  ],
  deploy: {
    "standard-dev": {
      user: "node",
      host: "39.100.245.204",
      ref: "origin/standard-dev",
      repo: "git@git.beidouclass.cn:web/beidou-webembed.git",
      path: "/Users/zhaosinan/Desktop/beidouclass/beidou-webembed",
      ssh_options: "StrictHostKeyChecking=no",
      "post-deploy":
        "rm -rf node_modules && cnpm install && npm run build:standard-dev && pm2 list &&  pm2 startOrReload ecosystem.config.js  && pm2 list && echo $?"
    },
    standard: {
      user: "node",
      host: "root@39.100.245.204",
      ref: "origin/standard",
      repo: "git@git.beidouclass.cn:web/beidou-webembed.git",
      path: "/Users/zhaosinan/Desktop/beidouclass/beidou-webembed",
      ssh_options: "StrictHostKeyChecking=no",
      "post-deploy":
        "rm -rf node_modules&& cnpm install && npm run build:standard && pm2 list &&  pm2 startOrReload ecosystem.config.js  && pm2 list && echo $?"
    },
    "standard-online": {
      user: "node",
      host: "root@39.100.245.204",
      ref: "origin/standard-online",
      repo: "git@git.beidouclass.cn:web/beidou-webembed.git",
      path: "/Users/zhaosinan/Desktop/beidouclass/beidou-webembed",
      ssh_options: "StrictHostKeyChecking=no",
      "post-deploy":
        "rm -rf node_modules && cnpm install && npm run build:standard-online && pm2 list &&  pm2 startOrReload ecosystem.config.js  && pm2 list && echo $?"
    },
    "customer-mingqian": {
      user: "node",
      host: "0.0.0.0",
      ref: "origin/customer-mingqian",
      repo: "git@git.beidouclass.cn:web/beidou-webembed.git",
      path: "/Users/zhaosinan/Desktop/beidouclass/beidou-webembed",
      ssh_options: "StrictHostKeyChecking=no",
      "post-deploy":
        "rm -rf node_modules && cnpm install && npm run build:customer-mingqian && pm2 list &&  pm2 startOrReload ecosystem.config.js  && pm2 list && echo $?"
    }
  }
};
