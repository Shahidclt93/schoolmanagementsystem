import React from 'react'

const Card = ({usersLength, userType}) => {
  return (
    <div className='h-28 w-48 p-4 rounded-lg bg-yellow-200'>
        <h2 className='text-3xl'>{usersLength}</h2>
        <p>{userType}</p>

    </div>
  )
}

export default Card