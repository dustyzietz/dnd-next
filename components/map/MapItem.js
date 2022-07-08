import React, { useContext, useState, useEffect } from 'react'
import Draggable from "react-draggable";
import { AiFillPlusCircle, AiFillMinusCircle, AiFillCloseCircle } from "react-icons/ai"
import { CampaignContext } from '../../context/CampaignContext';
//Change to map item
const MapItem = ({item, i, updateCampaign}) => {
  const [showEdit, setShowEdit] = useState(false)
  const [actionsOpen, setActionsOpen] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [campaign, setCampaign] = useContext(CampaignContext)
  const { size } = item
  const [transition, setTransition] = useState(true)

  const updatePosition = async (i, x, y) => {
    const newCampaign = { ...campaign };
    delete newCampaign.__v
    newCampaign.items[i] = { ...newCampaign.items[i], x, y };
    updateCampaign(newCampaign)
  };

  const deleteMapPlayer = async () => {
    let newCampaign = {...campaign};
    newCampaign.items.splice(i, 1)
    delete newCampaign.__v
    updateCampaign(newCampaign)
  }

  const updateSize = async (i, size) => {
    const newCampaign = { ...campaign };
    delete newCampaign.__v
    newCampaign.items[i] = { ...newCampaign.items[i], size, };
    updateCampaign(newCampaign)
  };
  

  if(!item)return
  return (
    <Draggable
    onStop={(e) =>{ 
      updatePosition(i, e.layerX - e.offsetX, e.layerY - e.offsetY);
      setTransition(true)
    }
    }
    disabled={disabled}
    position={{ x: item.x, y: item.y }}
    key={`${i}${item._id}`}
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
        src={item.image}
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

export default MapItem