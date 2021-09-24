import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { theme } from '@chakra-ui/react'

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
      <meta name="theme-color" content={theme.colors.blue[400]} />
      <meta
        name="image"
        content={`https://${process.env.VERCEL_URL}/images/thumbs${thumb}`}
      />
      <meta property="image:alt" content={`${title} | Next Auth`} />

      <meta property="og:title" content={`${title} | Next Auth`} />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:site_name" content="Next Auth" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:width" content="627" />
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content={`https://${process.env.VERCEL_URL}${router.asPath}`}
      />
      <meta property="og:description" content={description} />
      <meta
        property="og:image"
        content={`https://${process.env.VERCEL_URL}/images/thumbs${thumb}`}
      />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:alt" content={`${title} | Next Auth`} />

      <meta name="twitter:title" content={`${title} | Next Auth`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:url"
        content={`https://${process.env.VERCEL_URL}${router.asPath}`}
      />
      <meta name="twitter:description" content={description} />
      <meta
        name="twitter:image"
        content={`https://${process.env.VERCEL_URL}/images/thumbs${thumb}`}
      />
      <meta
        name="twitter:image:src"
        content={`https://${process.env.VERCEL_URL}/images/thumbs${thumb}`}
      />
      <meta name="twitter:image:alt" content={`${title} | Next Auth`} />
      <meta name="twitter:image:width" content="1200" />
      <meta name="twitter:image:width" content="627" />
    </Head>
  )
}

export default Seo
