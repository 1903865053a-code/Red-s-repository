/* =============================================================
   小卡片 · 配置文件
   -------------------------------------------------------------
   你只需要改这一个文件，改完保存、刷新网页就能看到

   ① 改称呼 / 落款 / 起始日   → SITE
   ② 改封面文字、每一年的照片和句子 → STORY
   ③ 换节日配色              → SITE.theme 或网址加 ?theme=christmas
   ============================================================= */

const SITE = {
  /* ★ 她的称呼 */
  herName: '哈基米',

  /* ★ 信的落款 */
  signature: '爱你的',

  /* ★ 落款后面接的名字留空就只有「爱你的」 */
  fromName: 'Red',

  /* ★ 在一起的第一天信的末尾会按今天现算「第 N 天」 */
  startDate: '2019-01-26',

  /* ★ 主题：'halloween' | 'christmas' | 'valentine' */
  theme: 'halloween',

  /* ★ 一开始有没有声音（右上角随时能关） */
  sound: true,

  /* ★ 打开页面要输的口令留空 '' 就不要口令门
        ⚠ 这个文件是公开的，懂技术的人能看到这行字
        它只是挡住随手点开链接的人，不是真加密 */
  passcode: '猫狗之家',
};

/* =============================================================
   ★ 故事 —— 按年份往下排
   -------------------------------------------------------------
   加一年 = 复制一段 { year, line, moments } 粘在后面
   每一年的照片放在 photos/年份/ 里，src 写相对路径就行
   一个 moment 可以放 1～4 张照片，手机上可以左右滑
   ============================================================= */

const STORY = {
  /* 口令门 */
  gate: {
    kicker: '私人保管',
    title: '先对个暗号',
    hint: '提示：我们家 wifi 叫什么？',
    placeholder: '口令',
    button: '开门',
    wrong: '不对，再想想',
  },

  /* 封面 */
  cover: {
    kicker: '十月三十一日 · 夜',
    title: '不给糖就捣蛋',
    sub: '这些年的照片，我一张一张洗出来\n慢慢往下翻',
    cta: '开始往下走',
  },

  years: [
    {
      year: '2019',
      line: '高中，毕业，第一次一起出门',
      moments: [
        {
          date: '05.01',
          text: '假期，跑去找你',
          note: '',
          photos: [{ src: 'photos/2019/0501-find-her.jpg', alt: '你靠在我肩上' }],
        },
        {
          date: '05.10',
          text: '放学，在地铁站一人一瓶啤酒',
          note: 'Corona，碰了一下',
          photos: [{ src: 'photos/2019/0510-beer.jpg', alt: '两瓶 Corona 碰杯' }],
        },
        {
          date: '05.14',
          text: '你生日',
          note: '拍了一堆拍立得，拼成一个心',
          photos: [{ src: 'photos/2019/0514-birthday.jpg', alt: '拍立得拼成的心' }],
        },
        {
          date: '05.30',
          text: '晚自习，趴在走廊栏杆上看对面的公寓',
          note: '说以后想有个自己的家，成为其中一盏灯火',
          photos: [{ src: 'photos/2019/0530-night.jpg', alt: '夜里失焦的城市灯火' }],
        },
        {
          date: '06.13',
          text: '高中毕业，第一次一起出门——广州',
          note: '第一支玫瑰也是那天送的',
          photos: [
            { src: 'photos/2019/0613-gz-shop.jpg', alt: '服装店镜子前的合照' },
            { src: 'photos/2019/0613-gz-river.jpg', alt: '你趴在江边栏杆上看对岸' },
            { src: 'photos/2019/0613-rose.jpg', alt: '一支粉玫瑰' },
          ],
        },
        {
          date: '06.18',
          text: '又去了江边',
          note: '',
          photos: [{ src: 'photos/2019/0618-river-heart.jpg', alt: '双手比心，背后是江和城市' }],
        },
        {
          date: '07.29',
          text: '欢乐谷',
          note: '坐了旋转木马',
          photos: [{ src: 'photos/2019/0729-park.jpg', alt: '你在旋转木马上' }],
        },
        {
          date: '08.05',
          text: '一个下午：咖啡、龙虾、一双很小的 AJ',
          note: '% Arabica 那天在下雨',
          photos: [
            { src: 'photos/2019/0805-arabica.jpg', alt: '手里的 % Arabica' },
            { src: 'photos/2019/0805-cafe.jpg', alt: '圆形吧台的咖啡店' },
            { src: 'photos/2019/0805-lobster.jpg', alt: '蒜蓉粉丝龙虾' },
            { src: 'photos/2019/0805-aj.jpg', alt: '盒子里很小的 Air Jordan' },
          ],
        },
        {
          date: '08.07',
          text: '一起做手账',
          note: '本子是牛皮的',
          photos: [{ src: 'photos/2019/0807-journal.jpg', alt: '牛皮纸手账本' }],
        },
        {
          date: '08.28',
          text: '在三水买了这盏灯',
          note: '现在还亮着',
          photos: [{ src: 'photos/2019/0828-lamp.jpg', alt: '亮着的落地灯' }],
        },
        {
          date: '09.12',
          text: '大学天台上',
          note: '影子落在瓷砖上',
          photos: [{ src: 'photos/2019/0912-roof.jpg', alt: '瓷砖墙上的两个人影' }],
        },
        {
          date: '12.08',
          text: '三水的摩天轮',
          note: '黄昏上的',
          photos: [{ src: 'photos/2019/1208-wheel.jpg', alt: '黄昏里的你' }],
        },
      ],
    },
    {
      year: '2020',
      line: '大半年没见，中间走散过一段，十月之后还是在一起',
      moments: [
        {
          date: '10.18',
          text: '十月，课室',
          note: '你比了个耶，遮住一只眼',
          photos: [{ src: 'photos/2020/1018-classroom.jpg', alt: '课室里你比了个耶' }],
        },
        {
          date: '11.05',
          text: '深圳，买口红',
          note: '你把手背试成了一盘颜色',
          photos: [{ src: 'photos/2020/1105-lipstick.jpg', alt: '手背上的口红试色' }],
        },
        {
          date: '11.07',
          text: '你把它 P 进了卡通里',
          note: '让我设成朋友圈背景',
          photos: [{ src: 'photos/2020/1107-cartoon.jpg', alt: '套着卡通画框的照片' }],
        },
        {
          date: '11.28',
          text: '三水，北江大堤',
          note: '你举着一朵小花，背后是落日',
          photos: [{ src: 'photos/2020/1128-dike.jpg', alt: '大堤上你举着一朵小花' }],
        },
        {
          date: '12.07',
          text: '我生日',
          note: '学校天台，一人一根仙女棒',
          photos: [{ src: 'photos/2020/1207-birthday.jpg', alt: '天台上两个人的仙女棒' }],
        },
        {
          date: '12.25',
          text: '圣诞节，你把草莓做成了小人',
          note: '还给它们挨个起了名字',
          photos: [{ src: 'photos/2020/1225-strawberry.jpg', alt: '做了表情的草莓' }],
        },
      ],
    },
    {
      year: '2021',
      line: '上半年在深圳，下半年搬到广州',
      moments: [
        {
          date: '01.27',
          text: '冬天，在三水闲逛',
          note: '',
          photos: [{ src: 'photos/2021/0127-shop.jpg', alt: '店里戴着兔耳朵的合照' }],
        },
        {
          date: '06.23',
          text: '封控那阵，临时住进学校的轰趴馆',
          note: '你在铺床垫',
          photos: [{ src: 'photos/2021/0623-mattress.jpg', alt: '地板上铺开的床垫' }],
        },
        {
          date: '07.09',
          text: '三水的竹筒饭',
          note: '',
          photos: [{ src: 'photos/2021/0709-bamboo.jpg', alt: '一桌竹筒盛的菜' }],
        },
        {
          date: '07.26',
          text: '深圳，去滑冰',
          note: '',
          photos: [{ src: 'photos/2021/0726-skates.jpg', alt: '两双冰鞋' }],
        },
        {
          date: '09.11',
          text: '宜家，买了一把手指玩偶',
          note: '回公寓摆在床上，一人戴一手',
          photos: [{ src: 'photos/2021/0911-puppets.jpg', alt: '手指上套满玩偶' }],
        },
        {
          date: '09.19',
          text: '吃完日料，在小区公园坐了一会儿',
          note: '你坐在健身器材上',
          photos: [{ src: 'photos/2021/0919-park.jpg', alt: '夜里坐在健身器材上' }],
        },
        {
          date: '10.21',
          text: '第一千天',
          note: '出去逛了逛，照片拍下来的时候已经过了零点',
          photos: [{ src: 'photos/2021/1021-thousand.jpg', alt: '夜里的半身合照' }],
        },
        {
          date: '10.30',
          text: '融创乐园，万圣节',
          note: '脸上画了妆，站在霓虹灯底下',
          photos: [{ src: 'photos/2021/1030-halloween.jpg', alt: '霓虹灯下化了妆的合照' }],
        },
        {
          date: '11.14',
          text: '江边，背后是广州塔',
          note: '',
          photos: [{ src: 'photos/2021/1114-tower.jpg', alt: '江边自拍，背后是广州塔' }],
        },
      ],
    },
    {
      year: '2022',
      line: '这一年，在广州的公寓里一起备考考研',
      moments: [
        {
          date: '01.17',
          text: '广州的自助',
          note: '虾一直是我剥，干脆拿了一整盘',
          photos: [{ src: 'photos/2022/0117-shrimp.jpg', alt: '一整盘虾' }],
        },
        {
          date: '05.02',
          text: '逛完学校北边的公园，突然想吃冰草',
          note: '去玉宝轩，点了冰草和猪肝，挺好吃，也挺贵，吃到一半飞进来一只小虫，又重上了一份',
          photos: [{ src: 'photos/2022/0502-liver.jpg', alt: '一盘猪肝和猪腰' }],
        },
        {
          date: '05.21',
          text: '一起在外面瞎转',
          note: '',
          photos: [{ src: 'photos/2022/0521-selfie.jpg', alt: '加了恶魔角的合照' }],
        },
        {
          date: '08.12',
          text: '蛋仔派对',
          note: '暑假上线，你想玩，就一起玩，第一次一起拿第一，截了图',
          photos: [{ src: 'photos/2022/0812-eggparty.jpg', alt: '蛋仔派对第一次拿第一的结算画面' }],
        },
        {
          date: '10.26',
          text: '又是自助',
          note: '新西兰鳌虾，剥好一盘，旁边还有飞鱼籽',
          photos: [{ src: 'photos/2022/1026-prawn.jpg', alt: '剥好的鳌虾和一盘飞鱼籽' }],
        },
      ],
    },
    {
      year: '2023',
      line: '毕业，搬离住了两年的广州',
      moments: [
        {
          date: '02.16',
          text: '顺德，火焰醉鹅',
          note: '没吃完，打包带走了',
          photos: [{ src: 'photos/2023/0216-goose.jpg', alt: '大铁锅里的醉鹅' }],
        },
        {
          date: '02.17',
          text: '第二天又去顺德，金榜牛奶店',
          note: '好喝，也好吃',
          photos: [{ src: 'photos/2023/0217-milk.jpg', alt: '金榜牛奶店的招牌' }],
        },
        {
          date: '03.14',
          text: '广州动物园',
          note: '门票很便宜，看了一排小熊猫吃饭',
          photos: [{ src: 'photos/2023/0314-panda.jpg', alt: '一排低头吃饭的小熊猫' }],
        },
        {
          date: '04.14',
          text: '第一次一起去越野',
          note: '我穿着重装徒步鞋就上山，一点经验都没有，到顶天已经黑了，原路回不去，抄近道下山，打车回家',
          photos: [{ src: 'photos/2023/0414-hike.jpg', alt: '凤凰山的石碑' }],
        },
        {
          date: '04.26',
          text: '为了拍毕业照，专门买了台小米',
          note: '拍了很多，你挺满意也是从这台手机开始，我才愿意多拍——之前那些照片，现在看总觉得单薄',
          photos: [{ src: 'photos/2023/0426-grad.jpg', alt: '穿学士服抱着花的毕业照' }],
        },
        {
          date: '05.10',
          text: '常去的树里有店',
          note: '离毕业只剩一个月，很快就要离开住了两年的广州',
          photos: [{ src: 'photos/2023/0510-shuli.jpg', alt: '夜里在街边桌旁的你' }],
        },
        {
          date: '06.30',
          text: '搬走前一天，最后拍的一张',
          note: '',
          photos: [{ src: 'photos/2023/0630-last.jpg', alt: '靠墙坐着的合照' }],
        },
        {
          date: '07.27',
          text: '家附近，云南菌子火锅',
          note: '吃完才发现，我肚子受不了这个',
          photos: [{ src: 'photos/2023/0727-mushroom.jpg', alt: '冒着热气的竹编锅盖' }],
        },
        {
          date: '09.15',
          text: '龙华天虹，缪式川菜',
          note: '第一次一起吃，那天还有周杰伦联名的奈雪',
          photos: [{ src: 'photos/2023/0915-chuan.jpg', alt: '你举着联名奶茶' }],
        },
        {
          date: '09.28',
          text: '家附近，韩国人开的韩国料理',
          note: '挺好吃，现在倒闭了',
          photos: [{ src: 'photos/2023/0928-korean.jpg', alt: '你举着一杯紫色的饮料' }],
        },
        {
          date: '12.25',
          text: '圣诞节，在深圳',
          note: '',
          photos: [
            { src: 'photos/2023/1225-xmas-a.jpg', alt: '夜里的合照' },
            { src: 'photos/2023/1225-xmas-b.jpg', alt: '两杯奶茶和一个纸袋' },
          ],
        },
      ],
    },
    {
      year: '2024',
      line: '这一年，我研究生开学，国庆从广州回来',
      moments: [
        {
          date: '02.07',
          text: '潮州、汕头，看海',
          note: '上了风车山，有点感冒，新年还看了烟花',
          photos: [{ src: 'photos/2024/0207-sea.jpg', alt: '海边，你举着手机拍照' }],
        },
        {
          date: '02.18',
          text: '过完年，从广州的花市回来',
          note: '带回来一枝黄果',
          photos: [{ src: 'photos/2024/0218-flower.jpg', alt: '你举着一枝黄色的花枝' }],
        },
        {
          date: '04.13',
          text: '一起在我家这边重拍了证件照',
          note: '',
          photos: [{ src: 'photos/2024/0413-id.jpg', alt: '店里喝奶茶的自拍' }],
        },
        {
          date: '05.14',
          text: '好好给你过了个生日',
          note: '订了蛋糕，订了饭，饭一般，蛋糕也一般，花不错',
          photos: [{ src: 'photos/2024/0514-birthday.jpg', alt: '你抱着花比耶' }],
        },
        {
          date: '10.04',
          text: '国庆，我从广州回来，去前海石公园',
          note: '研究生开学了，那天一起看了日落',
          photos: [{ src: 'photos/2024/1004-sunset.jpg', alt: '背对着看日落' }],
        },
        {
          date: '10.19',
          text: '又是一年万圣节，还是融创',
          note: '没有第一年那么开心',
          photos: [{ src: 'photos/2024/1019-halloween.jpg', alt: '南瓜灯下的合照' }],
        },
        {
          date: '12.08',
          text: '我生日，在深圳',
          note: '你租了老猫公寓，还去吃了顿很难吃的越南菜，两杯饮料的标签上写着「喜欢每天和你在一起」',
          photos: [{ src: 'photos/2024/1208-drinks.jpg', alt: '两杯饮料，标签上画着猫和狗' }],
        },
      ],
    },
    {
      year: '2025',
      line: '第一次去新丰，第一次上门',
      moments: [
        {
          date: '01.24',
          text: '河源',
          note: '有点贵，体验一般',
          photos: [{ src: 'photos/2025/0124-heyuan.jpg', alt: '一勺精致的前菜' }],
        },
        {
          date: '02.15',
          text: '江门',
          note: '比河源好多了，还在这儿学会了骑自行车',
          photos: [{ src: 'photos/2025/0215-jiangmen.jpg', alt: '你在喜茶门口举着饮料' }],
        },
        {
          date: '04.20',
          text: '佛山逛奥莱',
          note: '给你买了件衣服',
          photos: [{ src: 'photos/2025/0420-outlet.jpg', alt: '装袋的 T 恤' }],
        },
        {
          date: '08.09',
          text: '第一次去新丰',
          note: '吃了鹅醋钵',
          photos: [{ src: 'photos/2025/0809-xinfeng.jpg', alt: '砂锅里的鹅醋钵' }],
        },
        {
          date: '08.14',
          text: '在家做黄鱼面',
          note: '非常好吃',
          photos: [{ src: 'photos/2025/0814-noodle.jpg', alt: '一碗黄鱼面' }],
        },
        {
          date: '08.31',
          text: '回广州玩',
          note: '吃了广御轩，你不太喜欢，也吃了节目里一直看到的「宋」',
          photos: [{ src: 'photos/2025/0831-song.jpg', alt: '餐厅海报前的自拍' }],
        },
        {
          date: '09.20',
          text: '专门跑去喝 David 的联名喜茶',
          note: '感觉一般般',
          photos: [{ src: 'photos/2025/0920-heytea.jpg', alt: '联名杯和一张卡片' }],
        },
        {
          date: '10.09',
          text: '从日本给你带了包',
          note: '还有呀哈哈，和动森',
          photos: [{ src: 'photos/2025/1009-japan.jpg', alt: '手里抱着帆布包和呀哈哈挂件' }],
        },
        {
          date: '11.14',
          text: '第一次上门，准备了一堆东西',
          note: '',
          photos: [{ src: 'photos/2025/1114-gifts.jpg', alt: '一桌子礼盒和袋子' }],
        },
        {
          date: '12.31',
          text: '跨年前一天，先来龙岗，最后一次吃泰东北',
          note: '然后准备去新丰，这一天好像晚上忘记了一件很重要的事情',
          photos: [],
        },
      ],
    },
    {
      year: '2026',
      line: '新年去爬山，四月搬进新家',
      moments: [
        {
          date: '01.02',
          text: '新年一起去爬山',
          note: '广东最高峰，没上到顶',
          photos: [{ src: 'photos/2026/0102-peak.jpg', alt: '树下的合照' }],
        },
        {
          date: '01.03',
          text: '在新丰继续乱逛',
          note: '发现了黄礤镇这个小镇',
          photos: [{ src: 'photos/2026/0103-town.jpg', alt: '你在卡通雕塑旁边' }],
        },
        {
          date: '01.17',
          text: '一起出去拍照',
          note: '拍完去吃了意大利菜',
          photos: [{ src: 'photos/2026/0117-trees.jpg', alt: '落羽杉林里的你' }],
        },
        {
          date: '02.08',
          text: '去河南，白云山玩雪',
          note: '',
          photos: [{ src: 'photos/2026/0208-snow.jpg', alt: '趴在栏杆上看山' }],
        },
        {
          date: '02.09',
          text: '只有河南',
          note: '专门买了影石的云台，替掉 pocket 3',
          photos: [{ src: 'photos/2026/0209-theatre.jpg', alt: '剧场座椅前的你' }],
        },
        {
          date: '03.29',
          text: '一起爬塘朗山',
          note: '给你买了双越野鞋，你只穿了这一次，后来就没再穿过',
          photos: [{ src: 'photos/2026/0329-tanglang.jpg', alt: '山路上两个人的自拍' }],
        },
        {
          date: '04.05',
          text: '搬来新家',
          note: '去了悦动青春的联动书店，晚上吃了家挺好吃的新加坡菜，当天还买了投影仪、床垫、椅子',
          photos: [{ src: 'photos/2026/0405-dinner.jpg', alt: '一桌菜，有白切鸡和绿色的糕' }],
        },
      ],
    },
  ],

  /* ★ 结尾的地图。每个点都能点，点了会跳到那一天。
       坐标大概准确就够，不用精确到门牌。
       year + date 要跟上面某一年的某个瞬间对得上。 */
  map: {
    title: '地图上的点越来越多',
    sub: '亮起来的每一个，都是我们多去过的一个地方',
    random: '随便翻一天',
    places: [
      { name: '广州', lon: 113.26, lat: 23.13, year: '2019', date: '06.13', dx: 10, dy: 4 },
      { name: '三水', lon: 112.90, lat: 23.16, year: '2019', date: '08.28', dx: -10, dy: -8, anchor: 'end' },
      { name: '深圳', lon: 114.06, lat: 22.54, year: '2020', date: '11.05', dx: 10, dy: 4 },
      { name: '顺德', lon: 113.29, lat: 22.76, year: '2023', date: '02.16', dx: 2, dy: 18, anchor: 'middle' },
      { name: '潮州', lon: 116.62, lat: 23.66, year: '2024', date: '02.07', dx: -9, dy: -6, anchor: 'end' },
      { name: '汕头', lon: 116.68, lat: 23.35, year: '2024', date: '02.07', dx: -9, dy: 14, anchor: 'end' },
      { name: '河源', lon: 114.70, lat: 23.74, year: '2025', date: '01.24', dx: 10, dy: 4 },
      { name: '江门', lon: 113.08, lat: 22.58, year: '2025', date: '02.15', dx: -8, dy: 16, anchor: 'end' },
      { name: '佛山', lon: 113.12, lat: 23.02, year: '2025', date: '04.20', dx: -8, dy: 16, anchor: 'end' },
      { name: '新丰', lon: 114.21, lat: 24.06, year: '2025', date: '08.09', dx: -9, dy: 4, anchor: 'end' },
      { name: '广东最高峰', lon: 112.90, lat: 24.90, year: '2026', date: '01.02', dx: 10, dy: 4 },
    ],
    /* 出了省、在这张图外面的地方，单独标在图的上边 */
    far: [
      { name: '河南白云山', lon: 111.85, lat: 33.65, year: '2026', date: '02.08' },
    ],
  },

  /* 最后收尾的三个动作 */
  finale: {
    hint: '还有最后一件事',
    letterTo: '{name}：',
    doorLine: '门后面好像有东西',
    knockHint: '敲三下',
    knocks: ['咚……', '咚、咚……', '门开了'],
    doorOpen: '里面是我',
    choiceTitle: '不给糖，就捣蛋',
    choiceSub: '选一个',
    treat: '给糖',
    trick: '捣蛋',
    treatLine: '给糖都给你',
    trickLine: '……算了，糖还是给你',
    envelopeHint: '打开信',
  },

  /* ★ 那封信。地图负责「去过哪些地方」，信只说接下来想怎样 */
  letter: [
    '猫狗之家还空着，猫和狗也还没有',
    '这两样都不着急',
    '日子长，慢慢来',
  ],

  daysFmt: '今天是在一起的第 {n} 天',
  bye: '万圣节快乐，{name}',
  replay: '从头再看一遍',
};

/* =============================================================
   主题：只放颜色和飘落的效果，不含任何文字
   ============================================================= */

const THEMES = {
  halloween: {
    name: '万圣节',
    glyph: 'pumpkin',
    particles: 'embers',
    palette: {
      'ink': '#2B1A3E',
      'night-1': '#43285F',
      'night-2': '#1E1330',
      'night-3': '#150D23',
      'paper': '#FFF4E6',
      'paper-2': '#F3DFC6',
      'accent': '#FF8A3D',
      'accent-deep': '#D9551B',
      'second': '#B9A7F0',
      'glow': '#FFC77D',
      'desk-1': '#F1E8F8',
      'desk-2': '#D8C9E8',
    },
  },

  christmas: {
    name: '圣诞',
    glyph: 'candle',
    particles: 'snow',
    palette: {
      'ink': '#152A22',
      'night-1': '#18503C',
      'night-2': '#0E3328',
      'night-3': '#082219',
      'paper': '#FFFBF2',
      'paper-2': '#EDE1C8',
      'accent': '#E2574C',
      'accent-deep': '#A83028',
      'second': '#EBC97F',
      'glow': '#FFE7A8',
      'desk-1': '#F3EEE4',
      'desk-2': '#DCCFBB',
    },
  },

  valentine: {
    name: '情人节',
    glyph: 'heart',
    particles: 'hearts',
    palette: {
      'ink': '#3D1622',
      'night-1': '#6E2C46',
      'night-2': '#43182A',
      'night-3': '#2C0F1B',
      'paper': '#FFF4F0',
      'paper-2': '#F5DCD8',
      'accent': '#FF6B8A',
      'accent-deep': '#C43855',
      'second': '#FFC2D1',
      'glow': '#FFD9E2',
      'desk-1': '#FBEFF2',
      'desk-2': '#EBD2DA',
    },
  },
};
