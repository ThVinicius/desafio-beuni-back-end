import productRepository from '../repositories/productRepository'

async function getAllProducts(queryName?: string) {
  return await productRepository.getAllProducts(queryName)
}

export default { getAllProducts }
