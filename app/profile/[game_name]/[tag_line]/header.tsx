import { FadeOutMessageType, GlobalAccount } from '@/types/services';
import React from 'react';
import { Match } from '@/types/matches';
import { ProfileHeaderAccountInfos } from '@/app/profile/[game_name]/[tag_line]/profile_header_account_infos';
import { ProfileHeaderGlobalStats } from '@/app/profile/[game_name]/[tag_line]/profile_header_global_stats';

export interface ProfileHeaderProps {
  globalAccount: GlobalAccount;
  setMatches: (matches: Match[]) => void;
  setMessage: (message: FadeOutMessageType) => void;
}

export function ProfileHeader({
  globalAccount,
  setMatches,
  setMessage,
}: ProfileHeaderProps) {
  return (
    <div className={'header-container'}>
      {globalAccount && (
        <>
          <ProfileHeaderAccountInfos globalAccount={globalAccount} />
          <ProfileHeaderGlobalStats
            globalAccount={globalAccount}
            setMessage={setMessage}
            setMatches={setMatches}
          />
        </>
      )}
    </div>
  );
}
