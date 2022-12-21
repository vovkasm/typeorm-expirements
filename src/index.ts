import { Raw } from "typeorm"
import { AppDataSource } from "./data-source"
import { Stocks, Prices } from "./entity"

AppDataSource.initialize().then(async () => {


  console.log("Inserting a new user into the database...")
  const stock = new Stocks()
  stock.ticker = 'ticker1'
  stock.name = "Bob"
  const price1 = new Prices();
  price1.price = 0.5;
  await AppDataSource.manager.save(price1)
  const price2 = new Prices();
  price2.price = 0.7;
  await AppDataSource.manager.save(price2)
  stock.prices = Promise.resolve([price1, price2]);
  await AppDataSource.manager.save(stock)
  console.log("Saved a new stock id: " + stock.id)

  const ticker = 'ticker1';
  // const ticker = 'ticker1\'';

  console.log("### Correct safe query")
  const builder = AppDataSource.manager.getRepository(Stocks).createQueryBuilder("stocks").where('stocks.ticker like :ticker', {ticker});
  console.log('SQL: ', builder.getSql());
  const first = await builder.getOne();
  console.log('stock: ', first);
  if (first) {
    console.log('prices: ', await first.prices);
  }

  console.log("### Unsafe query")
  const first2 = await AppDataSource.manager.getRepository(Stocks).findOne({
    where: {
      ticker: Raw(alias => `${alias} LIKE '${ticker}'`),
    },
  });
  console.log('stock2: ', first2);
  if (first) {
    console.log('prices2: ', await first2.prices);
  }
  
}).catch(error => console.log(error))
