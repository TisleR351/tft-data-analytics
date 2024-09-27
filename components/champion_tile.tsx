import '@/styles/components/champion_tile.scss';
import { Unit } from '@/types/matches';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface ChampionTileProps {
  unit: Unit;
}

export function ChampionTile({ unit }: ChampionTileProps) {
  const [championName, setChampionName] = useState<string>();
  const [url, setUrl] = useState<string>();
  useEffect(() => {
    const loadChampions = async () => {
      const splittedCharacterId = unit.character_id.split('_');
      setChampionName(splittedCharacterId[1]);
      setUrl(
        `/${process.env.NEXT_PUBLIC_TFT_VERSION}/unit-tiles/img/${splittedCharacterId[1]}.png`
      );
    };

    loadChampions();
  }, [unit.character_id, unit.rarity, url]);
  return (
    url && (
      <Image
        alt={`Champion tile ${championName}`}
        height={50}
        width={50}
        src={url}
        className={`champion-tile champion-rarity-${unit.rarity}`}
      />
    )
  );
}
