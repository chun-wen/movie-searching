import { MovieInfo } from '@/Interface/I_Movie';

const paginateArray = ({
  data,
  pageSize,
  pageNumber,
}: {
  data: MovieInfo[];
  pageSize: number;
  pageNumber: number;
}) => {
  const startIndex = (pageNumber - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return data.slice(startIndex, endIndex);
};

export default paginateArray;
