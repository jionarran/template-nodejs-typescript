module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
  ],
  "plugins": [
    ["module-resolver", {
      "root": ["."],
      "alias": {
        "@test": "./test",
        "@src": "./src",
      }
    }]
  ]
}
