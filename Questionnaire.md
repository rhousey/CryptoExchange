1. Are there any sub-optimal choices( or short cuts taken due to limited time ) in your implementation?
   My function that conditionally checks the states in order to make the HTTP get requests for the prices.
2. Is any part of it over-designed? ( It is fine to over-design to showcase your skills as long as you are clear about it)

The design is not optimal, but I wouldn’t think of it as over-designed.

3. If you have to scale your solution to 100 users/second traffic what changes would you make, if any?
   I would make changes to the function that makes the HTTP get request to the Binance and Coinbase API.

4. What are some other enhancements you would have made, if you had more time to do this implementation
   I would have included fees and used the order book from both exchanges to manually calculate the buy and sell prices based the amount of ETH or BTC user inputs. I also wanted to display the average price of the currency on both exchanges each hour from the last 7 days. Or, the average price from the past hour from both exchanges in a custom chart. A WebSocket connection to Binance API and the Coinbase API would be required for these features. I would also want to include other exchanges such as Kraken, Huobi, KuCoin, FTX, etc.
