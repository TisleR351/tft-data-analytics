import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Trait } from '@/types/matches';
import '@/styles/components/trait_tile.scss';
import { categorizeTrait, fetchImageUrl } from '@/utils/services';

interface TraitTileProps {
  trait: Trait;
  width: number;
  height: number;
}

export function TraitTile({ trait, width, height }: TraitTileProps) {
  const [imgUrl, setImageUrl] = useState<string>('');
  const traitTier = categorizeTrait(trait.tier_current, trait.tier_total);
  useEffect(() => {
    fetchImageUrl('tft-trait', `${trait.name}`).then(
      (data) => data && setImageUrl(data)
    );
  }, [trait.name]);
  return (
    imgUrl && (
      <div className={`circle-background trait-rarity-${traitTier}`}>
        <Image src={imgUrl} alt={`Trait tile`} width={width} height={height} />
      </div>
    )
  );
}
