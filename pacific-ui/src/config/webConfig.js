const webConfig = {
    defaultUser : "defaultL.png",
    defaultTour: "",
    defaultTitle: "Pacific - Hành trình khám phá mọi nơi",
    defaultQrCode: '103-RmMCZ1D3qJujRSOu02I65_gNdgIFW',
    getCurrency : (price) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    }
}

export default webConfig;