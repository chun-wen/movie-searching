import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import LinesEllipsis from 'react-lines-ellipsis';

import {
  Avatar,
  Button,
  Col,
  Divider,
  Layout,
  List,
  Modal as ModalAntd,
  Row,
  Skeleton,
  Tooltip
} from 'antd';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import Image from 'next/image';

import { MovieInfo } from '@/Interface/I_MovieGeneral';

import { useAppDispatch, useAppSelector } from '@/hooks';
import { Cast, Department } from '@/interface/I_MovieCredit';
import { getMovieDetail, getMovieDetailComment } from '@/redux/slices/movieSlice';
import { setCollectionMovie } from '@/redux/slices/userSlice';

import Card, { CardEnum } from '../card';

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


  const loadMoreData = () => {
    dispatch(
      getMovieDetailComment({
        id: movieReview.id,
        page: movieReview.page + 1,
      }),
    );
  };

  useEffect(() => {
    dispatch(getMovieDetail({ id }));
  }, []);

  const { poster_path, title, vote_average, release_date, overview } = movieInfo;

  return (
    !isLoading && (
      <ModalAntd centered destroyOnClose open={open} onCancel={onCancel} footer={null} width={'auto'}>
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
                    {movieCrew.find((cast: Cast) => cast?.department === Department.Directing)
                      ?.name || ''}
                  </p>
                </div>
              </Col>
            </Row>
            {/* Section 2 */}
            <h3 className="header-item--subtitle pt-4">Popular Casts</h3>
            <div style={{ overflowX: 'auto' }} className="flex gap-2 py-4">
              {movieCrew.slice(0, 10).map((cast) => {
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
            <h3 className="header-item--subtitle pt-4">Comments</h3>
            <InfiniteScroll
              dataLength={movieReview.total_results}
              next={loadMoreData}
              hasMore={movieReview.total_results > 20}
              loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
              endMessage={<Divider plain>No data</Divider>}
              scrollableTarget="scrollableDiv"
            >
              <List
                dataSource={movieReview.results}
                renderItem={(item) => (
                  <List.Item key={item.id}>
                    <List.Item.Meta
                      avatar={<Avatar src={item.author_details.avatar_path} />}
                      title={<p>{item.author_details.name}</p>}
                      description={
                        <LinesEllipsis
                          text={item.content}
                          maxLine="3"
                          ellipsis="..."
                          trimRight
                          basedOn="letters"
                        />
                      }
                    />
                  </List.Item>
                )}
              />
            </InfiniteScroll>
          </Content>
        </Layout>
      </ModalAntd>
    )
  );
};

export default Modal;
