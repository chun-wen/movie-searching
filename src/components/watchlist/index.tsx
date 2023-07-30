import { useState } from 'react';

import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';

interface WatchListProps {
  isColletProps: boolean;
  onCollect: (props: any) => void;
}
const WatchList = ({ isColletProps, onCollect, ...props }: WatchListProps) => {
  const [isCollet, setIsCollect] = useState(isColletProps);
  return (
    <Tooltip title={isCollet ? 'remove from watch list' : 'add to watch list'}>
      <Button
        className="card-item__button"
        icon={isCollet ? <MinusOutlined /> : <PlusOutlined />}
        onClick={(e) => {
          e.stopPropagation();
          onCollect({ ...props });
          setIsCollect(!isCollet);
        }}
      />
    </Tooltip>
  );
};

export default WatchList;
