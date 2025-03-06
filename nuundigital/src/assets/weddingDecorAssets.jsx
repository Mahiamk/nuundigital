// Debug version to log what’s happening
const weddingDecorAssets = () => {
  console.log("Running weddingDecorAssets function...");
  const assets = import.meta.glob('../../assets/weddingDecor/*.{jpg,png,mp4,jpeg,svg}', { eager: true });
  console.log("import.meta", import.meta); 
  console.log("Glob result:", assets); // Log what files are found
  let assetMap = {};
  Object.keys(assets).forEach((path) => {
    const key = path
      .replace('../../assets/weddingDecor/', '')
      .replace(/\.(jpg|png|mp4|jpeg|svg)$/, '');
    assetMap[key] = assets[path].default;
    console.log(`Mapped ${path} to key: ${key}`);
  });
  console.log("Final asset map:", assetMap);
  return assetMap;
};

const assets = weddingDecorAssets();

export default assets;