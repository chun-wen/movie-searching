import React from 'react';

import { MenuOutlined } from '@ant-design/icons';
import { Dropdown, Menu as MenuAntd } from 'antd';
import Link from 'next/link';

const menuItems = [
  { label: <Link href="/">Home</Link>, key: 'home' },
  { label: <Link href="/booking">Booking</Link>, key: 'booking' },
];

const Menu = ({ className }: any) => {
  return (
    <>
      <MenuAntd mode="horizontal" className={`hidden sm:flex`} items={menuItems} />
      <Dropdown menu={{ items: menuItems }} className="visible pr-2 sm:hidden">
        <MenuOutlined style={{ fontSize: '32px'}} />
      </Dropdown>
    </>
  );
};

export default Menu;
