import React from 'react';

import { Input as InputAntd } from 'antd';
import { InputProps as InputAntdProps, SearchProps } from 'antd/lib/input';

const { Search } = InputAntd;

interface InputProps extends InputAntdProps, SearchProps {}

const Input = ({
  placeholder = 'Search for a movie...',
  className = '',
  onSearch = (value: string) => undefined,
}: InputProps) => {
  return <Search placeholder={placeholder} className={className} onSearch={onSearch} />;
};

export default Input;
