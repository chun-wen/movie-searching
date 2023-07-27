import React from 'react';

import { Card as CardAntd } from 'antd';
import dayjs from 'dayjs';

import { MovieInfo } from '@/Interface/I_Movie';

// const { Meta } = CardAntd;

interface CardProps extends MovieInfo {
  onClick: () => void;
}

const Card = ({ onClick, original_title, poster_path, release_date, ...props }: CardProps) => {
  return (
    <div onClick={onClick}>
      <CardAntd
        hoverable
        style={{ width: 240 }}
        cover={<img alt={original_title} src={poster_path} />}
      >
        <p className="font-bold">{original_title}</p>
        <p>{dayjs(release_date).format('DD/MM/YYYY')}</p>
      </CardAntd>
    </div>
  );
};

export default Card;
