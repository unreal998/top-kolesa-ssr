type OrderItemsListDto = {
    price: string,
    brand: string,
    name: string,
    size: string,
    count: string
}

type OrderContentResponceDto = {
    price_buy: number,
    brand: string,
    name: string,
    size: string,
    quantity: string
}

type OrderDataResponceDto = {
    id: number,
    name: string,
    email: string,
    comment: string,
    address_city: string,
    address: string,
    phone: string,
    created_at: string,
    totalAmount: number,
    itemsList: OrderItemsListDto[]
}

type OrderItemDto = {
    brandId: number;
    modelId: number;
    sizeId: number;
    userId: number;
    statusId: number;
    customerId: number;
    locationId: number;
    supplierId: number;
    paymentId: number;
    paymentCost: string;
    cityId: number;
    paymentStatusId: number;
    shipCompId: number;
    paymentCostType: number;
    paymentComment: string;
    shipmentId: number;
    shipmentCost: string;
    shipmentCostType: number;
    driverId: number;
    shipmentComment: string;
    shipmentCompId: number;
    driverCost: number;
    driverCostType: number;
    otherCost: number;
    otherCostType: number;
    otherCostName: string;
    discount: number;
    sellSum: number;
    profit: number;
    nameFirm: string;
    name: string;
    tireName: string;
    phone: string;
    phoneIndex: string;
    prepay: number;
    country: string;
    year: number;
    inWarehous: number;
    email: string;
    addressCity: string;
    address: string;
    shipment: string;
    productType: string;
    brand: string;
    size: string;
    quantity: number;
    priceBuy: number;
    priceSell: number;
    createdAt: string;
    updatedAt: string;
    shipmentFrom: string;
    shipmentUntil: string;
    comment: string;
    source: string;
    referer: string;
    forPrint: number;
    forExport: number;
    checkNum: number;
    checkDate: string;
    checkPayer: string;
    paymentType: string;
    politicsCheckBox: number;
    smsText: string;
    smsSendAt: string;
  };