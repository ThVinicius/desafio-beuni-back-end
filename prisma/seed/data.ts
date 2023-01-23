import axios from 'axios'
import { IProduct } from '../../src/types/productType'

//busca os produtos na api da beuni
async function getData() {
  const URL =
    'https://api.beuni.com.br/atlas/brands/v2/products?q=&category=&min=0&max=99999&sortBy=featured&page=1&perPage=50'

  const { data } = await axios.get(URL)

  return data.products
}

// filtrar os campos desnecessário da requisição
export default async function filterData() {
  const products = await getData()

  const filterProducts = products.map((product: any) => {
    return {
      name: product.name,
      image: product.image[0].url,
      stock: product.total_stock,
      price: product.price
    }
  }) as IProduct[]

  return filterProducts
}
