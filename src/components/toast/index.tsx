import React from 'react';

import { notification } from 'antd';
import { ArgsProps } from 'antd/lib/notification/interface';
import { isUndefined } from 'lodash';
import Image from 'next/image';

import errorSvg from '@/Images/error.svg';
import successSvg from '@/Images/success.svg';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

interface ToastProps extends ArgsProps {
  status?: NotificationType;
  customClass?: string;
}

const Toast = ({ description, duration, message, className, status, ...props }: ToastProps) => {
  let suffixIcon: React.ReactNode;
  switch (status) {
    case 'success':
      suffixIcon = <Image  src={successSvg} alt="success-svg" />;
      break;
    case 'error':
      suffixIcon = <Image  src={errorSvg} alt="error-svg" />;
      break;
    default:
      break;
  }
  (() => {
    if (!isUndefined(description)) {
      notification.open({
        description,
        message,
        duration,
        className,
        icon: suffixIcon,
        ...props,
      });
    }
  })();
};

export default Toast;
