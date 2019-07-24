import Big from 'big.js';

const dateDiffIndays = (date1, date2) => {
    const dt1 = new Date(date1);
    const dt2 = new Date(date2);
    return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(),
        dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(),
            dt1.getDate())) / (1000 * 60 * 60 * 24));
};


const CalculationsPost = (data) => {
    const tripData = data.tripDetails;
    const costData = data.cost;

    const maleSize = new Big(tripData.numberMales);
    const femaleSize = new Big(tripData.numberFemales);
    const groupSize = maleSize.add(femaleSize);

    const numOfDays = new Big(dateDiffIndays(tripData.checkIn, tripData.checkOut));

    const itemCost = (val) => {
        const bigVal = new Big(val);
        return bigVal.mul(groupSize).mul(numOfDays);
    };
    const accommodation = itemCost(costData.accommodation);

    let breakfast = new Big(0);
    let lunch = new Big(0);
    let dinner = new Big(0);

    const calcMeal = () => {
        if (tripData.breakfast) {
            breakfast = itemCost(costData.breakfast);
        }
        if (tripData.lunch) {
            lunch = itemCost(costData.lunch);
        }
        if (tripData.dinner) {
            dinner = itemCost(costData.dinner);
        }
    }

    calcMeal();

    const mealPlan = breakfast.add(lunch).add(dinner);

    const subTotal = mealPlan.add(accommodation);

    const packageCost = {
        accommodation: Number(accommodation),
        breakfast: Number(breakfast),
        lunch: Number(lunch),
        dinner: Number(dinner),
        mealPlan: Number(mealPlan),
        subTotal: Number(subTotal),
    };

    return { price: packageCost, numberOfDays: Number(numOfDays) }
}
export default CalculationsPost
