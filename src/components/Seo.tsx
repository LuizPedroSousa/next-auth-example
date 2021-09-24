import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

interface SeoProps {
  title: string
  description: string
  thumb: string
}

const Seo: React.FC<SeoProps> = ({ title, description, thumb }) => {
  const router = useRouter()
  return (
    <Head>
      <title>{title} | Next Auth</title>
      <meta name="title" content={`${title} | Next Auth`} />
      <meta name="description" content={description} />

      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content={process.env.NEXT_PUBLIC_URL + router.asPath}
      />
      <meta property="og:title" content={`${title} | Next Auth`} />
      <meta property="og:description" content={description} />
      <meta
        property="og:image"
        content={`${process.env.NEXT_PUBLIC_URL}/images/thumbs${thumb}`}
      />

      <meta property="twitter:card" content="summary_large_image" />
      <meta
        property="twitter:url"
        content={process.env.NEXT_PUBLIC_URL + router.asPath}
      />
      <meta property="twitter:title" content={`${title} | Next Auth`} />
      <meta property="twitter:description" content={description} />
      <meta
        property="twitter:image"
        content={`${process.env.NEXT_PUBLIC_URL}/images/thumbs${thumb}`}
      />
    </Head>
  )
}

export default Seo
