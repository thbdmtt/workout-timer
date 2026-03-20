import { useCallback, useEffect, useRef } from 'react'

function decodeAudioBuffer(audioContext, arrayBuffer) {
  try {
    const decodePromise = audioContext.decodeAudioData(arrayBuffer.slice(0))

    if (decodePromise?.then) {
      return decodePromise
    }
  } catch {
    // Older Safari expects the callback form of decodeAudioData.
  }

  return new Promise((resolve, reject) => {
    audioContext.decodeAudioData(arrayBuffer, resolve, reject)
  })
}

export function useSound(src) {
  const audioContextRef = useRef(null)
  const gainNodeRef = useRef(null)
  const audioBufferRef = useRef(null)

  useEffect(() => {
    if (typeof document === 'undefined' || typeof window === 'undefined') {
      return undefined
    }

    let isDisposed = false
    const abortController =
      typeof AbortController === 'function' ? new AbortController() : null

    async function initializeAudio() {
      document.removeEventListener('pointerdown', initializeAudio)

      const AudioContextClass =
        window.AudioContext || window.webkitAudioContext

      if (typeof AudioContextClass !== 'function') {
        return
      }

      if (!audioContextRef.current) {
        const audioContext = new AudioContextClass()
        const gainNode = audioContext.createGain()

        gainNode.gain.value = 0.5
        gainNode.connect(audioContext.destination)

        audioContextRef.current = audioContext
        gainNodeRef.current = gainNode
      }

      const audioContext = audioContextRef.current

      audioContext?.resume?.().catch(() => {})

      if (audioBufferRef.current) {
        return
      }

      try {
        const response = await fetch(
          src,
          abortController ? { signal: abortController.signal } : undefined,
        )

        if (!response.ok) {
          return
        }

        const arrayBuffer = await response.arrayBuffer()
        const audioBuffer = await decodeAudioBuffer(audioContext, arrayBuffer)

        if (!isDisposed) {
          audioBufferRef.current = audioBuffer
        }
      } catch (error) {
        if (error?.name === 'AbortError') {
          return
        }
      }
    }

    document.addEventListener('pointerdown', initializeAudio, { passive: true })

    return () => {
      isDisposed = true
      document.removeEventListener('pointerdown', initializeAudio)
      abortController?.abort()

      const audioContext = audioContextRef.current

      audioBufferRef.current = null
      gainNodeRef.current = null
      audioContextRef.current = null

      audioContext?.close?.().catch(() => {})
    }
  }, [src])

  const play = useCallback(() => {
    const audioContext = audioContextRef.current
    const gainNode = gainNodeRef.current
    const audioBuffer = audioBufferRef.current

    if (!audioContext || !gainNode || !audioBuffer) {
      return
    }

    const sourceNode = audioContext.createBufferSource()

    sourceNode.buffer = audioBuffer
    sourceNode.connect(gainNode)

    audioContext.resume?.().catch(() => {})
    sourceNode.start(0)
  }, [])

  return play
}
