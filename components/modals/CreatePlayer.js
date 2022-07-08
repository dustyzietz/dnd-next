import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import Input from "../inputs/Input";
import Modal from "./Modal";
import {toSlug} from "../../utils/functions"

const createPlayer = ({fetchPlayers}) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [user, setUser] = useContext(UserContext)

  useEffect(()=>{
   setName("")
   setImage("")
  },[setOpen])
 
  const onSubmit = async () => {
    if(!name || !image){
      alert("name or starting map required")
      return
    }
    let playerRes = await fetch('/api/players', {
      method:"POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, image, owner: user.email})
    })
    playerRes = await playerRes.json()
    if(playerRes.data._id){alert('Player Created')}
    else{alert('no player _id')}
    fetchPlayers()
    setOpen(false)
  }


  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="btn"
      >
        Create New Player
      </button>
      <Modal open={open} setOpen={setOpen}>
        <div className="px-6 w-96">
          <Input
            value={name}
            name=""
            onChange={(e) => setName(e.target.value)}
            label="Player Name"
            className=""
          />
          <Input
            value={image}
            name=""
            onChange={(e) => setImage(e.target.value)}
            label="Player Image Url" 
            className=""
          />
          <button onClick={()=>setOpen(false)} className="btn mt-4">Cancel</button>
          <button onClick={onSubmit} className="btn float-right mt-4">Submit</button>
        </div>
      </Modal>
    </div>
  );
};

export default createPlayer;
