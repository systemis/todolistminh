import { useEffect } from 'react'

import useIsMounted from './useIsMounted'

const usePreloadBgImages = (): void => {
  const isMounted = useIsMounted()

  useEffect(() => {
    [
      'https://todoappt.netlify.app/images/bg-desktop-dark.jpg',
      'https://todoappt.netlify.app/images/bg-desktop-light.jpg',
      'https://todoappt.netlify.app/images/bg-mobile-dark.jpg',
      'https://todoappt.netlify.app/images/bg-mobile-light.jpg',
      'https://todoappt.netlify.app/images/icon-moon.svg',
      'https://todoappt.netlify.app/images/icon-sun.svg'
    ].forEach((image) => {
      if (!isMounted) return

      const preloaded = new Image()
      preloaded.src = image
    })
  }, [isMounted])
}

export default usePreloadBgImages
