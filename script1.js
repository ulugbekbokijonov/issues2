const getData = () => {
    let price = Math.floor(Math.random() * 2000);
    let time = Math.random() *2000;
    console.log('Loading item. Will wait ' + time.toFixed(0) + 'ms. Price ' + price);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({price});
        }, time);
    })
}

$(document).ready(() => {
    const requests = [];
    for(let i = 0; i < 12; i++) {
        requests.push(getData())
    }

    $.when(...requests)
    .then((...responses) => {
        const sortedPrice = responses.map(r => r.price).sort((a, b) => a - b);
        const total = sortedPrice.reduce((sum, price) => sum + price, 0);
        console.log('All Sorted Prices: ', sortedPrice);
        console.log('Total: ', total);
    }).catch((error) => console.log('error'));
})