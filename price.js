const axios = require("axios");
const cheerio = require("cheerio");
const { append } = require("domutils");
const express = require("express");

async function getPriceFeed(){

  try{
    const siteUrl = "http://coinmarketcap.com/";

    const {data} = await axios({
      method : 'GET',
      url:siteUrl,
    })
    const $ = cheerio.load(data)
    const elemSelector = '#__next > div > div.main-content > div.sc-57oli2-0.comDeo.cmc-body-wrapper > div > div > div.h7vnx2-1.bFzXgL > table > tbody > tr'
    
    const keys = [
      'rank',
      "name",
      "price",
      "24h",
      "7d",
      "marketCap",
      "volume",
      "circulatingSupply"
    ]

    const coinArr =[];
    
    $(elemSelector).each((parentIdx,parentElem)=>{
      //console.log(parentElem)
      let keyIdex = 0

      const coinObj = {}


      if(parentIdx<=9){
        $(parentElem).children().each((childIdx,childElem)=>{
          let tdValue = $(childElem).text()

          if(keyIdex === 1 || keyIdex===6){
            let tdValue = $('p:first-child',$(childElem).html()).text()
            
            
          }
          if(tdValue){
            //console.log(keyIdex)
            coinObj[keys[keyIdex]] = tdValue
            keyIdex++
          }
        })
        //console.log(coinObj)
        coinArr.push(coinObj)
      }

    })
    //console.log(coinArr)
    return coinArr

  } catch(err){
    console.error(err)
  }
}

//getPriceFeed();


const app = express();

app.get("/api/price-feed",async(req,res)=>{
  try{
    const priceFeed = await getPriceFeed()

    return res.status(200).json({
      result: priceFeed
    })
  } catch(err){
    return res.status(500).json({
      err: err.toString(),
    })
  }
 
})

app.listen(3000,function(req,res){
  console.log("app")
})
