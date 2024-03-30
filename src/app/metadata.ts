import { Metadata } from 'next';

import { getClientConfig } from '@/config/client';
import { getServerConfig } from '@/config/server';
import { OFFICIAL_URL } from '@/const/url';

import pkg from '../../package.json';

const title = 'AIFreight';
const { description, homepage } = pkg;

const { SITE_URL = OFFICIAL_URL } = getServerConfig();
const { BASE_PATH } = getClientConfig();

// if there is a base path, then we don't need the manifest
const noManifest = !!BASE_PATH;

const metadata: Metadata = {
  appleWebApp: {
    statusBarStyle: 'black-translucent',
    title,
  },
  description,
  icons: {
    apple:
      'https://databasegg.oss-cn-shanghai.aliyuncs.com/logo.png?Expires=1711695322&OSSAccessKeyId=TMP.3KgbdTea41no25gSbTjuWKaTA3JCtwbRVCLVKwFJnroA3E7uUJanMNxoonB4tq6g6ysViisADYkF8h5qURzX85229SXJbB&Signature=kk7pJsZe9lyrE%2BKLjQOfebYU99s%3D',
    icon: 'https://databasegg.oss-cn-shanghai.aliyuncs.com/logo.png?Expires=1711695228&OSSAccessKeyId=TMP.3KgbdTea41no25gSbTjuWKaTA3JCtwbRVCLVKwFJnroA3E7uUJanMNxoonB4tq6g6ysViisADYkF8h5qURzX85229SXJbB&Signature=5J5cFZVaxwd9gIoRglqanRLcWpA%3D',
    shortcut:
      'https://databasegg.oss-cn-shanghai.aliyuncs.com/logo.png?Expires=1711695322&OSSAccessKeyId=TMP.3KgbdTea41no25gSbTjuWKaTA3JCtwbRVCLVKwFJnroA3E7uUJanMNxoonB4tq6g6ysViisADYkF8h5qURzX85229SXJbB&Signature=kk7pJsZe9lyrE%2BKLjQOfebYU99s%3D',
  },
  manifest: noManifest ? undefined : '/manifest.json',
  metadataBase: new URL(SITE_URL),
  openGraph: {
    description: description,
    images: [
      {
        alt: title,
        height: 360,
        url: 'https://registry.npmmirror.com/@lobehub/assets-favicons/latest/files/assets/og-480x270.png',
        width: 480,
      },
      {
        alt: title,
        height: 720,
        url: 'https://registry.npmmirror.com/@lobehub/assets-favicons/latest/files/assets/og-960x540.png',
        width: 960,
      },
    ],
    locale: 'en-US',
    siteName: title,
    title: title,
    type: 'website',
    url: homepage,
  },

  title: {
    default: title,
    template: '%s · AIFreight',
  },
  // twitter: {
  //   card: 'summary_large_image',
  //   description,
  //   images: [
  //     'https://registry.npmmirror.com/@lobehub/assets-favicons/latest/files/assets/og-960x540.png',
  //   ],
  //   site: '@lobehub',
  //   title,
  // },
};

export default metadata;
