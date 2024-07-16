module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    'istanbul',
    function () {
      return {
        visitor: {
          Program(path) {
            console.log('Instrumenting file:', path.hub.file.opts.filename);
          },
        },
      };
    },
  ],
};
