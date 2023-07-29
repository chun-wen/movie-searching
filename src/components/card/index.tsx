import React, { useState } from 'react';

import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card as CardAntd, Space, Tooltip } from 'antd';
import dayjs from 'dayjs';

import { MovieInfo } from '@/Interface/I_MovieGeneral';

interface CardProps extends MovieInfo {
  onClick: () => void;
  onCollect: (id: number, isCollet: boolean) => void;
}

const Card = ({
  onClick,
  onCollect,
  original_title,
  poster_path,
  release_date,
  id,
  ...props
}: CardProps) => {
  const [isCollet, setIsCollect] = useState(false);

  return (
    <div className="relative card-container">
      <CardAntd
        hoverable
        style={{ width: 240, height: 460 }}
        cover={<img alt={original_title} src={poster_path} />}
      >
        <p className="font-bold">{original_title}</p>
        <p>{dayjs(release_date).format('YYYY-MM-DD')}</p>
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
                onCollect(id,isCollet );
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
