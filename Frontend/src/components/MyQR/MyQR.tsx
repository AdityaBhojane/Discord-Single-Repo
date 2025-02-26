import React from 'react';
import { QRCode, Space } from 'antd';

const MyQR: React.FC = () => {
  const text= 'https://www.linkedin.com/in/aditya-bhojane-2b0412257/'

  return (
    <Space direction="vertical" align="center" className='bg-white'>
      <QRCode value={text || '-'} />
    </Space>
  );
};

export default MyQR;
