/* =============================================================
   小卡片 · 配置文件
   -------------------------------------------------------------
   你只需要改这一个文件，改完保存、刷新网页就能看到。

   ① 改称呼 / 落款 / 起始日   → SITE
   ② 改封面文字、每一年的照片和句子 → STORY
   ③ 换节日配色              → SITE.theme 或网址加 ?theme=christmas
   ============================================================= */

const SITE = {
  /* ★ 她的称呼 */
  herName: '哈基米',

  /* ★ 信的落款 */
  signature: '爱你的',

  /* ★ 落款后面接的名字。留空就只有「爱你的」 */
  fromName: 'Red',

  /* ★ 在一起的第一天。信的末尾会按今天现算「第 N 天」 */
  startDate: '2019-01-26',

  /* ★ 主题：'halloween' | 'christmas' | 'valentine' */
  theme: 'halloween',

  /* ★ 一开始有没有声音（右上角随时能关） */
  sound: true,

  /* ★ 打开页面要输的口令。留空 '' 就不要口令门。
        ⚠ 这个文件是公开的，懂技术的人能看到这行字。
        它只是挡住随手点开链接的人，不是真加密。 */
  passcode: '猫狗之家',
};

/* =============================================================
   ★ 故事 —— 按年份往下排
   -------------------------------------------------------------
   加一年 = 复制一段 { year, line, moments } 粘在后面。
   每一年的照片放在 photos/年份/ 里，src 写相对路径就行。
   一个 moment 可以放 1～4 张照片，手机上可以左右滑。
   ============================================================= */

const STORY = {
  /* 口令门 */
  gate: {
    kicker: '私人保管',
    title: '先对个暗号',
    hint: '提示：我们家 wifi 叫什么？',
    placeholder: '口令',
    button: '开门',
    wrong: '不对，再想想。',
  },

  /* 封面 */
  cover: {
    kicker: '十月三十一日 · 夜',
    title: '不给糖就捣蛋',
    sub: '这些年的照片，我一张一张洗出来。\n慢慢往下翻。',
    cta: '开始往下走',
  },

  years: [
    {
      year: '2019',
      line: '高中，毕业，第一次一起出门。',
      moments: [
        {
          date: '05.01',
          text: '假期，跑去找你。',
          note: '',
          photos: [{ src: 'photos/2019/0501-find-her.jpg', alt: '你靠在我肩上' }],
        },
        {
          date: '05.10',
          text: '放学，在地铁站一人一瓶啤酒。',
          note: 'Corona，碰了一下。',
          photos: [{ src: 'photos/2019/0510-beer.jpg', alt: '两瓶 Corona 碰杯' }],
        },
        {
          date: '05.14',
          text: '你生日。',
          note: '拍了一堆拍立得，拼成一个心。',
          photos: [{ src: 'photos/2019/0514-birthday.jpg', alt: '拍立得拼成的心' }],
        },
        {
          date: '05.30',
          text: '晚上，看城里的灯。',
          note: '说希望有个家，成为其中一盏灯火。',
          photos: [{ src: 'photos/2019/0530-night.jpg', alt: '夜里失焦的城市灯火' }],
        },
        {
          date: '06.13',
          text: '高中毕业，第一次一起出门——广州。',
          note: '第一支玫瑰也是那天送的。',
          photos: [
            { src: 'photos/2019/0613-gz-shop.jpg', alt: '服装店镜子前的合照' },
            { src: 'photos/2019/0613-gz-river.jpg', alt: '你趴在江边栏杆上看对岸' },
            { src: 'photos/2019/0613-rose.jpg', alt: '一支粉玫瑰' },
          ],
        },
        {
          date: '06.18',
          text: '又去了江边。',
          note: '',
          photos: [{ src: 'photos/2019/0618-river-heart.jpg', alt: '双手比心，背后是江和城市' }],
        },
        {
          date: '07.29',
          text: '欢乐谷。',
          note: '坐了旋转木马。',
          photos: [{ src: 'photos/2019/0729-park.jpg', alt: '你在旋转木马上' }],
        },
        {
          date: '08.05',
          text: '一个下午：咖啡、龙虾、一双很小的 AJ。',
          note: '% Arabica 那天在下雨。',
          photos: [
            { src: 'photos/2019/0805-arabica.jpg', alt: '手里的 % Arabica' },
            { src: 'photos/2019/0805-cafe.jpg', alt: '圆形吧台的咖啡店' },
            { src: 'photos/2019/0805-lobster.jpg', alt: '蒜蓉粉丝龙虾' },
            { src: 'photos/2019/0805-aj.jpg', alt: '盒子里很小的 Air Jordan' },
          ],
        },
        {
          date: '08.07',
          text: '一起做手账。',
          note: '本子是牛皮纸的。',
          photos: [{ src: 'photos/2019/0807-journal.jpg', alt: '牛皮纸手账本' }],
        },
        {
          date: '08.28',
          text: '在三水买了这盏灯。',
          note: '现在还亮着。',
          photos: [{ src: 'photos/2019/0828-lamp.jpg', alt: '亮着的落地灯' }],
        },
        {
          date: '09.12',
          text: '大学天台上。',
          note: '影子落在瓷砖上。',
          photos: [{ src: 'photos/2019/0912-roof.jpg', alt: '瓷砖墙上的两个人影' }],
        },
        {
          date: '12.08',
          text: '三水的摩天轮。',
          note: '黄昏上的。',
          photos: [{ src: 'photos/2019/1208-wheel.jpg', alt: '黄昏里的你' }],
        },
      ],
    },
    {
      year: '2020',
      line: '大半年没见。中间走散过一段。十月之后，还是在一起。',
      moments: [
        {
          date: '10.18',
          text: '十月，课室。',
          note: '你比了个耶，遮住一只眼。',
          photos: [{ src: 'photos/2020/1018-classroom.jpg', alt: '课室里你比了个耶' }],
        },
        {
          date: '11.05',
          text: '深圳，买口红。',
          note: '你把手背试成了一盘颜色。',
          photos: [{ src: 'photos/2020/1105-lipstick.jpg', alt: '手背上的口红试色' }],
        },
        {
          date: '11.07',
          text: '你把它 P 进了卡通里。',
          note: '让我设成朋友圈背景。',
          photos: [{ src: 'photos/2020/1107-cartoon.jpg', alt: '套着卡通画框的照片' }],
        },
        {
          date: '11.28',
          text: '三水，北江大堤。',
          note: '你举着一朵小花，背后是落日。',
          photos: [{ src: 'photos/2020/1128-dike.jpg', alt: '大堤上你举着一朵小花' }],
        },
        {
          date: '12.07',
          text: '我生日。',
          note: '学校天台，一人一根仙女棒。',
          photos: [{ src: 'photos/2020/1207-birthday.jpg', alt: '天台上两个人的仙女棒' }],
        },
        {
          date: '12.25',
          text: '圣诞节，你把草莓做成了小人。',
          note: '还给它们挨个起了名字。',
          photos: [{ src: 'photos/2020/1225-strawberry.jpg', alt: '做了表情的草莓' }],
        },
      ],
    },
    {
      year: '2021',
      line: '上半年在深圳，下半年搬到广州。',
      moments: [
        {
          date: '01.27',
          text: '冬天，在三水的店里试兔耳朵。',
          note: '背后一排哆啦A梦。',
          photos: [{ src: 'photos/2021/0127-shop.jpg', alt: '店里戴着兔耳朵的合照' }],
        },
        {
          date: '06.23',
          text: '封控那阵，临时住进学校的轰趴馆。',
          note: '你在铺床垫。',
          photos: [{ src: 'photos/2021/0623-mattress.jpg', alt: '地板上铺开的床垫' }],
        },
        {
          date: '07.09',
          text: '三水的竹筒饭。',
          note: '',
          photos: [{ src: 'photos/2021/0709-bamboo.jpg', alt: '一桌竹筒盛的菜' }],
        },
        {
          date: '07.26',
          text: '深圳，去滑冰。',
          note: '',
          photos: [{ src: 'photos/2021/0726-skates.jpg', alt: '两双冰鞋' }],
        },
        {
          date: '09.11',
          text: '宜家，买了一把手指玩偶。',
          note: '回公寓摆在床上，一人戴一手。',
          photos: [{ src: 'photos/2021/0911-puppets.jpg', alt: '手指上套满玩偶' }],
        },
        {
          date: '09.19',
          text: '吃完日料，在小区公园坐了一会儿。',
          note: '你坐在健身器材上。',
          photos: [{ src: 'photos/2021/0919-park.jpg', alt: '夜里坐在健身器材上' }],
        },
        {
          date: '10.21',
          text: '第一千天。',
          note: '出去逛了逛，照片拍下来的时候已经过了零点。',
          photos: [{ src: 'photos/2021/1021-thousand.jpg', alt: '夜里的半身合照' }],
        },
        {
          date: '10.30',
          text: '融创乐园，万圣节。',
          note: '脸上画了妆，站在霓虹灯底下。',
          photos: [{ src: 'photos/2021/1030-halloween.jpg', alt: '霓虹灯下化了妆的合照' }],
        },
        {
          date: '11.14',
          text: '江边，背后是广州塔。',
          note: '',
          photos: [{ src: 'photos/2021/1114-tower.jpg', alt: '江边自拍，背后是广州塔' }],
        },
      ],
    },
    {
      year: '2022',
      line: '这一年，光自助就吃了两顿。',
      moments: [
        {
          date: '01.17',
          text: '广州的自助。',
          note: '虾一直是我剥，干脆拿了一整盘。',
          photos: [{ src: 'photos/2022/0117-shrimp.jpg', alt: '一整盘虾' }],
        },
        {
          date: '05.02',
          text: '逛完学校北边的公园，突然想吃冰草。',
          note: '去玉宝轩，点了冰草和猪肝。挺好吃，也挺贵。吃到一半飞进来一只小虫，又重上了一份。',
          photos: [{ src: 'photos/2022/0502-liver.jpg', alt: '一盘猪肝和猪腰' }],
        },
        {
          date: '05.21',
          text: '一起在外面瞎转。',
          note: '',
          photos: [{ src: 'photos/2022/0521-selfie.jpg', alt: '加了恶魔角的合照' }],
        },
        {
          date: '10.26',
          text: '又是自助。',
          note: '新西兰鳌虾，剥好一盘，旁边还有飞鱼籽。',
          photos: [{ src: 'photos/2022/1026-prawn.jpg', alt: '剥好的鳌虾和一盘飞鱼籽' }],
        },
      ],
    },
  ],

  /* 最后收尾的三个动作 */
  finale: {
    hint: '还有最后一件事。',
    doorLine: '门后面好像有东西。',
    knockHint: '敲三下',
    knocks: ['咚……', '咚、咚……', '门开了。'],
    doorOpen: '里面是我。',
    choiceTitle: '不给糖，就捣蛋',
    choiceSub: '选一个。',
    treat: '给糖',
    trick: '捣蛋',
    treatLine: '给。糖都给你。',
    trickLine: '……算了，糖还是给你。',
    envelopeHint: '打开信',
  },

  /* ★ 那封信 —— 一行一段。你说要自己重写，这段先占着位 */
  letter: [
    '高中那几年，我们先是同学，后来是不太说话的同学。',
    '再聊起来是在运动会上。后面就快了。',
    '广州、江门、汕头、淡水、新丰、河南，还有格鲁吉亚和土耳其。都是跟你去的。',
    '我们的 wifi 叫猫狗之家。家里还没有猫，也没有狗。',
    '先这样吧。我们互为对方的猫狗。',
  ],

  daysFmt: '今天是在一起的第 {n} 天。',
  bye: '万圣节快乐，{name}。',
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
