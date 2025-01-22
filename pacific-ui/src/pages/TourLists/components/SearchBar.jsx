export const SearchBar = ({...props}) => {
    return (
        <div className={"flex flex-row justify-center mx-auto items-center bg-gray-200 shadow-xl bg-blend-overlay gap-4 p-4 w-fit rounded-lg"}>
            <input className={"border px-4 py-2 rounded-md"} type="text" placeholder={"Ngày khởi hành"} />
            <input className={"border px-4 py-2 rounded-md"} type="text" placeholder={"Điểm đến"} />
            <input className={"border px-4 py-2 rounded-md"} type="text" placeholder={"Mức giá"} />
            <button className={"bg-orange-500 text-white px-6 py-2 rounded-md"}>Tìm kiếm</button>
        </div>
    );
};