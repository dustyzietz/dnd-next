import connectMongo from '../../utils/connectMongo';
import Map from '../../models/Map';

console.log('CONNECTING TO MONGO');
connectMongo();
console.log('CONNECTED TO MONGO');

export default async function addMap(req, res) {
  try {
    if(req.method === "GET"){
      if(req.query._id){
        const map = await Map.find({_id: req.query._id});
        res.json({ data: map, success: true });
      }else{
      const map = await Map.find({...req.query});
      res.json({ data: map, success: true });
      }
    }
    if(req.method === "POST"){
      if(req.method === "POST"){
        if(req.body._id){
          let map = await Map.findOne({_id:{$eq:req.body._id}});
          const keys = Object.keys(req.body)
          keys.forEach(key => map[key] = req.body[key])
          let mapRes = map.save()
          res.json({ data: mapRes, success: true });
          }else{
            let map = await Map.create(req.body);
            res.json({ data: map, success: true });
          }
      } 
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, error: error });
  }
}