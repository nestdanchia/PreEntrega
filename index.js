const args = process.argv.slice(2);
const [method, data, ...resto] = args;
const [title, price, category] = resto;

async function main() {
    try {
        // Validación inicial requerida para evitar errores si ejecutan el comando vacío
        if (!method || !data) {
            console.log("Por favor, ingresa un método y una ruta válida.");
            return;
        }

        // 1. Consultar Todos los Productos
        if (method === "GET" && data === "products") {
            await obtenerProductos(method, data);

        } 
        // 2. Consultar un Producto Específico (Soporta products/15 o cualquier otro id)
        else if (method === "GET" && data.startsWith("products/")) {
            const [categoria, id] = data.split("/");
            await consultarProducto(categoria, id);

        } 
        // 3. Crear un Producto Nuevo
        else if (method === "POST" && data === "products") {
            await crearProducto(title, price, category);

        } 
        // 4. Eliminar un Producto (Soporta products/7 o cualquier otro id)
        else if (method === "DELETE" && data.startsWith("products/")) {
            const [categoria, id] = data.split("/");
            await eliminarProducto(categoria, id);

        } else {
            console.log("Comando no reconocido");
        }
    } catch (err) {
        console.error("Error:", err.message);
    }
}

// --- Funciones que conectan con FakeStoreAPI ---

async function obtenerProductos(method, data) {
    const consulta = await fetch(`https://fakestoreapi.com/${data}`);
    if (!consulta.ok) throw new Error("no se encuentran productos");
    const response = await consulta.json();
    console.log(response);
}

async function consultarProducto(categoria, id) {
    const consulta = await fetch(`https://fakestoreapi.com/${categoria}/${id}`);
    if (!consulta.ok) throw new Error("no se encontro producto");
    const response = await consulta.json();
    console.log(response);
}

async function crearProducto(title, price, category) {
    const consulta = await fetch('https://fakestoreapi.com/products', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: title,
            price: parseFloat(price),
            category: category
        })
    });
    if (!consulta.ok) throw new Error("no se pudo crear el producto");
    const response = await consulta.json();
    console.log("Producto creado exitosamente:", response);
}

async function eliminarProducto(categoria, id) {
    const consulta = await fetch(`https://fakestoreapi.com/${categoria}/${id}`, {
        method: "DELETE"
    });
    if (!consulta.ok) throw new Error("no se pudo eliminar el producto");
    const response = await consulta.json();
    console.log("Producto eliminado exitosamente:", response);
}

// Ejecución de la aplicación
main();
//npm run start GET products
// npm run start GET products/15
// npm run start DELETE products/7
// npm run start POST products T-Shirt-Rex 300 remeras
// npm run start
