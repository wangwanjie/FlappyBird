<p align="center">
  <img src="assets/icon-128.webp" width="96" height="96" alt="FlappyBird icon">
</p>

<h1 align="center">FlappyBird</h1>

<p align="center">
  用 SpriteKit + UIKit 写成的 iOS Flappy 小游戏 · 主屏幕名称 <b>Neon Gate</b><br>
  主页（可以直接在网页上玩一局）：<a href="https://flappybird.vanjay.cn">flappybird.vanjay.cn</a>
</p>

<p align="center"><a href="#english">English</a> · 简体中文</p>

<p align="center">
  <img src="assets/shots/zh-home-320.webp" width="200" alt="首页">
  <img src="assets/shots/zh-play-320.webp" width="200" alt="游戏中">
  <img src="assets/shots/zh-over-320.webp" width="200" alt="结算">
  <img src="assets/shots/zh-difficulty-320.webp" width="200" alt="难度选择">
</p>

## 介绍

- 小鸟、云朵、山丘、地面和管道全部由代码绘制，场景里没有贴图
- 5 档预设难度（非常简单 / 简单 / 普通 / 困难 / 地狱）+ 自定义难度，可调场景速度（0.85–1.30 倍）和上下管道间距（148–245）
- 10 款皮肤，各有自己的小鸟造型与背景装饰；前 2 款免费，其余为内购永久解锁
- 本地排行榜 + 全球榜；全球榜按难度展示，缓存最近一次成功结果，成功同步后冷却 10 分钟
- 9 种背景音乐、9 种音效风格，都由代码实时合成；前 2 种免费
- 运行时切换语言：简体中文、繁體中文、English、跟随系统

## 下载与安装

FlappyBird 没有上架 App Store，安装包只在 [GitHub Releases](https://github.com/wangwanjie/FlappyBird/releases) 分享。

- 直接下载最新版：[FlappyBird.ipa](https://github.com/wangwanjie/FlappyBird/releases/latest/download/FlappyBird.ipa)
- 系统要求：iOS 15.0 或更高，iPhone / iPad

> [!IMPORTANT]
> **安装限制**：安装包是 Ad Hoc 签名，只能装在开发者描述文件里登记过的设备上，其他设备会安装失败。描述文件 2027-04-05 到期，之后需要换用新版本。
>
> 没有登记的设备可以尝试用 AltStore、Sideloadly 等工具以自己的 Apple ID 重新签名后安装，能否成功取决于工具和系统版本，这里不作保证。免费 Apple ID 的签名 7 天后过期；iOS 16 及以上运行自签应用需要打开开发者模式。内购在这个安装包里的可用性未经验证。

已登记设备的安装方法：用数据线连接 iPhone / iPad，在 Mac 的访达侧栏选中设备，把 IPA 拖进设备窗口；也可以用 Apple Configurator 或 Xcode 的「设备与模拟器」窗口安装。主屏幕上显示为 **Neon Gate**。

## 隐私

- 历史成绩、难度、皮肤、音频和语言设置保存在设备本地。
- 只有设置了昵称、打开「成绩上传」、授权定位、网络可用且分数达到门槛时，才会上传一局成绩到全球榜。上传内容包括昵称、分数、难度、用时、定位坐标与国家/地区、安装 ID 和 App 版本。
- 全球榜读写走 `neongate.vanjay.cn`，App 还会拉取远程配置；地名反查可能用到 OpenStreetMap Nominatim。关掉「成绩上传」就不会进入全球榜。

## 反馈

问题和建议请提交到 [Issues](https://github.com/wangwanjie/FlappyBird/issues)。更多作品见 [vanjay.cn](https://vanjay.cn)。

---

<a id="english"></a>

## English

FlappyBird is an iOS Flappy game built with SpriteKit + UIKit. It shows up as **Neon Gate** on the Home Screen. You can play a mini version right on the homepage: [flappybird.vanjay.cn](https://flappybird.vanjay.cn).

**Features**

- The bird, clouds, hills, ground and pipes are all drawn in code — no bitmap textures in the scene
- 5 difficulty presets (Very Easy / Easy / Normal / Hard / Hell) plus custom difficulty with adjustable scene speed (0.85–1.30×) and pipe gap (148–245)
- 10 skins, each with its own bird design and backdrop; the first 2 are free, the rest unlock forever with an in-app purchase
- Local leaderboard + global leaderboard (per difficulty, cached, 10-minute cooldown after a successful sync)
- 9 background music styles and 9 sound effect styles synthesized in real time; the first 2 of each are free
- Live language switching: Simplified Chinese, Traditional Chinese, English, or follow the system

**Download & install**

FlappyBird is not on the App Store. Builds are shared through [GitHub Releases](https://github.com/wangwanjie/FlappyBird/releases) only. Latest build: [FlappyBird.ipa](https://github.com/wangwanjie/FlappyBird/releases/latest/download/FlappyBird.ipa). Requires iOS 15.0 or later on iPhone or iPad.

> [!IMPORTANT]
> The IPA is **Ad Hoc signed**: it installs only on devices registered in the developer's provisioning profile, and the profile expires on 2027-04-05. On other devices you can try re-signing it with your own Apple ID via AltStore or Sideloadly; success depends on the tool and iOS version, so no guarantees. Free Apple ID signatures expire after 7 days, and iOS 16 or later needs Developer Mode for self-signed apps. In-app purchases have not been verified in this build.

On a registered device: connect it to a Mac, select it in the Finder sidebar and drag the IPA into its window, or use Apple Configurator or Xcode's Devices and Simulators window.

**Privacy**

Scores and settings are stored on the device. A run is uploaded to the global leaderboard only when you have set a nickname, turned on Score Uploads, granted location access, are online and scored above the threshold; the upload contains nickname, score, difficulty, duration, location coordinates with country/region, an install ID and the app version. The app talks to `neongate.vanjay.cn`, fetches remote configuration, and may look up place names via OpenStreetMap Nominatim.

**Feedback**: [Issues](https://github.com/wangwanjie/FlappyBird/issues) · More apps: [vanjay.cn](https://vanjay.cn)

© VanJay
