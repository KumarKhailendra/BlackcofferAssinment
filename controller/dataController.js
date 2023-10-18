const asyncHandler = require("express-async-handler");
const CompanyData = require("../model/dataModel");
const moment = require('moment/moment')


const getAllData = asyncHandler(async (req, res) => {
    const { added, sector, end_year, topic, region, start_year, published, country, pestle, source } = req.query;
    let arr = []
    if(added){
        const a = {added:      { $regex: added,      $options: "i" } }
        arr.push(a)
    }

    if(sector){
        const a = {sector:      { $regex: sector,      $options: "i" } }
        arr.push(a)
    }
    
    if(topic){
        const a = {topic:      { $regex: topic,      $options: "i" } }
        arr.push(a)
    }

    if(region){
        const a = {region:     { $regex: region,     $options: "i" } }
        arr.push(a)
    }

    if(published){
        const a = {published:  { $regex: published,  $options: "i" } }
        arr.push(a)
    }
    if(country){
        const a = {country:    { $regex: country,    $options: "i" } }
        arr.push(a)
    }
    if(pestle){
        const a = {pestle:     { $regex: pestle,     $options: "i" } }
        arr.push(a)
    }
    if(source){
        const a = {source:     { $regex: source,     $options: "i" } }
        arr.push(a)
    }

    const keyword =arr.length>0?{
        $and:[
          ...arr
        ] 
    }:{}

    let CompanyDatas = await CompanyData.find(keyword)
    let Data = await CompanyData.find()



    if(start_year){
        CompanyDatas = CompanyDatas.filter((d)=>  d.start_year === start_year)
    }

    if(end_year){
        CompanyDatas = CompanyDatas.filter((d)=> d.end_year === end_year)
    }

    res.send({
        length: CompanyDatas.length,
        Added: datefield(Data, "added"),
        Sector: unicfield(Data, "sector"),
        End_year: unicfield(Data, "end_year"),
        Topic: unicfield(Data, "topic"),
        Region: unicfield(Data, "region"),
        Start_year: unicfield(Data, "start_year"),
        Published: datefield(Data, "published"),
        Country: unicfield(Data, "country"),
        Source: unicfield(Data, "source"),
        totalLikelihood: fieldTotal(CompanyDatas, "likelihood"),
        totalIntensity: fieldTotal(CompanyDatas, "intensity"),
        totalRelevance: fieldTotal(CompanyDatas, "relevance"),
        totalcCountry: unicfield(CompanyDatas, "country").length,
        totalcRegion: unicfield(CompanyDatas, "region").length,
        totalcTopic: unicfield(CompanyDatas, "topic").length,
        IntensitySector: fieldAnalysis(CompanyDatas, "intensity", "sector"),
        likelihoodSector: fieldAnalysis(CompanyDatas, "likelihood", "sector"),
        topicRepited: repitedField(CompanyDatas, "topic"),
        countryContribute: contribution(CompanyDatas, "country"),
        regionContribute: contribution(CompanyDatas, "region")
    });
});

const contribution = (data, pv) =>{
    let arr = repitedField(data, pv)
    let total = 0;
    arr.map((d)=> {total = total + d.value});
    arr.map((d)=>{
        d["percentage"] = d.value*100/total
    })
    return arr
}

const repitedField = (data, pv)=>{
    let ud = unicfield(data, pv)
    let arr = []
    ud.map((d)=> {
        arr.push({name: d, value: data.filter((di)=> di[pv] === d).length})
    })

    arr.push({name: "unknow", value: data.filter((di)=> di[pv] === "").length})
    arr.sort((a, b) => b.value - a.value)
    return arr.slice(0, 5)
}

const unicfield = (data, pv) => {
  let arr = []
  data.map((d)=>{
    const arrHasValue= arr.some((i) => {
      return d[pv] === i})
    if(arrHasValue){
      arr = [...arr]
    }else{
      d[pv]? arr = [...arr, d[pv]]: arr = [...arr]
    }
  })
  arr = arr.sort((a, b) => a - b)
  return arr;
}
const datefield = (data, pv) => {
    let arr = []
    data.map((d)=>{
        let year = moment(d[pv], "MMMM, DD YYYY HH:mm:ss").format('YYYY')
        const arrHasValue= arr.some((i) => {
        return year === i})
        if(arrHasValue){
        arr = [...arr]
        }else{
        d[pv]? arr = [...arr, year]: arr = [...arr]
        }
    })
  arr = arr.sort()
  return arr;
}

const fieldTotal = (data, pv) => {
    let arr = [];
    let sum = 0;
    data.map((d)=>d[pv]!==""? arr.push(d[pv]): arr)
    arr.map((d)=>{
        sum = sum + d
    })
    
    return sum;
}

const fieldAnalysis = (data, xValue, yValue) => {
    let arr = unicfield(data, yValue);
    let arrVal = []
    arr.map((d)=>{
        let sum = 0;
        let arrData = data.filter((di)=>di[yValue] === d)
        arrData.map((d)=>{
            sum = sum + d[xValue]
        })
        arrVal.push({name: d, value: sum})
    })
    let sum = 0;
    let unknow = data.filter((di)=>di[yValue] === "")
    unknow.map((d)=>{
        sum = sum + d[xValue]
    })
    arrVal.push({name: "unknow", value: sum})
    arrVal.sort((a, b) => b.value - a.value)

    return arrVal.slice(0, 5)
}

  module.exports = { getAllData};