import '@/styles/profile/match_history.scss';
import { Match } from '@/types/matches';
import { GlobalAccount } from '@/types/services';
import { TacticianTileImage } from '@/components/tactician_tile_image';
import { ChampionTile } from '@/components/champion_tile';
import { TraitTile } from '@/components/trait_tile';
import { categorizeTrait } from '@/utils/services';
import { AugmentImage } from '@/components/augment_image';

interface MatchHistoryProps {
  matches: Match[];
  globalAccount: GlobalAccount;
}

export function MatchHistory({ matches, globalAccount }: MatchHistoryProps) {
  return (
    <>
      {matches.map((match, index) => {
        const playerIndex = match.metadata.participants.findIndex(
          (participantPUUID: string) => participantPUUID === globalAccount.puuid
        );

        const playerMatchInfo =
          playerIndex !== -1 && match.info.participants[playerIndex];

        const sortedTraits =
          playerMatchInfo &&
          playerMatchInfo.traits
            .map((trait) => ({
              ...trait,
              category: categorizeTrait(trait.tier_current, trait.tier_total),
            }))
            .sort((a, b) => b.category - a.category);

        return (
          <div className={'match-card'} key={index}>
            {playerMatchInfo && sortedTraits && (
              <>
                <div className={'tactician-tile-image'}>
                  <TacticianTileImage
                    item_ID={playerMatchInfo.companion.item_ID}
                    width={120}
                    height={120}
                  />
                </div>
                <div className="separator-1 match-history-separator" />
                <div className={'compo-infos'}>
                  <div className={'player-traits'}>
                    {sortedTraits.map(
                      (trait, index) =>
                        trait.tier_current !== 0 && (
                          <TraitTile
                            key={index}
                            trait={trait}
                            width={30}
                            height={30}
                          />
                        )
                    )}
                  </div>
                  <div className={'player-champions'}>
                    {playerMatchInfo.units.map((unit, index) => (
                      <ChampionTile key={index} unit={unit} />
                    ))}
                  </div>
                </div>
                <div className="separator-1 match-history-separator" />
                <div className={'augment-infos'}>
                  {playerMatchInfo.augments.map((augment, index) => (
                    <AugmentImage
                      item_ID={`${augment}`}
                      key={index}
                      width={50}
                      height={50}
                    />
                  ))}
                </div>
                <div className="separator-1 match-history-separator" />
                <div className={'rank-infos'}></div>
              </>
            )}
          </div>
        );
      })}
    </>
  );
}
