import { useNavigate } from 'react-router-dom';
import { Layout, Typography, Button, Result } from 'antd';
const { Content } = Layout;
const _404 = () => {
    const navigate = useNavigate();
    return (
        <Content className='tw-my-3 tw-mx-4 tw-bg-white tw-p-3 tw-rounded-lg'>
            <Result
                status='403'
                title='403'
                subTitle='Xin lỗi, bạn không có quyền truy cập trang này.'
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
