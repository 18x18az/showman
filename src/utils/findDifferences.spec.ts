import { findDifferences } from './findDifferences'

describe('findDifferences', () => {
  it('should return an empty object if there are no differences', () => {
    const existing = {
      foo: 'bar',
      baz: 123,
      qux: true,
      quux: null
    }
    const updated = {
      foo: 'bar',
      baz: 123,
      qux: true,
      quux: null
    }
    expect(findDifferences(existing, updated)).toEqual({})
  })

  it('should return an object with only the differences', () => {
    const existing = {
      foo: 'bar',
      baz: 123,
      qux: true,
      quux: null
    }
    const updated = {
      foo: 'bar',
      baz: 123,
      qux: false,
      quux: null
    }
    expect(findDifferences(existing, updated)).toEqual({
      qux: false
    })
  })

  it('should return an empty object for nested objects with no differences', () => {
    const existing = {
      foo: 'bar',
      baz: {
        qux: true,
        quux: null
      }
    }
    const updated = {
      foo: 'bar',
      baz: {
        qux: true,
        quux: null
      }
    }
    expect(findDifferences(existing, updated)).toEqual({})
  })

  it('should return only the differences with nested objects', () => {
    const existing = {
      foo: 'bar',
      baz: {
        qux: true,
        quux: null
      }
    }
    const updated = {
      foo: 'bar',
      baz: {
        qux: false,
        quux: null
      }
    }
    expect(findDifferences(existing, updated)).toEqual({
      baz: {
        qux: false
      }
    })
  })
})
