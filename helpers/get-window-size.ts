import isIE from './is-ie'

function getSize(
  axis: number | string,
  body: any,
  html: any,
  computedStyle: any
) {
  return Math.max(
    body[`offset${axis}`],
    body[`scroll${axis}`],
    html[`client${axis}`],
    html[`offset${axis}`],
    html[`scroll${axis}`],
    isIE(10)
      ? parseInt(html[`offset${axis}`]) +
          parseInt(
            computedStyle[`margin${axis === 'Height' ? 'Top' : 'Left'}`]
          ) +
          parseInt(
            computedStyle[`margin${axis === 'Height' ? 'Bottom' : 'Right'}`]
          )
      : 0
  )
}

export default function getWindowSizes(document: {
  body: any
  documentElement: any
}) {
  const body = document.body
  const html = document.documentElement
  const computedStyle = isIE(10) && getComputedStyle(html)

  return {
    height: getSize('Height', body, html, computedStyle),
    width: getSize('Width', body, html, computedStyle)
  }
}
