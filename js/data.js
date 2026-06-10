// 模拟数据 - 闲鱼购物平台

// 用户数据
const users = [
    {
        id: 1,
        username: "buyer1",
        password: "123456",
        nickname: "小鱼儿",
        avatar: "images/icons/avatar1.svg",
        phone: "13800138001",
        location: "广东广州",
        bio: "热爱生活，喜欢淘好物",
        level: 3,
        sellCount: 12,
        buyCount: 25,
        fans: 18,
        follow: 32
    },
    {
        id: 2,
        username: "seller1",
        password: "123456",
        nickname: "数码达人",
        avatar: "images/icons/avatar2.svg",
        phone: "13800138002",
        location: "广东深圳",
        bio: "专注二手数码，品质保证",
        level: 5,
        sellCount: 88,
        buyCount: 15,
        fans: 156,
        follow: 45
    },
    {
        id: 3,
        username: "seller2",
        password: "123456",
        nickname: "时尚买手",
        avatar: "images/icons/avatar3.svg",
        phone: "13800138003",
        location: "上海浦东",
        bio: "二手奢侈品，正品保障",
        level: 4,
        sellCount: 56,
        buyCount: 28,
        fans: 89,
        follow: 67
    }
];

// 商品分类
const categories = [
    { id: 1, name: "手机数码", icon: "📱" },
    { id: 2, name: "电脑办公", icon: "💻" },
    { id: 3, name: "家用电器", icon: "📺" },
    { id: 4, name: "服饰鞋包", icon: "👕" },
    { id: 5, name: "美妆护肤", icon: "💄" },
    { id: 6, name: "图书文具", icon: "📚" },
    { id: 7, name: "家居家装", icon: "🏠" },
    { id: 8, name: "母婴用品", icon: "🍼" },
    { id: 9, name: "运动户外", icon: "⚽" },
    { id: 10, name: "其他", icon: "📦" }
];

// 商品数据
const goods = [
    {
        id: 1,
        title: "iPhone 14 Pro 256G 暗紫色 95新",
        categoryId: 1,
        userId: 2,
        price: 6899,
        originalPrice: 8999,
        images: ["images/goods/iphone1.png", "images/goods/iphone2.png"],
        description: "自用iPhone 14 Pro，去年购买，使用非常爱惜，电池健康度95%，无磕碰无划痕，配件齐全，支持验机。",
        condition: "95新",
        location: "广东深圳",
        views: 1256,
        likes: 89,
        wantCount: 23,
        isFreeShipping: true,
        tags: ["包邮", "支持验机", "配件齐全"],
        status: "在售",
        createTime: "2024-05-28 10:30:00"
    },
    {
        id: 2,
        title: "MacBook Pro 2022 M2芯片 16+512G",
        categoryId: 2,
        userId: 2,
        price: 8999,
        originalPrice: 12999,
        images: ["images/goods/macbook1.png", "images/goods/macbook2.png"],
        description: "MacBook Pro 2022款，M2芯片，16GB内存，512GB存储，使用不到一年，成色很新，无任何问题。",
        condition: "95新",
        location: "广东深圳",
        views: 2341,
        likes: 156,
        wantCount: 45,
        isFreeShipping: true,
        tags: ["包邮", "发票齐全", "保修期内"],
        status: "在售",
        createTime: "2024-05-27 14:20:00"
    },
    {
        id: 3,
        title: "AirPods Pro 2代 全新未拆封",
        categoryId: 1,
        userId: 2,
        price: 1299,
        originalPrice: 1899,
        images: ["images/goods/airpods1.png"],
        description: "公司年会奖品，全新未拆封，正品保证，支持专柜验货。",
        condition: "全新",
        location: "广东深圳",
        views: 890,
        likes: 67,
        wantCount: 18,
        isFreeShipping: true,
        tags: ["全新", "未拆封", "正品保证"],
        status: "在售",
        createTime: "2024-05-29 09:15:00"
    },
    {
        id: 4,
        title: "Nike Air Jordan 1 黑红脚趾 42码",
        categoryId: 4,
        userId: 3,
        price: 1599,
        originalPrice: 2999,
        images: ["images/goods/jordan1.png", "images/goods/jordan2.png"],
        description: "正品Air Jordan 1 黑红脚趾，42码，穿过几次，成色很好，有购买记录。",
        condition: "9成新",
        location: "上海浦东",
        views: 1567,
        likes: 112,
        wantCount: 34,
        isFreeShipping: true,
        tags: ["正品保证", "有购买记录"],
        status: "在售",
        createTime: "2024-05-26 16:45:00"
    },
    {
        id: 5,
        title: "戴森V12吸尘器 配件齐全",
        categoryId: 3,
        userId: 1,
        price: 2199,
        originalPrice: 4490,
        images: ["images/goods/dyson1.png"],
        description: "戴森V12 Detect Slim，使用半年，功能完好，所有配件齐全，适合小户型。",
        condition: "9成新",
        location: "广东广州",
        views: 654,
        likes: 45,
        wantCount: 12,
        isFreeShipping: true,
        tags: ["配件齐全", "功能完好"],
        status: "在售",
        createTime: "2024-05-30 11:20:00"
    },
    {
        id: 6,
        title: "iPad Air 5 64G WiFi版 星光色",
        categoryId: 2,
        userId: 2,
        price: 3299,
        originalPrice: 4799,
        images: ["images/goods/ipad1.png", "images/goods/ipad2.png"],
        description: "iPad Air 5代，M1芯片，64GB，星光色，自用机器，成色很好，有Apple Pencil 2代可单出。",
        condition: "9成新",
        location: "广东深圳",
        views: 1890,
        likes: 134,
        wantCount: 28,
        isFreeShipping: true,
        tags: ["包邮", "成色好", "可小刀"],
        status: "在售",
        createTime: "2024-05-25 08:30:00"
    },
    {
        id: 7,
        title: "SK-II神仙水230ml 全新未开封",
        categoryId: 5,
        userId: 3,
        price: 899,
        originalPrice: 1590,
        images: ["images/goods/skii1.png"],
        description: "朋友送的礼物，家里已经有了，全新未开封，日期新鲜，正品保证。",
        condition: "全新",
        location: "上海浦东",
        views: 456,
        likes: 34,
        wantCount: 8,
        isFreeShipping: true,
        tags: ["全新", "未开封", "正品"],
        status: "在售",
        createTime: "2024-05-31 13:10:00"
    },
    {
        id: 8,
        title: "索尼PS5光驱版 双手柄+三款游戏",
        categoryId: 1,
        userId: 1,
        price: 2899,
        originalPrice: 4299,
        images: ["images/goods/ps51.png", "images/goods/ps52.png"],
        description: "PS5光驱版，两个手柄，三款游戏光盘，成色很新，买来没怎么玩。",
        condition: "95新",
        location: "广东广州",
        views: 2100,
        likes: 167,
        wantCount: 42,
        isFreeShipping: true,
        tags: ["配件齐全", "游戏赠送"],
        status: "在售",
        createTime: "2024-05-24 12:00:00"
    },
    {
        id: 9,
        title: "优衣库联名卫衣 L码 全新带吊牌",
        categoryId: 4,
        userId: 3,
        price: 199,
        originalPrice: 399,
        images: ["images/goods/uniqlo1.png"],
        description: "优衣库联名款卫衣，L码，买大了一直没穿，全新带吊牌。",
        condition: "全新",
        location: "上海浦东",
        views: 345,
        likes: 28,
        wantCount: 6,
        isFreeShipping: false,
        tags: ["全新", "带吊牌", "买大了"],
        status: "在售",
        createTime: "2024-06-01 15:30:00"
    },
    {
        id: 10,
        title: "小米扫地机器人1S 九成新",
        categoryId: 3,
        userId: 1,
        price: 699,
        originalPrice: 1999,
        images: ["images/goods/xiaomi1.png"],
        description: "小米扫地机器人1S，使用一年，功能正常，适合日常清洁。",
        condition: "9成新",
        location: "广东广州",
        views: 567,
        likes: 42,
        wantCount: 10,
        isFreeShipping: true,
        tags: ["功能正常", "配件齐全"],
        status: "在售",
        createTime: "2024-06-02 10:00:00"
    },
    {
        id: 11,
        title: "《三体》全套三册 刘慈欣签名版",
        categoryId: 6,
        userId: 2,
        price: 599,
        originalPrice: 198,
        images: ["images/goods/santi1.png"],
        description: "刘慈欣亲笔签名版《三体》全套三册，有签名证书，收藏级品相。",
        condition: "95新",
        location: "广东深圳",
        views: 3200,
        likes: 289,
        wantCount: 67,
        isFreeShipping: true,
        tags: ["签名版", "收藏级", "全套"],
        status: "在售",
        createTime: "2024-05-23 09:00:00"
    },
    {
        id: 12,
        title: "宜家MALM书桌 白色 120x60cm",
        categoryId: 7,
        userId: 1,
        price: 299,
        originalPrice: 699,
        images: ["images/goods/ikea1.png"],
        description: "宜家MALM书桌，白色，120x60cm，使用一年，有轻微使用痕迹，自提优先。",
        condition: "8成新",
        location: "广东广州",
        views: 234,
        likes: 18,
        wantCount: 4,
        isFreeShipping: false,
        tags: ["自提优先", "轻微使用痕迹"],
        status: "在售",
        createTime: "2024-06-02 14:00:00"
    }
];

// 想要/收藏数据
const wants = [
    { userId: 1, goodsId: 2, createTime: "2024-05-28 10:00:00" },
    { userId: 1, goodsId: 4, createTime: "2024-05-29 11:00:00" },
    { userId: 2, goodsId: 1, createTime: "2024-05-30 12:00:00" }
];

// 聊天记录
const messages = [
    {
        id: 1,
        fromUserId: 1,
        toUserId: 2,
        goodsId: 1,
        content: "你好，iPhone还在吗？",
        createTime: "2024-05-30 10:30:00"
    },
    {
        id: 2,
        fromUserId: 2,
        toUserId: 1,
        goodsId: 1,
        content: "在的，有什么问题吗？",
        createTime: "2024-05-30 10:35:00"
    },
    {
        id: 3,
        fromUserId: 1,
        toUserId: 2,
        goodsId: 1,
        content: "可以小刀吗？6500可以吗？",
        createTime: "2024-05-30 10:40:00"
    }
];

// 动态数据
const moments = [
    {
        id: 1,
        userId: 2,
        content: "刚到了一批数码好物，有兴趣的来看看~",
        images: ["images/goods/iphone1.png", "images/goods/macbook1.png"],
        likes: 23,
        comments: 5,
        createTime: "2024-06-01 10:00:00"
    },
    {
        id: 2,
        userId: 3,
        content: "断舍离出一批衣服，都是正品，价格好商量",
        images: ["images/goods/jordan1.png", "images/goods/uniqlo1.png"],
        likes: 15,
        comments: 3,
        createTime: "2024-06-02 09:00:00"
    }
];

// 轮播图数据
const banners = [
    { id: 1, image: "images/banners/banner1.svg", link: "search.html?keyword=手机" },
    { id: 2, image: "images/banners/banner2.svg", link: "search.html?keyword=电脑" },
    { id: 3, image: "images/banners/banner3.svg", link: "search.html?category=4" }
];

// 初始化数据到localStorage
function initData() {
    // 始终更新数据（确保图片路径正确）
    localStorage.setItem('xianyu_users', JSON.stringify(users));
    localStorage.setItem('xianyu_goods', JSON.stringify(goods));
    localStorage.setItem('xianyu_categories', JSON.stringify(categories));
    localStorage.setItem('xianyu_wants', JSON.stringify(wants));
    localStorage.setItem('xianyu_messages', JSON.stringify(messages));
    localStorage.setItem('xianyu_moments', JSON.stringify(moments));
    localStorage.setItem('xianyu_banners', JSON.stringify(banners));
}

// 页面加载时初始化数据
initData();
