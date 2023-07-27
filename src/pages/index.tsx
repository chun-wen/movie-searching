import React, { Suspense, useEffect, useState } from 'react';

import { Skeleton } from 'antd';
import { isNull } from 'lodash';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { MovieInfo } from '@/Interface/I_MovieGeneral';

import { getConfiguration } from '@/Redux/slices/configurationSlice';
import { getNowPlaying, getSearchList, setSearchList } from '@/Redux/slices/movieSlice';

import { useAppDispatch, useAppSelector } from '@/hooks';

const Card = dynamic(() => import('@/Components/card'), {
  ssr: false,
})
const Input = dynamic(() => import('@/Components/input'), {
  ssr: false,
})
const Modal = dynamic(() => import('@/Components/modal'), {
  ssr: false,
})


export default function Home() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { movie_nowPlayingList, isloading } = useAppSelector((state) => state.movie);

  const [isOpen, setIsOpen] = useState(true);
  const [currentModalData, setCurrentModalData] = useState<MovieInfo | null>(null);

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
