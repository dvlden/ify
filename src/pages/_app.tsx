import type { AppProps } from 'next/app'

const _App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />
}

export default _App
