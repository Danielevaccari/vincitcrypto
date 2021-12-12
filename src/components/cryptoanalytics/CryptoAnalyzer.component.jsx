import React, { useState } from 'react';
import FeatureSelector from './analyzerComps/FeatureSelector.component';
import CoinMarketDataService from '../../services/coingecko/CoinMarketData.service';
import ResultSelector from './analyzerComps/ResultSelector.component';
import DaterangeSelector from './analyzerComps/DaterangeSelector.component';
import CryptoHeader from './analyzerComps/CryptoHeader.component';

const Analyzer = function CryptoAnalyzer() {
  // Application state
  const [marketData, setmarketData] = useState({ prices: [], total_volumes: [] });
  const [startdate, setstartdate] = useState();
  const [enddate, setenddate] = useState();
  // const [dataGranularity, setdataGranularity] = useState('1hourgranularity');
  const [analyticFeature, setanalyticFeature] = useState('downward');

  const handleMarketDataFetching = async () => {
    setmarketData(await CoinMarketDataService.getCoinMarketDataByDaterange(startdate, enddate));
  };

  // useEffect(() => {
  //   console.log(AnalyticsUtility.determineDataGranularity(startdate, enddate));
  //   setdataGranularity(AnalyticsUtility.determineDataGranularity(startdate, enddate));
  // }, [startdate, enddate]);

  return (
    <div className="cryptoAnalyticsWrapper">
      <CryptoHeader />
      <div className="cryptoAnalyticsContainer">
        <div className="cryptoAnalyticsContainerTop">
          <FeatureSelector
            analyticFeature={analyticFeature}
            setanalyticFeature={setanalyticFeature}
          />
        </div>
        <div className="cryptoAnalyticsContainerMiddle">
          <DaterangeSelector
            startdate={startdate}
            enddate={enddate}
            setenddate={setenddate}
            setstartdate={setstartdate}
          />
        </div>
        <div className="cryptoAnalyticsContainerBottom">
          <ResultSelector
            analyticFeature={analyticFeature}
            handleMarketDataFetching={handleMarketDataFetching}
            pricesData={marketData.prices}
            volumeData={marketData.total_volumes}
            // dataGranularity={dataGranularity}
            marketData={marketData}
          />
        </div>
      </div>
    </div>
  );
};

export default Analyzer;