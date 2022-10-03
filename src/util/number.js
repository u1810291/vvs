function pad(padValue, totalLength, num) {
  return (num < 0)
    ? `-${String(num).slice(1).padStart(totalLength, padValue)}`
    : String(num).padStart(totalLength, padValue)
}

