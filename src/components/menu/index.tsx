import React from 'react';

import { MenuOutlined } from '@ant-design/icons';
import { Dropdown, Menu as MenuAntd, MenuProps } from 'antd';
import Link from 'next/link';

const menuItems: MenuProps['items'] = [
  { label: <Link href="/">Home</Link>, key: 'home' },
  { label: <Link href="/collect">Watching List</Link>, key: 'collect' },
];

const Menu = () => {
  return (
    <>
      <MenuAntd mode="horizontal" className={`hidden sm:flex`} items={menuItems} />
      <Dropdown menu={{ items: menuItems }} className="flex p-2 sm:hidden">
        <MenuOutlined style={{ fontSize: '32px'}} />
      </Dropdown>
    </>
  );
};

export default Menu;
