const webpack =require('webpack')
module.exports=function override(config){


    const fallback=config.resolve.fallback||{};

    Object.assign(fallback,{
        zlib: require.resolve("browserify-zlib"),
        path: require.resolve("path-browserify"),
        
        fs:false,
        net:false,
        querystring: require.resolve("querystring-es3"),
        http: require.resolve("stream-http"),
        crypto: require.resolve("crypto-browserify"),
        stream:require.resolve("stream-browserify"),
        assert:require.resolve("assert/"),
        

    })
    
    config.resolve.fallback=fallback;
    config.plugins=(config.plugins||[]).concat([
        new webpack.ProvidePlugin({
            process:'process/browser.js',
            Buffer:['buffer','Buffer'],
        }),
    ]);
    return config;
}