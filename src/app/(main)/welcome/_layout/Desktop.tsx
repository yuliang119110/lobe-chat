import { GridShowcase, Logo } from '@lobehub/ui';
import Image from 'next/image';
import { PropsWithChildren } from 'react';
import { Flexbox } from 'react-layout-kit';

import Follow from '@/features/Follow';

import styles from './Desktop.module.css';

const COPYRIGHT = `© ${new Date().getFullYear()} AIFreight, LLC`;

const DesktopLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Flexbox
        align={'center'}
        height={'100%'}
        justify={'space-between'}
        padding={16}
        style={{ overflow: 'hidden', position: 'relative' }}
        width={'100%'}
      >
        <Logo size={36} style={{ alignSelf: 'flex-start', visibility: 'hidden' }} type={'text'} />
        <div className={styles.logoContainer}>
          <Image alt="Logo" height={36} src="/icons/logo.svg" width={120} />
        </div>
        <GridShowcase innerProps={{ gap: 24 }} style={{ maxWidth: 1024 }} width={'100%'}>
          {children}
        </GridShowcase>
        <Flexbox align={'center'} horizontal justify={'space-between'}>
          <span style={{ opacity: 0.5 }}>{COPYRIGHT}</span>
          <Follow />
        </Flexbox>
      </Flexbox>
      {/* ↓ cloud slot ↓ */}

      {/* ↑ cloud slot ↑ */}
    </>
  );
};

export default DesktopLayout;
