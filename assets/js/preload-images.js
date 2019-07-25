
export default imagePaths => {
  return new Promise((resolve, reject) => {
    let loadedCount = 0
    console.log('loaded')

    imagePaths.forEach(imagePath => {
      const img = new Image;
      img.onload = () => {
        loadedCount++;
        if (loadedCount == imagePaths.length) {
          resolve();
        }
      }
      img.src = imagePath;
    })
  })
}
