import { Storage } from 'aws-amplify';
import Resizer from 'react-image-file-resizer';

export default async function uploadPhotos(photos, adId, setStatus) {
  const compressSizer = (size) => {
    const MB = size / Math.pow(1024, 2);
    if (Math.round(MB) === 0) return 100;
    if (Math.round(MB) === 1) return 90;
    if (Math.round(MB) === 2) return 80;
    if (Math.round(MB) === 3) return 70;
    if (Math.round(MB) === 4) return 60;
    if (Math.round(MB) >= 5) return 50;
    if (Math.round(MB) >= 10) return 40;
    if (Math.round(MB) >= 15) return 30;
    if (Math.round(MB) >= 20) return 20;
    if (Math.round(MB) >= 25) return 10;
  };

  // const imageDimension = (file) => {
  //   return new Promise((resolve) => {
  //     const reader = new FileReader();

  //     reader.readAsDataURL(file);
  //     reader.onload = function (e) {
  //       const image = new Image();

  //       image.src = e.target.result;

  //       image.onload = function () {
  //         resolve({ height: this.height, width: this.width });
  //       };
  //     };
  //   });
  // };

  const resizeFile = (file, quality) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        720,
        480,
        'JPEG',
        quality,
        0,
        (uri) => {
          resolve(uri);
        },
        'base64'
      );
    });

  const imageManipulator = async (file) => {
    const compress = compressSizer(file.size);
    const image = await resizeFile(file, compress);

    return image;
  };

  const upload = async (photo) => {
    const photoId = (time) => parseInt(time, 10).toString(16);

    const response = await fetch(photo);
    const blob = await response.blob();

    const res = await Storage.put(`ads/${adId}/${photoId(new Date().getTime())}.jpeg`, blob, {
      contentType: 'image/jpeg',
    });

    if (res.key) return res.key;
  };

  let keys = [];
  for (let index = 0; index < photos.length; index++) {
    try {
      const photo = photos[index];

      setStatus(`uploading ad photo ${index + 1} / ${photos.length}`);

      if (photo.source === 'CLOUD') {
        keys.push(photoUri);
      } else {
        const compressedPhoto = await imageManipulator(photo.file);
        if (compressedPhoto) {
          const key = await upload(compressedPhoto);
          if (typeof key === 'string') keys.push(key);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return keys;
}
