import React from 'react'
import {get_accounts} from '../lib/Eth'
import {refund} from '../lib/Api'

const WEIMAX = 1000000000000000000

//TODO crear componente, colocar logica de balance aqui, refrescar cada x segundos
export default ({balance, version}) => (
  <div className="d-flex justify-content-end align-items-center">
    <span className="mr-2">{version}</span>
    <a data-toggle="modal" data-target="#refundModal">
      <i className={"fas fa-2x fa-battery-" + batteryLevel(balance / WEIMAX)} />
    </a>
    <RefundModal />
  </div>
)

const RefundModal = () => (
  <form onSubmit={submit}>
    <div className="modal fade" id="refundModal" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Cargar Bateria</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>¿Desea cargar la bateria?</p>
          </div>
          <div className="modal-footer">
            <button type="submit" className="btn btn-primary">Si</button>
            <button type="button" className="btn btn-secondary" data-dismiss="modal">No</button>
          </div>
        </div>
      </div>
    </div>
  </form>
)

function submit(e) {
  e.preventDefault()
  window.$('#refundModal').modal('toggle')
  let account = get_accounts()[0]
  refund(account).then(console.log).catch(console.error)
}

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
