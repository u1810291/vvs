// alphanumeric sort
export function sortToggle(arr, key, order) {
    const collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: 'base',
    });
    if (arr) {
      return arr.sort(function (a, b) {
        let x = a[key];
        let y = b[key];
        if (order === 'asc') {
          return collator.compare(x, y);
        }
        if (order === 'desc') {
          return collator.compare(x, y) * -1;
        }
        if (order === '') {
          return Math.random() - 0.5;
        }
      });
    }
  }