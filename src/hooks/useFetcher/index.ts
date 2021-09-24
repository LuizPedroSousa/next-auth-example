import axios, { AxiosRequestConfig } from 'axios'
import useSWR from 'swr'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useFetcher<Data = any>(
  url: string,
  requestConfig?: AxiosRequestConfig
) {
  const { data, error } = useSWR<Data>(url, async url => {
    const { data } = await axios(url, requestConfig)
    return data
  })

  return { data, error }
}

export { useFetcher }
