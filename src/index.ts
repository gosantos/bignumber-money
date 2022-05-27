import BigNumber from 'bignumber.js'

type Currency = 'EUR' | 'USD'
type Locale = 'de-DE'

const CENTS = new BigNumber(100)

export class Money {
  amount: BigNumber
  currency: Currency
  locale: string

  constructor(amount: string | BigNumber, locale?: Locale, currency?: Currency) {
    this.amount = typeof amount === 'string' ? new BigNumber(amount) : amount
    this.currency = currency ? currency : 'EUR'
    this.locale = locale ? locale : 'de-DE'
  }

  add(items: Money[]): Money {
    const amount = items.reduce((acc, item) => item.amount.plus(acc), this.amount)
    return new Money(amount)
  }

  subtract(items: Money[]): Money {
    const result = [this, ...items]
      .map((item) => item.amount)
      .reduce((prev, curr) => prev.minus(curr))

    return new Money(result)
  }

  multiply(items: Money[]): Money {
    const result = items
      .map((item) => item.amount)
      .reduce((prev, curr) => prev.multipliedBy(curr), this.amount)

    return new Money(result)
  }

  divide(items: Money[]): Money {
    const result = [this, ...items]
      .map((item) => item.amount)
      .reduce((prev, curr) => prev.dividedBy(curr))

    return new Money(result)
  }

  equalsTo(money: Money) {
    return this.amount.isEqualTo(money.amount)
  }

  lessThan(money: Money) {
    return this.amount.isLessThan(money.amount)
  }

  lessThanOrEqual(money: Money) {
    return this.amount.isLessThanOrEqualTo(money.amount)
  }

  greaterThan(money: Money) {
    return this.amount.isGreaterThan(money.amount)
  }

  greaterThanOrEqual(money: Money) {
    return this.amount.isGreaterThanOrEqualTo(money.amount)
  }

  isZero() {
    return this.amount.isZero()
  }

  isPositive() {
    return this.amount.isPositive()
  }
  isNegative() {
    return this.amount.isNegative()
  }

  format() {
    return new Intl.NumberFormat(this.locale, {
      style: 'currency',
      currency: this.currency,
    }).format(this.amount.dividedBy(CENTS).toNumber())
  }

  toJson() {
    return {
      amount: this.amount.toJSON(),
      currency: this.currency,
    }
  }

  toPercentage() {
    // TODO
  }

  allocate(ratio: Number) {
    // TODO
  }
}
