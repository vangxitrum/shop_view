import { useNavigate } from 'react-router-dom';
import { Layout, Typography, Button, Result } from 'antd';
const { Content } = Layout;
const _404 = () => {
    const navigate = useNavigate();
    return (
        <Content className='tw-my-3 tw-mx-4 tw-bg-white tw-p-3 tw-rounded-lg'>
            <Result
                status='500'
                title='500'
                subTitle='Server đã xảy ra lỗi! Vui lòng thử lại sau.'
                extra={
                    <Button onClick={() => navigate('/')} type='primary'>
                        Quay về trang chủ
                    </Button>
                }
            />
        </Content>
    );
};
export default _404;
