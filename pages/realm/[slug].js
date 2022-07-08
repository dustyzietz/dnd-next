import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import io from 'socket.io-client'
import { CampaignContext } from "../../context/CampaignContext";
import { UserContext } from "../../context/UserContext";
import MapPlayer from "../../components/map/MapPlayer";
import CreateMap from "../../components/modals/CreateMap";
import CreateItem from "../../components/modals/CreateItem";
import MapItem from "../../components/map/MapItem"
import Image from "next/image";
let socket;

const Realm = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [open, setOpen] = useState(false);
  const [players, setPlayers] = useState(null);
  const [user, setUser] = useContext(UserContext)
  const [mapsOpen, setMapsOpen] = useState(false)
  const [maps, setMaps] = useState(null)
  const [itemsOpen, setItemsOpen] = useState(false)
  const [items, setItems] = useState(null)
  const [campaign, setCampaign] = useContext(CampaignContext);


  useEffect(() => { 
    const socketInitializer = async () => {
      await fetch('/api/socket');
      socket = io()
    }
    if(!socket){
          socketInitializer()
    }
  }, [])

  const updateCampaign = async (newCampaign) => {
    setCampaign(newCampaign)
    socket.emit('campaign-change', newCampaign)
    const campaignRes = await fetch("/api/campaigns",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCampaign)
    })
  }


  useEffect(() => {
    if (!players && user && user.email) fetchPlayers();
  }, [user]);

  const fetchPlayers = async () => {
    const res = await fetch(`/api/players?owner=${user?.email}`);
    const { data } = await res.json();
    setPlayers(data);
  };

  useEffect(() => {
    if (!items) fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await fetch(`/api/items`);
    const { data } = await res.json();
    setItems(data);
  };

  useEffect(() => {
    if (!maps && campaign) fetchMaps();
  }, [campaign?._id]);

  const fetchMaps = async () => {
    const res = await fetch(`/api/maps?campaignId=${campaign?._id}`);
    const { data } = await res.json();
    setMaps(data);
    console.log('Maps', data)
  };

  const addPlayerToMap = (player) => {
    updateCampaign({
      ...campaign,
      players: [...campaign.players, { ...player, x: 120, y: 20, size: 50 }],
    });
  };

  const addItemToMap = (item) => {
    updateCampaign({
      ...campaign,
      items: [...campaign.items, {...item, x: 120, y: 20, size: 25}],
    });
  };

  const changeMap = (map) => {
    updateCampaign({...campaign, map: map});
  }


  useEffect(() => {
    if (!campaign && slug) fetchCampaign();
  }, [slug]);

  const fetchCampaign = async () => {
    const res = await fetch(`/api/campaigns?slug=${slug}`);
    const { data } = await res.json();
    updateCampaign(data[0]);
  };

  if (!campaign) return;
  return (
    <div className="p-4 relative">
      <div style={{ height: "1400px", width: "1000px", position: 'absolute' }}>
        <img
          className="object-contain"
          src={campaign.map.image}
          height="1400px"
          width="1000px"
          alt=""
        />
         </div>
        {campaign.players.map((player, i) => (
          <MapPlayer player={player} i={i} updateCampaign={updateCampaign} />
        ))}
                {campaign.items.map((item, i) => (
          <MapItem item={item} i={i} updateCampaign={updateCampaign} />
        ))}
     

      <div className="fixed top-20 left-10">
        <button onClick={() => setOpen(!open)} className="btn ">
          {open ? "Close" : "Players"}
        </button>
        {open && (
          <div className="bg-white p-2 grid grid-cols-4">
            {players && players.map((player) => (
              <div key={player._id}>
                <button
                  onClick={() => {
                    addPlayerToMap(player);
                    setOpen(false);
                  }}
                >
                  <img src={player.image} alt="" height="50" width="50" />
                </button>
              </div>
            ))}
          </div>
        )}<br/>
         <button onClick={() => setMapsOpen(!mapsOpen)} className="btn mt-4">
          {mapsOpen ? "Close" : "Maps"}
        </button>
        {mapsOpen && (
          <div className="bg-white p-2 grid grid-cols-4">
            {maps && maps.map((map) => (
              <div key={map._id}>
                <button
                  onClick={() => {
                   changeMap(map);
                    setMapsOpen(false);
                  }}
                >
                  <img src={map.image} alt="" height="50" width="50" />
                </button>
              </div>
            ))}<br/>
            <CreateMap fetchMaps={fetchMaps} />
          </div>
        )}
        <br/>
         <button onClick={() => setItemsOpen(!itemsOpen)} className="btn mt-4">
          {itemsOpen ? "Close" : "Items"}
        </button>
        {itemsOpen && (
          <div className="bg-white p-2 grid grid-cols-4">
            {items && items.map((item) => (
              <div key={item._id}>
                <button
                  onClick={() => {
                   addItemToMap(item);
                    setMapsOpen(false);
                  }}
                >
                  <img src={item.image} alt="" height="50" width="50" />
                </button>
              </div>
            ))}<br/>
            <CreateItem fetchItems={fetchItems} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Realm;
