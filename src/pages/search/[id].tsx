import React, { useEffect, useState } from 'react';

import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';

import { filterSearchList, getSearchList } from '@/Redux/slices/movieSlice';

import Table, { TableParams } from '@/Components/table';
import DefaultPageParam from '@/constants/searchDefaultParam';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { SortType } from '@/interface/I_General';
import { MovieInfo, SearchDataType } from '@/interface/I_MovieGeneral';

import type {  SorterResult } from 'antd/lib/table/interface';

const SearchPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  
  const { movieData, searchList } = useAppSelector((state) => state.movie);
  const {images:{secure_base_url, poster_sizes}} = useAppSelector((state) => state.configuration);
  const { defaultCurrentPage, defaultPageSize, sortType, sortField} = DefaultPageParam;

  const defaultPageParam = {
    current: defaultCurrentPage,
    pagesize: defaultPageSize,
    sortType,
    sortField
  }

  const [filterParams, setFilterParams] = useState<TableParams>(defaultPageParam);


  const columns: ColumnsType<SearchDataType> = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: ({
        poster_path,
        original_title,
      }: {
        poster_path: string;
        original_title: string;
      }) => <img src={`${secure_base_url}/${poster_sizes[4]}/${poster_path}`} alt={original_title} />,
    },
    { title: 'Title', dataIndex: 'original_title', key: 'title' },
    { title: 'Language', dataIndex: 'original_language', key: 'original_language' },
    { title: 'Overview', dataIndex: 'overview', key: 'overview' },
    { title: 'Popularity', dataIndex: 'popularity', key: 'popularity', sorter: true },
    {
      title: 'Release',
      dataIndex: 'release_date',
      key: 'release_date',
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
      <h1 className="font-bold text-3xl pb-4">Search Results</h1>
      {/* TODO: dataSource 為空 */}
      <Table
        scroll={{x: 800}}
        rowKey={(record) => record.id}
        dataSource={dataSource}
        columns={columns}
        onChange={ (pagination, filters, sorter, extra) => {
          if (extra.action === 'sort') {
            const { field, order } = sorter as SorterResult<object>;
            setFilterParams({
              ...filterParams,
              sortType: order ? SortType[order]: undefined,
              sortField: order ? field as string : undefined
            });

          dispatch(filterSearchList({
            ...filterParams,
            sortType: order ? SortType[order]: undefined,
            sortField: order ? field as string : undefined
          }));

          }
          if(extra.action === 'paginate'){
            const { current} = pagination;
            setFilterParams({
              ...filterParams,
              current
            });
            dispatch(getSearchList({query: router.query.id as string , page: current || 1}));
          }
        }}
        pagination={{
          current: filterParams.current,
          total: movieData.total_results,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          defaultPageSize,
          showQuickJumper: false,
          showSizeChanger: false
        }}
      />
    </>
  );
};

export default SearchPage;
