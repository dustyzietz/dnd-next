import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import Input from "../inputs/Input";
import Modal from "./Modal";
import {toSlug} from "../../utils/functions"

const createCampaign = ({fetchCampaigns}) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [startingMap, setStartingMap] = useState("");
  const [user, setUser] = useContext(UserContext)

  useEffect(()=>{
   setName("")
   setStartingMap("")
  },[setOpen])
 
  const onSubmit = async () => {
    if(!name || !startingMap){
      alert("name or starting map required")
      return
    }
    alert(toSlug(name))
    let campaignRes = await fetch('/api/campaigns', {
      method:"POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, realmMaster: user.email, slug: toSlug(name), map:{name, image: startingMap}})
    })
    campaignRes = await campaignRes.json()
    let campaignId = campaignRes.data._id
    let mapRes = await fetch('/api/maps', {
      method:"POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, image: startingMap , campaignId})
    })
    mapRes = await mapRes.json()
    if(mapRes.data._id){alert('campaignCreated')}
    else{alert('no map _id')}
    fetchCampaigns()
    setOpen(false)
  }


  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="btn"
      >
        Create New Campaign
      </button>
      <Modal open={open} setOpen={setOpen}>
        <div className="px-6 w-96">
          <Input
            value={name}
            name=""
            onChange={(e) => setName(e.target.value)}
            label="Campaign Name"
            className=""
          />
          <Input
            value={startingMap}
            name=""
            onChange={(e) => setStartingMap(e.target.value)}
            label="Starting Map Url" 
            className=""
          />
          <button onClick={()=>setOpen(false)} className="btn mt-4">Cancel</button>
          <button onClick={onSubmit} className="btn float-right mt-4">Submit</button>
        </div>
      </Modal>
    </div>
  );
};

export default createCampaign;
