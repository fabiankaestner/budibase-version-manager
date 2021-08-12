import * as chalk from 'chalk'
import { isObject } from './isObject'

export function prettyPrint(obj: any, level: number = 0) {
  for (let key in obj) {
    if (isObject(obj[key])) {
      console.log('  '.repeat(level) + chalk.bold(key.toUpperCase()))
      // console.log(Object.entries(obj[key]))
      prettyPrint(obj[key], level + 1)
    } else {
      console.log('  '.repeat(level) + chalk.bold(key.toUpperCase()) + ' ' + chalk.blueBright(obj[key]))
    }
  }
}