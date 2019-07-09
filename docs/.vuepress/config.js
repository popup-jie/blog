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
		},
		{
			text: '前端100问',
			link: '/front-question/'
		}
		],
		sidebar: {
			'/node/': [{
				title: 'node相关学习',
				collapsable: false,
				children: [
					''
				]
			},],
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
			}],
			'/front-question/': [{
				title: '前端100问',
				collapsable: false,
				children: [
					''
				]
			}],
			'/': [{
				collapsable: false,
				children: [
					''
				]
			}]
		}
	}
}