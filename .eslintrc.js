module.exports = {
    "extends": "airbnb",
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "rules": {
        "comma-dangle": ["error", "never"],
        "import/no-extraneous-dependencies": "off",
        "indent": ["error", 4, { "SwitchCase": 1 }],
        "linebreak-style": ["error", "windows"],
        "no-console": "off",
        "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
        "no-param-reassign": ["error", { "props": false }],
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