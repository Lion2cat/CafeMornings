const axios = require('axios');

// 微信支付
const createWechatPayment = async (orderId, totalAmount) => {
  // 这里应该是调用微信支付API的逻辑
  // 返回支付链接或二维码信息
  // 以下是示例代码，需要根据实际的微信支付API进行修改
  try {
    const response = await axios.post('https://api.mch.weixin.qq.com/pay/unifiedorder', {
      appid: process.env.WECHAT_APPID,
      mch_id: process.env.WECHAT_MCH_ID,
      nonce_str: generateNonceStr(),
      body: `Order ${orderId}`,
      out_trade_no: orderId,
      total_fee: totalAmount * 100, // 微信支付金额单位是分
      spbill_create_ip: '127.0.0.1', // 应该是服务器IP
      notify_url: 'http://www.yoursite.com/api/payment/wechat/notify',
      trade_type: 'NATIVE', // 二维码支付
    });
    
    // 处理响应，返回支付链接或二维码
    return response.data;
  } catch (error) {
    console.error('Wechat payment error:', error);
    throw new Error('Wechat payment failed');
  }
};

// 支付宝支付
const createAlipayPayment = async (orderId, totalAmount) => {
  // 这里应该是调用支付宝API的逻辑
  // 返回支付链接或表单
  // 以下是示例代码，需要根据实际的支付宝API进行修改
  try {
    const response = await axios.post('https://openapi.alipay.com/gateway.do', {
      app_id: process.env.ALIPAY_APP_ID,
      method: 'alipay.trade.page.pay',
      charset: 'utf-8',
      sign_type: 'RSA2',
      timestamp: new Date().toISOString(),
      version: '1.0',
      notify_url: 'http://www.yoursite.com/api/payment/alipay/notify',
      biz_content: JSON.stringify({
        out_trade_no: orderId,
        product_code: 'FAST_INSTANT_TRADE_PAY',
        total_amount: totalAmount,
        subject: `Order ${orderId}`,
      }),
    });
    
    // 处理响应，返回支付链接或表单
    return response.data;
  } catch (error) {
    console.error('Alipay payment error:', error);
    throw new Error('Alipay payment failed');
  }
};

// 生成随机字符串
const generateNonceStr = () => {
  return Math.random().toString(36).substr(2, 15);
};

module.exports = { createWechatPayment, createAlipayPayment };
