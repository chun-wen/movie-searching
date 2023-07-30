import React, { useMemo, useState } from 'react';

import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card as CardAntd, Space, Tooltip } from 'antd';
import dayjs from 'dayjs';

import { MovieInfo } from '@/Interface/I_MovieGeneral';

import { Cast } from '@/interface/I_MovieCredit';

export enum CardEnum {
  Normal = 'Normal',
  ModalCard = 'ModalCard',
}

type CardType = CardEnum.Normal | CardEnum.ModalCard;
interface CardProps {
  onClick?: () => void;
  onCollect?: (movieInfo: MovieInfo) => void;
  cardType?: CardType;
  movieInfo?: MovieInfo;
  cast?: Pick<Cast, 'name' | 'profile_path' | 'popularity' | 'id'>
}

const Card = ({
  onClick,
  onCollect,
  cardType = CardEnum.ModalCard,
  ...props
}: CardProps) => {
  const [isCollet, setIsCollect] = useState(false);
  
  const renderCard = useMemo(() => {
    console.log('1');
    switch(cardType){
      case CardEnum.Normal: 
         return (<CardAntd
          hoverable={false}
          style={{ width: 300, height: 460 }}
          cover={<img alt={props?.cast?.name || ''} src={props?.cast?.profile_path || ''} />}
        >
          <p className="font-bold text-2xl break-words">{props?.cast?.name}</p>
        </CardAntd>)
      case CardEnum.ModalCard:
      default:
        return (
          <div className="relative card-container">
            <CardAntd
              hoverable
              style={{ width: 240, height: 460 }}
              cover={<img alt={props?.movieInfo?.original_title} src={props?.movieInfo?.poster_path} />}
            >
              <p className="font-bold">{props?.movieInfo?.original_title}</p>
              <p>{dayjs(props?.movieInfo?.release_date).format('DD/MM/YYYY')}</p>
            </CardAntd>
            <CardAntd
              onClick={onClick}
              hoverable={false}
              style={{ width: 240, height: 460 }}
              className="card-item"
            >
              <div className="flex justify-end">
                <Tooltip title={isCollet ? 'remove from watch list': 'add to watch list'}>
                  <Button
                    className='card-item__button'
                    icon={isCollet ? <MinusOutlined /> : <PlusOutlined />}
                    onClick={(e) => {
                      e.stopPropagation();
                      onCollect?.({ ...props?.movieInfo as MovieInfo });
                      setIsCollect(!isCollet);
                    }}
                  />
                </Tooltip>
              </div>
            </CardAntd>
          </div>
        )
    }
  },[isCollet, props])
  

  return (
    renderCard
  )
};

export default Card;