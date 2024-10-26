module.exports = {
  entry: './src/server.ts',
  output: {
    filename: './[name].js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,  // Coincide con archivos .ts y .tsx
        use: 'ts-loader',  // Usa ts-loader para procesar TypeScript
        exclude: /node_modules/,  // Excluye la carpeta node_modules
      },
    ],
  },
  mode: 'development', 
};