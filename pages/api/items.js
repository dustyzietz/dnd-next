import connectMongo from '../../utils/connectMongo';
import Item from '../../models/Item';

console.log('CONNECTING TO MONGO');
connectMongo();
console.log('CONNECTED TO MONGO');

export default async function addItem(req, res) {
  try {
    if(req.method === "GET"){
      if(req.query._id){
        const item = await Item.find({_id: req.query._id});
        res.json({ data: item, success: true });
      }else{
      const item = await Item.find({...req.query});
      res.json({ data: item, success: true });
      }
    }
    if(req.method === "POST"){
      if(req.method === "POST"){
        if(req.body._id){
          let item = await Item.findOne({_id:{$eq:req.body._id}});
          const keys = Object.keys(req.body)
          keys.forEach(key => item[key] = req.body[key])
          let itemRes = item.save()
          res.json({ data: itemRes, success: true });
          }else{
            let item = await Item.create(req.body);
            res.json({ data: item, success: true });
          }
      } 
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, error: error });
  }
}