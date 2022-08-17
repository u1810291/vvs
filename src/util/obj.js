const {pipe, reduce} = require('crocks')

export const removeFalsyFields = pipe(
  Object.entries,
  reduce(
    (carry, [key, value]) => (
      value ? {...carry, [key]: value}: carry), {}
  ),
)
