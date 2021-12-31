const root = window.getComputedStyle(document.documentElement)

export const mainColor = root.getPropertyValue('--main-color')

export const colors = {
  main: '#556892',
}

Object.entries(colors).forEach(([key, color]) => {
  document.documentElement.style.setProperty(
    `--${key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}-color`,
    color,
  )
})
