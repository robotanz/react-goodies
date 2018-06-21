import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Canvas = styled.div`
  position: absolute;
`

/**
 * SVG Bezier curve linking two elements
 */
class BezierLink extends React.Component {
  static propTypes = {
    x0: PropTypes.number.isRequired,
    y0: PropTypes.number.isRequired,
    x1: PropTypes.number.isRequired,
    y1: PropTypes.number.isRequired,
    lineWidth: PropTypes.number,
  }

  static defaultProps = {
    lineWidth: 1,
  }

  computeCurve = (x0, y0, x1, y1) => {
    const w = Math.abs(x1 - x0)
    const h = Math.abs(y1 - y0)
    const vertical = h > w

    if (vertical) {
      const ym = y0 + h * 0.5
      return (
        'M ' +
        x0 +
        ' ' +
        y0 +
        ' C ' +
        x0 +
        ' ' +
        ym +
        ', ' +
        x1 +
        ' ' +
        ym +
        ', ' +
        x1 +
        ' ' +
        y1
      )
    } else {
      const xm = x0 + w * 0.5
      return (
        'M ' +
        x0 +
        ' ' +
        y0 +
        ' C ' +
        xm +
        ' ' +
        y0 +
        ', ' +
        xm +
        ' ' +
        y1 +
        ', ' +
        x1 +
        ' ' +
        y1
      )
    }
  }

  render() {
    const { x0, y0, x1, y1, lineWidth } = this.props
    const curve = this.computeCurve(x0, y0, x1, y1)
    const w = x0 + Math.abs(x1 - x0) * 1.1
    const h = y0 + Math.abs(y1 - y0) * 1.1

    return (
      <Canvas>
        <svg width={w} height={h} xmlns="http://www.w3.org/2000/svg">
          <path
            d={curve}
            stroke="black"
            fill="transparent"
            strokeWidth={lineWidth}
          />
        </svg>
      </Canvas>
    )
  }
}

export default BezierLink
