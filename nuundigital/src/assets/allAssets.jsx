const importAll = (glob) => {
  let assets = {};
  Object.keys(glob).forEach((path) => {
    const key = path
      .replace('./', '')
      .replace('./weddingDecor/', '') // Handle both root and subfolder
      .replace(/\.(jpg|png|mp4|jpeg|svg)$/, '');
    assets[key] = glob[path].default;
  });
  return assets;
};

// Root assets
const rootAssets = importAll(import.meta.glob('./*.{jpg,png,mp4,jpeg,svg}', { eager: true }));
// Wedding Decor assets
const weddingDecorAssets = importAll(import.meta.glob('./weddingDecor/*.{jpg,png,mp4,jpeg,svg}', { eager: true }));

// Combine into one export
const allAssets = {
  root: rootAssets,
  weddingDecor: weddingDecorAssets,
};

export default allAssets;