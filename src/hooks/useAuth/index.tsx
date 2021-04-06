import { useToast } from '@chakra-ui/toast'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import UserContext from '../../context/User/context'
import { statusType } from '../useUser'
interface UseAuthProps {
  provider: 'github' | 'email'
  uuid?: string
  token: string
}
export default function UseAuth({ provider, token, uuid }: UseAuthProps) {
  const [status, setStatus] = useState<statusType>('waiting')
  const { setUser } = useContext(UserContext)
  const toast = useToast()
  const Router = useRouter()

  useEffect(() => {
    trySignin()
  }, [])

  const trySignin = async () => {
    try {
      const { data } = await axios.post(
        `/api/auth/signin/${provider}`,
        uuid && {
          uuid
        },
        { headers: { authorization: `Bearer ${token}` } }
      )
      setStatus('success')
      setUser(data.user)
      return Router.push(`/callback/${provider}?userToken=${data?.token}`)
    } catch (err) {
      console.log(err)
      setStatus('error')
      toast({
        title: `Parece que houve uma falha ao tentar fazer login com ${provider}`,
        description: 'redirecionando você de volta...',
        status: 'error',
        position: 'top-right',
        duration: 6000,
        isClosable: true
      })
      return Router.push('/login')
    }
  }
  return { status }
}
