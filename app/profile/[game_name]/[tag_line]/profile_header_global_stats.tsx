import '@/styles/profile/profile_header_global_stats.scss';
import {
  fetchMatchByID,
  updateAccountMatchesByPUUID,
} from '@/utils/fetchRiotFromClient';
import { isRequestError } from '@/utils/services';
import { ProfileHeaderProps } from '@/app/profile/[game_name]/[tag_line]/header';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export function ProfileHeaderGlobalStats({
  globalAccount,
  setMatches,
  setMessage,
}: ProfileHeaderProps) {
  function handleUpdateMatches() {
    if (globalAccount) {
      setMessage({ message: '', type: 'default' });
      updateAccountMatchesByPUUID(globalAccount.puuid).then((data) => {
        if (!isRequestError(data)) {
          Promise.all(data.matches.map((match) => fetchMatchByID(match))).then(
            (matches) => !isRequestError(matches) && setMatches(matches)
          );
          setMessage({ message: 'Updated successfully', type: 'success' });
        } else {
          setMessage({ message: data.status.message, type: 'error' });
        }
      });
    }
  }
  return (
    <div className={'profile-header-global-stats-container'}>
      <div className={'profile-header-global-stats'}>
        <p>
          Ici il va falloir mettre des stats globales sympa sur la compte du
          joueur
        </p>
      </div>
      <button className={'update-matches-button'} onClick={handleUpdateMatches}>
        <FontAwesomeIcon icon={faSyncAlt} /> Update History
      </button>
    </div>
  );
}
