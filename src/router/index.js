const router = [
    {
        title: "控制台",
        icon: "index",
        key: "/admin/index"
    },
    {
        title:'用户管理',
        icon: 'laptop',
        key:'/admin/user',
        child: [
            {
                key:'/admin/user/list',
                title:'用户列表',
                icon:''
            },
            {
                key:'/admin/user/add',
                title:'添加用户',
                icon:''
            }
        ]
    },
    {
        title:'部门管理',
        icon: 'bars',
        key:'/admin/department',
        child: [
            {
                key:'/admin/department/list',
                title:'部门列表',
                icon:''
            },
            {
                key:'/admin/department/add',
                title:'添加部门',
                icon:''
            }
        ]
    },
    {
        title:'职位管理',
        icon: 'edit',
        key:'/admin/entry',
        child: [
            {
                key:'/admin/entry/list',
                title:'职位列表',
                icon:''
            },
            {
                key:'/admin/entry/add',
                title:'添加职位',
                icon:''
            }
        ]
    },
    {
        title: "请假",
        icon: "info-circle-o",
        key: "/admin/holidays"
    },
    {
        title: "加班",
        icon: "info-circle-o",
        key: "/admin/"
    }
]

export default router;