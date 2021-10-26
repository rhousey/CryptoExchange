import { useEffect } from "react";
import React from "react";
const EthViewWidget = () => {
    const style = localStorage.getItem('theme');
    const tvkTheme = style && style == 'dark-mode' ? 'dark' : 'light';
    useEffect(() => {
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/tv.js';
      script.async = true;
      script.type = 'text/javascript';
      script.onload = () => {
        new window.TradingView.MediumWidget({
          symbols: [
            ['BITSTAMP', 'ETHUSD']
          ],
          chartOnly: false,
          width: '600',
          height: '400' ,
          locale: 'en',
          colorTheme: tvkTheme == 'dark' ? 'dark' : 'dark',
          gridLineColor: '#2A2E39',
          "enable_publishing":true, 
          trendLineColor: '#1976D2',
          fontColor: '#787B86',
          symbol: "ETHUSD", 
          underLineColor: 'rgba(55, 166, 239, 0.15)',
          isTransparent: false,
          autosize: true,
          container_id: 'tradingview_5039e',
        });
      };
  
      document.getElementsByTagName('head')[0].appendChild(script);
      return () => {
        document.getElementsByTagName('head')[0].appendChild(script);
      };
    }, []);
    return (
      <div className='tradingview-widget-container'>
        <div id='tradingview_5039e'></div>
        <div className='tradingview-widget-copyright'>
          <a href='https://www.tradingview.com/' rel='noopener' target='_blank'>
            <span className='blue-text'>Bees Social</span>
          </a>{' '}
          by TradingView
        </div>
      </div>
    );
  };
  export default EthViewWidget;