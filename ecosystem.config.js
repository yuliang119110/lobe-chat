module.exports = {
  apps: [
    {
      name: 'my-next-app',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
      },
      pre_start: 'sudo npm install && sudo npm run build',
    },
  ],
};
