import { useEffect, useState } from 'react';
import Image from 'next/image';
import { fetchImageUrl } from '@/utils/services';
import { EntityImageProps } from '@/types/services';

import '@/styles/components/augment_image.scss';

export function AugmentImage({ item_ID, width, height }: EntityImageProps) {
  const [imageUrl, setImageUrl] = useState<string>();
  useEffect(() => {
    fetchImageUrl('tft-augments', `${item_ID}`).then(
      (data) => data && setImageUrl(data)
    );
  }, [item_ID]);

  return (
    imageUrl && (
      <Image
        alt={`Augment image ${item_ID}`}
        height={height}
        width={width}
        src={imageUrl}
        className={'augment-image'}
      />
    )
  );
}
