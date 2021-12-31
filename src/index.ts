import {colors} from './colors'
import './styles.scss'
import {BoxGeometry, MeshBasicMaterial, Mesh, Scene, PerspectiveCamera, WebGLRenderer} from 'three'
import {makeCanvas} from './make-canvas'
const root = document.createElement('main')
root.id = 'root'
document.body.appendChild(root)

const {canvas} = makeCanvas({parent: root})

const scene = new Scene()
const geometry = new BoxGeometry(1, 1, 1)
const material = new MeshBasicMaterial({color: colors.main})
const mesh = new Mesh(geometry, material)
scene.add(mesh)

const camera = new PerspectiveCamera(75, canvas.width / canvas.height)
camera.position.z = 3
scene.add(camera)

const renderer = new WebGLRenderer({canvas})
renderer.setSize(canvas.width, canvas.height)
renderer.render(scene, camera)
