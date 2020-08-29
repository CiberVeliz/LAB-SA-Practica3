# LAB-SA-Practica4

## José Manuel Véliz Sandoval - 201602959

Esta rama contiene todo el contenido de la práctica 4, la cual se divide en 4 microservicios en los cuales uno funciona como orquestador.

Se adjunta el flujo de práctica para mayor entendimiento:
![Flujo](https://drive.google.com/uc?export=view&id=1KU4cHYpQCDbE8aF_r1kRBDZ1LSt4Mp08)

## Versiones de herramientas utilizadas:

- NodeJS: v14.5.0
- NPM: 6.14.5

## Instalación y Ejecución de la aplicación

1. Clonar el repositorio y situarnos en la rama master

```
git clone https://github.com/CiberVeliz/LAB-SA-Practica3
git checkout practica4
cd LAB-SA-Practica3
```

2. Instalar los paquetes utilizados en la aplicación:

```
cd microservicio_cliente || cd microservicio_repartidor || microservicio_restaurante || ESB
npm install
```

3. Ejecución de la aplicación:

```
node app.js
```

Si en ninguno de los pasos anteriores ocurrió un error, los 4 microservicios deben de estar corriendo en los puertos 3300, 3001, 3002 y 5000 para cliente, restaurante, repartidor y ESB correspondientemente.
