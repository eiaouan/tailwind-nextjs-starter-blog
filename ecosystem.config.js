module.exports = {
  apps: [{
    name: 'Ashley blog',      // 你的应用名
    script: 'yarn',              // 启动脚本
    args: 'start',              // 启动参数
    cwd: '/home/program/tailwind-nextjs-starter-blog',     // 应用目录（绝对路径）
    env: {
      NODE_ENV: 'production',   // 生产环境
      PORT: 3000                // 可选，指定端口
    },
    // 资源控制
    instances: 1,
    autorestart: true,
    watch: false,               // 建议关闭，用部署钩子控制
    max_memory_restart: '1G',
  }],

  // 部署配置（核心部分）
  deploy: {
    production: {
      user: 'ubuntu',                           // 服务器用户名
      host: ['106.53.163.141'],                 // 服务器IP地址
      ref: 'origin/main',                       // 要拉取的分支
      repo: 'https://github.com/eiaouan/tailwind-nextjs-starter-blog.git', // Git仓库地址
      path: '/home/program/tailwind-nextjs-starter-blog',                  // 服务器上的部署路径
      // 🎯 最重要的部分：部署后执行的命令
      'post-deploy': `
        yarn install &&           # 安装依赖
        yarn build &&         # 执行构建
        pm2 reload ecosystem.config.js --env production  # 重启应用
      `,
      ssh_options: ['StrictHostKeyChecking=no']
    }
  }
};