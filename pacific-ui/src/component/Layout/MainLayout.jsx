const MainLayout = ({children}) => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth", // Thêm thuộc tính này để cuộn mượt
        });
    };
    return (
        <div className={"flex flex-col min-h-screen"}>
        {/*Footer*/}
        {/*    Main Content    */}
            <main className={"flex-grow"}>{children}</main>
        {/*    Footer*/}
        </div>
    )
}
export default MainLayout;