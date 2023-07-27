import { SortOrder as SortOrderProps } from 'antd/lib/table/interface';

import { MovieInfo } from '@/Interface/I_MovieGeneral';

import { SortType } from '@/interface/I_General';

const sortingArray = ({
  data,
  sortType,
  sortField,
}: {
  data: MovieInfo[];
  sortType?: SortOrderProps;
  sortField: keyof MovieInfo;
}) => {
  const result = data.sort((a, b) => {
    const valueA =
      sortField === 'release_date'
        ? Date.parse(a[sortField] as unknown as string)
        : Number(a[sortField]);
    const valueB =
      sortField === 'release_date'
        ? Date.parse(b[sortField] as unknown as string)
        : Number(b[sortField]);

    return sortType === SortType.ascend ? valueA - valueB : valueB - valueA;

    // if (typeof valueA === 'number' && typeof valueB === 'number') {
    //   return order === SortType.ascend ? valueA - valueB : valueB - valueA;
    // } else {
    //   // Handle non-numeric properties or any other custom logic here
    //   return 0;
    // }
  });

  return result;
};

export default sortingArray;
