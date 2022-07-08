import connectMongo from '../../utils/connectMongo';
import User from '../../models/User';
connectMongo();

export default async function addUser(req, res) {
  try {
  if(req.method === "GET"){
    if(req.query.email){
      const user = await User.find({email: req.query.email});
      res.json({ data: user, success: true });
    }else{
    const user = await User.find({});
    res.json({ data: user, success: true });
    }
  }
  if(req.method === "POST"){
    let query = { email: req.body.email };
    let update = req.body;
    let options = {upsert: true, new: true, setDefaultsOnInsert: true};
    let user = await User.findOneAndUpdate(query, update, options);
    res.json({ data: user, success: true });
  } 
}catch (error) {
    console.log(error);
    res.json({ success: false, error: error });
  }
}