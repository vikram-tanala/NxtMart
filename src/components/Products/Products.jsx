import ProductCard from '../ProductCard/ProductCard'
import './index.css'

const Products = props => {
  const { productDetails } = props
  const { name, products } = productDetails
  
  return (
    <section className="products-view-section">
      <h2 className="category-header">{name}</h2>
      <ul className="products-grid-layout">
        {products.map(eachProduct => (
          <ProductCard key={eachProduct.id} details={eachProduct} />
        ))}
      </ul>
    </section>
  )
}
export default Products