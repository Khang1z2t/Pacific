import axiosConfig from '~/config/axiosConfig';

const api = {
    provinces: 'https://provinces.open-api.vn/api/?depth=3',
    auth: '/api/auth',
    tours: '/api/tours',
    booking: '/api/bookings',
    user: '/api/user',
    tourDetail: '/api/tour-details',
    category: '/api/categories',
    bookingRevenue: '/api/report',
    guide: '/api/guide',
    hotel: '/api/hotels',
    transport: '/api/transports',
    adminUser: '/api/admin/user',
    adminGuide: '/api/admin/guide',
    adminBlog: '/api/admin/blog',
    wishlist: '/api/wishlist',
    adminRating: '/api/admin/rating',
    adminVoucher: '/api/admin/voucher',
    adminTourDetails: '/api/tour-details',

};

export default api;