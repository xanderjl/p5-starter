import { useEffect, useState } from 'react'

const useGetOs = () => {
  const [os, setOs] = useState<string>('')
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userAgent = navigator.userAgent
      const osString = userAgent.includes('Mac')
        ? 'mac'
        : userAgent.includes('Win')
        ? 'win'
        : ''
      setOs(osString)
    }
  }, [os])
  return os
}

export default useGetOs
