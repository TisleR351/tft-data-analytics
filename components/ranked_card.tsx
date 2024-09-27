import '@/styles/profile/ranked_card.scss';
import Image from 'next/image';

interface RankedCardProps {
  queueType: string;
  tier: string;
  rank: string;
  wins: number;
  losses: number;
}

export default function RankedCard({
  queueType,
  tier,
  rank,
  wins,
  losses,
}: RankedCardProps) {
  let shortQueueType;
  let imgPath = '/ddragon/tft-regalia/';

  switch (queueType) {
    case 'RANKED_TFT_DOUBLE_UP':
      shortQueueType = 'DOUBLE UP';
      break;
    case 'RANKED_TFT':
      shortQueueType = 'SOLO TFT';
      break;
    default:
      shortQueueType = 'OTHER';
      break;
  }

  switch (tier) {
    case 'IRON':
      imgPath += 'TFT_Regalia_Iron.png';
      break;
    case 'BRONZE':
      imgPath += 'TFT_Regalia_Bronze.png';
      break;
    case 'SILVER':
      imgPath += 'TFT_Regalia_Silver.png';
      break;
    case 'GOLD':
      imgPath += 'TFT_Regalia_Gold.png';
      break;
    case 'EMERALD':
      imgPath += 'TFT_Regalia_Emerald.png';
      break;
    case 'PLATINUM':
      imgPath += 'TFT_Regalia_Platinum.png';
      break;
    case 'DIAMOND':
      imgPath += 'TFT_Regalia_Diamond.png';
      break;
    case 'MASTER':
      imgPath += 'TFT_Regalia_Master.png';
      break;
    case 'GRANDMASTER':
      imgPath += 'TFT_Regalia_GrandMaster.png';
      break;
    case 'CHALLENGER':
      imgPath += 'TFT_Regalia_Challenger.png';
      break;
    default:
      imgPath += 'TFT_Regalia_Provisional.png';
      break;
  }

  return (
    <div className="ranked-card">
      <Image
        src={imgPath}
        alt={'Profile Icon'}
        width={100}
        height={100}
        className={'rank-icon'}
      />
      <div className="separator-1" />
      <div className="ranked-card-text">
        <div>{shortQueueType}</div>
        <div>
          {tier} {rank}
        </div>
        <div>WR {Math.round((wins / (wins + losses)) * 10000) / 100}%</div>
      </div>
    </div>
  );
}
