/* eslint-disable
  global-require,
  no-param-reassign,
  prefer-destructuring,
  import/no-dynamic-require,
*/
// import { getOptions } from 'loader-utils';
var getOptions = require('loader-utils').getOptions;
var validateOptions = require('schema-utils');
// import validateOptions from 'schema-utils';
var mime = require('mime');
// import mime from 'mime';

// import schema from './options.json';

var schema = require('./options.json');

function shouldTransform(limit, size) {
    if (typeof limit === 'boolean') {
        return limit;
    }

    if (typeof limit === 'number' || typeof limit === 'string') {
        return size <= parseInt(limit, 10);
    }

    return true;
}

exports.default = function loader(src) {
    // console.table(src);
    // Loader Options
    const options = getOptions(this) || {};

    validateOptions(schema, options, {
        name: 'URL Loader',
        baseDataPath: 'options',
    });


    // No limit or within the specified limit
    if (shouldTransform(options.limit, src.length)) {
        const file = this.resourcePath;
        console.log('------------resourcePath---------------2');
        console.table(file);
        // Get MIME type
        const mimetype = options.mimetype || mime.getType(file);

        if (typeof src === 'string') {
            src = Buffer.from(src);
        }
        // console.log(src.toString('base64'));
        return `module.exports = ${JSON.stringify(
            `data:${mimetype || ''};base64,${src.toString('base64')}`
        )}`;
    }
}

// Loader Mode
exports.raw = true;
