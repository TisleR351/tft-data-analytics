'use client';
import '@/styles/index/page.scss';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { fetchGlobalAccount, isRequestError } from '@/utils/services';
import { useRouter } from 'next/navigation';
import { Fade_out_message } from '@/components/fade_out_message';
import { FadeOutMessageType } from '@/types/services';

export default function Home() {
  const [gameName, setGameName] = useState('');
  const [tagLine, setTagLine] = useState('');
  const [message, setMessage] = useState<FadeOutMessageType>();
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage({ message: '', type: 'default' });
    const globalAccount = await fetchGlobalAccount({
      gameName: gameName,
      tagLine: tagLine,
    });
    try {
      if (!isRequestError(globalAccount)) {
        localStorage.setItem('profile', JSON.stringify(globalAccount));
        router.push('/profile/' + gameName + '/' + tagLine);
      } else {
        setMessage({ message: globalAccount.status.message, type: 'error' });
      }
    } catch (error) {
      setMessage({
        message: 'An error has occured, check servers status',
        type: 'error',
      });
    }
  }

  return (
    <main>
      <div className="index-container">
        <div className="index-sub-container">
          <h1 className="index-title">TFT Data Analytics</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="index-summoner-input"
              onChange={(e) => setGameName(e.target.value)}
              placeholder="Summoner's name"
            />
            <input
              type="text"
              className="index-tag-input"
              placeholder="TAG"
              onChange={(e) => setTagLine(e.target.value)}
            />
            <button className="send-button" type="submit">
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </form>
        </div>
        {message && <Fade_out_message key={message.message} props={message} />}
      </div>
    </main>
  );
}
