import React, { useState } from 'react';

import { Button, Modal as ModalAntd } from 'antd';
import { ModalProps as ModalAntdProps } from 'antd/lib/modal';

import { MovieInfo } from '@/Interface/I_Movie';

interface ModalProps extends MovieInfo {
  open: boolean;
  onCancel?: (values: any) => void;
}

const Modal = ({
  original_title,
  poster_path,
  release_date,
  vote_average,
  open,
  onCancel,
  ...props
}: ModalProps) => {
  return (
    <ModalAntd title={original_title} centered open={open} onCancel={onCancel}>
      <p>{vote_average}</p>
    </ModalAntd>
  );
};

export default Modal;
