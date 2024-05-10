import { GridShowcase, Logo } from '@lobehub/ui';
import Image from 'next/image';
// import { GridShowcase, Logo } from '@lobehub/ui';

/* 替换自己的logo */
import { PropsWithChildren } from 'react';
import { Flexbox } from 'react-layout-kit';

import styles from './Desktop.module.css';

// 导入 CSS 模块
// 暂时不需要在welcome页面显示Follow组件
// import Follow from '@/features/Follow';

const COPYRIGHT = `© ${new Date().getFullYear()} AIFreight`;

const DesktopLayout = ({ children }: PropsWithChildren) => {
  return (
    <Flexbox
      align={'center'}
      height={'100%'}
      justify={'space-between'}
      padding={16}
      style={{ overflow: 'hidden', position: 'relative' }}
      width={'100%'}
    >
      <Logo size={36} style={{ alignSelf: 'flex-start', visibility: 'hidden' }} type={'text'} />
      {/* 替换自己的logo */}
      <div className={styles.logoContainer}>
        {' '}
        {/* 使用 CSS 模块样式 */}
        <Image alt="Logo" height={36} src="/icons/logo.svg" width={120} />
      </div>
      <GridShowcase innerProps={{ gap: 24 }} style={{ maxWidth: 1024 }} width={'100%'}>
        {children}
      </GridShowcase>
      <Flexbox align={'center'} horizontal justify={'space-between'}>
        <span style={{ opacity: 0.5 }}>{COPYRIGHT}</span>
        {/* 暂时不需要在welcome页面显示Follow组件
        <Follow /> */}
      </Flexbox>
    </Flexbox>
  );
};

export default DesktopLayout;
