import React, { useState } from 'react';

import { Table as TableAntd, TableProps as TablePropsAntd } from 'antd';

import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { FilterValue, SorterResult } from 'antd/lib/table/interface';

interface TableParams {
  current?: number;
  pagesize? : number;
  sortField?: string;
  sortType?: string;
  filters?: Record<string, FilterValue>;
}

const Table = ({ onChange, ...props }: TablePropsAntd<any>) => {
  return (
    <TableAntd
      {...props}
      data-testid="table"
      className={`${props.className}`}
      onChange={onChange}
    />
  );
};

export default Table;
export type { TablePropsAntd , TableParams};