module.exports = {
    apps: [{
        name: 'beach-finder-api',
        script: 'server.js',
        instances: 1,
        exec_mode: 'fork',
        env: {
            NODE_ENV: 'production',
            PORT: 3000,
        },
        max_memory_restart: '200M',
        error_file: '/home/ubuntu/logs/beach-finder-error.log',
        out_file: '/home/ubuntu/logs/beach-finder-out.log',
        log_date_format: 'YYYY-MM-DD HH:mm:ss',
        restart_delay: 1000,
        autorestart: true,
    }],
};
