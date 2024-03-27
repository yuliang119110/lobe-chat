import { Avatar } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import { ReactNode, memo } from 'react';
import { Center, Flexbox } from 'react-layout-kit';

export const useStyles = createStyles(({ css, token }) => ({
  container: css`
    color: ${token.colorText};
    background: ${token.colorBgContainer};
    border: 1px solid ${token.colorSplit};
    border-radius: 8px;
  `,
  desc: css`
    color: ${token.colorTextTertiary};
    text-align: center;
  `,
  shake: css`
    animation: shake 0.1s;
    animation-iteration-count: 15;

    @keyframes shake {
      0% {
        transform: translate(1px, 1px) rotate(0deg);
      }

      10% {
        transform: translate(-1px, -2px) rotate(-1deg);
      }

      20% {
        transform: translate(-3px, 0) rotate(1deg);
      }

      30% {
        transform: translate(3px, 2px) rotate(0deg);
      }

      40% {
        transform: translate(1px, -1px) rotate(1deg);
      }

      50% {
        transform: translate(-1px, 2px) rotate(-1deg);
      }

      60% {
        transform: translate(-3px, 1px) rotate(0deg);
      }

      70% {
        transform: translate(3px, 1px) rotate(-1deg);
      }

      80% {
        transform: translate(-1px, -1px) rotate(1deg);
      }

      90% {
        transform: translate(1px, 2px) rotate(0deg);
      }

      100% {
        transform: translate(1px, -2px) rotate(-1deg);
      }
    }
  `,
}));

export const ErrorActionContainer = memo<{ children: ReactNode }>(({ children }) => {
  const { styles } = useStyles();

  return (
    <Center className={styles.container} gap={24} padding={24}>
      {children}
    </Center>
  );
});

export const FormAction = memo<{
  avatar: ReactNode;
  background?: string;
  children: ReactNode;
  description: string;
  title: string;
}>(({ children, background, title, description, avatar }) => {
  const { styles, theme } = useStyles();

  return (
    <Center gap={16} style={{ maxWidth: 300, width: '100%' }}>
      <Avatar
        avatar={avatar}
        background={background ?? theme.colorFillContent}
        gap={12}
        size={80}
      />
      <Flexbox style={{ fontSize: 20, textAlign: 'center' }}>{title}</Flexbox>
      <Flexbox className={styles.desc}>{description}</Flexbox>
      {children}
    </Center>
  );
});
