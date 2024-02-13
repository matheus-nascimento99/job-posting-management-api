import { UniqueEntityID } from './unique-entity-id'

describe('Unique entity id generator', () => {
  it('should be able to generate a new unique entity id', () => {
    const entityID = new UniqueEntityID()

    expect(entityID).toBeInstanceOf(UniqueEntityID)
  })

  it('should be able to generate a new instance of unique entity id', () => {
    const id = '123'
    const entityID = new UniqueEntityID(id)

    expect(entityID).toBeInstanceOf(UniqueEntityID)
    expect(entityID.toValue()).toEqual(id)
    expect(entityID.toString()).toEqual(id)
  })
})
