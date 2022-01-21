import './styles.scss'
import {Clock, MeshStandardMaterial} from 'three'
import * as Three from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {makeApp} from './make-app'
import {loadMaps} from './load-maps'
const {makeDebugUtils} = await import('./debug-utils')
const {gui} = makeDebugUtils()

const {canvas, scene, renderer, camera} = makeApp({rootId: 'root'})

const ambientLight = new Three.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)
const pointLight = new Three.PointLight(0xffffff, 0.5)
pointLight.position.set(2, 3, 4)
scene.add(pointLight)

const textures = await loadMaps({
  color: '/textures/door/color.jpg',
  opacity: '/textures/door/opacity.jpg',
  height: '/textures/door/height.png',
  normal: '/textures/door/normal.jpg',
  ambientOcclusion: '/textures/door/ambientOcclusion.jpg',
  metallic: '/textures/door/metallic.jpg',
  roughness: '/textures/door/roughness.jpg',
})

const material = new MeshStandardMaterial({
  map: textures.color,
  aoMap: textures.ambientOcclusion,
  displacementMap: textures.height,
  displacementScale: 0.05,
  metalnessMap: textures.metallic,
  roughnessMap: textures.roughness,
  normalMap: textures.normal,
  normalScale: new Three.Vector2(0.1, 0.1),
  alphaMap: textures.opacity,
  transparent: true,
})

gui.add(material, 'metalness', 0, 1)
gui.add(material, 'roughness', 0, 1)
gui.add(material, 'aoMapIntensity', 0, 10)
gui.add(material, 'displacementScale', 0.0, 0.1)

const sphere = new Three.Mesh(new Three.SphereGeometry(0.5, 64, 64), material)
sphere.position.x = -1.5
scene.add(sphere)

const plane = new Three.Mesh(new Three.PlaneGeometry(1, 1, 100, 100), material)
scene.add(plane)

const torus = new Three.Mesh(new Three.TorusGeometry(0.3, 0.2, 64, 128), material)
torus.position.x = 1.5
scene.add(torus)

sphere.geometry.setAttribute(
  'uv2',
  new Three.BufferAttribute(sphere.geometry.attributes.uv.array, 2),
)

plane.geometry.setAttribute('uv2', new Three.BufferAttribute(plane.geometry.attributes.uv.array, 2))

torus.geometry.setAttribute('uv2', new Three.BufferAttribute(torus.geometry.attributes.uv.array, 2))

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
camera.position.z = 3

const clock = new Clock()

function render() {
  const elapsedTime = clock.getElapsedTime()
  sphere.rotation.y = elapsedTime * 0.1
  // plane.rotation.y = elapsedTime * 0.1
  torus.rotation.y = elapsedTime * 0.1

  sphere.rotation.x = elapsedTime * 0.15
  // plane.rotation.x = elapsedTime * 0.15
  torus.rotation.x = elapsedTime * 0.15

  controls.update()
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}
render()
