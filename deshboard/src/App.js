
import React, { useState } from 'react'
import './App.css';
import Card from './component/Card';
import SelectFild from './component/SelectFild';
import { Barplot } from './component/Barploat';
import { PieChart } from './component/PieChart';
import { useSnackbar } from 'notistack';

function App() {

  const [filterState,setFilterState] = useState({
    isLoading:false,
    error:null,
    data:null
  })


  // selected filter value
  const [addYearfilter, setAddYearfilter] = React.useState("");
  const [sectorfilter, setSectorfilter] = React.useState("");
  const [endYearFilter, setEndYearFilter] = React.useState("");
  const [topicFilter, setTopicFilter] = React.useState("");
  const [regionFilter, setRegionFilter] = React.useState("");
  const [startYearFilter, setStartYearFilter] = React.useState("");
  const [countryFilter, setCountryFilter] = React.useState("");
  const [publishedYearFilter, setPublishedYearFilter] = React.useState("");
  const [pestleFilter, setPestleFilter] = React.useState("");
  const [sourceFilter, setSourceFilter] = React.useState("");
  // data for filter value
  const [addedData, setAddedData] = React.useState([]);
  const [sectorData, setSectorData] = React.useState([]);
  const [endYearData, setEndYearData] = React.useState([]);
  const [topicData, setTopicData] = React.useState([]);
  const [regionData, setregionData] = React.useState([]);
  const [start_yearData, setStart_yearData] = React.useState([]);
  const [publishedData, setPublishedData] = React.useState([]);
  const [countryData, setCountryData] = React.useState([]);
  const [pestleData, setPestleData] = React.useState([]);
  const [sourceData, setSourceData] = React.useState([]);
  // numeric vizual data
  const [totalLikelihood, setTotalLikelihood] = React.useState(0);
  const [totalIntensity, setTotalIntensity] = React.useState(0);
  const [totalRelevance, setTotalRelevance] = React.useState(0);
  const [totalCountry, setTotalCountry] = React.useState(0);
  const [totalRegion, setTotalRegion] = React.useState(0);
  const [totalTopic, setTotalTopic] = React.useState(0);
  // chart and graph data
  const [intensitySector, setIntensitySector] = React.useState([]);
  const [likelihoodSector, setLikelihoodSector] = React.useState([]);
  const [topicRepited, setTopicRepited] = React.useState([]);
  const [countryContribute, setCountryContribute] = React.useState([]);
  const [regionContribute, setRegionContribute] = React.useState([]);

  const { enqueueSnackbar } = useSnackbar()




  React.useEffect(() => {

    const filterhandler =  async () => {

      setFilterState({
      isLoading:true,
      error:null,
      data:null  
      })

      enqueueSnackbar('Filter is starting...', {
      })


      try {
        let data = await fetch(`https://blackcoffer-8exc.onrender.com/api/?added=${addYearfilter}&sector=${sectorfilter}&end_year=${endYearFilter}&topic=${topicFilter}&region=${regionFilter}&start_year=${startYearFilter}&published=${publishedYearFilter}&country=${countryFilter}&pestle=${pestleFilter}&source=${sourceFilter}`).then((res)=>res.json())
        // filter field data
        setAddedData(data.Added)
        setSectorData(data.Sector)
        setEndYearData(data.End_year)
        setTopicData(data.Topic)
        setregionData(data.Region)
        setStart_yearData(data.Start_year)
        setPublishedData(data.Published)
        setCountryData(data.Country)
        setPestleData(data.Pestle)
        setSourceData(data.Source)
        // visualized data
        setTotalLikelihood(data.totalLikelihood)
        setTotalIntensity(data.totalIntensity)
        setTotalRelevance(data.totalRelevance)
        setTotalCountry(data.totalCountry)
        setTotalRegion(data.totalRegion)
        setTotalTopic(data.totalTopic)
        // chart and graph data
        setIntensitySector(data.IntensitySector)
        setLikelihoodSector(data.likelihoodSector)
        setTopicRepited(data.topicRepited)
        setCountryContribute(data.countryContribute)
        setRegionContribute(data.regionContribute)
        console.log(data.length);
        console.log(`https://blackcoffer-8exc.onrender.com/api/?added=${addYearfilter}&sector=${sectorfilter}&end_year=${endYearFilter}&topic=${topicFilter}&region=${regionFilter}&start_year=${startYearFilter}&published=${publishedYearFilter}&country=${countryFilter}&pestle=${pestleFilter}&source=${sourceFilter}`);
    



        setFilterState(prevState=>({
          ...prevState,
          isLoading:false,
          data,
        }))

        enqueueSnackbar('Filter is done.', {
        })
    
      } catch (error) {

        
        setFilterState(prevState=>({
          ...prevState,
          isLoading:false,
          error  

        }))

        enqueueSnackbar('Error', {
        })

      }
    };

    filterhandler()
  }, [addYearfilter, sectorfilter, endYearFilter, topicFilter, regionFilter, startYearFilter, publishedYearFilter, countryFilter, pestleFilter, sourceFilter]);

  console.log("addYearfilter...",filterState);

  return (
    <>
          <div className="App">
      <header className="App-header">
        <h1>Blackcoffer</h1>
        <div className='filter'>
          <SelectFild value={addYearfilter} setValue={setAddYearfilter} data={addedData} title={"Added Year filter"} />
          <SelectFild value={sectorfilter} setValue={setSectorfilter} data={sectorData} title={"Sector Filter"}/>
          <SelectFild value={endYearFilter} setValue={setEndYearFilter} data={endYearData} title={"End Year Filter"} />
          <SelectFild value={topicFilter} setValue={setTopicFilter} data={topicData} title={"Topic Filter"} />
          <SelectFild value={regionFilter} setValue={setRegionFilter} data={regionData} title={"Region Filter"} />
          <SelectFild value={startYearFilter} setValue={setStartYearFilter} data={start_yearData} title={"Start Year Filter"} />
          <SelectFild value={publishedYearFilter} setValue={setPublishedYearFilter} data={publishedData} title={"Published Year Filter"} />
          <SelectFild value={countryFilter} setValue={setCountryFilter} data={countryData} title={"Country Filter"} />
          <SelectFild value={pestleFilter} setValue={setPestleFilter} data={pestleData} title={"Pestle Filter"} />
          <SelectFild value={sourceFilter} setValue={setSourceFilter} data={sourceData} title={"Source Filter"} />
        </div>
        <div className='filter'>
          <Card value={totalLikelihood} text={"Total Likelihood"} />
          <Card value={totalIntensity} text={"Total Intensity"} />
          <Card value={totalRelevance} text={"Total Relevance"} />
          <Card value={totalCountry} text={"Total Country"} />
          <Card value={totalRegion} text={"Total Region"} />
          <Card value={totalTopic} text={"Total Topic"} />
        </div>
        <div className='filter'>
        <Barplot width={300} height={250} data={intensitySector} text={"Top 5 Intensity Sector"} />
        <Barplot width={300} height={250} data={likelihoodSector} text={"Top 5 Likelihood Sector"}/>
        <Barplot width={300} height={250} data={topicRepited} text={"Top 5 Repeated Topic"} />
        <Barplot width={300} height={250} data={countryContribute} text={"Top 5 Country Contribution"}  />
        <PieChart width={700} height={400} data={regionContribute} text={"Top 5 Region Contribution"}/>
        
        </div>
      </header>

    </div>
    </>

  );
}

export default App;
