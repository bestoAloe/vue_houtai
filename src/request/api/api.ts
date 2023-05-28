//获取后端数据的接口
//easymock账号是bestoAloe

const getAllApi = {
  //获取登录token
  getToken: {
    url: 'https://www.fastmock.site/mock/d1725610d975f590a3631f0654fbcd62/myapi/api/login',
    url2: 'https://mock.presstime.cn/mock/6432903248037aa2a4ae6dc7/logintoken',
  },
  //获取用户列表
  getUserList:{
    url:'https://www.fastmock.site/mock/d1725610d975f590a3631f0654fbcd62/myapi/api/users',
    url2: 'https://mock.presstime.cn/mock/6432903248037aa2a4ae6dc7/userlist'
  },
  //获取管理员列表
  getAdminList:{
    url:'https://www.fastmock.site/mock/d1725610d975f590a3631f0654fbcd62/myapi/api/admin',
    url2: 'https://mock.presstime.cn/mock/6432903248037aa2a4ae6dc7/admin'
  },
  //获取权限列表
  getRbacList:{
    url:  'https://www.fastmock.site/mock/d1725610d975f590a3631f0654fbcd62/myapi/api/rbac',
    url2: 'https://mock.presstime.cn/mock/6432903248037aa2a4ae6dc7/rbac',
  },
  //获取角色列表
  getRoleList:{
    url:  'https://www.fastmock.site/mock/d1725610d975f590a3631f0654fbcd62/myapi/role',
    url2:  'https://mock.presstime.cn/mock/6432903248037aa2a4ae6dc7/role',
  }
}

export default getAllApi;