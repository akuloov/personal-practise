const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');

let mode = 'development';
if (process.env.NODE_ENV === 'production') {
    mode = 'production';
}

module.exports = {
    mode: mode,
    output: {
        assetModuleFilename: 'assets/[contenthash][ext][query]',
        filename: '[name].[contenthash].js',
        clean: true
    },
    devServer: {
        open: true,
        hot: true,
        port: 'auto',
        static: {
            directory: './src',
            watch: true
        }
    },
    devtool: mode != 'production' && 'source-map',
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    plugins: [
        new SVGSpritemapPlugin('src/images/svg/*.svg', {
            output: {
                filename: '../src/images/spritemap.svg',
                svg: {
                    sizes: false
                },
                chunk: {
                    keep: true
                },
                svgo: {
                    plugins: [
                        {
                            'name': 'removeStyleElement'
                        },
                        {
                            'name': 'removeAttrs',
                            'params': {
                                attrs: ["fill", "stroke"]
                            }
                        }
                    ]
                },
            },
            sprite: {
                prefix: 'icon-',
                generate: {
                    title: false
                }
            }
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: {
                collapseWhitespace: mode === 'production'
            }
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader'
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        'postcss-preset-env',
                                        {
                                            //Options
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.(woff2|woff|ttf|otf|eot)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
};