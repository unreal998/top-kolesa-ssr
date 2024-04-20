import db from '../database';
import { OrderDataResponceDto, OrderItemDto, TireSizesDataResponceDto, TireSizesDto, ShopDataRequestDto } from '@/shared/types';

export async function getOrderData(orderId: string) {
  return new Promise((resolve, reject) =>
    db.getConnection((err, connection) => {
      connection.query(
        'SELECT * FROM `mod_orders` WHERE `id` = ' +
          orderId +
          ' ORDER BY `id`  DESC ',
        (err, result) => {
          if (err) {
            connection.release();
            reject(err);
          }
          connection.release();
          resolve(result);
        },
      );
    }),
  );
}

export async function getOrderContentData(orderId: string) {
  return new Promise((resolve, reject) =>
    db.getConnection((err, connection) => {
      connection.query(
        'SELECT * FROM `mod_orders_content` WHERE `order_id` = ' +
          orderId +
          ' ORDER BY `id`  DESC ',
        (err, result) => {
          if (err) {
            connection.release();
            reject(err);
          }
          connection.release();
          resolve(result);
        },
      );
    }),
  );
}

export async function getFilterData() {
  return new Promise((resolve, reject) =>
    db.getConnection((err, connection) => {
      connection.execute(
        `SELECT DISTINCT width FROM ${`mod_tires_sizes`}`,
        function (err: string, result: TireSizesDataResponceDto[]) {
          if (err) {
            console.log('=====err===', err);
          }
          const widthArray: string[] = [];

          result.forEach((item) => {
            widthArray.push(item.width);
          });

          const responseData: {
            tireSizes: TireSizesDto;
          } = {
            tireSizes: {
              width: [],
              diametr: [],
              height: [],
              speed: [],
              weight: [],
              brands: [],
              prices: [],
            },
          };
          responseData.tireSizes.width = widthArray;
          connection.execute(
            `SELECT DISTINCT diametr FROM ${`mod_tires_sizes`} ORDER BY diametr`,
            function (err: string, result: TireSizesDataResponceDto[]) {
              if (err) {
                connection.release();
                reject(err);
              }
              const diametrArray: string[] = [];

              result.forEach((item) => {
                diametrArray.push(item.diametr);
              });
              responseData.tireSizes.diametr = diametrArray;
              connection.execute(
                `SELECT DISTINCT height FROM ${`mod_tires_sizes`} ORDER BY height`,
                function (err: string, result: TireSizesDataResponceDto[]) {
                  if (err) {
                    connection.release();
                    reject(err);
                  }
                  const heightArray: string[] = [];

                  result.forEach((item) => {
                    heightArray.push(item.height);
                  });
                  responseData.tireSizes.height = heightArray;
                  connection.execute(
                    `SELECT DISTINCT speed FROM ${`mod_tires_sizes`} ORDER BY speed`,
                    function (err: string, result: TireSizesDataResponceDto[]) {
                      if (err) {
                        connection.release();
                        reject(err);
                      }
                      const speedArray: string[] = [];
                      result.forEach((item) => {
                        speedArray.push(item.speed);
                      });
                      responseData.tireSizes.speed = speedArray;
                      connection.execute(
                        `SELECT DISTINCT weight FROM ${`mod_tires_sizes`} ORDER BY weight`,
                        function (
                          err: string,
                          result: TireSizesDataResponceDto[],
                        ) {
                          if (err) {
                            connection.release();
                            reject(err);
                          }
                          const weightArray: string[] = [];
                          result.forEach((item) => {
                            weightArray.push(item.weight);
                          });
                          responseData.tireSizes.weight = weightArray;
                          connection.execute(
                            `SELECT DISTINCT brand FROM ${`mod_tires_prices`} ORDER BY brand`,
                            function (
                              err: string,
                              result: TireSizesDataResponceDto[],
                            ) {
                              if (err) {
                                connection.release();
                                reject(err);
                              }
                              const brandsArray: string[] = [];
                              result.forEach((item) => {
                                brandsArray.push(item.brand);
                              });
                              responseData.tireSizes.brands = brandsArray;
                              connection.execute(
                                `SELECT DISTINCT price_uah FROM ${`mod_tires_prices`} ORDER BY price_uah`,
                                function (
                                  err: string,
                                  result: TireSizesDataResponceDto[],
                                ) {
                                  if (err) {
                                    connection.release();
                                    reject(err);
                                  }
                                  const pricesArray: number[] = [];
                                  result.forEach((item) => {
                                    pricesArray.push(+item.price_uah);
                                  });
                                  responseData.tireSizes.prices = pricesArray;
                                  connection.release();
                                  resolve(responseData.tireSizes);
                                },
                              );
                            },
                          );
                        },
                      );
                    },
                  );
                },
              );
            },
          );
        },
      );
    }),
  );
}

export async function getShopData(queryParam: ShopDataRequestDto) {
  return new Promise((resolve, reject) => {
    const response = {
      tiresList: {},
    };
    let tiresQuery = '';
    tiresQuery = `SELECT *
            FROM ${`mod_tires`}, ${`mod_tires_prices`}
            WHERE mod_tires.id = mod_tires_prices.tire_id`;
    if (queryParam.price) {
      const minPrice = queryParam.price.split('-')[0];
      const maxPrice = queryParam.price.split('-')[1];
      tiresQuery += ` AND mod_tires_prices.price_uah >= ${minPrice} AND mod_tires_prices.price_uah <= ${maxPrice}`;
    }
    if (queryParam.diametr && queryParam.diametr !== '""') {
      tiresQuery += ` AND mod_tires_prices.diametr = '${JSON.parse(queryParam.diametr)}'`;
    }
    if (queryParam.profile && queryParam.profile !== '""') {
      tiresQuery += ` AND mod_tires_prices.height = ${JSON.parse(queryParam.profile)}`;
    }
    if (queryParam.width && queryParam.width !== '""') {
      tiresQuery += ` AND mod_tires_prices.width = ${JSON.parse(queryParam.width)}`;
    }
    if (queryParam.season && JSON.parse(queryParam.season).length) {
      let seasonString = '';
      const seasons: string[] = JSON.parse(queryParam.season);
      seasons.forEach((item, index) => {
        if (index === seasons.length - 1) {
          seasonString += `'${item}'`;
        } else {
          seasonString += `'${item}', `;
        }
      });
      if (seasonString !== "''") {
        tiresQuery += ` AND mod_tires.season IN (${seasonString})`;
      }
    }
    if (queryParam.brand && JSON.parse(queryParam.brand).length) {
      let brandString = '';
      const brands: string[] = JSON.parse(queryParam.brand);
      brands.forEach((item, index) => {
        if (index === brands.length - 1) {
          brandString += `'${item}'`;
        } else {
          brandString += `'${item}', `;
        }
      });
      if (brandString !== "''") {
        tiresQuery += ` AND mod_tires_prices.brand IN (${brandString})`;
      }
    }
    if (queryParam.studded) {
      if (queryParam.studded === 'studded') {
        tiresQuery += ` AND mod_tires_prices.param IN ('шип', 'XL,шип')`;
      } else if (queryParam.studded === 'studless') {
        tiresQuery += ` AND mod_tires_prices.param NOT IN ('шип', 'XL,шип')`;
      }
    }
    if (queryParam.vechileType) {
      let vechileType = '';
      switch (queryParam.vechileType) {
        case 'light':
          vechileType = " AND diametr NOT LIKE '%C' AND diametr NOT LIKE '%.%'";
          break;
        case 'lightTruck':
          vechileType = " AND diametr LIKE '%C'";
          break;
        case 'cargo':
          vechileType = " AND diametr LIKE '%.%'";
          break;
        default:
          throw new Error('unknown vechile type param');
      }
      tiresQuery += vechileType;
    }
    tiresQuery += ` AND ${`price_type`} = 1`;
    db.getConnection((err, connection) => {
      connection.query(tiresQuery, function (err, result) {
        if (err) {
          connection.release();
          reject(err);
        }
        response.tiresList = result;
        connection.release();
        resolve(JSON.stringify(response));
      });
    });
  });
}

export async function getItemData(id: string) {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      connection.execute(
        `SELECT *
            FROM mod_tires_prices
            WHERE id = ${id}`,
        function (err, result) {
          if (err) {
            connection.release();
            reject(err);
          }
          console.log(JSON.stringify(result), id)
          connection.release();
          resolve(JSON.stringify(result));
        },
      );
    });
  });
}

export async function createOrder(orderData: OrderItemDto[]) {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      connection.query(
        'SELECT id FROM `mod_orders_content`',
        function (err: string, result: OrderDataResponceDto[]) {
          if (err) throw err;
          let id = result[result.length - 1].id;
          connection.query(
            'SELECT id FROM `mod_orders`',
            function (err: string, result: OrderDataResponceDto[]) {
              if (err) throw err;
              const orderId = result[result.length - 1].id + 1;
              addNewOrder(orderData, id, orderId)
                .then(() => {
                  connection.release();
                  resolve(orderId);
                })
                .catch((err) => {
                  connection.release();
                  reject(err);
                });
            },
          );
        },
      );
    });
  });
}

async function addNewOrder(
  orderItems: OrderItemDto[],
  id: number,
  orderId: number,
) {
  const item = orderItems[0]; // first we create an order with single id
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      connection.query(
        `INSERT INTO mod_orders VALUES(` +
          `${orderId}, ${item.userId}, ${item.statusId}, ${item.customerId},` +
          `${item.cityId}, ${item.paymentStatusId}, ${item.shipCompId}, ${item.paymentId},` +
          `${item.paymentCost}, ${item.paymentCostType}, ${item.shipmentId}, ${item.shipmentCost},` +
          `${item.shipmentCostType}, ${item.driverId}, ${item.driverCost}, ${item.driverCostType},` +
          `${item.otherCost}, '${item.otherCostName}', ${item.otherCostType}, ${item.sellSum}, ${item.profit},` +
          `'${item.nameFirm}', '${item.name}', '${item.phone}', '${item.phoneIndex}',` +
          `'${item.email}', '${item.addressCity}', '${item.address}', '${item.shipment}',` +
          `'${item.shipmentFrom}', '${item.shipmentUntil}', '${item.comment}', '${item.source}',` +
          `'${item.referer}', ${item.forPrint}, ${item.forExport}, ${item.checkNum},` +
          `'${item.checkDate}', '${item.checkPayer}', '${item.paymentType}', ${item.politicsCheckBox},` +
          `'${item.smsText}', '${item.smsSendAt}', '${item.createdAt}', '${item.updatedAt}'` +
          `)`,
        function (err, result) {
          if (err) {
            connection.release();
            reject(err);
          }
          // now we need to pass all the our cart items to the created order
          orderItems.forEach((item) => {
            id++;
            connection.query(
              `INSERT INTO mod_orders_content VALUES(` +
                `${id}, ${orderId}, ${item.brandId}, ${item.modelId}, ${item.sizeId},` +
                `${item.locationId}, ${item.supplierId}, ${item.paymentId}, ${item.paymentCost},` +
                `${item.paymentCostType}, '${item.paymentComment}', ${item.shipmentId}, ${item.shipmentCost},` +
                `${item.shipmentCostType}, '${item.shipmentComment}', ${item.shipmentCompId},` +
                `${item.otherCost}, '${item.otherCostName}', ${item.otherCostType}, ${item.discount}, ${item.profit},` +
                `${item.prepay}, '${item.country}', ${item.year}, ${item.inWarehous},` +
                `'${item.productType}', '${item.brand}', '${item.tireName}', '${item.size}',` +
                `${item.quantity}, ${item.priceBuy}, ${item.priceSell}, '${item.createdAt}',` +
                `'${item.updatedAt}')`,
              function (err, result) {
                if (err) {
                  connection.release();
                  reject(err);
                }
                connection.release();
                resolve(null);
              },
            );
          });
        },
      );
    });
  });
}
