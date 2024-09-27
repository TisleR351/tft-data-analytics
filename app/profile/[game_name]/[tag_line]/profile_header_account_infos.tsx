import '@/styles/profile/profile_header_account_infos.scss';
import Image from 'next/image';
import RankedCard from '@/components/ranked_card';
import React from 'react';
import { GlobalAccount } from '@/types/services';

interface ProfileHeaderAccountInfosProps {
  globalAccount: GlobalAccount;
}

export function ProfileHeaderAccountInfos({
  globalAccount,
}: ProfileHeaderAccountInfosProps) {
  return (
    <div className={'profile-header-account-infos-container'}>
      <div className={'profile-container'}>
        <Image
          src={`/${process.env.NEXT_PUBLIC_TFT_VERSION}/profileicon/img/${globalAccount?.profileIconId}.png`}
          alt={`Profile Icon ${globalAccount?.profileIconId}`}
          width={85}
          height={85}
          className={'profile-icon'}
        />
        <h1 className={'game-name'}>
          {globalAccount?.gameName}#{globalAccount?.tagLine}
        </h1>
      </div>
      <div className="rank-container">
        {globalAccount?.league.map((league, index) => (
          <RankedCard
            queueType={league.queueType}
            rank={league.rank}
            tier={league.tier}
            wins={league.wins}
            losses={league.losses}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}
