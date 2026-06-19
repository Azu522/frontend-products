import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  // Obtener productos
  useEffect(() => {
    getProducts();
  }, []);

  // LISTAR
  const getProducts = async () => {

    try {

      const response = await axios.get(
        "http://localhost:3000/products"
      );

      setProducts(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  // CREAR
  const createProduct = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:3000/products",
        {
          name,
          code,
          description,
          price: Number(price),
          stock: Number(stock),
        }
      );

      setName("");
      setCode("");
      setDescription("");
      setPrice("");
      setStock("");

      getProducts();

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <div className="container">

      <h1 className="title">
        Sistema de Productos
      </h1>

      {/* FORMULARIO */}
      <div className="form-container">

        <h2>Agregar Producto</h2>

        <form onSubmit={createProduct}>

          <div className="form-group">
            <label>Nombre</label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Código</label>

            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Descripción</label>

            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Precio</label>

            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Stock</label>

            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>

          <button className="btn-save" type="submit">
            Guardar Producto
          </button>

        </form>

      </div>

      {/* PRODUCTOS */}
      <div className="products-grid">

        {
          products.map((product) => (

            <div
              className="product-card"
              key={product.id}
            >

              <h2>{product.name}</h2>

              <p>
                <strong>Código:</strong> {product.code}
              </p>

              <p>
                <strong>Descripción:</strong> {product.description}
              </p>

              <p>
                <strong>Precio:</strong> ${product.price}
              </p>

              <p>
                <strong>Stock:</strong> {product.stock}
              </p>

            </div>
          ))
        }

      </div>

    </div>
  );
}

export default App;