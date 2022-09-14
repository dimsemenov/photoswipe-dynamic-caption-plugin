// eslint-disable-next-line import/no-extraneous-dependencies
import {terser} from 'rollup-plugin-terser';


import pkg from './package.json';

const year = new Date().getFullYear();

function getBanner(name) {
    return `/*!
  * ${name} ${pkg.version} - https://photoswipe.com
  * (c) ${year} Dmytro Semenov
  */`;
}

function getMinifyPlugin() {
    return terser({
        output: {
            comments: /^\**!/i,
        },
        mangle: {
            properties: {
                // mangle properties and func names that start with underscore
                regex: /^_/,
            }
        }
    });
}

const outputDir = 'dist/';

const esmDynamicCaptionJS = {
    input: 'photoswipe-dynamic-caption-plugin.esm.js',
    output: {
        name: 'PhotoSwipeDynamicCaption',
        banner: getBanner('PhotoSwipe Dynamic Caption plugin'),
        file: outputDir + 'photoswipe-dynamic-caption-plugin.esm.min.js',
        format: 'esm'
    },
    plugins: [getMinifyPlugin()]
};


const umdDynamicCaptionJS = {
    input: 'photoswipe-dynamic-caption-plugin.esm.js',
    output: {
        name: 'PhotoSwipeDynamicCaption',
        banner: getBanner('PhotoSwipe Dynamic Caption plugin'),
        file: outputDir + 'photoswipe-dynamic-caption-plugin.umd.min.js',
        format: 'umd'
    },
    plugins: [getMinifyPlugin()]
};

export default [esmDynamicCaptionJS, umdDynamicCaptionJS];
