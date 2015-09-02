/**
 * Created by roderickWang on 7/17/15.
 */
var gulp = require('gulp');
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var less = require('gulp-less');
var path = require('path');
var gutil = require("gulp-util");
var open = require('gulp-open');

gulp.task('less', function () {
    gulp.src('./src/less/**/*.less')
        .pipe(less())
        .pipe(gulp.dest('./dist/css/'));
});
var devPort = 3004;
//dev task,react hot-reloader
gulp.task('hot', function (callback) {
    var compiler = webpack({
        devtool: 'eval',
        //devtool: 'cheap-module-eval-source-map',
        entry: [
            'webpack-dev-server/client?http://localhost:' + devPort,
            'webpack/hot/only-dev-server',
            './src/index.js'
        ],
        output: {
            path: path.join(__dirname, 'dist'),
            filename: 'bundle.js',
            publicPath: '/static/'
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoErrorsPlugin()
        ],
        resolve: {
            extensions: ['', '.js', '.jsx']
        },
        resolveLoader: {
            modulesDirectories: ["web_loaders", "web_modules", "node_loaders", "node_modules", './src/js/lib'],
            extensions: ["", ".webpack-loader.js", ".web-loader.js", ".loader.js", ".js"],
            packageMains: ["webpackLoader", "webLoader", "loader", "main"]
        },
        module: {
            loaders: [
                {
                    test: /\.jsx?$/,
                    loaders: [ 'babel'],
                    exclude: /node_modules/
                },
                {
                    test: /\.less$/,
                    loader: "style!css!less?strictMath&noIeCompat"
                }

            ]
        }
    });

    new WebpackDevServer(compiler, {
        publicPath: '/static/',
        hot: true,
        historyApiFallback: true,
        port: devPort,
        stats: {
            colors: true
        }
    }).listen(devPort, "localhost", function (err) {
            if (err) throw new gutil.PluginError("webpack-dev-server", err);
            gutil.log("[webpack-dev-server]", "http://localhost:" + devPort + "/webpack-dev-server/index.html");
        });


});

gulp.task('uri', function(){
    gulp.src(__filename)
        .pipe(open({uri: "http://localhost:" + devPort + "/webpack-dev-server/index.html"}));
});

gulp.task('build', function (callback) {
    webpack({
        entry: [
            './src/js/index.js'
        ],
        output: {
            path: './dist',
            filename: 'bundle.js',
            publicPath: '/static/'
            //libraryTarget: "commonjs"
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoErrorsPlugin(),
            new webpack.optimize.UglifyJsPlugin()
        ],
        resolve: {
            extensions: ['', '.js']
        },
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    loaders: ['jsx-loader', 'babel'],
                    exclude: /node_modules/
                },
                {
                    test: /\.less$/,
                    loader: "style!css!less?strictMath&noIeCompat"
                },
            ]
        },
        externals: {}
    }, function (err, stats) {
        if (err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    });
});

gulp.task('default', ['less', 'build']);
gulp.task('dev', ['hot', 'uri']);
gulp.task('watch', ['less', 'dev']);
