module.exports = {
  title: '一个胖圆的程序员',
  description: '一个胖圆的程序员',
  // host: '10.1.80.217',
  // port: 9999,
  base: `/`,
  themeConfig: {
    editLinks: true,
    displayAllHeaders: true,
    nav: [
      {
        text: '常见问题处理',
        link: '/normal-problem/'
      }
    ],
    sidebar: {
      '/normal-problem/': [
        {
          title: '常见问题处理',
          collapsable: false,
          children: [
            ''
          ]
        },
      ],
      '/': [
        {
          collapsable: false,
          children: [
            ''
          ]
        }
      ]
    }
  }
}
