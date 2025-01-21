export const TourCards = () => {
    return (
        <div>
            <div className={"container mx-auto py-8 px-40"}>
                <h2 className={"text-5xl font-bold mb-4 text-orange-500"}>Danh sách tour</h2>
                <div className={"grid grid-cols-1 md:grid-cols-3 gap-8"}>
                    <div className={"bg-white shadow-xl rounded-3xl p-8"}>
                        <img src={"/img/tours/tour1.jpg"} alt={"Tour 1"} className={"w-full rounded-2xl"} />
                        <h3 className={"text-2xl font-bold mt-4"}>Tour 1</h3>
                        <p className={"text-md font-bold mt-2"}>Giá: 1.000.000 VND</p>
                        <button
                            className={"mt-4 text-xl bg-orange-600 font-bold text-white p-2 rounded-full shadow-xl hover:bg-orange-800"}>
                            Đặt tour
                        </button>
                    </div>
                    <div className={"bg-white shadow-xl rounded-3xl p-8"}>
                        <img src={"/img/tours/tour2.jpg"} alt={"Tour 2"} className={"w-full rounded-2xl"} />
                        <h3 className={"text-2xl font-bold mt-4"}>Tour 2</h3>
                        <p className={"text-md font-bold mt-2"}>Giá: 2.000.000 VND</p>
                        <button
                            className={"mt-4 text-xl bg-orange-600 font-bold text-white p-2 rounded-full shadow-xl hover:bg-orange-800"}>
                            Đặt tour
                        </button>
                    </div>
                    <div className={"bg-white shadow-xl rounded-3xl p-8"}>
                        <img src={"/img/tours/tour3.jpg"} alt={"Tour 3"} className={"w-full rounded-2xl"} />
                        <h3 className={"text-2xl font-bold mt-4"}>Tour 3</h3>
                        <p className={"text-md font-bold mt-2"}>Giá: 3.000.000 VND</p>
                        <button
                            className={"mt-4 text-xl bg-orange-600 font-bold text-white p-2 rounded-full shadow-xl hover:bg-orange-800"}>
                            Đặt tour
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
  