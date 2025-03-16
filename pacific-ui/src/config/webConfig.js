const webConfig = {
    defaultUser : "defaultL.png",
    defaultTour: "/img/user_null.png",
    defaultTitle: "Pacific - Hành trình khám phá mọi nơi",
    defaultQrCode: '103-RmMCZ1D3qJujRSOu02I65_gNdgIFW',
    getCurrency : (price) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND',currencyDisplay: 'code' }).format(price);
    },
    convertDate: (date) => {
        return new Intl.DateTimeFormat('vi-VN').format(date);
    },
}

export default webConfig;