import { Customer } from '../../../domain/customer/entity/costumer.entity'
import { ICostumerRepository } from '../../../domain/customer/repository/customer-repository.interface'
import {
  IListCustomerDtoInput,
  IListCustomerDtoOutput
} from './dto/list-customer.dto'

export class ListCustomersUseCase {
  private customerRepository: ICostumerRepository

  constructor(customerRepository: ICostumerRepository) {
    this.customerRepository = customerRepository
  }

  async execute(input: IListCustomerDtoInput) {
    const customers = await this.customerRepository.findAll()

    return OutPutMapper.toOutput(customers)
  }
}

class OutPutMapper {
  static toOutput(customers: Customer[]): IListCustomerDtoOutput {
    return {
      customers: customers.map(customer => ({
        id: customer.id,
        name: customer.name,
        address: {
          street: customer.address.street,
          number: customer.address.number,
          city: customer.address.city,
          zip: customer.address.zip
        }
      }))
    }
  }
}
