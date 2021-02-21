var agentUrl = '',
  dealerUrl = '',
  salesmanUrl = '',
  shopShareUrl = ''

if (process.env.NODE_ENV === 'development') {
  agentUrl = 'https://testagent.xiaopangche.cn:30001';
  dealerUrl = 'https://testdealer.xiaopangche.cn:30001';
  salesmanUrl = 'https://testsalesman.xiaopangche.cn:30001';
  shopShareUrl = 'https://testshare.xiaopangche.cn:30001/html/shopshare/#'
  
  // agentUrl = 'https://agent.xiaopangche.cn';
  // dealerUrl = 'https://dealer.xiaopangche.cn';
  // salesmanUrl = 'https://salesman.xiaopangche.cn';
} else {
  agentUrl = window.g.agentUrl
  dealerUrl = window.g.dealerUrl
  salesmanUrl = window.g.salesmanUrl
  shopShareUrl = window.g.shopShareUrl
}

export { agentUrl, dealerUrl, salesmanUrl, shopShareUrl }