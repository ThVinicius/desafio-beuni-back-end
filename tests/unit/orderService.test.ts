import orderRepository from '../../src/repositories/orderRepository'
import cartRepository from '../../src/repositories/cartRepository'
import orderService from '../../src/services/orderService'
import { queryCart } from '../factory/cartFactory'
import { orderFactory } from '../factory/orderFactory'

describe('testes da função add', () => {
  it('deve fazer um pedido', async () => {
    const cart = [queryCart()]
    const customerId = 1

    jest
      .spyOn(cartRepository, 'findAllByCustomerId')
      .mockResolvedValueOnce(cart)

    jest.spyOn(orderRepository, 'add').mockResolvedValueOnce()

    await orderService.add(customerId)

    expect(cartRepository.findAllByCustomerId).toBeCalled()
    expect(orderRepository.add).toBeCalled()
  })
})

describe('testes da função findAllByCustomerId', () => {
  it('deve retornar todos os pedidos', async () => {
    const order = orderFactory()
    const customerId = 1

    jest
      .spyOn(orderRepository, 'findAllByCustomerId')
      .mockResolvedValueOnce(order)

    const response = await orderService.findAllByCustomerId(customerId)

    expect(response).toEqual(order)
    expect(orderRepository.findAllByCustomerId).toBeCalled()
  })
})
