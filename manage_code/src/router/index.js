	import {
		createRouter,
		createWebHashHistory
	} from 'vue-router'
	import laorenruzhudengji from '@/views/laorenruzhudengji/list'
	import chuxingpeihu from '@/views/chuxingpeihu/list'
	import binglidangan from '@/views/binglidangan/list'
	import fangjianfenpei from '@/views/fangjianfenpei/list'
	import yuyueyiliaofuwu from '@/views/yuyueyiliaofuwu/list'
	import jiankangshuju from '@/views/jiankangshuju/list'
	import jiashu from '@/views/jiashu/list'
	import yuyuechuxingpeihu from '@/views/yuyuechuxingpeihu/list'
	import yaopinxinxi from '@/views/yaopinxinxi/list'
	import meiricanyin from '@/views/meiricanyin/list'
	import chuxingxinxi from '@/views/chuxingxinxi/list'
	import waichubaobei from '@/views/waichubaobei/list'
	import users from '@/views/users/list'
	import yiliaofuwu from '@/views/yiliaofuwu/list'
	import paibanxinxi from '@/views/paibanxinxi/list'
	import laorenxinxi from '@/views/laorenxinxi/list'
	import xiuxianyule from '@/views/xiuxianyule/list'
	import hugong from '@/views/hugong/list'
	import liuyanfankui from '@/views/liuyanfankui/list'
	import config from '@/views/config/list'

export const routes = [{
		path: '/login',
		name: 'login',
		component: () => import('../views/login.vue')
	},{
		path: '/',
		name: '首页',
		component: () => import('../views/index'),
		children: [{
			path: '/',
			name: '首页',
			component: () => import('../views/HomeView.vue'),
			meta: {
				affix: true
			}
		}, {
			path: '/updatepassword',
			name: '修改密码',
			component: () => import('../views/updatepassword.vue')
		}
		
		,{
			path: '/laorenruzhudengji',
			name: '老人入住登记',
			component: laorenruzhudengji
		}
		,{
			path: '/chuxingpeihu',
			name: '出行陪护',
			component: chuxingpeihu
		}
		,{
			path: '/binglidangan',
			name: '病例档案',
			component: binglidangan
		}
		,{
			path: '/fangjianfenpei',
			name: '房间分配',
			component: fangjianfenpei
		}
		,{
			path: '/yuyueyiliaofuwu',
			name: '预约医疗服务',
			component: yuyueyiliaofuwu
		}
		,{
			path: '/jiankangshuju',
			name: '健康数据',
			component: jiankangshuju
		}
		,{
			path: '/jiashu',
			name: '家属',
			component: jiashu
		}
		,{
			path: '/yuyuechuxingpeihu',
			name: '预约出行陪护',
			component: yuyuechuxingpeihu
		}
		,{
			path: '/yaopinxinxi',
			name: '药品信息',
			component: yaopinxinxi
		}
		,{
			path: '/meiricanyin',
			name: '每日餐饮',
			component: meiricanyin
		}
		,{
			path: '/chuxingxinxi',
			name: '出行信息',
			component: chuxingxinxi
		}
		,{
			path: '/waichubaobei',
			name: '外出报备',
			component: waichubaobei
		}
		,{
			path: '/users',
			name: '管理员',
			component: users
		}
		,{
			path: '/yiliaofuwu',
			name: '医疗服务',
			component: yiliaofuwu
		}
		,{
			path: '/paibanxinxi',
			name: '排班信息',
			component: paibanxinxi
		}
		,{
			path: '/laorenxinxi',
			name: '老人信息',
			component: laorenxinxi
		}
		,{
			path: '/xiuxianyule',
			name: '休闲娱乐',
			component: xiuxianyule
		}
		,{
			path: '/hugong',
			name: '护工',
			component: hugong
		}
		,{
			path: '/liuyanfankui',
			name: '留言反馈',
			component: liuyanfankui
		}
		,{
			path: '/config',
			name: '轮播图',
			component: config
		}
		]
	},
]

const router = createRouter({
	history: createWebHashHistory(process.env.BASE_URL),
	routes
})

export default router
