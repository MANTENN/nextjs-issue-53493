export function getMediaQuery(breakpoint: string) {
  if (!matchMedia) {
    throw new Error('matchMedia is not supported in this environment')
  }
  const mediaQuery =
    breakpoint === 'sm'
      ? '(min-width: 640px)'
      : breakpoint === 'md'
      ? '(min-width: 768px)'
      : breakpoint === 'lg'
      ? '(min-width: 1024px)'
      : breakpoint === 'xl'
      ? '(min-width: 1280px)'
      : breakpoint === '2xl'
      ? '(min-width: 1536px)'
      : ''
  return matchMedia(mediaQuery)
}
