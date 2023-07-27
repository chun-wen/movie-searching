import { SortOrder as SortOrderProps } from 'antd/lib/table/interface';
import { isUndefined } from 'lodash';

import { TableParams } from '@/components/table';
import DefaultPageParam from '@/constants/searchDefaultParam';
import { MovieInfo } from '@/interface/I_MovieGeneral';

import paginateArray from './paginate';
import sortingArray from './sorting';

interface Props extends TableParams {
  data: any[];
}
const { defaultCurrentPage, defaultPageSize, sortType, sortField } = DefaultPageParam;

const handleTableChange = ({
  current = defaultCurrentPage,
  pagesize = defaultPageSize,
  sortField,
  sortType,
  data,
}: Props) => {
  let result = data;
  // add single page sorting
  if (!isUndefined(sortType) && !isUndefined(sortField)) {
    return sortingArray({
      data,
      sortType: sortType as SortOrderProps,
      sortField: sortField as keyof MovieInfo,
    });
  }
  return result;
};

export default handleTableChange;
