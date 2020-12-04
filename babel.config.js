module.exports = {
  presets: [
    ['@vue/app', {
      polyfills: [
        'es6.array.find-index',
        'es6.promise',
        'es6.symbol'
      ],
      useBuiltIns: false
    }]
  ],
  env: {
    test: {
      presets: ['env']
    }
  }
};