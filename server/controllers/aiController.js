import axios from "axios";
import pool from "../config/db.js";
import { clerkClient } from "@clerk/express";
import {v2 as cloudinary} from "cloudinary"
import FormData from "form-data";
import fs from 'fs'
import pdf from "pdf-parse/lib/pdf-parse.js";

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent";


//GENERATE ARTICLE
export const generateArticle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;

    if (!prompt) {
      return res.status(400).json({ success: false, message: "Prompt is required" });
    }

    if (plan !== "premium" && free_usage > 10) {
      return res.json({
        success: false,
        message: "Limit Reached. Upgrade to continue",
      });
    }

    //API call
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }
    );

    const content = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No content generated.";

    //Save to DB
    await pool.query(
      "INSERT INTO creations(user_id, prompt, content, type) VALUES ($1, $2, $3, $4)",
      [userId, prompt, content, 'article']
    );

    //Update usage
    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }

    res.json({ success: true, content });

  } catch (error) {
    console.error("Gemini API Error:", error?.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: error?.response?.data?.error?.message || "Something went wrong",
    });
  }
};


//GENERATE BLOG  TITLE
 
export const generateBlogTitle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;

    if (!prompt) {
      return res.status(400).json({ success: false, message: "Prompt is required" });
    }

    if (plan !== "premium" && free_usage > 10) {
      return res.json({
        success: false,
        message: "Limit Reached. Upgrade to continue",
      });
    }

    //API call
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }
    );

    const content = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No content generated.";

    //Save to DB
    await pool.query(
      "INSERT INTO creations(user_id, prompt, content, type) VALUES ($1, $2, $3, $4)",
      [userId, prompt, content, 'blog-title']
    );

    //Update usage
    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }

    res.json({ success: true, content });

  } catch (error) {
    console.error("Gemini API Error:", error?.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: error?.response?.data?.error?.message || "Something went wrong",
    });
  }
};


//GENERATE IMAGE

export const generateImage = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt,publish } = req.body;
    const plan = req.plan;

    if (!prompt) {
      return res.status(400).json({ success: false, message: "Prompt is required" });
    }

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "Feature only availaible for premium subscriptions",
      });
    }

    //API call
    const formData = new FormData()
    formData.append('prompt', prompt)

    const {data}= await axios.post("https://clipdrop-api.co/text-to-image/v1", formData, {
      headers: {'x-api-key' : process.env.CLIPDROP_API_KEY},
      responseType : "arraybuffer"
    })

    const base64Image= `data:image/png;base64,${Buffer.from(data,'binary').toString('base64')}`
    
    //uploading to cloudinary storage
    const {secure_url} = await cloudinary.uploader.upload(base64Image)


    //Save to DB
    await pool.query(
      "INSERT INTO creations(user_id, prompt, content, type, publish) VALUES ($1, $2, $3, $4, $5)",
      [userId, prompt, secure_url, 'image', publish ?? false ]
    );

    

    res.json({ success: true, content: secure_url });

  } catch (error) {
    console.error("Gemini API Error:", error?.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: error?.response?.data?.error?.message || "Something went wrong",
    });
  }
};

//REMOVE IMAGE BACKGROUND

export const removeImageBackground = async (req, res) => {
  try {
    const { userId } = req.auth();
    const image=req.file;
    const plan = req.plan;

    if (!image) {
      return res.status(400).json({ success: false, message: "Image file is required" });
    }

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "Feature only availaible for premium subscriptions",
      });
    }

    //API call
   
    const {secure_url} = await cloudinary.uploader.upload(image.path,{
      transformation:[
        {
          effect: 'background_removal',
          background_removal: 'remove_the_background'
        }
      ]
    })


    //Save to DB
    await pool.query(
      "INSERT INTO creations(user_id, prompt, content, type) VALUES ($1, $2, $3, $4)",
      [userId, 'Remove background from image', secure_url, 'image']
    );

    

    res.json({ success: true, content: secure_url });

  } catch (error) {
    console.error("Gemini API Error:", error?.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: error?.response?.data?.error?.message || "Something went wrong",
    });
  }
};


//REMOVE IMAGE OBJECT

export const removeImageObject = async (req, res) => {
  try {
    const { userId } = req.auth();
    const {object}=req.body;
    const image=req.file;
    const plan = req.plan;

    if (!image) {
      return res.status(400).json({ success: false, message: "Image file is required" });
    }

    if (!object) {
      return res.status(400).json({ success: false, message: "Object to be removed is required" });
    }

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "Feature only availaible for premium subscriptions",
      });
    }

    //API call
   
    const {public_id} = await cloudinary.uploader.upload(image.path)

    const imageURL=cloudinary.url(public_id,{
      transformation:[{effect:`gen_remove:${object}`}],
      resource_type:'image'
    })

    //Save to DB
    await pool.query(
      "INSERT INTO creations(user_id, prompt, content, type) VALUES ($1, $2, $3, $4)",
      [userId, `Removed ${object} from image`, imageURL, 'image']
    );

    

    res.json({ success: true, content: imageURL });

  } catch (error) {
    console.error("Gemini API Error:", error?.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: error?.response?.data?.error?.message || "Something went wrong",
    });
  }
};


//REVIEW RESUME

export const resumeReview = async (req, res) => {
  try {
    const { userId } = req.auth();
    const resume=req.file;
    const plan = req.plan;

    if (!resume) {
      return res.status(400).json({ success: false, message: "Resume file is required" });
    }

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "Feature only availaible for premium subscriptions",
      });
    }

    //API call
   
    if(resume.size> 5*1024*1024){
      return res.json({success: false, message: "Resume file size exceeded 5MB"})
    }

    const dataBuffer= fs.readFileSync(resume.path)
    const pdfData= await pdf(dataBuffer)

    const prompt= `Review the given resume and provide constructive feedback on its strengths, weakness, and areas of improvment.Also give its ATS score 
                    Here is resume content: \n \n ${pdfData.text}`


    //API call
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }
    );

    const content = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No content generated.";



    //Save to DB
    await pool.query(
      "INSERT INTO creations(user_id, prompt, content, type) VALUES ($1, $2, $3, $4)",
      [userId,'Review the uploaded resume', content, 'resume-review']
    );

    

    res.json({ success: true, content });

  } catch (error) {
    console.error("Gemini API Error:", error?.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: error?.response?.data?.error?.message || "Something went wrong",
    });
  }
};

