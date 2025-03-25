import React from 'react';
import {
    FaCampground,
    FaCity,
    FaHiking,
    FaMapMarkedAlt,
    FaMountain,
    FaShip,
    FaStar,
    FaUmbrellaBeach,
} from 'react-icons/fa';
import { motion } from 'framer-motion';


const services = [
  {
    icon: <FaHiking className="text-white text-3xl" />, 
    title: "Hoạt động phiêu lưu", 
    description: "Khám phá những hoạt động mạo hiểm thú vị và đầy thử thách.",
    image: "/img/cards/card1.jpg"
  },
  {
    icon: <FaUmbrellaBeach className="text-white text-3xl" />, 
    title: "Kỳ nghỉ biển", 
    description: "Tận hưởng không gian biển xanh, cát trắng và nắng vàng.",
    image: "/img/cards/card1.jpg"
  },
  {
    icon: <FaCity className="text-white text-3xl" />, 
    title: "Thành phố sôi động", 
    description: "Trải nghiệm cuộc sống đô thị hiện đại và nhộn nhịp.",
    image: "/img/cards/card1.jpg"
  },
  {
    icon: <FaMapMarkedAlt className="text-white text-3xl" />, 
    title: "Hướng dẫn du lịch", 
    description: "Dịch vụ hướng dẫn viên chuyên nghiệp giúp bạn khám phá dễ dàng.",
    image: "/img/cards/card1.jpg"
  },
  {
    icon: <FaMountain className="text-white text-3xl" />, 
    title: "Leo núi", 
    description: "Chinh phục những ngọn núi cao và tận hưởng phong cảnh tuyệt vời.",
    image: "/img/cards/card1.jpg"
  },
  {
    icon: <FaShip className="text-white text-3xl" />, 
    title: "Du thuyền", 
    description: "Trải nghiệm kỳ nghỉ sang trọng trên những chiếc du thuyền hiện đại.",
    image: "/img/cards/card1.jpg"
  },
  {
    icon: <FaCampground className="text-white text-3xl" />, 
    title: "Cắm trại", 
    description: "Tận hưởng không khí thiên nhiên với những chuyến cắm trại thú vị.",
    image: "/img/cards/card1.jpg"
  },
  {
    icon: <FaCampground className="text-white text-3xl" />, 
    title: "Dịch vụ", 
    description: "Tận hưởng các gói dịch vụ tuyệt vời và cao cấp tại Pacific.",
    image: "/img/cards/card1.jpg"
  }
];

const testimonials = [
  {
    name: "Nguyễn Dương Thiên Lý",
    review: "Một trải nghiệm tuyệt vời! Dịch vụ chuyên nghiệp, địa điểm đẹp, chắc chắn tôi sẽ quay lại!",
    rating: 5,
    avatar:"/img/cards/card1.jpg"
  },
  {
    name: "Trần Thanh Tâm",
    review: "Chuyến đi này đã giúp tôi khám phá nhiều điều mới lạ và thú vị. Cảm ơn đội ngũ hướng dẫn!",
    rating: 4.5,
    avatar:"/img/cards/card1.jpg"
  },
  {
    name: "Lê Văn Chung",
    review: "Mọi thứ đều hoàn hảo từ khách sạn đến lịch trình. Tôi rất hài lòng!",
    rating: 5,
    avatar:"/img/cards/card1.jpg"
  },
  {
    name: "Phạm Thu Hường",
    review: "Chương trình du lịch phong phú, dịch vụ chuyên nghiệp, rất đáng để trải nghiệm!",
    rating: 4.8,
    avatar:"/img/cards/card1.jpg"
  },
  {
    name: "Bùi Quốc Huy",
    review: "Tôi rất thích cách tổ chức chuyến đi, mọi thứ đều được chuẩn bị kỹ càng và chu đáo!",
    rating: 5,
    avatar:"/img/cards/card1.jpg"
  },
  {
    name: "Nguyễn Đình Tuấn",
    review: "Vừa ấy vừa ấy ấy quá đi",
    rating: 5,
    avatar:"/img/cards/card1.jpg"
  }
];

const About = () => {
  return (
    <div className="bg-gray-100 py-16 px-6 lg:px-20">
      <h2 className="text-4xl font-bold text-black text-center">Giới thiệu</h2>
      {/* Giới thiệu */}
      <div className="container mx-auto px-6 py-12">
  <div className="flex flex-col lg:flex-row items-center">
    {/* Danh sách hình ảnh (bên trái) */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:w-1/2">
      {/* Hoạt động */}
      <div className="relative bg-blue-700 text-white p-6 rounded-lg overflow-hidden shadow-lg">
        <img src="/img/cards/card1.jpg" alt="Hoạt động" className="absolute top-0 left-0 w-full h-full object-cover opacity-50" />
        <div className="relative">
          <div className="bg-orange-500 p-3 rounded-lg inline-block mb-4">
            <i className="fas fa-water text-white text-2xl"></i>
          </div>
          <h3 className="text-2xl font-bold">Hoạt động</h3>
          <p>Một dòng sông nhỏ mang tên Duden chảy qua nơi đây và cung cấp cho nó những điều cần thiết.</p>
        </div>
      </div>

      {/* Sắp xếp chuyến đi */}
      <div className="relative bg-green-700 text-white p-6 rounded-lg overflow-hidden shadow-lg">
        <img src="/img/cards/card1.jpg" alt="Sắp xếp chuyến đi" className="absolute top-0 left-0 w-full h-full object-cover opacity-50" />
        <div className="relative">
          <div className="bg-orange-500 p-3 rounded-lg inline-block mb-4">
            <i className="fas fa-plane text-white text-2xl"></i>
          </div>
          <h3 className="text-2xl font-bold">Sắp xếp chuyến đi</h3>
          <p>Một dòng sông nhỏ mang tên Duden chảy qua nơi đây và cung cấp cho nó những điều cần thiết.</p>
        </div>
      </div>

      {/* Hướng dẫn viên riêng */}
      <div className="relative bg-teal-700 text-white p-6 rounded-lg overflow-hidden shadow-lg">
        <img src="/img/cards/card1.jpg" alt="Hướng dẫn viên riêng" className="absolute top-0 left-0 w-full h-full object-cover opacity-50" />
        <div className="relative">
          <div className="bg-orange-500 p-3 rounded-lg inline-block mb-4">
            <i className="fas fa-user text-white text-2xl"></i>
          </div>
          <h3 className="text-2xl font-bold">Hướng dẫn viên riêng</h3>
          <p>Một dòng sông nhỏ mang tên Duden chảy qua nơi đây và cung cấp cho nó những điều cần thiết.</p>
        </div>
      </div>

      {/* Quản lý địa điểm */}
      <div className="relative bg-red-700 text-white p-6 rounded-lg overflow-hidden shadow-lg">
        <img src="/img/cards/card1.jpg" alt="Quản lý địa điểm" className="absolute top-0 left-0 w-full h-full object-cover opacity-50" />
        <div className="relative">
          <div className="bg-orange-500 p-3 rounded-lg inline-block mb-4">
            <i className="fas fa-map text-white text-2xl"></i>
          </div>
          <h3 className="text-2xl font-bold">Quản lý địa điểm</h3>
          <p>Một dòng sông nhỏ mang tên Duden chảy qua nơi đây và cung cấp cho nó những điều cần thiết.</p>
        </div>
      </div>
    </div>

    {/* Phần chữ (bên phải) */}
    <div className="lg:w-1/2 lg:pl-12 mt-10 lg:mt-0 text-left">
      <motion.p 
        className="text-xl italic text-orange-600 mb-2"
        initial={{ opacity: 0, x: -50 }} 
        animate={{ opacity: 1, x: 0 }} 
        transition={{ duration: 0.8 }}
      >
        Chào mừng đến với Pacific
      </motion.p>
      <motion.h2 
        className="text-5xl font-extrabold text-gray-900 leading-tight mb-4"
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
      >
        Hãy bắt đầu hành trình khám phá quê hương
      </motion.h2>
      <p className="text-gray-700 max-w-3xl">
        Một con sông nhỏ uốn lượn qua ngôi làng này, mang đến nguồn nước trong lành và cuộc sống êm đềm. Đây là một miền đất thanh bình, nơi bạn có thể tận hưởng những món ăn đậm chất quê hương trong khung cảnh yên tĩnh và thoải mái.
      </p>
      <p className="text-gray-700 max-w-3xl mt-4">
        Xa xa, phía sau những dãy núi trùng điệp, có một vùng đất nơi các câu chuyện cổ tích trở thành hiện thực. Người dân ở đó sống chậm rãi và bình yên, tại những làng chài ven biển, nơi dòng sông đổ ra biển Đông bao la, mang theo hy vọng và bình an.
      </p>
      <motion.button 
        className="mt-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all"
        initial={{ opacity: 0, scale: 0.8 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.6 }}
      >
        Tìm kiếm điểm đến
      </motion.button>
    </div>
  </div>
</div>

{/* Phần "Về chúng tôi" */}
<section className="relative w-full h-screen flex flex-col items-center justify-end overflow-hidden pb-16">
      {/* Hình ảnh lớn full màn hình */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/img/cards/card3.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      <div className="container mx-auto relative z-10 flex flex-col lg:flex-row items-center px-6 lg:px-16 w-full">
        {/* Video Play Button */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
          <button className="w-16 h-16 flex items-center justify-center bg-white text-red-500 rounded-full shadow-lg transition-transform transform hover:scale-110">
            ▶
          </button>
        </div>

        {/* Hình ảnh bên trái */}
        <div className="relative lg:w-1/2 flex justify-center mt-16 lg:mt-0">
          <div className="relative w-96 h-96">
            <img
              src="/img/cards/card1.jpg"
              alt="Large Image"
              className="w-full h-full object-cover rounded-lg border-4 border-white shadow-lg"
            />
            <div className="absolute bottom-[-20px] left-[-30px] border-4 border-white rounded-lg shadow-xl transform rotate-3">
              <img
                src="/img/cards/card2.jpg"
                alt="Small Floating"
                className="w-48 h-56 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Nội dung bên phải */}
        <div className="lg:w-1/2 lg:pl-20 text-left mt-16 lg:mt-0 text-white">
          <motion.p
            className="text-xl italic text-orange-500 mb-2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            Về chúng tôi
          </motion.p>
          <motion.h2
            className="text-5xl font-extrabold leading-tight mb-4 text-white"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Hãy làm cho chuyến đi của bạn trở nên đáng nhớ và an toàn cùng chúng tôi
          </motion.h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            Chúng tôi mang đến những trải nghiệm du lịch tuyệt vời, giúp bạn khám phá những vùng đất mới,
            tận hưởng những khoảnh khắc khó quên, và đảm bảo chuyến đi của bạn luôn an toàn.
          </p>
        </div>
      </div>
    </section>
    
      {/* Dịch vụ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-12 w-full max-w-7xl px-6 lg:px-0">
        {services.map((service, index) => (
          <motion.div 
            key={index} 
            className="relative overflow-hidden rounded-2xl shadow-xl group bg-white transition-transform transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
          >
            <img src={service.image} alt={service.title} className="w-full h-56 object-cover brightness-75 transition duration-300 group-hover:brightness-50" />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end items-center text-center p-6 transition-opacity duration-300 group-hover:from-opacity-60">
              <div className="mb-3 bg-orange-500 p-3 rounded-full text-white text-xl transition transform group-hover:scale-110 shadow-lg">
                {service.icon}
              </div>
              <h3 className="text-white text-lg font-semibold group-hover:text-orange-400 transition duration-300">
                {service.title}
              </h3>
              <p className="text-gray-300 text-sm mt-2 group-hover:text-white transition duration-300">
                {service.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Nhận xét khách hàng */}
      <div className="mt-10 relative bg-cover bg-center py-16" style={{ backgroundImage: "url('/img/cards/card4.jpg')" }}>
      {/* Lớp phủ màu xanh */}
      <div className="absolute inset-0 bg-green-900 opacity-40"></div>

      <div className="relative z-10 text-center mb-12">
        <h2 className="text-lg italic text-orange-300">Nhận Xét</h2>
        <h2 className="text-4xl font-bold text-white">Phản Hồi Của Khách Hàng</h2>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-lg text-center"
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex justify-center mb-4">
              {[...Array(Math.floor(testimonial.rating))].map((_, i) => (
                <FaStar key={i} className="text-orange-500 text-lg mx-1" />
              ))}
              {testimonial.rating % 1 !== 0 && <FaStar className="text-orange-500 text-lg mx-1 opacity-50" />}
            </div>
            <p className="text-gray-700 italic">{testimonial.review}</p>

            <div className="flex items-center justify-center mt-6">
              <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full border-2 border-gray-300" />
              <div className="ml-3 text-left">
                <h4 className="text-gray-800 font-semibold">{testimonial.name}</h4>
                <p className="text-orange-500 text-sm">{testimonial.job}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
    </div>
    {/* Phần giới thiệu công ty */}
    <section className="relative bg-cover bg-center py-24 text-white text-center" style={{ backgroundImage: "url('/img/vacation/des5.jpg')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 px-6">
          <h2 className="text-5xl font-bold mb-4">Chúng Tôi Là Pacific, Một Đại Lý Du Lịch</h2>
            <p className="text-lg mb-6">Chúng tôi có thể quản lý ước mơ của bạn, xây dựng một con đường đi đến khắp nơi trên thế giới.</p>
            <a href="#" className="inline-block bg-yellow-500 text-black py-3 px-8 rounded-lg text-lg font-semibold hover:bg-yellow-600 transition duration-300">Yêu Cầu Báo Giá</a>
        </div>
    </section>
    </div>
  );
};

export default About;
