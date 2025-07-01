const { GoogleGenAI } = require('@google/genai');
require('dotenv').config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

exports.botCont =async (req,res)=>{
    const {topic} = req.body;
    try{
        const blog = await generateBlog(topic);
        console.log(blog);
        
        if(blog){
          return res.status(200).json({
            success:true,
            message:"Generated the Blog",
            blog:blog
          })
        }
    }
    catch(error){
        console.log("error while getting response from gemini",error);
        return res.status(500).json({
          success:false,
          message:"Generating process failed",
        })
    }
}


const generateBlog= async (topic)=> {
  const config = {
    responseMimeType: 'application/json',
  };
  const model = 'gemini-2.0-flash';

  const prompt = `
Write a blog article titled "${topic}" with:
- SEO-optimized title
- Short excerpt (max 200 characters)
- Full body content with H2 sections
- Professional tone, easy-to-read paragraphs
Return it in the following format (JSON):
{
  "title": "...",
  "excerpt": "...",
  "content": "...",
  "image": "https://source.unsplash.com/random/800x400?${encodeURIComponent(topic)}"
}
`;

  const contents = [
    {
      role: 'user',
      parts: [{ text: prompt }],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });

  let fullText = '';
  for await (const chunk of response) {
    fullText += chunk.text;
  }

  // Extract and parse the JSON part
  const jsonStart = fullText.indexOf('{');
  const jsonEnd = fullText.lastIndexOf('}');
  const jsonContent = fullText.slice(jsonStart, jsonEnd + 1);
  const blog = JSON.parse(jsonContent);
  return blog;

  // try {
  //   console.log('\n📌 Title:', blog.title);
  //   console.log('\n📖 Excerpt:', blog.excerpt);
  //   console.log('\n📝 Content:\n', blog.content);
  //   console.log('\n🖼️ Image:', blog.image);
    
  // } catch (err) {
  //   console.error('❌ Failed to parse JSON:', err.message);
  //   console.log('\nRaw response:\n', fullText);
  // }
}

// generateBlog("Iran-Israel war");