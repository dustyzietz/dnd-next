import React, { useContext, useEffect, useState } from "react";
import Input from "../inputs/Input";
import Modal from "./Modal";
import { CampaignContext } from "../../context/CampaignContext";
import mongoose from 'mongoose';

const CreateMap = ({fetchMaps}) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [campaign, setCampaign] = useContext(CampaignContext)

  useEffect(()=>{
   setName("")
   setImage("")
  },[setOpen])
 
  const onSubmit = async () => {
    if(!name || !image){
      alert("name or starting map required")
      return
    }
    let mapsRes = await fetch('/api/maps', {
      method:"POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, image, campaignId: campaign._id})
    })
    mapsRes = await mapsRes.json()
    if(mapsRes.data._id){alert('Map Created')}
    else{alert('no map _id')}
    fetchMaps()
    setOpen(false)
  }


  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="btn"
      >
        New Map
      </button>
      <Modal open={open} setOpen={setOpen}>
        <div className="px-6 w-96">
          <Input
            value={name}
            name=""
            onChange={(e) => setName(e.target.value)}
            label="Map Name"
            className=""
          />
          <Input
            value={image}
            name=""
            onChange={(e) => setImage(e.target.value)}
            label="Map Image Url" 
            className=""
          />
          <button onClick={()=>setOpen(false)} className="btn mt-4">Cancel</button>
          <button onClick={onSubmit} className="btn float-right mt-4">Submit</button>
        </div>
      </Modal>
    </div>
  );
};

export default CreateMap;
