import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import { ThreeDots } from 'react-loader-spinner'
import Header from '../Header/Header.jsx'
import Products from '../Products/Products.jsx'
import Category from '../Category/Catagory.jsx'
import Footer from '../Footer/Footer.jsx'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const Home = () => {
  const [productsList, setProductsList] = useState([])
  const [activeCategory, setActiveCategory] = useState('')
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)

  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = async () => {
    setApiStatus(apiStatusConstants.inProgress)

    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis2.ccbp.in/nxt-mart/category-list-details/'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    try {
      const response = await fetch(url, options)
      if (response.ok) {
        const data = await response.json()
        const updatedData = data.categories.map(each => ({
          name: each.name,
          products: each.products,
        }))
        setProductsList(updatedData)
        setActiveCategory('All') 
        setApiStatus(apiStatusConstants.success)
      } else {
        setApiStatus(apiStatusConstants.failure)
      }
    } catch {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  const updateActiveCategory = name => {
    setActiveCategory(name)
  }

  const getFilteredData = () => {
    if (activeCategory === 'All') {
      return productsList
    }
    return productsList.filter(each => each.name === activeCategory)
  }

  const renderLoadingView = () => (
    <div className="products-loader-container" data-testid="loader">
      <ThreeDots color="#0b69ff" height={50} width={50} />
    </div>
  )

  const renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dezjxjqqp/image/upload/v1709642523/fail_nzisno.png"
        alt="failure view"
        data-testid="failure view"
      />
      <h1>Oops! Something went wrong</h1>
      <p>We are having Some Trouble.</p>
      <button className="btn" type="button" onClick={getProducts}>
        Retry
      </button>
    </div>
  )

  const renderProductsListView = () => {
    const data = getFilteredData()
    return (
      <div className="products-container">
        {data.map(eachItem => (
          <Products key={eachItem.name} productDetails={eachItem} />
        ))}
      </div>
    )
  }

  const renderApiStatus = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderProductsListView()
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      case apiStatusConstants.failure:
        return renderFailureView()
      default:
        return null
    }
  }

  return (
    <>
      <Header />
      <div className="home-container">
        <Category
          details={[{ name: 'All' }, ...productsList]}
          updateActiveCategory={updateActiveCategory}
          activeCategory={activeCategory}
        />
        {renderApiStatus()}
      </div>
      <Footer />
    </>
  )
}

export default Home
