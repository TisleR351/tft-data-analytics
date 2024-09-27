import { useEffect, useState } from 'react';
import { fetchImageUrl } from '@/utils/services';
import Image from 'next/image';
import { EntityImageProps } from '@/types/services';

async function resizeImage(
  url: string,
  width: number,
  height: number
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new (window as any).Image() as HTMLImageElement;
    img.src = url;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      if (!context) {
        reject('Failed to get canvas context');
        return;
      }

      const srcX = (512 - width) / 2;
      const srcY = (344 - height) / 2;

      canvas.width = width;
      canvas.height = height;

      context.drawImage(img, srcX, srcY, width, height, 0, 0, width, height);

      resolve(canvas.toDataURL('image/jpeg', 0.8));
    };
  });
}

export function TacticianTileImage({
  item_ID,
  width,
  height,
}: EntityImageProps) {
  const [resizedImage, setResizedImage] = useState<string>();

  useEffect(() => {
    async function getImgSrc() {
      const imageUrl = await fetchImageUrl('tft-tactician', `${item_ID}`);
      return imageUrl && (await resizeImage(imageUrl, 200, 200));
    }

    getImgSrc().then((data) => setResizedImage(data));
  }, [item_ID]);

  return (
    resizedImage && (
      <Image
        alt="Tactician image"
        height={height}
        width={width}
        src={resizedImage}
      />
    )
  );
}
