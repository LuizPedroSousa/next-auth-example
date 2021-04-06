import { useToast } from '@chakra-ui/toast'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import UserContext, { userType } from '../../context/User/context'
import useFetcher from '../useFetcher'

interface useUserProps {
  token: string
}

export type statusType = 'success' | 'error' | 'waiting'
export default function useUser({ token }: useUserProps) {
  const Router = useRouter()
  const toast = useToast()
  const { user, setUser } = useContext(UserContext)
  const [status, setStatus] = useState<statusType>('waiting')
  const { data, error } = useFetcher<{ user: userType; token: string }>(
    '/api/user/show',
    {
      headers: {
        authorization: `Bearer ${token}`
      }
    }
  )
  useEffect(() => {
    if (data) {
      setStatus('success')
      return setUser(data.user)
    }
  }, [data])
  useEffect(() => {
    if (error) {
      setStatus('error')
      toast({
        title: 'Parece que houve uma falha interna',
        description: 'redirecionando você de volta para a pagina de login...',
        status: 'error',
        position: 'top-right',
        duration: 6000,
        isClosable: true
      })
      Router.replace('/?signout=true')
    }
  }, [error])

  return { user, status }
}
