module.exports = {
    "extends": "airbnb",
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "rules": {
        "comma-dangle": ["error", "never"],
        "linebreak-style": ["error", "windows"],
        "indent": ["error", 4, { "SwitchCase": 1 }],
        "no-console": "off",
        "no-plusplus": ["error", "never"],
        "no-unused-expressions": ["error", { "allowShortCircuit": true }],
        "no-underscore-dangle": "off"
    },
    "globals": {
        "window": true,
        "document": true,
    },
    "settings": {
        "import/resolver": "webpack"
    }
};