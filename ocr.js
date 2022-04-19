const tesseract = require("tesseract.js");
//const img = "https://5.imimg.com/data5/TP/US/MU/SELLER-51778781/pan-card-500x500.jpg"
const img="https://i.pinimg.com/originals/a1/e3/12/a1e3125efaa4eebd8efc907ae48b69a1.jpg"

tesseract
  .recognize(img,'eng')
  .then((data) => {
    //console.log("Result:", text)
    //pancard
    // const result = data.data.text.split("\n");
    // for(let i=0;i<result.length;i++){
    //     console.log(i+":",result[i])
    // }

    //aadharcard
    const sresult = data.data.text.split("\n");
    // let result = sresult.filter(item=>!isNaN(parseInt(item)))
    // result = result.toString().replace(/\D/g,"");
    console.log(sresult)

  })
  .catch((error) => {
    console.log(error.message)
  })
