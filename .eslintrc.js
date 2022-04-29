module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
  "extends": [
    "eslint:recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/recommended",
    "plugin:react-perf/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": ["react","react-perf"],
    "rules": {
        "no-undef": "off",
        "no-unescaped-entities": "off",
        "react/prop-types": "off",
        "no-unused-vars": "off"
    }
}
