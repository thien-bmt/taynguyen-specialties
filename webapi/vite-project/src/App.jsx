import { useEffect, useState } from 'react'
import './App.css'


function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true)
        setError('')

        const response = await fetch("http://localhost:4000/api/products")

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const data = await response.json()
        setProducts(Array.isArray(data) ? data : [])
      } catch (fetchError) {
        setError(fetchError.message || 'Failed to load products')
      } finally {
        setLoading(false)
      }
    }

    getProducts()
  }, [])

  return (
    <main className="app-shell">
      <section className="hero">
        <h1>Products List</h1>
      </section>
      {loading && <p className="status">Loading products...</p>}
      {error && <p className="status error">{error}</p>}
      {!loading && !error && (
        <section className="grid">
          {products.map((product) => (
            <article className="card" key={product._id}>
              <h2>{product.name}</h2>
              <p className="price">${product.price}</p>
              <small>
                Created {product.createdAt ? new Date(product.createdAt).toLocaleString() : 'just now'}
              </small>
            </article>
          ))}
          {products.length === 0 && <p className="status">No products found.</p>}
        </section>
      )}
    </main>
  )
}

export default App