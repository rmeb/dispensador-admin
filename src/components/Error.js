import React from 'react'

export default ({message, onClick}) => (
  <div className="alert alert-danger text-light da-error da-empty" role="alert" onClick={onClick}>
    {message}
  </div>
)
