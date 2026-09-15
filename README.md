# PreEntrega - Node.js y FakeStore API

## Descripción

Este proyecto corresponde a una pre-entrega de Node.js. La aplicación permite gestionar productos mediante comandos ingresados desde la terminal y utiliza la API FakeStore para realizar las operaciones.

El programa recibe los argumentos mediante `process.argv`, identifica el método HTTP y la operación solicitada, y realiza las consultas utilizando `fetch`.

## Tecnologías utilizadas

* Node.js
* JavaScript
* ES Modules
* Fetch API
* FakeStore API

## Operaciones disponibles

### Consultar todos los productos

```bash
npm run start GET products
```

Obtiene y muestra en la consola todos los productos disponibles en FakeStore API.

### Consultar un producto

```bash
npm run start GET products/15
```

Permite consultar un producto específico indicando su ID.

### Crear un producto

```bash
npm run start POST products T-Shirt-Rex 300 remeras
```

Envía un nuevo producto mediante una solicitud HTTP `POST`.

### Eliminar un producto

```bash
npm run start DELETE products/7
```

Envía una solicitud HTTP `DELETE` para eliminar el producto indicado.

## Estructura y funcionamiento

El archivo principal del proyecto es `index.js`.

Los argumentos ingresados desde la terminal se obtienen mediante:

```javascript
const args = process.argv.slice(2);
```

Luego se utiliza destructuring para separar el método, la ruta y los datos adicionales:

```javascript
const [method, data, ...resto] = args;
const [title, price, category] = resto;
```

El programa analiza los argumentos recibidos y determina qué operación debe realizar.

Para consultar la API se utiliza `fetch` junto con `async/await`. Las respuestas se convierten a JSON mediante `response.json()` y posteriormente se muestran en la consola.

También se utilizan métodos de strings como `startsWith()` y `split()` para identificar y separar las rutas correspondientes a productos específicos.

Para la creación de productos se utiliza `JSON.stringify()` para convertir los datos a JSON y `parseFloat()` para convertir el precio recibido desde la terminal a un valor numérico.

## Manejo de errores

El programa utiliza `try/catch` y verifica el estado de las respuestas mediante `response.ok`. De esta manera, si una solicitud no puede realizarse correctamente, se informa el error correspondiente en la consola.

También se incorpora una validación inicial para evitar ejecutar el programa cuando no se ingresan los argumentos necesarios.

## Ejemplos de ejecución

```text
npm run start GET products
npm run start GET products/15
npm run start POST products T-Shirt-Rex 300 remeras
npm run start DELETE products/7
```

El resultado de cada operación se muestra directamente en la terminal.

## Nota

FakeStore API es una API utilizada con fines de prueba y aprendizaje. Las operaciones de creación y eliminación sirven para practicar el envío de solicitudes HTTP y la recepción de respuestas de una API.
