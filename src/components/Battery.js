import React from 'react'

const WEIMAX = 1000000000000000000

export default ({balance, version}) => (
  <div className="d-flex justify-content-end align-items-center">
    <span className="mr-2">{version}</span>
    <i className={"fas fa-2x fa-battery-" + batteryLevel(balance / WEIMAX)} />
  </div>
)

function batteryLevel(fuel) {
  let battery = 'full'
  if (fuel < 0.1) {
    battery = 'empty'
  } else if (fuel < 0.3) {
    battery = 'quarter'
  } else if (fuel < 0.5) {
    battery = 'half'
  } else if (fuel < 0.8) {
    battery = 'three-quarter'
  }
  return battery
}
