import { SortOrder as SortOrderProps } from 'antd/lib/table/interface';

import { MovieInfo, SortOrder } from '@/Interface/I_MovieGeneral';

const sortingArray = ({
  data,
  order,
  column,
}: {
  data: MovieInfo[];
  order?: SortOrderProps;
  column: keyof MovieInfo;
}) => {
  const result = data.sort((a, b) => {
    const valueA = a[column];
    const valueB = b[column];

    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return order === SortOrder.Asc ? valueA - valueB : valueB - valueA;
    } else {
      // Handle non-numeric properties or any other custom logic here
      return 0;
    }
  });

  return result;
};

export default sortingArray;
