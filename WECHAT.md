# 做成微信小程序，可不可行？

核查时间：2026-10-27。以下全部来自微信官方文档，末尾附来源。

## 一句话结论

**「不备案、不花钱」做小程序，做不到。** 备案是上架的前置条件，个人认证是「能被分享、被搜索、能发新版本」的前置条件。

但有个零成本的例外：**体验版最多 15 个人**，开发期可以免费跑。

## 先说三个你关心的

### 1. 头像昵称要收费吗？

**不收费。** 但也不能「静默获取」。

- `wx.getUserProfile`、`wx.getUserInfo`、`open-data` 都已被官方回收，现在调用只会返回「微信用户」和灰色头像。
- 唯一合规方式：`<button open-type="chooseAvatar">` 让用户点头像，`<input type="nickname">` 让用户确认昵称。用户主动操作，微信会顺手填上他的头像和昵称，他点一下就行。
- 这两个组件**不需要 300 元认证**，个人主体也能用。
- 真正免费无感的只有 **openid**：`wx.login()` + 云函数就能拿到，用户完全不用授权。用它做唯一 ID，昵称头像让用户点一次，摩擦已经很低了。

> 参考产品：报名工具、群接龙这些成熟产品，都没有把「拿微信头像」当报名前提，而是让用户填个名字，下次自动填充。

### 2. 活动提醒能推到微信群吗？

**能，但只有一条路：小程序「一次性订阅消息」。**

- 用户在报名时点一次同意 → 你可以在之后任意时间给他发 **1 条**通知（官方原文：「不限时间地下发一条」）。
- 想发第二条，就得再让用户点一次。可以在创建活动时一次申请 2～3 个模板（最多 5 个）。
- **长期订阅消息用不了**：只对政务民生、医疗、交通、金融、教育开放，朋友聚会不在范围内。
- 服务号模板消息也用不了：个人主体一般只能注册订阅号，服务号需要企业认证。

所以「报名成功通知 + 活动开始前提醒」这个链路是成立的，但每个通知都要用户点过一次同意。

### 3. 备案和认证

| 项目 | 结论 |
|---|---|
| ICP 备案 | **必须**。没备案上架直接报错 `errcode 86369` |
| 备案费用 | 免费 |
| 个人能备案吗 | 能，个人主体上限 5 个小程序 |
| 备案要多久 | 平台初审 1–2 天 + 短信核验 + 管局 1–20 个工作日，通常 1–4 周 |
| 个人认证 | 约 **30 元/年**（企业认证 300 元/年） |
| 不认证会怎样 | 官方会回收「被搜索、分享」能力，长期未认证无法发布新版本 |
| 云开发 | 开发期免费 6 个月；**上线后第 15 天到期**，之后 19.9 元/月起 |

## 三条可选路径

### 路径 A：零成本验证（推荐先走这条）

用**体验版**，最多邀请 15 个体验成员。

- 不需要备案、不需要认证、云开发开发期免费
- 足够你和最核心的那几个朋友用一个月，验证「这个交互到底顺不顺」
- 限制：不能公开分享、不能被搜索、最多 15 人

### 路径 B：正式上线

- 备案（免费，1–4 周）
- 个人认证（约 30 元/年）
- 云开发（19.9 元/月起）
- 合计约 **30 元/年 + 240 元/年**

### 路径 C：不做小程序，就用现在这个网页

- 现在这个 demo 已经在 GitHub Pages 上，**不需要备案**
- 链接可以直接发微信群，点开就能用
- 数据不互通（每台设备各存各的）
- 适合「先给朋友看看这个想法」，不适合真的长期当工具用

## 我的建议

1. **现在**：先用这个网页 demo 给朋友看，收集反馈。零成本。
2. **验证有需求后**：做小程序体验版（≤15 人），把真实使用流程跑通。
3. **真的每天用**：再走备案 + 认证，这时候 30 元/年 + 19.9 元/月不算什么。

## 来源

- 获取头像昵称：https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/userProfile.html
- 隐私接口对照（旧接口已回收）：https://developers.weixin.qq.com/miniprogram/dev/framework/user-privacy/miniprogram-intro.html
- 登录 / openid：https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/login.html
- 订阅消息总览：https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/subscribe-message-overview.html
- requestSubscribeMessage：https://developers.weixin.qq.com/miniprogram/dev/api/open-api/subscribe-message/wx.requestSubscribeMessage.html
- 小程序备案指引：https://developers.weixin.qq.com/miniprogram/product/record/record_guidelines.html
- 备案 FAQ（errcode 86369）：https://developers.weixin.qq.com/miniprogram/product/record/record_faq.html
- 微信认证指引：https://developers.weixin.qq.com/miniprogram/product/renzheng.html
- 云开发计费：https://developers.weixin.qq.com/miniprogram/dev/wxcloudservice/wxcloud/billing/price.html
- 群工具：https://kf.qq.com/touch/sappfaq/220516UNrUfq2205163I3quU.html
- 聊天工具（需交易保障/社交类目）：https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/chatToolOpenMode.html
