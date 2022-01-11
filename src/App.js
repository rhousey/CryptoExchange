import "./App.css";
import axios from "axios";
import binancesvg from "./Binance-Logo.wine.svg";
import BtcViewWidget from "./BtcViewWidget";
import EthViewWidget from "./EthViewWidget";
import coinbaselogo from "./coinbase.svg";
import { Row, Col } from "react-bootstrap";
import bitcoinLogo from "./bitcoinlogo.svg.png";
import etherLogo from "./ethereum-logo-portrait-black.png";
import ImageClick from "./ImageClick.js";
import React, { Component, useState, useEffect, useRef } from "react";
import ButtonGroup from "./Radio";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
const imageArray = [
  { image: "bitcoinlogo", width: 200, height: 200, name: "Bitcoin" },
  {
    image: "Ethereum_logo_2014.svg",
    name: "Ethereum",
    width: 150,
    height: 200,
  },
];

// Function to format the price
function currencyFormat(num) {
  return (
    "$" +
    Number(parseFloat(num).toFixed(2)).toLocaleString("en", {
      minimumFractionDigits: 2,
    })
  );
}
class App extends Component {
  /*function to get buy recommendation - get the lower price */
  getBuyRec(binanceP, coinbaseP) {
    if (binanceP < coinbaseP) {
      this.setState({
        binancePriceColor: "green",
        coinbasePriceColor: "red",
      });
    } else if (binanceP > coinbaseP) {
      this.setState({
        binancePriceColor: "red",
        coinbasePriceColor: "green",
      });
    }
  }
  /*function to get sell recommendation - get the higher price */
  getSellRec(binanceP, coinbaseP) {
    if (binanceP > coinbaseP) {
      this.setState({
        binancePriceColor: "green",
        coinbasePriceColor: "red",
      });
    } else if (binanceP < coinbaseP) {
      this.setState({
        binancePriceColor: "red",
        coinbasePriceColor: "green",
      });
    }
  }

  /* Function to handle the "view recommendations - 
  Fetch buy OR sell prices from binance and coinbase for selected exchange */
  async toggleButtonState(event) {
    event.preventDefault();
    if (this.state.type == "Buy" && this.state.unit == "BTC") {
      await axios
        .all([
          await axios
            .get(
              "https://api.binance.com/api/v3/ticker/bookTicker?symbol=BTCUSDT"
            )
            .then((response) => {
              console.log(response["data"]);
              return response["data"];
            })
            .then((data) => {
              console.log("binance data " + data);
              this.setState({
                binancePrice: currencyFormat(data["bidPrice"]),
              });
            }),
          await axios
            .get("https://api.coinbase.com/v2/prices/BTC-USD/buy")
            .then((response) => {
              return response["data"]["data"]["amount"];
            })
            .then((price) => {
              this.setState({
                coinbasePrice: currencyFormat(price),
              });
            }),
        ])
        .then(
          this.getBuyRec(this.state.binancePrice, this.state.coinbasePrice)
        );
    } else if (this.state.type == "Sell" && this.state.unit == "BTC") {
      await axios
        .all([
          await axios
            .get(
              "https://api.binance.com/api/v3/ticker/bookTicker?symbol=BTCUSDT"
            )
            .then((response) => {
              console.log(response["data"]);
              return response["data"];
            })
            .then((data) => {
              console.log("binance data " + data);
              this.setState({
                binancePrice: currencyFormat(data["askPrice"]),
              });
            }),
          await axios
            .get("https://api.coinbase.com/v2/prices/BTC-USD/sell")
            .then((response) => {
              return response["data"]["data"]["amount"];
            })
            .then((price) => {
              this.setState({
                coinbasePrice: currencyFormat(price),
              });
            }),
        ])
        .then(
          this.getSellRec(this.state.binancePrice, this.state.coinbasePrice)
        );
    } else if (this.state.type == "Buy" && this.state.unit == "ETH") {
      await axios.all([
        axios
          .get(
            "https://api.binance.com/api/v3/ticker/bookTicker?symbol=ETHUSDT"
          )
          .then((response) => {
            console.log(response["data"]);
            return response["data"];
          })
          .then((data) => {
            console.log("binance data " + data);
            this.setState({
              binancePrice: currencyFormat(data["bidPrice"]),
            });
          }),
        axios
          .get("https://api.coinbase.com/v2/prices/ETH-USD/buy")
          .then((response) => {
            return response["data"]["data"]["amount"];
          })
          .then((price) => {
            this.setState({
              coinbasePrice: currencyFormat(price),
            });
          }),
      ]);
      this.getBuyRec(this.state.binancePrice, this.state.coinbasePrice);
    } else if (this.state.type == "Sell" && this.state.unit == "ETH") {
      await axios.all([
        axios
          .get(
            "https://api.binance.com/api/v3/ticker/bookTicker?symbol=ETHUSDT"
          )
          .then((response) => {
            console.log(response["data"]);
            return response["data"];
          })
          .then((data) => {
            console.log("binance data " + data);
            this.setState({
              binancePrice: currencyFormat(data["askPrice"]),
            });
          }),
        await axios
          .get("https://api.coinbase.com/v2/prices/ETH-USD/sell")
          .then((response) => {
            return response["data"]["data"]["amount"];
          })
          .then((price) => {
            this.setState({
              coinbasePrice: currencyFormat(price),
            });
          }),
      ]);
      this.getSellRec(this.state.binancePrice, this.state.coinbasePrice);
    }
  }

  // function to set state of selected currency (bitcoin / ethereum)
  handleCurrencyClick(event) {
    console.log(event.target.src);
    this.setState({
      binancePrice: null,
      coinbasePrice: null,
      coinbasePriceColor: "transparent",
      binancePriceColor: "transparent",
    });
    if (event.target.src.includes("bitcoinlogo")) {
      console.log("bitcoin");
      this.setState({
        unit: "BTC",
        currencyName: "Bitcoin",
        viewWidget: <BtcViewWidget />,
      });
    } else {
      console.log("eth");
      this.setState({
        unit: "ETH",
        currencyName: "Ethereum",
        viewWidget: <EthViewWidget />,
      });
    }
  }

  handleAmountChange = (e) => {
    console.log({ e });
  };
  // function to handle buy/sell button click
  BuySellButton(event) {
    this.setState({
      type: event.target.name,
    });
    this.setState({
      binancePrice: null,
      coinbasePrice: null,
      binancePriceColor: "transparent",
      coinbasePriceColor: "transparent",
    });
    console.log(event.target.name);
  }
  // constructor
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      sell: null,
      buy: null,
      type: null,
      unit: "Currency",
      amount: 0,
      binancePrice: null,
      coinbasePrice: null,
      binancePriceColor: "transparent",
      coinbasePriceColor: "transparent",
      yahooFinData: "",
      viewWidget: null,
      currencyName: "",
    };
    this.toggleButtonState = this.toggleButtonState.bind(this);
  }

  render() {
    return (
      <div id="container" className="container md">
        <div id="formsection">
          <Row>
            <Col>
              <ImageClick
                images={imageArray}
                doSomethingAfterClick={(e) => this.handleCurrencyClick(e)}
              />
              <Row>
                <Col>
                  <ButtonGroup
                    buttons={["Sell", "Buy"]}
                    doSomethingAfterClick={(e) => this.BuySellButton(e)}
                  />
                </Col>
              </Row>
            </Col>
          </Row>

          <Row>
            <div>{this.state.viewWidget}</div>
          </Row>
          <Row>
            <div id="submitContainer">
              <button className="submitButton" onClick={this.toggleButtonState}>
                {" "}
                View Recommendations{" "}
              </button>

              <ul> </ul>
              <div
                id="binancepricediv"
                style={{ backgroundColor: this.state.binancePriceColor }}
              >
                <div id="binPrice">{this.state.binancePrice}</div>
              </div>
              <div
                id="coinbasepricediv"
                style={{ backgroundColor: this.state.coinbasePriceColor }}
              >
                <div id="coinbasePrice"> {this.state.coinbasePrice}</div>
              </div>
            </div>
          </Row>
          <div id="banner">
            <div id="exchangeView">
              <img id="binancesvg" src={binancesvg} width="250" />
              <img id="coinsvg" src={coinbaselogo} width="250" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
