import connectMongo from '../../utils/connectMongo';
import Campaign from '../../models/Campaign';

console.log('CONNECTING TO MONGO');
connectMongo();
console.log('CONNECTED TO MONGO');

export default async function addCampaign(req, res) {
  try {
    if(req.method === "GET"){
      if(req.query._id){
        const campaign = await Campaign.find({_id: req.query._id});
        res.json({ data: campaign, success: true });
      }else{
      const campaign = await Campaign.find({...req.query});
      res.json({ data: campaign, success: true });
      }
    }
    if(req.method === "POST"){
      if(req.method === "POST"){
        if(req.body._id){
          let campaign = await Campaign.findOne({_id:{$eq:req.body._id}});
          const keys = Object.keys(req.body)
          keys.forEach(key => campaign[key] = req.body[key])
          let campaignRes = campaign.save()
          res.json({ data: campaign, success: campaignRes });
          }else{
            let campaign = await Campaign.create(req.body);
            res.json({ data: campaign, success: true });
          }
      } 
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, error: error });
  }
}

// router.get("/", async (req, res) => {
//   console.log(req.query)
// try {
//   if(req.query._id){
//    const campaign = await Campaign.findById(req.query._id)
//    res.json({success: true, data: campaign})
//   } else {
//   const campaigns = await Campaign.find()
//   res.json({success: true, data: campaigns})
//   }
// } catch (error) {
//   console.log(error)
//   res.json({success: false, error: error})
// }
// });

// router.post("/", async (req, res) => {
//   let result;
//   try {
//    const campaign = req.body;
//    if(campaign._id){
//      let oldCampaign = await Campaign.findById(campaign._id);
//      console.log(oldCampaign)
//      Object.assign(oldCampaign, campaign);
//      result = await oldCampaign.save()
//     console.log(result)
//    } else {
//      const newCampaign = new Campaign(campaign)
//      result = await newCampaign.save()
//      console.log(result)
//    }
//    // io.getIO().emit("campaignId", { action: "campaign", date: result });
//     res.json({success: true, data: result});
//   } catch (err) {
//     console.log(err);
//   }
// });