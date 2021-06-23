module.exports = {
  apps: [{
    name: "xadroga",
    script: "./src/app.js",
    watch: true,
    instances: "max",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}
