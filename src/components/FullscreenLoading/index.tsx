// import { Icon, Logo } from '@lobehub/ui';

/* 替换自己的logo */
import { Icon } from '@lobehub/ui';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { memo } from 'react';
import { Center, Flexbox } from 'react-layout-kit';

const FullscreenLoading = memo<{ title?: string }>(({ title }) => {
  return (
    <Flexbox height={'100%'} style={{ userSelect: 'none' }} width={'100%'}>
      <Center flex={1} gap={12} width={'100%'}>
        {/* <Logo extra={'Chat'} size={48} type={'combine'} /> */}
        {/* ///替换自己的logo */}
        <Image alt="Logo" height={36} src="/icons/logo.svg" width={120} />
        <Center gap={16} horizontal>
          <Icon icon={Loader2} spin />
          {title}
        </Center>
      </Center>
    </Flexbox>
  );
});

export default FullscreenLoading;
