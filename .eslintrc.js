module.exports = {
    "env": {
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "no-await-in-loop": "error",
        'no-compare-neg-zero': 'error',
        'no-cond-assign': 'error',
        'no-dupe-args': 'error',
        'no-dupe-keys': 'error',
        'no-empty': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-unreachable': 'error',
        eqeqeq: 'error',
        // 'no-var': 'error',
        'no-unused-vars': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    }
};