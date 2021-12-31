export function makeCanvas({
  parent,
  width = 800,
  height = 600,
}: {
  parent: HTMLElement
  width?: number
  height?: number
}) {
  const canvas = document.createElement('canvas')
  canvas.id = 'web-gl-view'
  canvas.width = width
  canvas.height = height
  parent.appendChild(canvas)
  return {canvas, width, height}
}
