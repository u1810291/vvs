import {getAddress, getCoordinates} from 'feature/object/utils'
import {getProp} from 'crocks';

export const getTaskAddress = task => (
  getAddress(task)
  .alt(
    getProp('object', task)
      .chain(getAddress)
  )
)

export const getTaskCoordinates = task => (
  getCoordinates(task)
  .alt(
    getProp('object', task)
      .chain(getCoordinates)
  )
)
