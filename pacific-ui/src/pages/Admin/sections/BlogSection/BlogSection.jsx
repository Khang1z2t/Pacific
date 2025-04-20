import { Tabs } from 'antd';

export const BlogSection = () => {
    return (
        <>
            <Tabs defaultActiveKey={"1"}>
                <Tabs.TabPane key={"1"} >
                    <h1>Blog Section</h1>
                    <p>This is the blog section.</p>
                </Tabs.TabPane>
                <Tabs.TabPane key={"2"}>
                    <h1>Blog Section 2</h1>
                    <p>This is the blog section 2.</p>
                </Tabs.TabPane>
            </Tabs>
        </>
    );
};