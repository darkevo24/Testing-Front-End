module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: '12.12.0',
        },
      },
    ],
  ],
  plugins: ['@babel/plugin-transform-react-jsx', '@babel/plugin-proposal-class-properties'],
};
