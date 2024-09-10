import React from 'react'
import './ranking.css'
import Histrory from './history/Histrory'

const Ranking = () => {
  return (
    <>
      <div className='rankingContainer'>
        <div className='rankingBox'>
          <p>Ranking</p>
        </div>
        <div className='historyBox'>
          <Histrory />
        </div>
      </div>
    </>

  )
}

export default Ranking