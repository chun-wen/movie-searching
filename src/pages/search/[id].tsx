import React, { useState } from 'react';

import dayjs from 'dayjs';

import Table from '@/components/table';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { filterSearchList, setSearchList } from '@/redux/slice/movieSlice';

const SearchPage = () => {
  const dispatch = useAppDispatch();
  const { movieData, searchList } = useAppSelector((state) => state.movie);
  const {images:{secure_base_url, poster_sizes}} = useAppSelector((state) => state.configuration);
  const [currentPage, setCurrentPage] = useState(1);

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      render: ({
        poster_path,
        original_title,
      }: {
        poster_path: string;
        original_title: string;
      }) => <img src={`${secure_base_url}/${poster_sizes[4]}/${poster_path}`} alt={original_title} />,
    },
    { title: 'Title', dataIndex: 'original_title' },
    { title: 'Language', dataIndex: 'original_language' },
    { title: 'Overview', dataIndex: 'overview', sorter: true },
    { title: 'Popularity', dataIndex: 'popularity', sorter: true },
    {
      title: 'Release',
      dataIndex: 'release_date',
      render: (date: Date) => <p>{dayjs(date).format('DD/MM/YYYY')}</p>,
      sorter: true,
    },
  ];

  const dataSource = searchList.map((movie) => {
    const { poster_path, original_title, overview, popularity,original_language } = movie;
    return {
      ...movie,
      image: { poster_path, original_title },
      original_language,
      original_title,
      overview,
      popularity,
    };
  });

  return (
    <>
      <h1>Search Results</h1>
      <Table
        dataSource={dataSource}
        columns={columns}
        onChange={(pagination, filters, sorter, extra) => {
          if (extra.action === 'sort' && !sorter?.order) {
            console.log(sorter);
            dispatch(filterSearchList({
              order: sorter.order,
              column: sorter.column,
              currentPage
            }));
          }
          if(extra.action === 'paginate'){
            dispatch(filterSearchList({
              order: sorter.order,
              column: sorter.column,
              currentPage
            }));
          }
        }}
        pagination={{
          current: currentPage,
          total: movieData.total_results,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          defaultPageSize: 20,
          showQuickJumper: false
        }}
      />
    </>
  );
};

export default SearchPage;
