import BigNumber from 'bignumber.js'
import { Money } from '../src/index'

const money1 = new Money('10')
const money2 = new Money('5')
const money3 = new Money('20')

test('should sum a bunch of money objects', () => {
  expect(money1.add([money2, money3])).toEqual(new Money('35'))
})

test('should subtract a bunch of money objects', () => {
  expect(money1.subtract([money2])).toEqual(new Money('5'))
  expect(money1.subtract([money2, money3])).toEqual(new Money('-15'))
})

test('should multiply a bunch of money objects', () => {
  expect(money1.multiply([money2, money3])).toEqual(new Money('1000'))
})

test('should divide a bunch of money objects', () => {
  expect(money1.divide([money2, money3])).toEqual(new Money(new BigNumber('0.1')))
  expect(money1.divide([money2])).toEqual(new Money(new BigNumber(2)))
})

test('should format a money object', () => {
  expect(new Money('1000').format()).toBeTruthy()
})

test('equalsTo', () => {
  expect(new Money('1000').equalsTo(new Money('1000'))).toBeTruthy()
  expect(new Money('1000').equalsTo(new Money('9'))).toBeFalsy()
})

test('lessThan', () => {
  expect(new Money('1000').lessThan(new Money('1000'))).toBeFalsy()
  expect(new Money('1000').lessThan(new Money('9'))).toBeFalsy()
  expect(new Money('9').lessThan(new Money('10'))).toBeTruthy()
})

test('lessThanOrEqual', () => {
  expect(new Money('1000').lessThanOrEqual(new Money('1000'))).toBeTruthy()
  expect(new Money('1000').lessThanOrEqual(new Money('9'))).toBeFalsy()
  expect(new Money('9').lessThanOrEqual(new Money('10'))).toBeTruthy()
})

test('greaterThan', () => {
  expect(new Money('1000').greaterThan(new Money('1000'))).toBeFalsy()
  expect(new Money('1000').greaterThan(new Money('9'))).toBeTruthy()
  expect(new Money('9').greaterThan(new Money('10'))).toBeFalsy()
})

test('greaterThanOrEqual', () => {
  expect(new Money('1000').greaterThanOrEqual(new Money('1000'))).toBeTruthy()
  expect(new Money('1000').greaterThanOrEqual(new Money('9'))).toBeTruthy()
  expect(new Money('9').greaterThanOrEqual(new Money('10'))).toBeFalsy()
})

test('isZero', () => {
  expect(new Money('1000').isZero()).toBeFalsy()
  expect(new Money('0').isZero()).toBeTruthy()
  expect(new Money('-0').isZero()).toBeTruthy()
  expect(new Money('000').isZero()).toBeTruthy()
  expect(new Money('0.00001').isZero()).toBeFalsy()
})

test('isPositive', () => {
  expect(new Money('-1000').isPositive()).toBeFalsy()
  expect(new Money('1').isPositive()).toBeTruthy()
  expect(new Money('10').isPositive()).toBeTruthy()
  expect(new Money('-0.00001').isPositive()).toBeFalsy()
})

test('isNegative', () => {
  expect(new Money('-1000').isNegative()).toBeTruthy()
  expect(new Money('00').isNegative()).toBeFalsy()
  expect(new Money('10').isNegative()).toBeFalsy()
  expect(new Money('-0.00001').isNegative()).toBeTruthy()
})

test('toJson', () => {
  expect(new Money('-1000').toJson()).toEqual({
    amount: '-1000',
    currency: 'EUR',
  })
  expect(new Money('00').toJson()).toEqual({
    amount: '0',
    currency: 'EUR',
  })
  expect(new Money('10').toJson()).toEqual({
    amount: '10',
    currency: 'EUR',
  })
  expect(new Money('-0.00001').toJson()).toEqual({
    amount: '-0.00001',
    currency: 'EUR',
  })
})
