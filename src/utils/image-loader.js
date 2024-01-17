export const ImageLoader = (file, { minWidth = 0, minHeight = 0 } = {}) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject('Invalid image.');
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const src = reader.result;
      const image = new Image();
      image.src = src;

      image.onload = () => {
        if (image.width >= minWidth && image.height >= minHeight) {
          resolve(src);
        }
        reject('The image resolution is too low.');
      };
    };
  });
};
