'use client';

import { ChatHeader } from '@lobehub/ui';
// 暂时隐藏
// import { LobeChat } from '@lobehub/ui/brand';
// import { createStyles } from 'antd-style';
import { memo } from 'react';

// 暂时隐藏
// import ShareAgentButton from '../../features/ShareAgentButton';

// export const useStyles = createStyles(({ css, token }) => ({
//   logo: css`
//     color: ${token.colorText};
//     fill: ${token.colorText};
//   `,
// }));

const Header = memo(() => {
  // const { styles } = useStyles();

  return (
    <ChatHeader
    // left={<LobeChat className={styles.logo} extra={'Discover'} size={36} type={'text'} />}
    // right={<ShareAgentButton />}
    />
  );
});

export default Header;
