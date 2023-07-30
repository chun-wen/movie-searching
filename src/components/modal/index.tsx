import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { Button, Col, Layout, Modal as ModalAntd, Row } from 'antd';
import { ModalProps as ModalAntdProps } from 'antd/lib/modal';
import { isEmpty } from 'lodash';
import Image from 'next/image';

import { MovieInfo } from '@/Interface/I_MovieGeneral';

import { useAppDispatch, useAppSelector } from '@/hooks';
import { getMovieDetail } from '@/redux/slices/movieSlice';

import Card from '../card';

interface ModalProps extends Pick<MovieInfo, 'id'> {
  open: boolean;
  onCancel?: (values: any) => void;
}
const { Content } = Layout;

const Modal = ({ id, open, onCancel }: ModalProps) => {
  const dispatch = useAppDispatch();
  const {
    movieDetail: { movieInfo, movieCast, movieReview },
  } = useAppSelector((state) => state.movie);
  
  const isLoading = isEmpty(movieInfo) || isEmpty(movieReview);

  const handleLoadMore = () => {};

  useEffect(() => {
    dispatch(getMovieDetail({ id }));
  }, []);

  console.log('1', movieInfo, movieCast, movieReview);

  return (
    !isLoading && (
      <ModalAntd centered open={open} onCancel={onCancel} footer={null}>
        <Layout>
          <Content style={{ padding: '24px' }}>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={8}>
                <Image src={movieInfo.poster_path} alt="Movie Poster" width={500}
      height={500}/>
              </Col>
              <Col xs={24} sm={16}>
                <div>Title</div>
                <div>Score</div>
                <div>Description</div>
                <button>Favorite</button>
              </Col>
            </Row>

            {/* Section 2 */}
            <div style={{ overflowX: 'auto' }}>
              {/* <Card>
         </Card> */}
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
