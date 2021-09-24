import { parseToRgb } from 'polished'

function hexToRgb(hex: string) {
  const { red, green, blue } = parseToRgb(hex)

  const result = `rgb(${red}, ${green}, ${blue})`

  return result
}

function hexToRgba(hex: string, opacity: number) {
  const { red, green, blue } = parseToRgb(hex)

  const result = `rgb(${red}, ${green}, ${blue}, ${opacity})`

  return result
}

export { hexToRgb, hexToRgba }
