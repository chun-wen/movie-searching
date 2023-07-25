import React from 'react';

import { Card as CardAntd } from 'antd';
import dayjs from 'dayjs';

import { MovieInfo } from '@/interface/I_Movie';

// const { Meta } = CardAntd;

const Card = ({ ...props }: MovieInfo) => {
  return (
    <CardAntd
      hoverable
      style={{ width: 240 }}
      cover={<img alt={props.original_title} src={props.poster_path} />}
    >
      <p className='font-bold'>{props.original_title}</p>
      <p>{dayjs(props.release_date).format('DD/MM/YYYY')}</p>
    </CardAntd>
  );
};

export default Card;
