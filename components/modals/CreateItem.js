import React, { useEffect, useState } from "react";
import Input from "../inputs/Input";
import Modal from "./Modal";

const CreateItem = ({fetchItems}) => {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState("");

  useEffect(()=>{
   setImage("")
  },[setOpen])
 
  const onSubmit = async () => {
    if( !image){
      alert("item image required")
      return
    }
    let itemsRes = await fetch('/api/items', {
      method:"POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ image})
    })
    itemsRes = await itemsRes.json()
    if(itemsRes.data._id){alert('Item Created')}
    else{alert('no item _id')}
    fetchItems()
    setOpen(false)
  }


  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="btn"
      >
        New Item
      </button>
      <Modal open={open} setOpen={setOpen}>
        <div className="px-6 w-96">
          <Input
            value={image}
            name=""
            onChange={(e) => setImage(e.target.value)}
            label="Item Image Url" 
            className=""
          />
          <button onClick={()=>setOpen(false)} className="btn mt-4">Cancel</button>
          <button onClick={onSubmit} className="btn float-right mt-4">Submit</button>
        </div>
      </Modal>
    </div>
  );
};

export default CreateItem;
