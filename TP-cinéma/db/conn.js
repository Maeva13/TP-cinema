const mongoose = require("mongoose")
const env = process.env.ATLAS


const connectDB= async()=>{
    try{
        mongoose.set('strictQuery', true);
        await mongoose.connect(env);
        console.log("Connexion à la base de données MongoDB établie avec succès !");
    }
    catch (err){
        console.error("Erreur de connexion à MongoDB :", err)
        process.exit(1);
    }
}

module.exports=connectDB;
