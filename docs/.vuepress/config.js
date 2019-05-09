module.exports = {
    title: '一个胖圆的程序员',
    description: '一个胖圆的程序员',
    port: 9999,
    base: `/`,
    themeConfig: {
        editLinks: true,
        displayAllHeaders: true,
        nav: [{
                text: '常见问题处理',
                link: '/normal-problem/'
            },
            {
                text: 'node相关学习',
                link: '/node/'
            }
        ],
        sidebar: {
            '/node/': [{
                title: 'node相关学习',
                collapsable: false,
                children: [
                    ''
                ]
            }, ],
            '/normal-problem/': [{
                title: '常见问题处理',
                collapsable: false,
                children: [
                    '',
                    'vue-plugins',
                    'browse-proxy',
                    'js-normal',
                    'console'
                ]
            }, ],
            '/': [{
                collapsable: false,
                children: [
                    ''
                ]
            }]
        }
    }
}