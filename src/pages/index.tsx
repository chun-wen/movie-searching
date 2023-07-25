import React, { Suspense, useEffect } from 'react';

import { Skeleton } from 'antd';
import { useRouter } from 'next/router';

import Card from '@/components/card';
import Input from '@/components/input';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { getConfiguration } from '@/redux/slice/configurationSlice';
import { getNowPlaying, getSearchList, setSearchList } from '@/redux/slice/movieSlice';

export default function Home() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { movie_nowPlayingList, isloading } = useAppSelector((state) => state.movie);

  const onSearch = (value: string) => {
    dispatch(getSearchList(value));
    router.push(`/search/${value}`);
  };

  useEffect(() => {
    dispatch(getConfiguration())
    dispatch(getNowPlaying());
  }, [])

  return (
    // <Suspense fallback={<Skeleton />}>
    <>      
    <Input placeholder="Search for a movie..." className="" onSearch={onSearch} />
      <div className='flex gap-4 flex-wrap pt-4 justify-center'>
      {
        !isloading && movie_nowPlayingList.map((movieInfo) => (
          <Card key={movieInfo.id} {...movieInfo} />
        ))
      }
      </div>
      </>
    // </Suspense>
  );
}
