'use client';

import { SideNav } from '@lobehub/ui';
import { memo } from 'react';

import { useActiveTabKey } from '@/hooks/useActiveTabKey';

import Avatar from './Avatar';
// import BottomActions from './BottomActions';
import TopActions from './TopActions';

const Nav = memo(() => {
  const sidebarKey = useActiveTabKey();
  return (
    <SideNav
      avatar={<Avatar />}
      bottomActions={null} // 或者提供一个具体的组件
      style={{ height: '100%', zIndex: 100 }}
      topActions={<TopActions tab={sidebarKey} />}
    />
  );
});

Nav.displayName = 'DesktopNav';

export default Nav;
