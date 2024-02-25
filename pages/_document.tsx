import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='ko'>
      <Head>
        <title>Linkbrary</title>
        <meta name='og:url' content='https://www.linkbrary.com' />
        <meta name='og:title' content='Linkbrary' />
        <meta
          property='og:description'
          content='세상의 모든 정보를 쉽게 저장하고 관리해 보세요'
        />
        <meta
          property='og:image'
          content='https://i.namu.wiki/i/8JbLEOm1EezAZzdujEwIA8rvaHFgPyqA3lUfr0HQXQ3T9tVClLGppcw82RTpyguF18pYI4ysHX9C0yzkb6G_7A.webp'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <body>
        <NextScript />
      </body>
    </Html>
  );
}
