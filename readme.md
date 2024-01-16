# Three.js Journey

## Tareas

- Aprender mas sobre los diferentes tipo de MATERIAL

### 1. Mesh Basic Material

![Alt text](/public/image.png)

### 2. Mesh Normal Material

![Alt text](/public/image-1.png)

### 3. Mesh Matcap Material

![Alt text](/public/image-3.png)

### 4. Mesh Depth Material

(este en el curso se veia asi, pero a mi no me aparecia casi nada)

![Alt text](/public/image-4.png)

### 5. Mesh Lambert Material

(requiere luces)

Tiene mejor rendimeito, pero aveces sale lineas sombras extrañas

(luces blancas, ambiente blanco)
![Alt text](/public/image-5.png)

(luces rojas, ambiente azul)
![Alt text](/public/image-6.png)

### 6. Mesh Phong Material

(este requiere luces , es mejor, solcuiona el error de lineas, pero menos rendimiento, porque tiene muchos mas funcionalidades) , como darle un brillo de color al objeto

![Alt text](/public/image-7.png)

### 7. Mesh Toon Material

(requiere luces, y es el mas realista)

![Alt text](/public/image-9.png)

pero tambien podemos obtener resultados como este al usar

```javascript
texture_gradient_5.magFilter = THREE.NearestFilter
```

![Alt text](/public/image-8.png)

### 8. Mesh Standard Material

es el standar entre blender, threejs, en todas las librerias, es el mas realista posible

![Alt text](/public/image-10.png)

JUnto a una iamgen .hdr alrededor, para que refleje los brillos y colores de esa imagen

![Alt text](/public/image-11.png)

## Enlaces

- Matcaps FREE: https://github.com/nidorx/matcaps
