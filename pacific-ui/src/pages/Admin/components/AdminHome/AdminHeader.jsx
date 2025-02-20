import {Header} from "antd/es/layout/layout";

export const AdminHeader = ({children}) => (
    <Header className="bg-white shadow-md px-4 flex items-center text-lg font-semibold">
        {children}
    </Header>
);
