import React from 'react'
import io from "socket.io-client";
import { useContext, useEffect, useState } from "react";
import { CampaignContext } from "../../context/CampaignContext"

let socket;

const Sockets = () => {

  const [campaign, setCampaign] = useContext(CampaignContext)
  useEffect(() => {
    const socketInitializer = async () => {
      await fetch("/api/socket");
      socket = io();

      socket.on("connect", () => {
        console.log("connected");
      });

      socket.on("update-campaign", (data) => {
        console.log("update-campaign", data);
        setCampaign(data)
      });

      socket.on("update-input", (msg) => {
        console.log("update-input", msg);
      });
    };
    socketInitializer();
  }, []);

  return (
    <div></div>
  )
}

export default Sockets