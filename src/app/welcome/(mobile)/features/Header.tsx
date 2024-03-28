import { MobileNavBar } from '@lobehub/ui';
import { memo } from 'react';

const Header = memo(() => (
  <MobileNavBar
    center={<img alt="Logo" className="logo" height="36px" src="/icons/logo.svg" width="120px" />}
  />
));

export default Header;
