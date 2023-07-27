import React, { Suspense, useEffect, useState } from 'react';

import { Skeleton } from 'antd';
import { isNull } from 'lodash';
import { useRouter } from 'next/router';

import { MovieInfo } from '@/Interface/I_Movie';

import { getConfiguration } from '@/Redux/slices/configurationSlice';
import { getNowPlaying, getSearchList, setSearchList } from '@/Redux/slices/movieSlice';

import Card from '@/Components/card';
import Input from '@/Components/input';
import Modal from '@/Components/modal';
import { useAppDispatch, useAppSelector } from '@/hooks';

export default function Home() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { movie_nowPlayingList, isloading } = useAppSelector((state) => state.movie);

  const [isOpen, setIsOpen] = useState(true);
  const [currentModalData, setCurrentModalData] = useState<MovieInfo | null>(null);

  const onSearch = (value: string) => {
    dispatch(getSearchList(value));
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
      <div className="flex gap-4 flex-wrap pt-4 justify-center">
        {!isloading &&
          movie_nowPlayingList.map((movieInfo) => (
            <div key={movieInfo.id}>
              <Card
                {...movieInfo}
                onClick={() => {
                  setIsOpen(true);
                  setCurrentModalData(movieInfo);
                }}
              />
            </div>
          ))}
        {/* show Modal */}
        {!isNull(currentModalData) && (
          <Modal
            {...currentModalData}
            open={isOpen}
            onCancel={() => {
              setCurrentModalData(null);
              setIsOpen(false);
            }}
          />
        )}
      </div>
    </>
    // </Suspense>
  );
}
