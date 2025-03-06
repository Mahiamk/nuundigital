// src/assets/assets.js
const importAll = () => {
  const assets = import.meta.glob('./*.*', { eager: true });
  let assetMap = {};
  Object.keys(assets).forEach((path) => {
    const key = path.replace('./', '').replace(/\.(jpg|png|mp4|jpeg|svg)$/, '');
    assetMap[key] = assets[path].default; // Vite adds .default for static assets
  });
  return assetMap;
};

const assets = importAll();

export default assets;