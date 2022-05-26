import './styles.scss'

import {Clock} from 'three'
import * as Three from 'three'
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader'
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {makeApp} from './make-app'
const {makeDebugUtils} = await import('./debug-utils')
const {gui} = makeDebugUtils()

const {canvas, scene, renderer, camera} = makeApp({rootId: 'root'})

const ambientLight = new Three.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)
const pointLight = new Three.PointLight(0xffffff, 0.5)
pointLight.position.set(2, 3, 4)
scene.add(pointLight)

const fontLoader = new FontLoader()
const font = await fontLoader.loadAsync('fonts/helvetiker_regular.typeface.json')
const fontGeometry = new TextGeometry('Hello, World!', {
  font,
})
const mesh = new Three.Mesh(
  fontGeometry,
  new Three.MeshLambertMaterial({
    color: 0xff0000,
    emissive: 0xffffff,
    emissiveIntensity: 0.2,
  }),
)
scene.add(mesh)
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
camera.position.z = 3

const clock = new Clock()

function render() {
  const elapsedTime = clock.getElapsedTime()

  controls.update()
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}
render()
