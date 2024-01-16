import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import gsap from 'gsap'
import GUI from 'lil-gui'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'

const gui = new GUI()

const debug_MeshStandardMaterial = gui.addFolder('Mesh Standard Material')

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
const texture_matcap_2 = textureLoader.load('/textures/matcaps/2.png')
const texture_matcap_3 = textureLoader.load('/textures/matcaps/3.png')
const texture_matcap_4 = textureLoader.load('/textures/matcaps/4.png')
const texture_matcap_5 = textureLoader.load('/textures/matcaps/5.png')
const texture_matcap_6 = textureLoader.load('/textures/matcaps/6.png')
const texture_matcap_7 = textureLoader.load('/textures/matcaps/7.png')
const texture_matcap_8 = textureLoader.load('/textures/matcaps/8.png')

const texture_gradient_3 = textureLoader.load('/textures/gradients/3.jpg')
const texture_gradient_5 = textureLoader.load('/textures/gradients/5.jpg')

// indicar que estas texturas son sRGB
texture_door_color.colorSpace = THREE.SRGBColorSpace

texture_matcap_1.colorSpace = THREE.SRGBColorSpace
texture_matcap_2.colorSpace = THREE.SRGBColorSpace
texture_matcap_3.colorSpace = THREE.SRGBColorSpace
texture_matcap_4.colorSpace = THREE.SRGBColorSpace
texture_matcap_5.colorSpace = THREE.SRGBColorSpace
texture_matcap_6.colorSpace = THREE.SRGBColorSpace
texture_matcap_7.colorSpace = THREE.SRGBColorSpace
texture_matcap_8.colorSpace = THREE.SRGBColorSpace

/* OBJECTS */

const geometry_box = new THREE.BoxGeometry(1, 1, 1, 200, 200, 200)
const geometry_sphere = new THREE.SphereGeometry(1, 100, 100)
const geometry_torus = new THREE.TorusGeometry(0.7, 0.2, 64, 128)
const geometry_cone = new THREE.ConeGeometry(1, 1, 32)
const geometry_plane = new THREE.PlaneGeometry(1, 1, 200, 200)

/* TIPOS DE MATERIAL ///////////////////////////////////////// */
/* TIPOS DE MATERIAL ///////////////////////////////////////// */

/* primera forma */
// const material = new THREE.MeshBasicMaterial({
//   //   color: 0x0000ff,
//   //   wireframe: true,
//   map: texture_door_color,
// })

/* otro: al usar MeshMatcapMaterial se aplica una sombra*/
// const material = new THREE.MeshMatcapMaterial()

/* 1. MESH BASIC MATERIAL */
/* 1. MESH BASIC MATERIAL */

/*  segunda forma */
// const material = new THREE.MeshBasicMaterial()
// material.color = new THREE.Color('violet')
// material.wireframe = true
// material.map = texture_door_color
//----------
// material.transparent = true
// material.opacity = 0.5 // para poder usar el opacity, hay que indicar que el material es transparente
// material.alphaMap = texture_door_alpha
//----------
// material.side = THREE.FrontSide (default)
// material.side = THREE.BackSide
// material.side = THREE.DoubleSide // para que se vea por ambos lados // evitar usar este por el costo computacional, y que es mas trabajo

/* 2. MESH NORMAL MATERIAL */
/* 2. MESH NORMAL MATERIAL */

// const material = new THREE.MeshNormalMaterial()
// material.side = THREE.DoubleSide
// // material.wireframe = true
// material.flatShading = true // para que se vea plano, muy util para depurar las normals

/* 3. MESH MATCAP MATERIAL */
/* 3. MESH MATCAP MATERIAL */

// const material = new THREE.MeshMatcapMaterial()
// material.side = THREE.DoubleSide
// material.matcap = texture_matcap_4 // debemos usar "matcap" y asignarle una textura tipo matcap

/* 4. MESH DEPTH MATERIAL */
/* 4. MESH DEPTH MATERIAL */

// const material = new THREE.MeshDepthMaterial() // se usa principalemnte para dar sombras, mas adelante se vera mas sobre esto

/* 5. MESH DEPTH MATERIAL */
/* 5. MESH DEPTH MATERIAL */

/* es el de mejor rendimiento que usa luces, pero aveces salen unas lineas extrañas */

// const material = new THREE.MeshLambertMaterial() // este requiere luces
// material.side = THREE.DoubleSide

// // luces *

// const ambientLight = new THREE.AmbientLight('blue', 0.5)
// scene.add(ambientLight)

// const pointLight = new THREE.PointLight('red', 30)
// pointLight.position.y = 3
// scene.add(pointLight)

/* 6. MESH PHONG MATERIAL */
/* 6. MESH PHONG MATERIAL */

/* este solcuiona ese problema de lineas, pero es menos rendimiento */

// const material = new THREE.MeshPhongMaterial() // este requiere luces
// material.shininess = 50 // brillo
// material.specular = new THREE.Color('red') // color del brillo

// // luces *

// const ambientLight = new THREE.AmbientLight('white', 0.5)
// scene.add(ambientLight)

// const pointLight = new THREE.PointLight('white', 10)
// pointLight.position.y = 3
// scene.add(pointLight)

/* 7. MESH TOON MATERIAL */
/* 7. MESH TOON MATERIAL */

/* para mostra en la mejor calidad o tipo micedraft */

// texture_gradient_3.minFilter = THREE.NearestFilter
// texture_gradient_3.generateMipmaps = false

// texture_gradient_5.magFilter = THREE.NearestFilter

/* es el mas realiata de luces */

// const material = new THREE.MeshToonMaterial()
// material.gradientMap = texture_gradient_5

// // // luces *

// const ambientLight = new THREE.AmbientLight('blue', 0.5)
// scene.add(ambientLight)

// const pointLight = new THREE.PointLight('red', 10)
// pointLight.position.y = 3
// scene.add(pointLight)

/* 8. MESH STANDARD MATERIAL */
/* 8. MESH STANDARD MATERIAL */

/* es el standar entre blender, threejs, en todas las librerias, es el mas realista posible */

const material = new THREE.MeshStandardMaterial()
material.side = THREE.DoubleSide
// material.metalness = 0.35
// material.roughness = 0.35

material.map = texture_door_color
material.aoMap = texture_door_ambientOcclusion // le da tipo una saturacion de sombra, para que esas grietas no afecte casi nada la luz del alrededor
material.aoMapIntensity = 0.65

material.displacementMap = texture_door_height // da a un altura a la textura
material.displacementScale = 0.1

material.metalnessMap = texture_door_metalness // para controlar el efecto metalico
material.metalness = 1

material.roughnessMap = texture_door_roughness // para controlar la rugosidad
material.roughness = 1

material.normalMap = texture_door_normal // para controlar los reflejos, que partes solamente deben tener reflejos
material.normalScale.set(1, 1)

// material.transparent = true
// material.alphaMap = texture_door_alpha // para controlar transpariencia de secciones de la textura

debug_MeshStandardMaterial.add(material, 'metalness').min(-2).max(2).step(0.0001)
debug_MeshStandardMaterial.add(material, 'roughness').min(-2).max(2).step(0.0001)
debug_MeshStandardMaterial.add(material, 'aoMapIntensity').min(0).max(3).step(0.001)
debug_MeshStandardMaterial.add(material, 'wireframe')
debug_MeshStandardMaterial.add(material, 'displacementScale').min(0).max(3).step(0.001)

// luces *

// const ambientLight = new THREE.AmbientLight('red', 0.5)
// scene.add(ambientLight)

// const pointLight = new THREE.PointLight('yellow', 10)
// pointLight.position.y = 3
// scene.add(pointLight)

/* environment map (imagen tipo alrededor de la escena)*/
/* lo estamos usando par simular luces y reflejos realistas */

const rgbeLoader = new RGBELoader()
rgbeLoader.load('/textures/environmentMap/2k.hdr', (environtmentMap) => {
  // console.log(environtmentMap)

  environtmentMap.mapping = THREE.EquirectangularReflectionMapping

  scene.environment = environtmentMap
  scene.background = environtmentMap
})

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

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
///////////////////////////////////////////////////////////////////

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  /* ANIMATIONS */
  //   gsap.to(mesh_box.rotation, { duration: 1, delay: 0.5, x: Math.PI * 0.5, y: Math.PI * 0.5 })

  // mesh_box.rotation.x = elapsedTime * Math.PI * 0.3
  // mesh_box.rotation.y = elapsedTime * Math.PI * 0.3

  // mesh_sphere.rotation.x = elapsedTime * Math.PI * 0.3
  // mesh_sphere.rotation.y = elapsedTime * Math.PI * 0.3

  // mesh_torus.rotation.x = elapsedTime * Math.PI * 0.3
  // mesh_torus.rotation.y = elapsedTime * Math.PI * 0.3

  // mesh_cone.rotation.x = elapsedTime * Math.PI * 0.3
  // mesh_cone.rotation.y = elapsedTime * Math.PI * 0.3

  // mesh_plane.rotation.x = elapsedTime * Math.PI * 0.3
  // mesh_plane.rotation.y = elapsedTime * Math.PI * 0.3

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
