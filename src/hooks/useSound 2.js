import { useCallback, useEffect, useRef } from 'react'

export function useSound(src) {
  const audioRef = useRef(null)

  useEffect(() => {
    if (typeof Audio !== 'function') {
      return undefined
    }

    const audio = new Audio(src)
    audio.volume = 0.5
    audio.preload = 'auto'
    audioRef.current = audio

    return () => {
      audio.pause()
      audio.currentTime = 0

      if (audioRef.current === audio) {
        audioRef.current = null
      }
    }
  }, [src])

  useEffect(() => {
    if (typeof document === 'undefined') {
      return undefined
    }

    function unlockAudio() {
      document.removeEventListener('pointerdown', unlockAudio)
      document.removeEventListener('touchstart', unlockAudio)

      const audio = audioRef.current

      if (!audio) {
        return
      }

      const playPromise = audio.play()
      audio.pause()
      audio.currentTime = 0
      playPromise?.catch(() => {})
    }

    document.addEventListener('pointerdown', unlockAudio, { passive: true })
    document.addEventListener('touchstart', unlockAudio, { passive: true })

    return () => {
      document.removeEventListener('pointerdown', unlockAudio)
      document.removeEventListener('touchstart', unlockAudio)
    }
  }, [src])

  const play = useCallback(() => {
    const audio = audioRef.current

    if (!audio) {
      return
    }

    audio.currentTime = 0
    const playPromise = audio.play()
    playPromise?.catch(() => {})
  }, [])

  return play
}
