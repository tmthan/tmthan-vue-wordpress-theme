module.exports = {
    devServer: {
        port: 8080,
        https: false,
        disableHostCheck: true,
        public: '0.0.0.0:8080'
    },
    css: {
        extract: {
            filename: 'css/tmthan.[name].css',
            chunkFilename: 'css/tmthan.[name].css',
        },
    },
    configureWebpack: {
        output: {
            filename: 'js/tmthan.[name].js',
            chunkFilename: 'js/tmthan.[name].js',
        }
    }
};