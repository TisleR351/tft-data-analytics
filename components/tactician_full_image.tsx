import { useEffect, useState } from 'react';
import Image from 'next/image';
import '@/styles/components/tacticien_image.scss';
import { fetchImageUrl } from '@/utils/services';
import { EntityImageProps } from '@/types/services';

export function TacticianFullImage({
  item_ID,
  width,
  height,
}: EntityImageProps) {
  const [imageUrl, setImageUrl] = useState<string>();
  useEffect(() => {
    fetchImageUrl('tft-tactician', `${item_ID}`).then(
      (data) => data && setImageUrl(data)
    );
  }, [item_ID]);

  return (
    imageUrl && (
      <Image
        alt="Tactician image"
        height={height}
        width={width}
        src={imageUrl}
      />
    )
  );
}
