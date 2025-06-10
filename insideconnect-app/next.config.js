/** @type {import('next').NextConfig} */
const nextConfig = {
    // Add the following webpack configuration
    webpack: (config, { isServer }) => {
        // This is to tell Next.js to not bundle these optional dependencies.
        // They are not used in our project because we are using PostgreSQL.
        config.externals.push({
            'better-sqlite3': 'commonjs better-sqlite3',
            'mysql': 'commonjs mysql',
            'mysql2': 'commonjs mysql2',
            'oracledb': 'commonjs oracledb',
            'sqlite3': 'commonjs sqlite3',
            'tedious': 'commonjs tedious',
        });

        return config;
    },
}

    module.exports = nextConfig;
