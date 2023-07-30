import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { CommentOutlined } from '@ant-design/icons';
import { Button, Col, Layout, Modal as ModalAntd, Row, Tooltip } from 'antd';
import { ModalProps as ModalAntdProps } from 'antd/lib/modal';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import Image from 'next/image';

import { MovieInfo } from '@/Interface/I_MovieGeneral';

import { useAppDispatch, useAppSelector } from '@/hooks';
import { Department } from '@/interface/I_MovieCredit';
import { getMovieDetail } from '@/redux/slices/movieSlice';
import { setCollectionMovie } from '@/redux/slices/userSlice';

import Card, { CardEnum } from '../card';
import WatchList from '../watchlist';

interface ModalProps extends Pick<MovieInfo, 'id'> {
  open: boolean;
  onCancel?: (values: any) => void;
}
const { Content } = Layout;

const Modal = ({ id, open, onCancel }: ModalProps) => {
  const dispatch = useAppDispatch();
  const {
    movieDetail: { movieInfo, movieCrew, movieReview },
  } = useAppSelector((state) => state.movie);

  const isLoading = isEmpty(movieInfo) || isEmpty(movieReview);

  const [isCollet, setIsCollect] = useState(false);
  const handleLoadMore = () => {};

  useEffect(() => {
    dispatch(getMovieDetail({ id }));
  }, []);

  const { poster_path, title, vote_average, release_date, overview } = movieInfo;
  console.log('2', movieInfo, movieCrew, movieReview);

  return (
    !isLoading && (
      <ModalAntd centered open={open} onCancel={onCancel} footer={null} width={'auto'}>
        <Layout>
          <Content style={{ padding: '24px' }}>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={8}>
                <Image src={poster_path} alt="Movie Poster" width={350} height={350} />
              </Col>
              <Col xs={24} sm={16}>
                <div className="header-item">
                  <h2 className="header-item--title"> {title}</h2>
                  <div className="flex flex-row items-center">
                    <p className="pr-2">Release Date:</p>
                    <p>{dayjs(release_date).format('DD/MM/YYYY')}</p>
                  </div>
                </div>
                <div className="header-item">
                  <h3 className="header-item--subtitle">Score</h3>
                  <div className="flex flex-row items-center gap-3">
                    <div className="flex flex-row items-center">
                      <p className="pr-2">Score:</p>
                      <span>{vote_average}</span>
                    </div>
                    <WatchList
                      isColletProps={false}
                      onCollect={(movieInfo) => {
                        dispatch(setCollectionMovie(movieInfo));
                      }}
                    />
                  </div>
                </div>
                <div className="header-item">
                  {/* description part */}
                  <div>
                    <h3 className="header-item--subtitle">Overview</h3>
                    <p>{overview}</p>
                  </div>
                </div>
                <div className="header-item">
                  <h3 className="header-item--subtitle">Director</h3>
                  <p>
                    {movieCrew.find((cast) => cast?.department === Department.Directing)?.name ||
                      ''}
                  </p>
                </div>
              </Col>
            </Row>
            {/* Section 2 */}
            <h3 className="header-item--subtitle pt-4">Popular Casts</h3>
            <div style={{ overflowX: 'auto' }} className="flex gap-2 py-4">
              {movieCrew.slice(0,10).map((cast) => {
                const item = {
                  profile_path: cast.profile_path || '',
                  name: cast.name,
                  popularity: cast.popularity,
                  id: cast.id,
                };
                return <Card cast={item} cardType={CardEnum.Normal} key={item.id} />;
              })}
            </div>
            {/* Section 3 */}
            <InfiniteScroll
              dataLength={movieReview.total_results}
              next={handleLoadMore}
              hasMore
              loader={<div>Loading...</div>}
              style={{ width: '100%' }}
            >
              {movieReview?.results?.map((comment) => (
                <div key={comment.id} style={{ width: '100%' }}>
                  {comment.content}
                </div>
              ))}
            </InfiniteScroll>
          </Content>
        </Layout>
      </ModalAntd>
    )
  );
};

export default Modal;
