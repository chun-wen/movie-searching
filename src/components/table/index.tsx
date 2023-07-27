import React from 'react';

import { Table as TableAntd, TableProps as TablePropsAntd } from 'antd';

const Table = ({ ...props }: TablePropsAntd<any>) => {
  const { currentPage, defaultPageSize } = defaultPageParam;

  const defaultPageParam = {

  }
  return (
    <TableAntd
      {...props}
      data-testid="table"
      className={`${props.className}`}
    />
  );
};

export default Table;
export type { TablePropsAntd };