module.exports = {
	apps: [
    {
      name: 'monitoring-alarm-service',
      script: 'pnpm',
      args: 'run start:docker',
      env: {
        NODE_ENV: 'docker',
      },
    },
	],
};

// 启动: pm2 start ecosystem.config.js