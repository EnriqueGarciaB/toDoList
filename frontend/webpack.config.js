const path = require('path');

module.exports = {
  entry: './src/index.js', // Ajusta esta ruta según la estructura de tu proyecto
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      // Otros loaders
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  // Otras configuraciones
};