export function useSound(src) {
  function play() {
    if (typeof Audio !== 'function') {
      return
    }

    const audio = new Audio(src)
    audio.volume = 0.5

    const playPromise = audio.play()
    playPromise?.catch(() => {})
  }

  return play
}
