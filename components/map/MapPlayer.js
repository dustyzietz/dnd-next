import React, { useContext, useState, useEffect } from 'react'
import Draggable from "react-draggable";
import { AiFillPlusCircle, AiFillMinusCircle, AiFillCloseCircle } from "react-icons/ai"
import { CampaignContext } from '../../context/CampaignContext';

const MapPlayer = ({player, i, updateCampaign}) => {
  const [showEdit, setShowEdit] = useState(false)
  const [actionsOpen, setActionsOpen] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [campaign, setCampaign] = useContext(CampaignContext)
  const { size } = player
  const [transition, setTransition] = useState(true)

  const updatePosition = async (i, x, y) => {
    const newCampaign = { ...campaign };
    delete newCampaign.__v
    newCampaign.players[i] = { ...newCampaign.players[i], x, y };
    updateCampaign(newCampaign)
  };

  const deleteMapPlayer = async () => {
    let newCampaign = {...campaign};
    newCampaign.players.splice(i, 1)
    delete newCampaign.__v
    updateCampaign(newCampaign)
  }

  const updateSize = async (i, size) => {
    const newCampaign = { ...campaign };
    delete newCampaign.__v
    newCampaign.players[i] = { ...newCampaign.players[i], size, };
    updateCampaign(newCampaign)
  };
  

  if(!player)return
  return (
    <Draggable
    onStop={(e) =>{ 
      updatePosition(i, e.layerX - e.offsetX, e.layerY - e.offsetY);
      setTransition(true)
    }
    }
    disabled={disabled}
    position={{ x: player.x, y: player.y }}
    key={`${i}${player._id}`}
    onDrag={()=>setShowEdit(false)}
    onStart={()=>setTransition(false)}
  >
    <div
      onMouseOver={()=>setShowEdit(true)}
      onMouseOut={()=>setShowEdit(false)}
      style={{ width:{size}, height:{size} }}
      className={`z-30 absolute cursor-move duration-500 ${transition ? 'transition' : 'transition-none'} `}
    >
      <img
        style={{ pointerEvents: "none" }}
        src={player.image}
        alt=""
        height={size}
        width={size}
      />
    {showEdit && (
    <div onMouseOver={()=>setDisabled(true)} onMouseOut={()=>setDisabled(false)}>
     <button className='text-green-500 bg-black rounded-full' onClick={()=>updateSize(i, (size + 5))}> <AiFillPlusCircle size={20}/></button>
     <button className='text-yellow-500 bg-black rounded-full' onClick={()=>updateSize(i, (size - 5))}> <AiFillMinusCircle size={20} /></button>
       <button className='text-red-500 bg-black rounded-full' onClick={()=>deleteMapPlayer()}> <AiFillCloseCircle size={20} /></button>
   
    </div>
    )}
    </div>
    
  </Draggable>
  )
}

export default MapPlayer