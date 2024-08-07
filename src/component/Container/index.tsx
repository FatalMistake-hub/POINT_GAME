import React from 'react'
import "./container.css";
type Props = {}

export default function Container({

}: Props) {
  return (
    <div className='container'>
      <div className="point">
        <div className="point__element" style={
          {
            top: '123px',
            left: '355px',
            backgroundColor: 'salmon',
            position: 'absolute',
            width: '10px',
            height: '10px',
            borderRadius: '50%'
          }
        }>12</div>
      </div>
    </div>
  )
}
