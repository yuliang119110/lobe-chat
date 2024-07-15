module.exports = {
  apps: [
    {
      args: 'start',
      env: {
        NODE_ENV: 'production',
      },
      name: 'hello-world',
      pre_start: 'sudo npm install && sudo npm run build',
      script: 'npm',
    },
  ],
};
