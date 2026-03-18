import { useCallback, useEffect, useRef, useState } from 'react'

export function useTimer(defaultValue = 25, onComplete, options = {}) {
  const mode = options.mode ?? 'countdown'
  const onTick = options.onTick
  const [seconds, setSeconds] = useState(defaultValue)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef(null)
  const resetTimeoutRef = useRef(null)
  const onCompleteRef = useRef(onComplete)
  const onTickRef = useRef(onTick)
  const secondsRef = useRef(defaultValue)
  const isRunningRef = useRef(false)
  const runIdRef = useRef(0)
  const isStopwatch = mode === 'stopwatch'

  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    onTickRef.current = onTick
  }, [onTick])

  const clearTimers = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    if (resetTimeoutRef.current !== null) {
      clearTimeout(resetTimeoutRef.current)
      resetTimeoutRef.current = null
    }
  }, [])

  useEffect(() => {
    return () => {
      clearTimers()
    }
  }, [clearTimers])

  const pause = useCallback(() => {
    runIdRef.current += 1
    clearTimers()
    isRunningRef.current = false
    setIsRunning(false)
  }, [clearTimers])

  const stop = useCallback(() => {
    pause()
    secondsRef.current = defaultValue
    isRunningRef.current = false
    setIsRunning(false)
    setSeconds(defaultValue)
  }, [defaultValue, pause])

  const start = useCallback((duration) => {
    if (isStopwatch) {
      if (isRunningRef.current) {
        return
      }

      const nextDuration = duration == null ? secondsRef.current : Math.max(0, Math.floor(Number(duration) || 0))

      runIdRef.current += 1
      clearTimers()

      secondsRef.current = nextDuration
      isRunningRef.current = true
      setSeconds(nextDuration)
      setIsRunning(true)

      intervalRef.current = setInterval(() => {
        const nextSeconds = secondsRef.current + 1
        secondsRef.current = nextSeconds
        setSeconds(nextSeconds)
        onTickRef.current?.(nextSeconds)
      }, 1000)

      return
    }

    const nextDuration = Math.floor(Number(duration))

    if (!Number.isFinite(nextDuration) || nextDuration <= 0) {
      stop()
      return
    }

    runIdRef.current += 1
    const runId = runIdRef.current

    clearTimers()

    secondsRef.current = nextDuration
    isRunningRef.current = true
    setSeconds(nextDuration)
    setIsRunning(true)

    intervalRef.current = setInterval(() => {
      const nextSeconds = Math.max(secondsRef.current - 1, 0)
      secondsRef.current = nextSeconds
      setSeconds(nextSeconds)

      if (nextSeconds > 0) {
        return
      }

      clearTimers()
      isRunningRef.current = false
      setIsRunning(false)
      resetTimeoutRef.current = setTimeout(() => {
        if (runIdRef.current !== runId) {
          return
        }

        onCompleteRef.current?.()
        secondsRef.current = defaultValue
        setSeconds(defaultValue)
        resetTimeoutRef.current = null
      }, 0)
    }, 1000)
  }, [clearTimers, defaultValue, isStopwatch, stop])

  return {
    seconds,
    isRunning,
    pause,
    reset: stop,
    start,
    stop,
  }
}
