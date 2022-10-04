import { IProductRepository } from '../../../domain/product/repository/product-repository.interface'

import {
  IUpdateProductDtoInput,
  IUpdateProductDtoOutput
} from './dto/update-product.dto'

export class UpdateProductUseCase {
  private productRepository: IProductRepository

  constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository
  }

  async execute(
    input: IUpdateProductDtoInput
  ): Promise<IUpdateProductDtoOutput> {
    const product = await this.productRepository.find(input.id)

    product.changeName(input.name)
    product.changePrice(input.price)

    await this.productRepository.update(product)

    return {
      id: product.id,
      name: product.name,
      price: product.price
    }
  }
}
