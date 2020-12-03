import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Header from '../components/header'
import {useRouter} from 'next/router'
import { useEffect } from 'react'

export default function Home() {

  const router = useRouter()

  useEffect(() => {
    router.push('/jogos')
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      
      <main className={styles.main}>
        <Link href="/jogos">
          <a>Ver jogos</a>
        </Link>
      </main>
    </div>
  )
}
