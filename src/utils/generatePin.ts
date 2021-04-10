export default function generatePin() {
  const min = 0
  const max = 99999999
  const pin = (
    '0' +
    (Math.floor(Math.random() * (max - min + 1)) + min)
  ).substr(-8)

  return pin
}
