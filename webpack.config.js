const path = require('path');

let conf = {
    entry: './assets/src/js/cookie-consent.js',
    output: {
        path: path.resolve(__dirname,  './assets/build/js'),
		filename: '[name].bundle.js',
		publicPath: 'assets/build/js/'
	},    
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "defaults" }]
                        ]
                    }
                }
            }
        ]
    },    
    devServer: {
        overlay: true,
        devMiddleware: {            
            writeToDisk: true,
        },
        hot: false,        
    }
}

module.exports = (env, options) => {
	let isProd = options.mode === 'production';

	conf.devtool = isProd ? false: 'eval-source-map';
    conf.mode = isProd ? 'production' : 'development';

	return conf;
} 