import React from 'react';

export default ({loading, label}) => (
  <button type="submit" className="btn btn-primary btn-block">{loading ? <i className="fas fa-circle-notch fa-spin"></i> : label}</button>
)
