import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.01, 100)
// camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

///////////////////////////////////////////////////////////////////

/* LOADING MANAGER */

const loadingManager = new THREE.LoadingManager()
// loadingManager.onStart = () => {
//   console.log('se inicio la carga')
// }
// loadingManager.onProgress = () => {
//   console.log('se esta cargando')
// }
// loadingManager.onLoad = () => {
//   console.log('se termino la carga')
// }
// loadingManager.onError = () => {
//   console.log('hubo un error en la carga')
// }

/* TEXTURES */

const textureLoader = new THREE.TextureLoader(loadingManager)

const texture_door_color = textureLoader.load('/textures/door/color.jpg')
const texture_door_alpha = textureLoader.load('/textures/door/alpha.jpg')
const texture_door_height = textureLoader.load('/textures/door/height.jpg')
const texture_door_normal = textureLoader.load('/textures/door/normal.jpg')
const texture_door_ambientOcclusion = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const texture_door_metalness = textureLoader.load('/textures/door/metalness.jpg')
const texture_door_roughness = textureLoader.load('/textures/door/roughness.jpg')

const texture_matcap_1 = textureLoader.load('/textures/matcaps/1.png')
// const texture_matcap_2 = textureLoader.load('/textures/matcaps/2.png')
// const texture_matcap_3 = textureLoader.load('/textures/matcaps/3.png')
// const texture_matcap_4 = textureLoader.load('/textures/matcaps/4.png')
// const texture_matcap_5 = textureLoader.load('/textures/matcaps/5.png')
// const texture_matcap_6 = textureLoader.load('/textures/matcaps/6.png')
// const texture_matcap_7 = textureLoader.load('/textures/matcaps/7.png')
// const texture_matcap_8 = textureLoader.load('/textures/matcaps/8.png')

const texture_gradient_3 = textureLoader.load('/textures/gradients/3.jpg')
// const texture_gradient_5 = textureLoader.load('/textures/gradients/5.jpg')

// indicar que estas texturas son sRGB
texture_door_color.colorSpace = THREE.SRGBColorSpace
texture_matcap_1.colorSpace = THREE.SRGBColorSpace

/* OBJECTS */

const geometry_box = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)
const geometry_sphere = new THREE.SphereGeometry(1, 32, 32)
const geometry_torus = new THREE.TorusGeometry(0.7, 0.2, 16, 100)
const geometry_cone = new THREE.ConeGeometry(1, 1, 32)
const geometry_plane = new THREE.PlaneGeometry(1, 1, 2, 2)

const material = new THREE.MeshBasicMaterial({
  //   wireframe: true,
  map: texture_door_color,
})

const mesh_box = new THREE.Mesh(geometry_box, material)
const mesh_sphere = new THREE.Mesh(geometry_sphere, material)
const mesh_torus = new THREE.Mesh(geometry_torus, material)
const mesh_cone = new THREE.Mesh(geometry_cone, material)
const mesh_plane = new THREE.Mesh(geometry_plane, material)

mesh_sphere.position.x = -2.3
mesh_torus.position.x = 2
mesh_cone.position.z = -2.5
mesh_plane.position.z = 2.3

scene.add(mesh_box, mesh_sphere, mesh_torus, mesh_cone, mesh_plane)

///////////////////////////////////////////////////////////////////

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  /* ANIMATIONS */
  //   gsap.to(mesh_box.rotation, { duration: 1, delay: 0.5, x: Math.PI * 0.5, y: Math.PI * 0.5 })

  mesh_box.rotation.x = elapsedTime * Math.PI * 0.5
  mesh_box.rotation.y = elapsedTime * Math.PI * 0.5

  mesh_sphere.rotation.x = elapsedTime * Math.PI * 0.5
  mesh_sphere.rotation.y = elapsedTime * Math.PI * 0.5

  mesh_torus.rotation.x = elapsedTime * Math.PI * 0.5
  mesh_torus.rotation.y = elapsedTime * Math.PI * 0.5

  mesh_cone.rotation.x = elapsedTime * Math.PI * 0.5
  mesh_cone.rotation.y = elapsedTime * Math.PI * 0.5

  mesh_plane.rotation.x = elapsedTime * Math.PI * 0.5
  mesh_plane.rotation.y = elapsedTime * Math.PI * 0.5

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
