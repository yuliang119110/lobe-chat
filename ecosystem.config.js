module.exports = {
  apps: [
    {
      args: 'start',
      env: {
        NODE_ENV: 'production',
      },
      name: 'my-next-app',
      pre_start: 'sudo npm install && sudo npm run build',
      script: 'npm',
    },
  ],
};
