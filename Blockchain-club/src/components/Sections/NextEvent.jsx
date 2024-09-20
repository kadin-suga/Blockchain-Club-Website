import React from 'react'
import { Link} from 'react-router-dom'

function NextEvent({text, span}) {
  return (
    <div className="text-center p-6 bg-gray-100 rounded-lg shadow-lg m-7">
        <h3 className="text-xl font-medium">
          {text}{' '}
          <span className="text-blue-600 underline cursor-pointer hover:text-blue-400">
            <Link to="/events">{span}</Link>
          </span>
        </h3>
      </div>
  )
}

export default NextEvent
