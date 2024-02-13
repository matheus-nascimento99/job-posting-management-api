import { Entity } from '@/core/entity'
import { Optional } from '@/core/types/optional'
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'

export interface CompanyProps {
  name: string
  createdAt: Date
  updatedAt?: Date
}

export class Company extends Entity<CompanyProps> {
  get name() {
    return this.props.name
  }

  set name(value: string) {
    this.props.name = value
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    data: Optional<CompanyProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const company = new Company(
      {
        ...data,
        createdAt: data.createdAt ?? new Date(),
      },
      id,
    )

    return company
  }
}
