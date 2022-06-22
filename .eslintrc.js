module.exports = {
    'env': {
        'browser': true,
        'es2021': true
    },
    'extends': 'plugin:react/recommended',
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true
        },
        'ecmaVersion': 'latest',
        'sourceType': 'module'
    },
    'settings': {
        'react': {
            'version': 'detect'
        }
    },
    'plugins': [
        'react',
        'unused-imports'
    ],
    'rules': {
        'react/prop-types': 0,
        'quotes': ['error', 'single'],
        'react/react-in-jsx-scope': 'off',
        'jsx-quotes': ['error', 'prefer-single'],
        'object-curly-spacing': ['error', 'never'],
        'unused-imports/no-unused-imports': 'error'
    }
}
