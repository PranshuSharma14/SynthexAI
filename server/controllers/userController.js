
import pool from "../config/db.js";
console.log("hello")
console.log("POOL LOADED?", pool);

//GET USER CREATIONS
export const getUserCreations = async(req,res)=>{
    try {
        const {userId}=req.auth();
        const creations = await pool.query("select * from creations where user_id=$1 order by created_at DESC",[userId])
        console.log(creations.rows);
        //to be checked later this statement
        res.json({success:true, creations: creations.rows})

    } catch (error) {
        res.json({success: false , message: error.message}) 
    }
}

//GET PUBLISHED CREATONS
export const getPublishedCreations = async(req,res)=>{
    try {
        const {userId}=req.auth();
        const creations = await pool.query("select * from creations where publish= true order by created_at DESC")
        console.log(creations.rows);
        //to be checked later this statement
        res.json({success:true, creations: creations.rows})

    } catch (error) {
        res.json({success: false , message: error.message})
    }
}

//TOGGLE LIKE CREATIONS

export const toggleLikeCreations = async(req,res)=>{
    try {

        const {userId}=req.auth();
        const {id}= req.body

        const result= await pool.query("select * from creations where id=$1",[id]);
        const creation=result.rows[0];

        if(!creation){
           return res.json({success: false , message:'Creation not found'})
        }

        const currentLikes=creation.likes || []
        const userIdStr=userId.toString();
        let updatedLikes;
        let message;

        if(currentLikes.includes(userIdStr)){
            updatedLikes=currentLikes.filter((user)=> user!==userIdStr);
            message='Creation Unliked'
        }
        else{
            updatedLikes=[...currentLikes,userIdStr];
            message='Creation Liked'
        }

        await pool.query("update creations set likes= $1::text[] where id=$2",[updatedLikes,id])

        res.json({success:true, message})

    } catch (error) {
        res.json({success: false , message: error.message})
    }
}
