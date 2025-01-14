import { products as initialProducts } from './mocks/products.json'
import { Products } from './components/Products.jsx'
import { useState } from 'react'
import { Header } from './components/Header.jsx'
import { Footer } from './components/Footer.jsx'
import { useFilters } from './hooks/useFilters.js'

function App() {

  const [products] = useState(initialProducts)
  const { filterProducts} = useFilters()
  
  const filteredProducts = filterProducts(products)

  return (
    <>
      <Header />
      <Products products = {filteredProducts} />
      <Footer />
    </>
    
  )
}

export default App
