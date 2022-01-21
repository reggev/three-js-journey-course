import {makeCanvas} from './make-canvas'
import {Scene, WebGLRenderer, PerspectiveCamera} from 'three'
import {toggleFullScreen} from './full-screen'

export function makeApp({rootId}: {rootId: string}) {
  const root = document.createElement('main')
  root.id = rootId
  document.body.appendChild(root)
  const {canvas} = makeCanvas({parent: root, width: window.innerWidth, height: window.innerHeight})
  const scene = new Scene()
  const renderer = new WebGLRenderer({canvas})

  renderer.setSize(canvas.width, canvas.height)
  const camera = new PerspectiveCamera(75, canvas.width / canvas.height)
  scene.add(camera)

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    renderer.setSize(canvas.width, canvas.height)
    // we set the pixel ratio on the resize event to handle the case of
    // a window moving between 2 (physical) screens with different pixel ratios
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    camera.aspect = canvas.width / canvas.height
    camera.updateProjectionMatrix()
  })
  canvas.addEventListener('dblclick', () => toggleFullScreen(canvas))

  return {canvas, scene, renderer, camera}
}
