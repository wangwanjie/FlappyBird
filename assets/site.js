/* 语言、主题切换与滚动渐入 */
(function () {
  "use strict";

  var I18N = {
    "zh-Hans": {
      "meta.title": "FlappyBird · 代码绘制的 iOS 像素小游戏",
      "meta.desc": "FlappyBird 是一款用 SpriteKit + UIKit 写成的 iOS Flappy 小游戏：代码绘制的小鸟、云和管道，5 档难度加自定义，本地榜与全球榜，代码合成的音乐音效。",
      "a.skip": "跳到正文",
      "a.home": "FlappyBird 首页",
      "a.lang": "切换语言",
      "a.github": "在 GitHub 查看 FlappyBird",
      "a.game": "可玩的迷你 FlappyBird：点击画面或按空格起跳",
      "a.icon": "FlappyBird 图标",
      "theme.light": "主题：浅色（点击切换）",
      "theme.dark": "主题：深色（点击切换）",
      "theme.system": "主题：跟随系统（点击切换）",
      "hero.alias": "主屏幕名称：Neon Gate",
      "hero.lead": "用 SpriteKit + UIKit 写成的 iOS Flappy 小游戏。小鸟、云朵和管道全部由代码绘制，5 档难度外加自定义，本地榜与全球榜，背景音乐和音效也由代码实时合成。",
      "hero.dl": "下载 IPA",
      "hero.gh": "GitHub",
      "hero.meta": "v1.1 · iOS 15.0+ · iPhone / iPad · Ad Hoc 签名，仅限已登记设备",
      "hero.try": "先在这里玩一局 →",
      "console.hint": "点击画面或按",
      "console.hint2": "起跳",
      "console.best": "本机最高",
      "game.tap": "点击 / 空格 起跳",
      "game.best": "最高",
      "game.over": "撞上了！",
      "game.score": "得分",
      "game.retry": "点击再来一局",
      "game.paused": "已暂停",
      "game.resume": "点击继续",
      "f.eyebrow": "游戏里有什么",
      "f.title": "一只代码画出来的鸟，和一整套小细节",
      "f.sub": "下面这些都能在 App 里找到，网页上的迷你版只还原了最核心的那一下起跳。",
      "f1.t": "代码绘制的场景",
      "f1.d": "小鸟、云朵、山丘、地面和管道都由 SpriteKit 形状节点实时绘制，场景里没有一张贴图。",
      "f2.t": "5 档难度 + 自定义",
      "f2.d": "从非常简单到地狱五档预设；自定义难度可调场景速度（0.85–1.30 倍）和上下管道间距（148–245）。",
      "f3.t": "10 款皮肤",
      "f3.d": "经典晴空、樱花春日、霓虹黄昏、月夜港湾等 10 款皮肤，各有自己的小鸟造型与背景装饰。前 2 款免费，其余为内购永久解锁。",
      "f4.t": "本地榜 + 全球榜",
      "f4.d": "本地榜按难度记录历史成绩；全球榜按难度展示，会缓存最近一次成功的结果，成功同步后冷却 10 分钟。",
      "f5.t": "代码合成的音乐音效",
      "f5.d": "9 种背景音乐和 9 种音效风格，都由代码实时合成。前 2 种免费，其余随内购解锁。",
      "f6.t": "运行时切换语言",
      "f6.d": "简体中文、繁體中文、English 或跟随系统，在设置里切换后界面立即刷新，不用重启。",
      "s.eyebrow": "截图",
      "s.title": "App 实机画面",
      "s.sub": "截图来自 iPhone 模拟器，使用「霓虹黄昏」皮肤。",
      "s1": "首页",
      "s2": "穿过能量门",
      "s3": "结算：得分、连击与最佳",
      "s4": "难度选择",
      "s1.alt": "FlappyBird 首页截图，霓虹黄昏皮肤",
      "s2.alt": "游戏中截图，小鸟正在穿过管道",
      "s3.alt": "一局结束后的结算面板截图",
      "s4.alt": "难度选择页截图，列出五档预设与自定义难度",
      "d.eyebrow": "难度",
      "d.title": "五档预设，外加自定义",
      "d.sub": "间距是上下管道之间的空隙，间隔是相邻两组管道出现的时间。",
      "d1": "非常简单",
      "d2": "简单",
      "d3": "普通",
      "d4": "困难",
      "d5": "地狱",
      "d.gap": "间距",
      "d.every": "间隔",
      "d.sec": "秒",
      "d.custom": "自定义难度：场景速度 0.85–1.30 倍，管道间距 148–245，都限制在验证过的安全范围内。",
      "i.eyebrow": "下载",
      "i.title": "下载与安装",
      "i.sub": "FlappyBird 没有上架 App Store，安装包只在 GitHub Releases 分享。",
      "i.alias": "主屏幕上显示为 Neon Gate",
      "i.version": "版本",
      "i.req": "系统要求",
      "i.reqv": "iOS 15.0 或更高",
      "i.device": "设备",
      "i.size": "大小",
      "i.sign": "签名",
      "i.signv": "Ad Hoc（描述文件有效期至 2027-04-05）",
      "i.dl": "下载 IPA",
      "i.all": "全部版本",
      "w.title": "安装限制，请先看这里",
      "w.p1": "这是 Ad Hoc 签名的安装包，只能安装在开发者描述文件里登记过的设备上，其他设备会安装失败。",
      "w.p2": "没有登记的设备可以尝试用 AltStore、Sideloadly 等工具以自己的 Apple ID 重新签名后安装，能否成功取决于工具和系统版本，这里不作保证。免费 Apple ID 的签名 7 天后过期；iOS 16 及以上运行自签应用需要打开开发者模式。",
      "w.p3": "描述文件 2027-04-05 到期，之后需要换用新版本。内购在这个安装包里的可用性未经验证。",
      "st1.t": "下载 IPA",
      "st1.d": "点上方按钮，或到 GitHub Releases 页面下载。",
      "st2.t": "用 Mac 装到设备上",
      "st2.d": "用数据线连接 iPhone 或 iPad，在访达侧栏选中设备，把 IPA 拖进设备窗口；也可以用 Apple Configurator 或 Xcode 的「设备与模拟器」窗口安装。",
      "st3.t": "打开 Neon Gate",
      "st3.d": "主屏幕出现 Neon Gate 图标后就能开玩。",
      "p.eyebrow": "隐私",
      "p.title": "成绩上传由你决定",
      "p1.t": "保存在本机",
      "p1.d": "历史成绩、难度、皮肤、音频和语言设置都保存在设备本地。",
      "p2.t": "全球榜上传需要满足条件",
      "p2.d": "只有设置了昵称、打开「成绩上传」、授权定位、网络可用且分数达到门槛时，才会上传一局成绩。上传内容包括昵称、分数、难度、用时、定位坐标与国家/地区、安装 ID 和 App 版本。",
      "p3.t": "会访问的网络服务",
      "p3.d": "全球榜读写走 neongate.vanjay.cn，App 还会拉取远程配置；地名反查可能用到 OpenStreetMap Nominatim。关掉「成绩上传」就不会进入全球榜。",
      "ft.more": "VanJay 的更多作品",
      "ft.repo": "GitHub 仓库",
      "ft.issue": "反馈问题"
    },
    "zh-Hant": {
      "meta.title": "FlappyBird · 程式繪製的 iOS 像素小遊戲",
      "meta.desc": "FlappyBird 是一款用 SpriteKit + UIKit 寫成的 iOS Flappy 小遊戲：程式繪製的小鳥、雲和水管，5 段難度加自訂，本機排行榜與全球榜，程式合成的音樂音效。",
      "a.skip": "跳到正文",
      "a.home": "FlappyBird 首頁",
      "a.lang": "切換語言",
      "a.github": "在 GitHub 檢視 FlappyBird",
      "a.game": "可以玩的迷你 FlappyBird：點一下畫面或按空白鍵起跳",
      "a.icon": "FlappyBird 圖示",
      "theme.light": "主題：淺色（點一下切換）",
      "theme.dark": "主題：深色（點一下切換）",
      "theme.system": "主題：跟隨系統（點一下切換）",
      "hero.alias": "主畫面名稱：Neon Gate",
      "hero.lead": "用 SpriteKit + UIKit 寫成的 iOS Flappy 小遊戲。小鳥、雲朵和水管全部由程式繪製，5 段難度外加自訂，本機排行榜與全球榜，背景音樂和音效也由程式即時合成。",
      "hero.dl": "下載 IPA",
      "hero.gh": "GitHub",
      "hero.meta": "v1.1 · iOS 15.0+ · iPhone / iPad · Ad Hoc 簽署，僅限已登錄裝置",
      "hero.try": "先在這裡玩一局 →",
      "console.hint": "點一下畫面或按",
      "console.hint2": "起跳",
      "console.best": "本機最高",
      "game.tap": "點一下 / 空白鍵 起跳",
      "game.best": "最高",
      "game.over": "撞到了！",
      "game.score": "得分",
      "game.retry": "點一下再來一局",
      "game.paused": "已暫停",
      "game.resume": "點一下繼續",
      "f.eyebrow": "遊戲裡有什麼",
      "f.title": "一隻程式畫出來的鳥，和一整套小細節",
      "f.sub": "下面這些都能在 App 裡找到，網頁上的迷你版只重現了最核心的那一下起跳。",
      "f1.t": "程式繪製的場景",
      "f1.d": "小鳥、雲朵、山丘、地面和水管都由 SpriteKit 形狀節點即時繪製，場景裡沒有一張貼圖。",
      "f2.t": "5 段難度 + 自訂",
      "f2.d": "從非常簡單到地獄五段預設；自訂難度可調整場景速度（0.85–1.30 倍）和上下水管間距（148–245）。",
      "f3.t": "10 款外觀",
      "f3.d": "經典晴空、櫻花春日、霓虹黃昏、月夜港灣等 10 款外觀，各有自己的小鳥造型與背景裝飾。前 2 款免費，其餘為 App 內購買永久解鎖。",
      "f4.t": "本機排行榜 + 全球榜",
      "f4.d": "本機排行榜依難度記錄歷史成績；全球榜依難度顯示，會快取最近一次成功的結果，同步成功後冷卻 10 分鐘。",
      "f5.t": "程式合成的音樂音效",
      "f5.d": "9 種背景音樂和 9 種音效風格，都由程式即時合成。前 2 種免費，其餘隨 App 內購買解鎖。",
      "f6.t": "執行中切換語言",
      "f6.d": "簡體中文、繁體中文、English 或跟隨系統，在設定裡切換後介面立即更新，不用重新啟動。",
      "s.eyebrow": "截圖",
      "s.title": "App 實機畫面",
      "s.sub": "截圖來自 iPhone 模擬器，使用「霓虹黃昏」外觀（介面為簡體中文）。",
      "s1": "首頁",
      "s2": "穿過能量門",
      "s3": "結算：得分、連擊與最佳",
      "s4": "難度選擇",
      "s1.alt": "FlappyBird 首頁截圖，霓虹黃昏外觀",
      "s2.alt": "遊戲中截圖，小鳥正在穿過水管",
      "s3.alt": "一局結束後的結算面板截圖",
      "s4.alt": "難度選擇頁截圖，列出五段預設與自訂難度",
      "d.eyebrow": "難度",
      "d.title": "五段預設，外加自訂",
      "d.sub": "間距是上下水管之間的空隙，間隔是相鄰兩組水管出現的時間。",
      "d1": "非常簡單",
      "d2": "簡單",
      "d3": "普通",
      "d4": "困難",
      "d5": "地獄",
      "d.gap": "間距",
      "d.every": "間隔",
      "d.sec": "秒",
      "d.custom": "自訂難度：場景速度 0.85–1.30 倍，水管間距 148–245，都限制在驗證過的安全範圍內。",
      "i.eyebrow": "下載",
      "i.title": "下載與安裝",
      "i.sub": "FlappyBird 沒有上架 App Store，安裝檔只在 GitHub Releases 分享。",
      "i.alias": "主畫面上顯示為 Neon Gate",
      "i.version": "版本",
      "i.req": "系統需求",
      "i.reqv": "iOS 15.0 或更新版本",
      "i.device": "裝置",
      "i.size": "大小",
      "i.sign": "簽署",
      "i.signv": "Ad Hoc（描述檔有效期限至 2027-04-05）",
      "i.dl": "下載 IPA",
      "i.all": "所有版本",
      "w.title": "安裝限制，請先看這裡",
      "w.p1": "這是 Ad Hoc 簽署的安裝檔，只能安裝在開發者描述檔裡登錄過的裝置上，其他裝置會安裝失敗。",
      "w.p2": "沒有登錄的裝置可以嘗試用 AltStore、Sideloadly 等工具以自己的 Apple ID 重新簽署後安裝，能否成功取決於工具和系統版本，這裡不作保證。免費 Apple ID 的簽署 7 天後過期；iOS 16 以上執行自簽 App 需要開啟開發者模式。",
      "w.p3": "描述檔 2027-04-05 到期，之後需要改用新版本。App 內購買在這個安裝檔裡的可用性未經驗證。",
      "st1.t": "下載 IPA",
      "st1.d": "點上方按鈕，或到 GitHub Releases 頁面下載。",
      "st2.t": "用 Mac 安裝到裝置",
      "st2.d": "用傳輸線連接 iPhone 或 iPad，在 Finder 側邊欄選取裝置，把 IPA 拖進裝置視窗；也可以用 Apple Configurator 或 Xcode 的「裝置與模擬器」視窗安裝。",
      "st3.t": "打開 Neon Gate",
      "st3.d": "主畫面出現 Neon Gate 圖示後就能開始玩。",
      "p.eyebrow": "隱私",
      "p.title": "成績上傳由你決定",
      "p1.t": "儲存在本機",
      "p1.d": "歷史成績、難度、外觀、音訊和語言設定都儲存在裝置本機。",
      "p2.t": "全球榜上傳需要符合條件",
      "p2.d": "只有設定了暱稱、開啟「成績上傳」、授權定位、網路可用且分數達到門檻時，才會上傳一局成績。上傳內容包括暱稱、分數、難度、用時、定位座標與國家/地區、安裝 ID 和 App 版本。",
      "p3.t": "會存取的網路服務",
      "p3.d": "全球榜讀寫走 neongate.vanjay.cn，App 也會拉取遠端設定；地名反查可能用到 OpenStreetMap Nominatim。關閉「成績上傳」就不會進入全球榜。",
      "ft.more": "VanJay 的更多作品",
      "ft.repo": "GitHub 儲存庫",
      "ft.issue": "回報問題"
    },
    "en": {
      "meta.title": "FlappyBird · A code-drawn Flappy game for iOS",
      "meta.desc": "FlappyBird is an iOS Flappy game built with SpriteKit + UIKit: a code-drawn bird, clouds and pipes, 5 difficulty presets plus custom, local and global leaderboards, and music synthesized in code.",
      "a.skip": "Skip to content",
      "a.home": "FlappyBird home",
      "a.lang": "Change language",
      "a.github": "View FlappyBird on GitHub",
      "a.game": "Playable mini FlappyBird: tap the screen or press Space to flap",
      "a.icon": "FlappyBird icon",
      "theme.light": "Theme: light (click to switch)",
      "theme.dark": "Theme: dark (click to switch)",
      "theme.system": "Theme: system (click to switch)",
      "hero.alias": "Home Screen name: Neon Gate",
      "hero.lead": "An iOS Flappy game built with SpriteKit + UIKit. The bird, clouds and pipes are all drawn in code, with 5 difficulty presets plus custom, local and global leaderboards, and background music and sound effects synthesized in real time.",
      "hero.dl": "Download IPA",
      "hero.gh": "GitHub",
      "hero.meta": "v1.1 · iOS 15.0+ · iPhone / iPad · Ad Hoc signed, registered devices only",
      "hero.try": "Play a round right here →",
      "console.hint": "Tap the screen or press",
      "console.hint2": "to flap",
      "console.best": "Best here",
      "game.tap": "Tap / Space to flap",
      "game.best": "Best",
      "game.over": "Bonk!",
      "game.score": "Score",
      "game.retry": "Tap to play again",
      "game.paused": "Paused",
      "game.resume": "Tap to resume",
      "f.eyebrow": "What's inside",
      "f.title": "A bird drawn in code, and a lot of little details",
      "f.sub": "Everything below lives in the app. The mini game on this page only recreates the core move: the flap.",
      "f1.t": "Scenes drawn in code",
      "f1.d": "The bird, clouds, hills, ground and pipes are SpriteKit shape nodes drawn at runtime. The scene uses no bitmap textures at all.",
      "f2.t": "5 presets + custom",
      "f2.d": "Five presets from Very Easy to Hell. Custom difficulty lets you tune scene speed (0.85–1.30×) and the pipe gap (148–245).",
      "f3.t": "10 skins",
      "f3.d": "Classic Sky, Sakura Spring, Sunset Neon, Moonlit Harbor and six more, each with its own bird design and backdrop. The first 2 are free; the rest unlock forever with an in-app purchase.",
      "f4.t": "Local + global boards",
      "f4.d": "The local board keeps your history per difficulty. The global board is per difficulty too, caches the last successful fetch, and cools down for 10 minutes after a sync.",
      "f5.t": "Music synthesized in code",
      "f5.d": "9 background music styles and 9 sound effect styles, all synthesized in real time. The first 2 of each are free; the rest unlock with the purchase.",
      "f6.t": "Switch language live",
      "f6.d": "Simplified Chinese, Traditional Chinese, English, or follow the system. The UI refreshes instantly, no restart needed.",
      "s.eyebrow": "Screenshots",
      "s.title": "The real app",
      "s.sub": "Captured in the iPhone simulator with the Sunset Neon skin.",
      "s1": "Home",
      "s2": "Through the energy gate",
      "s3": "Results: score, combo, best",
      "s4": "Difficulty picker",
      "s1.alt": "FlappyBird home screen with the Sunset Neon skin",
      "s2.alt": "Gameplay screenshot with the bird passing a pipe",
      "s3.alt": "Results panel after a run",
      "s4.alt": "Difficulty screen listing five presets and custom difficulty",
      "d.eyebrow": "Difficulty",
      "d.title": "Five presets, plus custom",
      "d.sub": "Gap is the space between the upper and lower pipe; interval is the time between two pipe pairs.",
      "d1": "Very Easy",
      "d2": "Easy",
      "d3": "Normal",
      "d4": "Hard",
      "d5": "Hell",
      "d.gap": "Gap",
      "d.every": "Every",
      "d.sec": "s",
      "d.custom": "Custom difficulty: scene speed 0.85–1.30×, pipe gap 148–245, both clamped to a tested safe range.",
      "i.eyebrow": "Download",
      "i.title": "Download & install",
      "i.sub": "FlappyBird is not on the App Store. Builds are shared through GitHub Releases only.",
      "i.alias": "Shows up as Neon Gate on the Home Screen",
      "i.version": "Version",
      "i.req": "Requires",
      "i.reqv": "iOS 15.0 or later",
      "i.device": "Devices",
      "i.size": "Size",
      "i.sign": "Signing",
      "i.signv": "Ad Hoc (profile valid until 2027-04-05)",
      "i.dl": "Download IPA",
      "i.all": "All releases",
      "w.title": "Install limits — read this first",
      "w.p1": "This IPA is Ad Hoc signed. It installs only on devices registered in the developer's provisioning profile; on any other device the install fails.",
      "w.p2": "On unregistered devices you can try re-signing it with your own Apple ID using tools such as AltStore or Sideloadly. Whether that works depends on the tool and iOS version, so no guarantees. Free Apple ID signatures expire after 7 days, and iOS 16 or later needs Developer Mode to run self-signed apps.",
      "w.p3": "The provisioning profile expires on 2027-04-05; after that you will need a newer build. In-app purchases have not been verified in this build.",
      "st1.t": "Download the IPA",
      "st1.d": "Use the button above or grab it from GitHub Releases.",
      "st2.t": "Install it from a Mac",
      "st2.d": "Connect your iPhone or iPad, select it in the Finder sidebar and drag the IPA into its window. Apple Configurator or Xcode's Devices and Simulators window work too.",
      "st3.t": "Open Neon Gate",
      "st3.d": "Once the Neon Gate icon appears on your Home Screen, you're ready to play.",
      "p.eyebrow": "Privacy",
      "p.title": "Score uploads are your call",
      "p1.t": "Stored on device",
      "p1.d": "Score history, difficulty, skin, audio and language settings are stored locally on your device.",
      "p2.t": "Global uploads need your opt-in",
      "p2.d": "A run is uploaded only when you have set a nickname, turned on Score Uploads, granted location access, are online, and scored above the threshold. The upload contains nickname, score, difficulty, duration, location coordinates with country/region, an install ID and the app version.",
      "p3.t": "Network services used",
      "p3.d": "The global board talks to neongate.vanjay.cn, and the app also fetches remote configuration. Place names may be looked up via OpenStreetMap Nominatim. Turn off Score Uploads to stay off the global board.",
      "ft.more": "More apps by VanJay",
      "ft.repo": "GitHub repository",
      "ft.issue": "Send feedback"
    }
  };

  var root = document.documentElement;
  var LANG_KEY = "flappybird-lang";
  var THEME_KEY = "flappybird-theme";
  var params = new URLSearchParams(location.search);
  var darkMQ = window.matchMedia("(prefers-color-scheme: dark)");
  var lang = "zh-Hans";
  var themePref = "system";

  function store(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      // 无法写入时忽略
    }
  }

  function read(key) {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  }

  // 把各种写法归一成三种语言之一
  function normalizeLang(v) {
    if (!v) {
      return null;
    }
    v = String(v).toLowerCase();
    if (v === "en" || v.indexOf("en-") === 0) {
      return "en";
    }
    if (/^zh[-_](tw|hk|mo|hant)/.test(v) || v === "tw" || v === "zh-hant") {
      return "zh-Hant";
    }
    if (v.indexOf("zh") === 0 || v === "cn") {
      return "zh-Hans";
    }
    return null;
  }

  function detectLang() {
    var fromParam = normalizeLang(params.get("lang"));
    if (fromParam) {
      return fromParam;
    }
    var saved = normalizeLang(read(LANG_KEY));
    if (saved) {
      return saved;
    }
    var list = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || "en"];
    for (var i = 0; i < list.length; i++) {
      var l = String(list[i]).toLowerCase();
      if (l.indexOf("zh") === 0) {
        return normalizeLang(l) || "zh-Hans";
      }
      if (l.indexOf("en") === 0) {
        return "en";
      }
    }
    return "en";
  }

  window.FB_I18N = function () {
    return I18N[lang];
  };

  function applyLang(next, persist) {
    lang = next;
    var dict = I18N[lang];
    root.setAttribute("lang", lang === "en" ? "en" : lang);
    document.title = dict["meta.title"];
    var desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute("content", dict["meta.desc"]);
    }
    var ogt = document.querySelector('meta[property="og:title"]');
    if (ogt) {
      ogt.setAttribute("content", dict["meta.title"]);
    }
    var ogd = document.querySelector('meta[property="og:description"]');
    if (ogd) {
      ogd.setAttribute("content", dict["meta.desc"]);
    }
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var v = dict[el.getAttribute("data-i18n")];
      if (v) {
        el.textContent = v;
      }
    });
    document.querySelectorAll("[data-i18n-alt]").forEach(function (el) {
      el.setAttribute("alt", dict[el.getAttribute("data-i18n-alt")] || "");
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      el.setAttribute("aria-label", dict[el.getAttribute("data-i18n-aria")] || "");
    });
    // 截图按语言切换（繁体沿用简体中文界面截图）
    var shotLang = lang === "en" ? "en" : "zh";
    document.querySelectorAll("img[data-shot]").forEach(function (img) {
      var name = img.getAttribute("data-shot");
      var base = "assets/shots/" + shotLang + "-" + name;
      img.setAttribute("src", base + "-320.webp");
      img.setAttribute("srcset", base + "-320.webp 320w, " + base + "-640.webp 640w");
    });
    document.querySelectorAll("[data-lang-btn]").forEach(function (btn) {
      btn.setAttribute("aria-pressed", btn.getAttribute("data-lang-btn") === lang ? "true" : "false");
    });
    updateThemeButton();
    if (persist) {
      store(LANG_KEY, lang);
    }
    window.dispatchEvent(new Event("fb:refresh"));
  }

  function resolvedTheme() {
    if (themePref === "light" || themePref === "dark") {
      return themePref;
    }
    return darkMQ.matches ? "dark" : "light";
  }

  function applyTheme() {
    var theme = resolvedTheme();
    root.setAttribute("data-theme", theme);
    root.setAttribute("data-theme-pref", themePref);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute("content", theme === "dark" ? "#0b1533" : "#6fc3f7");
    }
    updateThemeButton();
    window.dispatchEvent(new Event("fb:refresh"));
  }

  var ICONS = {
    light: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8"/></svg>',
    dark: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 14.6A8.5 8.5 0 0 1 9.4 3.5a8.5 8.5 0 1 0 11.1 11.1z"/></svg>',
    system: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><circle cx="12" cy="12" r="8.5"/><path d="M12 3.5v17A8.5 8.5 0 0 0 12 3.5z" fill="currentColor"/></svg>'
  };

  function updateThemeButton() {
    var btn = document.getElementById("theme-btn");
    if (!btn) {
      return;
    }
    btn.innerHTML = ICONS[themePref];
    var label = I18N[lang]["theme." + themePref];
    btn.setAttribute("aria-label", label);
    btn.setAttribute("title", label);
  }

  function init() {
    root.classList.add("js");
    var p = params.get("theme");
    if (p === "light" || p === "dark" || p === "system") {
      themePref = p;
    } else {
      var saved = read(THEME_KEY);
      themePref = saved === "light" || saved === "dark" ? saved : "system";
    }
    applyTheme();
    applyLang(detectLang(), false);

    document.querySelectorAll("[data-lang-btn]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        applyLang(btn.getAttribute("data-lang-btn"), true);
      });
    });

    var themeBtn = document.getElementById("theme-btn");
    if (themeBtn) {
      themeBtn.addEventListener("click", function () {
        var order = ["system", "light", "dark"];
        themePref = order[(order.indexOf(themePref) + 1) % order.length];
        store(THEME_KEY, themePref);
        applyTheme();
      });
    }

    var onScheme = function () {
      if (themePref === "system") {
        applyTheme();
      }
    };
    if (darkMQ.addEventListener) {
      darkMQ.addEventListener("change", onScheme);
    } else if (darkMQ.addListener) {
      darkMQ.addListener(onScheme);
    }

    // 滚动渐入
    var items = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
      items.forEach(function (el) {
        io.observe(el);
      });
    } else {
      items.forEach(function (el) {
        el.classList.add("in");
      });
    }

    var y = document.getElementById("year");
    if (y) {
      y.textContent = String(new Date().getFullYear());
    }
  }

  init();
})();
