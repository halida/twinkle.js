import DataLoader from 'dataloader'

export class BaseLoader extends DataLoader {
  static getInstance (context, key) {
    if (!context[key]) {
      context[key] = new this()
    }

    return context[key]
  }

  static preload (id, context, key = this.name) {
    return this.getInstance(context, key).load(id)
  }
}
