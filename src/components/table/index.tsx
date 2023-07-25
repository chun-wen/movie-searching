import React, { useCallback } from 'react';
import './table.scss';

import { Table as TableAntd, TableProps as TablePropsAntd } from 'antd';

import LeftSvg from '@/Image/left.svg';
import RightSvg from '@/Image/right.svg';

interface TableProps extends TablePropsAntd<any> {
  hidePagination?: boolean;
  hideBorderBottom?: boolean;
}

const Table = ({ hidePagination = false, hideBorderBottom = false, ...props }: TableProps) => {
  const itemRender = useCallback(
    (
      _page: number,
      type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next',
      originalElement: React.ReactNode
    ) => {
      if (type === 'prev' || type === 'next')
        return (
          <div className="ant-pagination-item-link">
            <img src={type === 'prev' ? LeftSvg : RightSvg} alt="arrow" />
          </div>
        );
      return originalElement;
    },
    []
  );

  return (
    <TableAntd
      {...props}
      data-testid="table"
      className={`${(props.pagination === false || hidePagination) && 'pagination--none'} ${
        hideBorderBottom ? 'borderBottom--none' : ''
      } ${props.className}`}
      pagination={{
        ...props.pagination,
        locale: {
          jump_to: 'jump to ',
          items_per_page: '',
          next_page: '',
          prev_page: ''
        },
        itemRender
      }}
    />
  );
};

export default Table;
export type { TablePropsAntd, TableProps };