'use client';
import '@/styles/profile/page.scss';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchGlobalAccount, isRequestError } from '@/utils/services';
import { FadeOutMessageType, GlobalAccount } from '@/types/services';
import { Match } from '@/types/matches';
import { ProfileHeader } from '@/app/profile/[game_name]/[tag_line]/header';
import {
  fetchAccountMatchesByPUUID,
  fetchMatchByID,
} from '@/utils/fetchRiotFromClient';
import { Fade_out_message } from '@/components/fade_out_message';
import { MatchHistory } from '@/app/profile/[game_name]/[tag_line]/match_history';

export default function Profile() {
  const params = useParams();
  const gameName = params.game_name;
  const tagLine = params.tag_line;

  const [globalAccount, setGlobalAccount] = useState<GlobalAccount>();
  const [matches, setMatches] = useState<Match[]>();
  const [message, setMessage] = useState<FadeOutMessageType>();

  function updateMatches(newMatches: Match[]) {
    setMatches(newMatches);
  }

  function updateMessage(message: FadeOutMessageType) {
    setMessage(message);
  }

  useEffect(() => {
    async function fetchData() {
      const accountData = await fetchGlobalAccount({
        gameName: gameName as string,
        tagLine: tagLine as string,
      });
      if (!isRequestError(accountData)) {
        localStorage.setItem('profile', JSON.stringify(accountData));
        setGlobalAccount(accountData);
      }
    }

    const storedData = localStorage.getItem('profile');

    !storedData
      ? fetchData()
      : setGlobalAccount(JSON.parse(storedData) as GlobalAccount);
  }, [gameName, tagLine]);

  useEffect(() => {
    if (globalAccount) {
      fetchAccountMatchesByPUUID(globalAccount.puuid).then((data) => {
        if (!isRequestError(data)) {
          Promise.all(data.matches.map((match) => fetchMatchByID(match))).then(
            (matches) => !isRequestError(matches) && setMatches(matches)
          );
        }
      });
    }
  }, [globalAccount]);

  return (
    <main>
      {globalAccount && (
        <ProfileHeader
          globalAccount={globalAccount}
          setMatches={updateMatches}
          setMessage={updateMessage}
        />
      )}
      {matches && globalAccount && !isRequestError(matches) && (
        <MatchHistory matches={matches} globalAccount={globalAccount} />
      )}
      {message && <Fade_out_message key={message.message} props={message} />}
    </main>
  );
}
