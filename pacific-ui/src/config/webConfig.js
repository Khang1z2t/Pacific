const webConfig = {
    defaultUser: 'defaultL.png',
    defaultTour: '/img/user_null.png',
    defaultTitle: 'Pacific - Hành trình khám phá mọi nơi',
    defaultQrCode: '103-RmMCZ1D3qJujRSOu02I65_gNdgIFW',
    getCurrency: (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            currencyDisplay: 'code',
        }).format(price);
    },
    convertDate: (date) => {
        return new Intl.DateTimeFormat('vi-VN').format(date);
    },
    convertDateNoTime: (date) => {
        return new Intl.DateTimeFormat('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).format(new Date(date));
    },
    convertMonthYear: (monthYear) => {
        let [year, month] = monthYear.split('-');
        let date = new Date(year, month - 1);
        return new Intl.DateTimeFormat('vi-VN', { month: 'numeric', year: 'numeric' }).format(new Date(date)).replace('-', '/');
    },
};

export default webConfig;