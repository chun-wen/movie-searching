import React, { Suspense, useEffect, useState } from 'react';

import { Skeleton } from 'antd';
import { isNull } from 'lodash';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { MovieInfo } from '@/Interface/I_MovieGeneral';

import { getConfiguration } from '@/Redux/slices/configurationSlice';
import {
  getNowPlaying,
  getSearchList,
  setIsLoading,
  setSearchList
} from '@/Redux/slices/movieSlice';

import { useAppDispatch, useAppSelector } from '@/hooks';
import { setCollectionMovie } from '@/redux/slices/userSlice';

const Card = dynamic(() => import('@/Components/card'))
const Input = dynamic(() => import('@/Components/input'))
const Modal = dynamic(() => import('@/Components/modal'))


export default function Home() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { movie_nowPlayingList, isloading } = useAppSelector((state) => state.movie);

  const [isOpen, setIsOpen] = useState(true);
  const [currentMovieID, serCurrentMovieID] = useState<number | null>(null);

  const onSearch = (value: string) => {
    dispatch(getSearchList({query: value, page: 1}));
    router.push(`/search/${value}`);
  };

  useEffect(() => {
    dispatch(getConfiguration());
    dispatch(getNowPlaying());
  }, []);

  return (
    // <Suspense fallback={<Skeleton />}>
    <>
      <Input placeholder="Search for a movie..." className="" onSearch={onSearch} />
      <div className="flex gap-4 flex-wrap pt-4 justify-center sm:justify-between">
        {!isloading &&
          movie_nowPlayingList.map((movieInfo) => (
            <div key={movieInfo.id}>
              <Card
                {...movieInfo}
                onCollect={(movieInfo) => {
                  dispatch(setCollectionMovie(movieInfo));
                }}
                onClick={() => {
                  setIsOpen(true);
                  // dispatch(setIsLoading(true));
                  serCurrentMovieID(movieInfo.id);
                }}
              />
            </div>
          ))}
        {/* show Modal */}
        {!isNull(currentMovieID) && (
          <Modal
            id={currentMovieID}
            open={isOpen}
            onCancel={() => {
              serCurrentMovieID(null);
              setIsOpen(false);
            }}
          />
        )}
      </div>
    </>
    // </Suspense>
  );
}
