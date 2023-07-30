import React, { useState } from 'react';

import { ColumnsType } from 'antd/es/table/interface';
import { SorterResult } from 'antd/lib/table/interface';
import dayjs from 'dayjs';

import Table, { TableParams } from '@/components/table';
import DefaultPageParam from '@/constants/searchDefaultParam';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { SortType } from '@/interface/I_General';
import { SearchDataType } from '@/interface/I_MovieGeneral';
import { filterCollectionMovie } from '@/redux/slices/userSlice';

const CollectPage = () => {
  const dispatch = useAppDispatch();
  const {
    images: { secure_base_url, poster_sizes },
  } = useAppSelector((state) => state.configuration);
  const {collectMovieList, collectMovie} = useAppSelector((state) => state.user);

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
  

  const dataSource = collectMovie.map((movie) => {
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
      <Table 
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

        dispatch(filterCollectionMovie({
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
          // dispatch(getSearchList({query: router.query.id as string , page: current || 1}));
        }
      }}
      pagination={{
        current: filterParams.current,
        total: collectMovieList.total_results,
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
        defaultPageSize,
        showQuickJumper: false,
        showSizeChanger: false
      }}/>
    </>
  );
};

export default CollectPage;
