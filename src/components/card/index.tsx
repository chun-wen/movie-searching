import React, { useState } from 'react';

import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card as CardAntd, Space, Tooltip } from 'antd';
import dayjs from 'dayjs';

import { MovieInfo } from '@/Interface/I_MovieGeneral';

interface CardProps extends MovieInfo {
  onClick: () => void;
  onCollect: (movieInfo: MovieInfo) => void;
}

const Card = ({
  onClick,
  onCollect,
  ...props
}: CardProps) => {
  const [isCollet, setIsCollect] = useState(false);

  return (
    <div className="relative card-container">
      <CardAntd
        hoverable
        style={{ width: 240, height: 460 }}
        cover={<img alt={props.original_title} src={props.poster_path} />}
      >
        <p className="font-bold">{props.original_title}</p>
        <p>{dayjs(props.release_date).format('YYYY-MM-DD')}</p>
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
                onCollect({...props});
                setIsCollect(!isCollet);
              }}
            />
          </Tooltip>
        </div>
      </CardAntd>
    </div>
  );
};

export default Card;
