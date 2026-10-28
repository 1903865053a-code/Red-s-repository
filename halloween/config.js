/* =============================================================
   小卡片 · 配置文件
   -------------------------------------------------------------
   你只需要改这一个文件，改完保存、刷新网页就能看到。

   ① 改称呼 / 落款        → 下面 SITE 里的 herName / signature
   ② 换节日（以后不过万圣节了）→ 把 SITE.theme 改成 'christmas' 或 'valentine'
   ③ 改文案               → 下面 THEMES 里对应主题的 copy
   ④ 加一句「在一起第几天」 → 把 startDate 填成 2024-10-31 这样
   ============================================================= */

const SITE = {
  /* ★ 她的称呼：会出现在封面、信里和结尾 */
  herName: '哈基米',

  /* ★ 信的落款 */
  signature: '爱你的',

  /* ★ 可选：落款后面接的名字。留空就只有「爱你的」 */
  fromName: '',

  /* ★ 可选：在一起的第一天，写成 2025-10-31 这样。
        填了会在信的末尾多一行「今天是在一起的第 N 天」。
        不想显示就留空 '' */
  startDate: '',

  /* ★ 主题：'halloween'（万圣节）| 'christmas'（圣诞）| 'valentine'（情人节） */
  theme: 'halloween',

  /* ★ 一开始是否有声音（右上角随时可以关） */
  sound: true,
};

/* =============================================================
   下面是三套主题。原理：颜色、粒子、点亮的物件、全部文案
   都放在一起，换主题 = 换一组数据，不用动代码。
   ============================================================= */

const THEMES = {
  /* ---------------- 万圣节 ---------------- */
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

    copy: {
      toLabel: 'TO',
      coverKicker: '十月三十一日 · 夜',
      coverTitle: '不给糖就捣蛋',
      coverSub: '今天是万圣节。\n我在路上藏了五盏南瓜灯。',
      start: '点亮第一盏',

      lanternHint: '点亮 0 / 5',
      lanternHintFmt: '点亮 {n} / 5',
      lanternIntro: '一盏一盏，点亮它们。',
      lanternLines: [
        '第一盏，给你照路。',
        '第二盏，给你暖手。',
        '第三盏……你把糖藏哪了？',
        '第四盏，替我抱你一下。',
        '第五盏也亮了。前面有扇门。',
      ],

      doorLine: '门后面好像有东西。',
      doorHint: '敲三下',
      doorKnocks: ['咚……', '咚、咚……', '门开了。'],
      doorOpenLine: '里面是我。',

      choiceTitle: '不给糖，就捣蛋',
      choiceSub: '选一个。',
      treat: '给糖',
      trick: '捣蛋',
      treatLine: '乖。糖都给你，人也给你。',
      trickLine: '……算了，糖还是给你。',

      letterHint: '还有最后一件事。',
      letterOpen: '打开',
      letter: [
        '万圣节的糖会吃完，南瓜灯也会熄。',
        '但我想给你的这份，不会。',
        '不只是今天。',
        '以后每一年的这一天，我都想陪你过。',
        '万圣节也好，别的什么日子也好。',
      ],
      daysFmt: '今天是在一起的第 {n} 天。',

      bye: '万圣节快乐，{name}。',
      replay: '再看一遍',
    },
  },

  /* ---------------- 圣诞 ---------------- */
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

    copy: {
      toLabel: 'TO',
      coverKicker: '十二月二十五日 · 夜',
      coverTitle: '圣诞快乐',
      coverSub: '今晚我点了五盏小灯。\n一盏一句，慢慢看。',
      start: '点亮第一盏',

      lanternHint: '点亮 0 / 5',
      lanternHintFmt: '点亮 {n} / 5',
      lanternIntro: '一盏一盏，点亮它们。',
      lanternLines: [
        '第一盏，给你照路。',
        '第二盏，给你暖手。',
        '第三盏……袜子挂好了吗？',
        '第四盏，替我抱你一下。',
        '第五盏也亮了。前面有扇门。',
      ],

      doorLine: '门后面好像有东西。',
      doorHint: '敲三下',
      doorKnocks: ['咚……', '咚、咚……', '门开了。'],
      doorOpenLine: '里面是我。',

      choiceTitle: '要礼物，还是捣蛋',
      choiceSub: '选一个。',
      treat: '要礼物',
      trick: '捣蛋',
      treatLine: '乖。礼物给你，人也给你。',
      trickLine: '……算了，礼物还是给你。',

      letterHint: '还有最后一件事。',
      letterOpen: '打开',
      letter: [
        '雪会停，灯会灭，热闹也会散。',
        '但我想给你的这份，不会。',
        '不只是今天。',
        '以后每一年的这一天，我都想陪你过。',
        '圣诞节也好，别的什么日子也好。',
      ],
      daysFmt: '今天是在一起的第 {n} 天。',

      bye: '圣诞快乐，{name}。',
      replay: '再看一遍',
    },
  },

  /* ---------------- 情人节 ---------------- */
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

    copy: {
      toLabel: 'TO',
      coverKicker: '二月十四日 · 夜',
      coverTitle: '今天想见你',
      coverSub: '我点了五盏小灯。\n一盏一句，慢慢看。',
      start: '点亮第一盏',

      lanternHint: '点亮 0 / 5',
      lanternHintFmt: '点亮 {n} / 5',
      lanternIntro: '一盏一盏，点亮它们。',
      lanternLines: [
        '第一盏，给你照路。',
        '第二盏，给你暖手。',
        '第三盏……你今天有点好看。',
        '第四盏，替我抱你一下。',
        '第五盏也亮了。前面有扇门。',
      ],

      doorLine: '门后面好像有东西。',
      doorHint: '敲三下',
      doorKnocks: ['咚……', '咚、咚……', '门开了。'],
      doorOpenLine: '里面是我。',

      choiceTitle: '要花，还是捣蛋',
      choiceSub: '选一个。',
      treat: '要花',
      trick: '捣蛋',
      treatLine: '乖。花给你，人也给你。',
      trickLine: '……算了，花还是给你。',

      letterHint: '还有最后一件事。',
      letterOpen: '打开',
      letter: [
        '花会谢，灯会灭，热闹也会散。',
        '但我想给你的这份，不会。',
        '不只是今天。',
        '以后每一年的这一天，我都想陪你过。',
        '情人节也好，别的什么日子也好。',
      ],
      daysFmt: '今天是在一起的第 {n} 天。',

      bye: '情人节快乐，{name}。',
      replay: '再看一遍',
    },
  },
};
