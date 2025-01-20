export const AboutSection = () => {
    return (
        <>
            <div className={"relative h-screen bg-center bg-cover rounded-3xl"}
                 style={{ backgroundImage: "url('/img/about/aboutbg.jpg')" }}>
                <img src={"/img/about/about.jpg"}
                     className={"w-96 h-fit border-[9px] border-white absolute left-72 -bottom-[30rem] transform -translate-x-1/2 -translate-y-1/2"}
                     alt={"About"} />
            </div>
            <div className={"container mx-auto py-8 px-40"}>
                <div className={"ms-96 grid grid-cols-1 md:grid-cols-2"}>
                    <div className={"text-balance"}>
                        <h2 className={"text-4xl font-bold mb-4"}>Về chúng tôi</h2>
                        <p className={"text-xl font-bold"}>
                            Hãy biến chuyến tham quan của bạn trở nên đáng nhớ và an toàn với Pacific Tour.
                        </p>
                        <p className={"text-md font-bold pt-4"}>
                            Chúng tôi cung cấp dịch vụ du lịch chất lượng cao, giúp bạn khám phá những điểm đến tuyệt
                            vời nhất trên thế giới.
                        </p>
                    </div>
                </div>
                <button
                    className={"mx-96 mt-5 text-4xl bg-orange-600 font-bold text-white p-4 rounded-full shadow-xl hover:bg-orange-800"}>
                    Đặt tour ngay!
                </button>
            </div>
        </>
    );
};