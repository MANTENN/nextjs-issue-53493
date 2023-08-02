'use client'

import { useLayoutEffect } from '@radix-ui/react-use-layout-effect'

export function VHFix() {
  useLayoutEffect(() => {
    if (!navigator.userAgent.match(/mobile/i)) {
      return
    }

    function setViewportProperty(doc: HTMLElement) {
      let prevClientHeight = 0

      function handleResize() {
        const clientHeight = doc.clientHeight
        if (clientHeight === prevClientHeight) return

        requestAnimationFrame(() => {
          doc.style.setProperty('--vh', `${clientHeight * 0.01}px`)
          prevClientHeight = clientHeight
        })
      }

      handleResize()
      return handleResize
    }

    const onResize = setViewportProperty(document.documentElement)
    window.addEventListener('resize', onResize, { passive: true })

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return null
}
