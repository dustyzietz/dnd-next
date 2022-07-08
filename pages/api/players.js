import connectMongo from '../../utils/connectMongo';
import Player from '../../models/Player';

console.log('CONNECTING TO MONGO');
connectMongo();
console.log('CONNECTED TO MONGO');

export default async function addPlayer(req, res) {
  try {
    if(req.method === "GET"){
      if(req.query._id){
        const player = await Player.find({_id: req.query._id});
        res.json({ data: player, success: true });
      }else{
      const player = await Player.find({...req.query});
      res.json({ data: player, success: true });
      }
    }
    if(req.method === "POST"){
        if(req.body._id){
          let player = await Player.findOne({_id:{$eq:req.body._id}});
          const keys = Object.keys(req.body)
          keys.forEach(key => player[key] = req.body[key])
          let playerRes = player.save()
          res.json({ data: playerRes, success: true });
          }else{
            let player = await Player.create(req.body);
            res.json({ data: player, success: true });
          }
    }
    if(req.method === "DELETE"){
          let deleteRes = await Player.deleteOne({_id: req.query.id});
          res.json({ data: deleteRes, success: true });
         
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, error: error });
  }
}