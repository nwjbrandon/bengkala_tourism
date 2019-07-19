import sendEmail from '../../emailSender/emailSender'
import _ from 'lodash';
import db from '../../storage/db';
import { TABLE_TRANSACTIONS } from '../../storage/tableName';


import { serverKey, clientKey } from '../../secret/midtransSecret';

const midtransClient = require('midtrans-client');

const constructStringDate = (date) => {
    const DateObj = date ? new Date(date) : new Date();
    const str = `${DateObj.getFullYear()}-${DateObj.getMonth() + 1}-${DateObj.getDate()}`
    console.log(str)
    return str
}

const apiClient = new midtransClient.Snap({
    isProduction: false,
    serverKey: serverKey,
    clientKey: clientKey
});

const writeToDB = async (Data, paymentStat) => {

    const paymentData = {
        "uuid": Data.transactionID,
        "firstName": Data.personalDetails.firstName,
        "lastName": Data.personalDetails.lastName,
        "email": Data.personalDetails.email,
        "country": Data.personalDetails.country,
        "dateFrom": constructStringDate(Data.tripDetails.checkIn),
        "dateTo": constructStringDate(Data.tripDetails.checkOut),
        "males": Data.tripDetails.numberMales,
        "females": Data.tripDetails.numberFemales,
        "cars": Data.tripDetails.numberCars,
        "van": Data.tripDetails.numberVans,
        "breakfast": (Data.tripDetails.breakfast),
        "lunch": (Data.tripDetails.lunch),
        "dinner": (Data.tripDetails.dinner),
        "motorbikes": Data.tripDetails.numberBikes,
        "createdAt": constructStringDate(),
        "checkedIn": false,
        "cash": paymentStat
    };
    const confirmedData = _.assign({
        ...paymentData,
    });
    await db.saveData(TABLE_TRANSACTIONS, confirmedData);

}

const send = [
    async (req, res) => {

        const Data = req.body;
        console.log(Data)

        const transactionID = Data.transactionID;
        const orderId = Data.orderId;
        const orderStat = Data.orderStatus
        console.log(orderStat)
        console.log(db.uuidExist(TABLE_TRANSACTIONS, transactionID))

        const UUIDexists = await db.uuidExist(TABLE_TRANSACTIONS, transactionID);

        if (!UUIDexists) {


            if (orderStat === 0) {
                await writeToDB(Data, 0);
                await sendEmail({
                    toEmail: Data.personalDetails.email,
                    tripDetails: { ...Data.personalDetails, ...Data.tripDetails },
                    cost: Data.cost,
                    prices: Data.prices,
                    numberOfDays: Data.numberOfDays,
                    transactionID: Data.transactionID,
                    orderStatus: Data.orderStatus,
                    checkIn: constructStringDate(Data.tripDetails.checkIn),
                    checkOut: constructStringDate(Data.tripDetails.checkOut),
                    Now: constructStringDate(),
                });

                res.json({
                    data: 'success',
                });
            } else if (orderStat === 1) {
                try {
                    const response = await apiClient.transaction.status(transactionID);

                    console.log("RESPONSE", response)

                    if (response.fraud_status === 'accept') {
                        await sendEmail({
                            toEmail: Data.personalDetails.email,
                            tripDetails: { ...Data.personalDetails, ...Data.tripDetails },
                            cost: Data.cost,
                            prices: Data.prices,
                            numberOfDays: Data.numberOfDays,
                            transactionID: Data.transactionID,
                            orderStatus: Data.orderStatus,
                            checkIn: constructStringDate(Data.tripDetails.checkIn),
                            checkOut: constructStringDate(Data.tripDetails.checkOut),
                            Now: constructStringDate(),
                        });
                        await writeToDB(Data, 2)
                        res.json({
                            data: 'success',
                        });
                    } else {
                        res.json({
                            data: 'pending',
                        });
                        await writeToDB(Data, 1)
                    }


                } catch (err) {
                    console.log(err)
                }


            } else {

                res.json({
                    data: 'success',
                });

            }


        }




    }
];
export default {
    send: send
};
