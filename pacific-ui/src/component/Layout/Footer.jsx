import React from "react";
import { Divider } from 'antd';

const Footer = () => {
    return (
        <div
            className="bg-cover bg-center text-black"
            style={{ backgroundImage: "url('/img/bg_3.jpg')" }}
        >
            <div className="max-w-7xl mx-auto py-10 px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Về Chúng Tôi */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Về Chúng Tôi</h3>
                    <p className="text-sm leading-relaxed">
                        Xa xa, vượt qua những dãy núi trùng điệp, bạn sẽ khám phá những miền đất hoang sơ và
                        những vùng quê đầy bí ẩn, nơi thiên nhiên và văn hóa hòa quyện tạo nên những trải nghiệm độc đáo.
                    </p>
                    <div className="flex space-x-4 mt-4">
                        <a href="#" className="text-gray-400 shadow-md bg-orange-300 rounded-full p-2 hover:text-orange-500">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#" className="text-gray-400 shadow-md bg-orange-300 rounded-full p-2 hover:text-orange-500">
                            <i className="fab fa-facebook"></i>
                        </a>
                        <a href="#" className="text-gray-400 shadow-md bg-orange-300 rounded-full p-2 hover:text-orange-500">
                            <i className="fab fa-instagram"></i>
                        </a>
                    </div>
                </div>
                {/* Thông Tin */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Thông Tin</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-gray-300">Yêu Cầu Trực Tuyến</a></li>
                        <li><a href="#" className="hover:text-gray-300">Câu Hỏi Chung</a></li>
                        <li><a href="#" className="hover:text-gray-300">Điều Kiện Đặt Hàng</a></li>
                        <li><a href="#" className="hover:text-gray-300">Chính Sách Bảo Mật</a></li>
                        <li><a href="#" className="hover:text-gray-300">Chính Sách Hoàn Tiền</a></li>
                        <li><a href="#" className="hover:text-gray-300">Gọi Chúng Tôi</a></li>
                    </ul>
                </div>

                {/* Kinh Nghiệm */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Kinh Nghiệm</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-gray-300">Phiêu Lưu</a></li>
                        <li><a href="#" className="hover:text-gray-300">Khách Sạn và Nhà Hàng</a></li>
                        <li><a href="#" className="hover:text-gray-300">Bãi Biển</a></li>
                        <li><a href="#" className="hover:text-gray-300">Thiên Nhiên</a></li>
                        <li><a href="#" className="hover:text-gray-300">Cắm Trại</a></li>
                        <li><a href="#" className="hover:text-gray-300">Tiệc Tùng</a></li>
                    </ul>
                </div>

                {/* Có Câu Hỏi? */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Có Câu Hỏi?</h3>
                    <address className="not-italic text-sm space-y-2">
                        <p>QTSC 9 Building, Đ. Tô Ký, Tân Chánh Hiệp, Quận 12, Hồ Chí Minh</p>
                        <p>Điện thoại: <a href="tel:+8419001987" className="hover:text-gray-300">+84 1900 1987</a></p>
                        <p>Email: <a href="mailto:cdfptpolytechnic@fpt.vn.com" className="hover:text-gray-300">cdfptpolytechnic@fpt.vn.com</a></p>
                    </address>
                </div>
            </div>
            <div className="text-center text-black-400 text-sm mt-10 border-t border-gray-700 pt-4">
                Hãy để mỗi chuyến đi là một hành trình trải nghiệm, nơi bạn không chỉ khám phá cảnh đẹp mà còn tìm thấy chính mình giữa những nền văn hóa đa dạng và con người ấm áp. Bản quyền © 2025. Tạo bởi Nhóm LCR.
            </div>
        </div>
    );
};

export default Footer;
