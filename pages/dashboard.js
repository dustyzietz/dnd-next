import { useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'
import { UserContext } from '../context/UserContext';
import CreateCampaign from '../components/modals/CreateCampaign';
import CreatePlayer from '../components/modals/CreatePlayer';
import Link from 'next/link';
import { IoCloseCircleOutline } from "react-icons/io5"

let socket;


const Dashboard = () => {
  const [user, setUser] = useContext(UserContext)
  const [input, setInput] = useState('')
  const [newCampaign, setNewCampaign] = useState({id: 1, name: 'dusttestia', realmMaster: user?.email })

  useEffect(() => { 
    const socketInitializer = async () => {
      await fetch('/api/socket');
      socket = io()
    }
    if(!socket){
          socketInitializer()
    }
  }, [])

  const onChangeHandler = (e) => {
    setInput(e.target.value)
    socket.emit('input-change', e.target.value)
  }

  const updateCampaign = async () => {
    socket.emit('campaign-change', newCampaign)
    const campaignRes = await fetch("/api/campaigns",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCampaign)
    })
    console.log(await campaignRes.json())
    //return campaignRes.json();
  }

  const [campaigns, setCampaigns] = useState(null)

  useEffect(()=>{
    if(!campaigns)fetchCampaigns()
  },[])

  const fetchCampaigns = async () => {
    const res = await fetch('/api/campaigns')
    const { data } = await res.json()
    setCampaigns(data)
  }

  const [players, setPlayers] = useState(null)

  useEffect(()=>{
    if(!players)fetchPlayers()
  },[])

  const fetchPlayers = async () => {
    const res = await fetch('/api/players')
    const { data } = await res.json()
    setPlayers(data)
  }

  const deletePlayer = async (_id) => {
    const res = await fetch(`/api/players?id=${_id}`,{ method: 'DELETE' })
    console.log('Delete player response', await res.json())
    fetchPlayers()
  }


  return (
  <div className="max-w-5xl mx-6 lg:mx-auto ">
      <input
      placeholder="Type something"
      value={input}
      onChange={onChangeHandler}
    />
    <br/>
    <button onClick={updateCampaign} >
      Update Campaign
    </button><br/><br/>
 <CreateCampaign fetchCampaigns={fetchCampaigns} />
    <h2 className="underline py-4">CAMPAIGNS</h2>
    {campaigns && (
      <div className='grid grid-cols-4 gap-4 mb-6'>
     { campaigns.map(campaign => (
    <Link key={campaign.name} href={`/realm/${campaign.slug}`}>
    <div className="border border-black p-2">{campaign.name}
        <img src={campaign.map.image} alt="" />
      </div>
    </Link>  
      ))}
     </div>
    )}

  <CreatePlayer fetchPlayers={fetchPlayers} />
  <h2 className="underline py-4">PLAYERS</h2>
  <div className='grid grid-cols-4 gap-4 mb-6'>
     {players && players.map(player => (
    <div key={player._id} className="border border-black p-2">{player.name} <button className="float-right" onClick={()=>deletePlayer(player._id)}><IoCloseCircleOutline size={20}  /></button>
        <img src={player.image} alt="" />
      </div>  
      ))}
  </div>
  </div>
  )
}

export default Dashboard;