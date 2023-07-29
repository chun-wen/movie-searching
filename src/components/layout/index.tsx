import React from 'react';

import { Layout as LayoutAntd } from 'antd';
import dayjs from 'dayjs';
import Image from 'next/image';

import Menu from '../menu';

const { Footer, Header } = LayoutAntd;

export default function Layout({ children }: any) {
  return (
    <>
      <Header
        className="bg-bg-lightGray flex px-4 justify-between "
      >
        <Image
          width={64}
          height={64}
          src="https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
          alt="logo"
        />
        <Menu />
      </Header>
      <main className="p-4 flex-1">{children}</main>
      <Footer className="flex justify-center">Copyright © {dayjs().year()}</Footer>
    </>
  );
}
