import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import CompanyInfo from './pages/CompanyInfo'
import Team from './pages/Team'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/company" element={<CompanyInfo />} />
        <Route path="/team" element={<Team />} />
      </Routes>
    </Layout>
  )
}
