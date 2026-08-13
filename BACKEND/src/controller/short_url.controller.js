import { getShortUrl } from "../dao/short_url.js"
import { createShortUrlWithoutUser, createShortUrlWithUser } from "../services/short_url.service.js"
import wrapAsync from "../utils/tryCatchWrapper.js"

export const createShortUrl = wrapAsync(async (req,res)=>{
    const { url, slug, customAlias } = req.body
    if (!url || !/^https?:\/\/.+/i.test(url)) {
        return res.status(400).json({ message: "Please enter a valid URL beginning with http:// or https://" })
    }
    const requestedSlug = slug || customAlias || null
    let shortUrl
    if(req.user){
        shortUrl = await createShortUrlWithUser(url,req.user._id,requestedSlug)
    }else{  
        shortUrl = await createShortUrlWithoutUser(url)
    }
    const baseUrl = (process.env.APP_URL || `${req.protocol}://${req.get("host")}/`).replace(/\/?$/, "/")
    res.status(201).json({shortUrl : baseUrl + shortUrl, message: "Short URL generated successfully"})
})


export const redirectFromShortUrl = wrapAsync(async (req,res)=>{
    const {id} = req.params
    const url = await getShortUrl(id)
    if(!url) throw new Error("Short URL not found")
    res.redirect(url.full_url)
})

export const createCustomShortUrl = wrapAsync(async (req,res)=>{
    const {url,slug} = req.body
    const shortUrl = await createShortUrlWithoutUser(url,customUrl)
    res.status(200).json({shortUrl : process.env.APP_URL + shortUrl})
})
