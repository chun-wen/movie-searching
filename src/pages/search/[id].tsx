import React from 'react';

import dayjs from 'dayjs';

import Table from '@/components/table';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { setSearchList } from '@/redux/slice/movieSlice';

const SearchPage = () => {
  const dispatch = useAppDispatch();
  const { movieData, searchList } = useAppSelector((state) => state.movie);
  console.log({movieData, searchList})

  const columns = [
    { title: 'Image', dataIndex: 'image', render: (data:string) => <img src={data} />},
    { title: 'Title', dataIndex: 'title'},
    { title: 'Language', dataIndex: 'language'},
    { title: 'Overview', dataIndex: 'overview'},
    { title: 'Popularity', dataIndex: 'popularity'},
    { title: 'Release', dataIndex: 'release', render: (date:Date) => <p>{dayjs(date).format('DD/MM/YYYY')}</p>},
  ]

  const dataSource = searchList.map((movie) => {
    const {poster_path, original_title,release_date,overview, popularity} = movie;
    return ({
      ...movie,
      image: poster_path,
      title:original_title,
      release:release_date,
      overview,
      popularity
    })
  })

  return (
    <>
       <h1>Search Results</h1>
       <Table dataSource={dataSource} columns={columns} onChange={(pagination, filters, sorter, extra) => {
        if(extra.action === 'sort'){
          dispatch(setSearchList())
        }
       }}/>
    </>
  )
}

export default SearchPage;