import '../styles/globals.css'
import { LoginContextProvider } from '../context/LoiginContext'
import MenuButton from '../components/MenuButton'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return(
    <LoginContextProvider>
      <Head>
        <title>Leise Chat</title>
        <meta name="description" content="Leise chat app is a free to use chat app which is developed by Silenxika project" />
      </Head>
      <Component {...pageProps} />
      <MenuButton/>
    </LoginContextProvider>
  )
}

export default MyApp
