declare global {
  interface Document {
    mozCancelFullScreen?: () => Promise<void>
    msExitFullscreen?: () => Promise<void>
    webkitExitFullscreen?: () => Promise<void>
    mozFullScreenElement?: Element
    msFullscreenElement?: Element
    webkitFullscreenElement?: Element
  }

  interface HTMLElement {
    msRequestFullscreen?: () => Promise<void>
    mozRequestFullscreen?: () => Promise<void>
    webkitRequestFullscreen?: () => Promise<void>
  }
}

export function isFullScreen() {
  return (
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement
  )
}

export function enterFullScreen(element: HTMLElement) {
  element.requestFullscreen?.() ??
    element.webkitRequestFullscreen?.() ??
    element.mozRequestFullscreen?.() ??
    element.msRequestFullscreen?.()
}

export function exitFullScreen() {
  document.exitFullscreen?.() ??
    document.webkitExitFullscreen?.() ??
    document.mozCancelFullScreen?.() ??
    document.msExitFullscreen?.()
}

export function toggleFullScreen(element: HTMLElement) {
  if (isFullScreen()) {
    exitFullScreen()
  } else {
    enterFullScreen(element)
  }
}
