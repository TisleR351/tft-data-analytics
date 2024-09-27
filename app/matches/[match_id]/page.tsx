'use client';
import { useParams } from 'next/navigation';

const MatchDetails = () => {
  const params = useParams();

  return <main>{JSON.stringify(params)}</main>;
};

export default MatchDetails;
