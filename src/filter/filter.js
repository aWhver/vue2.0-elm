export const filterTime = function (val) {
  let newDate = new Date()
  newDate.setTime(val)
  return newDate.toLocaleString()
}
