export class BaseService {
  constructor ({ transaction } = {}) {
    this.transaction = transaction
  }
}
