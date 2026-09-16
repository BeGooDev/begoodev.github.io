import '../styles/globals.css'
import 'font-awesome/css/font-awesome.css'
import Head from 'next/head';
import { Inter, Sora } from 'next/font/google';

const inter = Inter({subsets: ['latin'], variable: '--font-inter'});
const sora = Sora({subsets: ['latin'], variable: '--font-sora'});

function MyApp({Component, pageProps}) {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <link rel="webmanifest" href="/site.webmanifest"/>
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
            </Head>
            <div className={`${inter.variable} ${sora.variable} font-sans`}>
                <Component {...pageProps} />
            </div>
        </>
    )
}

export default MyApp
