const Nc_moni = require('../Models/NC_moni')


// Create (Post)
exports.create = async(req,res)=>{
    try{
        console.log(req.body);
        const newNcMoni = await new Nc_moni(req.body).save()
        res.json(newNcMoni)
    }catch(err){
        console.log(err);
        res.status(400).send('Server Create Error')
    }
} 

// List (Get)
exports.list = async(req,res)=>{
    try{
        const listNCmoni = await Nc_moni.find({}).sort({"_id":-1.0}).exec()
        res.json(listNCmoni)
    }catch(err){
        console.log(err);
        res.status(400).send('Server List Error')
    }
}

// Read (Get)
exports.read = async(req,res)=>{
    try{
        console.log(req.params.id);
        const id = req.params.id
        const readNCmoni = await Nc_moni.findOne({_id:id}).exec()
        res.json(readNCmoni)
    }catch(err){
        console.log(err);
        res.status(400).send('Server Read Error')
    }
}

// Update (Put)
exports.update = async(req,res)=>{
    try{
        console.log(req.params.id);
        // console.log(req.body.value);
        const id = req.params.id;
        // const dt = JSON.parse(id)
        // console.log(dt);
        const updateNCmoni = await Nc_moni.findOneAndUpdate({_id:id},req.body,{new:true}).exec()
        res.send("Update Success")
    }catch(err){
        console.log(err);
        res.status(400).send('Server Update Error')
    }
}

// Delete
exports.remove = async(req,res)=>{
    try{
        console.log(req.params.id);
        const id = req.params.id;
        const removeNcmoni = await Nc_moni.findOneAndDelete({_id:id}).exec()
        res.send("Remove Success")
    }catch(err){
        console.log(err);
        res.status(400).send('Server Remove Error')
    }
}
