import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
    return (
        <footer
            className="bg-cover bg-center text-black"
            style={{ backgroundImage: "url('/img/bg_3.jpg')" }}
        >
            <div className="max-w-7xl mx-auto py-16 px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
                {/* Về Chúng Tôi */}
                <div>
                    <h3 className="text-xl font-semibold mb-4 uppercase">Về Chúng Tôi</h3>
                    <p className="text-sm leading-relaxed opacity-80">
                        Xa xa, vượt qua những dãy núi trùng điệp, bạn sẽ khám phá những miền đất hoang sơ và
                        những vùng quê đầy bí ẩn, nơi thiên nhiên và văn hóa hòa quyện tạo nên những trải nghiệm độc đáo.
                    </p>
                    <div className="flex space-x-3 mt-6">
                        <a href="#" className="text-white bg-orange-500 p-3 rounded-full hover:bg-orange-600 transition duration-300">
                            <FaTwitter className="w-4 h-4" />
                        </a>
                        <a href="#" className="text-white bg-orange-500 p-3 rounded-full hover:bg-orange-600 transition duration-300">
                            <FaFacebookF className="w-4 h-4" />
                        </a>
                        <a href="#" className="text-white bg-orange-500 p-3 rounded-full hover:bg-orange-600 transition duration-300">
                            <FaInstagram className="w-4 h-4" />
                        </a>
                    </div>
                </div>

                {/* Thông Tin */}
                <div>
                    <h3 className="text-xl font-semibold mb-4 uppercase">Thông Tin</h3>
                    <ul className="space-y-3 text-sm opacity-90">
                        <li><a href="#" className="hover:text-orange-400 transition duration-300">Yêu Cầu Trực Tuyến</a></li>
                        <li><a href="#" className="hover:text-orange-400 transition duration-300">Câu Hỏi Chung</a></li>
                        <li><a href="#" className="hover:text-orange-400 transition duration-300">Điều Kiện Đặt Hàng</a></li>
                        <li><a href="#" className="hover:text-orange-400 transition duration-300">Chính Sách Bảo Mật</a></li>
                        <li><a href="#" className="hover:text-orange-400 transition duration-300">Chính Sách Hoàn Tiền</a></li>
                        <li><a href="#" className="hover:text-orange-400 transition duration-300">Gọi Chúng Tôi</a></li>
                    </ul>
                </div>

                {/* Kinh Nghiệm */}
                <div>
                    <h3 className="text-xl font-semibold mb-4 uppercase">Kinh Nghiệm</h3>
                    <ul className="space-y-3 text-sm opacity-90">
                        <li><a href="#" className="hover:text-orange-400 transition duration-300">Phiêu Lưu</a></li>
                        <li><a href="#" className="hover:text-orange-400 transition duration-300">Khách Sạn và Nhà Hàng</a></li>
                        <li><a href="#" className="hover:text-orange-400 transition duration-300">Bãi Biển</a></li>
                        <li><a href="#" className="hover:text-orange-400 transition duration-300">Thiên Nhiên</a></li>
                        <li><a href="#" className="hover:text-orange-400 transition duration-300">Cắm Trại</a></li>
                        <li><a href="#" className="hover:text-orange-400 transition duration-300">Tiệc Tùng</a></li>
                    </ul>
                </div>

                {/* Có Câu Hỏi? */}
                <div>
                    <h3 className="text-xl font-semibold mb-4 uppercase">Có Câu Hỏi?</h3>
                    <address className="not-italic text-sm opacity-90 space-y-3">
                        <p>QTSC 9 Building, Đ. Tô Ký, Tân Chánh Hiệp, Quận 12, Hồ Chí Minh</p>
                        <p>Điện thoại: <a href="tel:+8419001987" className="hover:text-orange-400 transition duration-300">+84 1900 1987</a></p>
                        <p>Email: <a href="mailto:cdfptpolytechnic@fpt.vn.com" className="hover:text-orange-400 transition duration-300">cdfptpolytechnic@fpt.vn.com</a></p>
                    </address>
                </div>
            </div>

            <div className="text-center text-black text-sm mt-12 border-t border-gray-600 pt-6 opacity-80">
                Hãy để mỗi chuyến đi là một hành trình trải nghiệm, nơi bạn không chỉ khám phá cảnh đẹp mà còn tìm thấy chính mình giữa những nền văn hóa đa dạng và con người ấm áp. 
                <br /> Bản quyền © 2025. Tạo bởi Nhóm LCR.
            </div>
        </footer>
    );
};

export default Footer;
