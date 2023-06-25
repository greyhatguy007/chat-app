import React from 'react'

const RoomEnter = ({room, setRoom, setInChat}) => {
  return (
    <div>
    <div className='flex flex-col items-center pt-32'>
    <label htmlFor="roomName" className='hidden'>Room Name</label>
      <input type="text"  value={room} onChange={(e)=>setRoom(e.target.value)} placeholder='Enter Room Name' name='roomName' className='text-center bg-gray-200 text-black rounded-lg focus:outline-none py-0.5'/>
      <button onClick={()=>{setInChat(true);}} className='bg-gray-200 hover:bg-white rounded-lg py-0.5 px-1.5 my-3'>Enter Chat</button>
    </div>
    </div>
  )
}

export default RoomEnter
