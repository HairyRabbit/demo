export class DataContainer<T> {
  constructor(public data: T[] = []) {}
  findAll(): T[] {
    return this.data
  }
  findAllBy(query: (item: T) => boolean): T[] {
    return this.data.filter(item => query(item))
  }
  count(): number {
    return this.data.length
  }
  countBy(query: (item: T) => boolean): number {
    return this.data.filter(item => query(item)).length
  }
  everyBy(query: (item: T) => boolean): boolean {
    return this.data.every(item => query(item))
  }
  someBy(query: (item: T) => boolean): boolean {
    return this.data.some(item => query(item))
  }
  create(newData: T): DataContainer<T> {
    return new DataContainer(this.data.concat(newData))
  }
  update(oldData: T, newData: T): DataContainer<T> {
    const index = this.data.findIndex(item => oldData === item)
    return new DataContainer([
      ...this.data.slice(0, index),
      newData,
      ...this.data.slice(index + 1)
    ])
  }
  updateBy(query:(item: T) => boolean, updater: (data: T) => T): DataContainer<T> {
    const index = this.data.findIndex(item => query(item))
    return new DataContainer([
      ...this.data.slice(0, index),
      updater(this.data[index]),
      ...this.data.slice(index + 1)
    ])
  }
  updateAllBy(query: (item: T) => T) {
    return new DataContainer(this.data.map(item => query(item)))
  }
  destroy(deleteData: T): DataContainer<T> {
    const index = this.data.findIndex(item => deleteData === item)
    return new DataContainer([
      ...this.data.slice(0, index),
      ...this.data.slice(index + 1)
    ])
  }
  destroyBy(query: (item: T) => boolean): DataContainer<T> {
    return new DataContainer(this.data.filter(item => !query(item)))
  }
  destroyAll(): DataContainer<T> {
    return new DataContainer([])
  }
}

export default function makeData<T>(init: T[] = []): DataContainer<T> {
  return new DataContainer(init)
}