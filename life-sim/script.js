'use strict';

// ===========================
// 目標データ
// ===========================

const GOALS = {
  wealth:    { name: '富を築く',    desc: '財産を80以上にする',                        check: (s)       => s.stats.wealth    >= 80 },
  family:    { name: '幸せな家族',  desc: '結婚・子供・幸福70以上',                    check: (s)       => s.triggered.has('marriage') && s.triggered.has('child_born') && s.stats.happiness >= 70 },
  longevity: { name: '健康長寿',    desc: '80歳まで健康（健康55以上）で生きる',         check: (s, c)    => c === 'end' && s.stats.health >= 55 },
  career:    { name: '社会的成功',  desc: '管理職に就き、縁を70以上にする',            check: (s)       => s.triggered.has('manager') && s.stats.social >= 70 },
  freedom:   { name: '自由な人生',  desc: '幸福を75以上にする',                        check: (s)       => s.stats.happiness >= 75 },
};


// ===========================
// フィラーテキスト（毎年の空白を埋める）
// ===========================

const FILLER = {
  child: [
    '好きな漫画を夢中で読んだ。続きが気になって眠れなかった。',
    'クラスで流行りの遊びにどっぷりはまった。',
    '給食のカレーライスの日だけを楽しみに登校した。',
    '初めて自転車で遠くまで行けた。達成感があった。',
    '図書館で本を読み漁った。知らない世界が広がった。',
    'おこづかいで何を買うか真剣に悩んだ一年だった。',
  ],
  teen: [
    '音楽にどっぷりはまった時期があった。',
    '深夜にこっそりゲームをして怒られた。',
    '将来のことを漠然と考えた夜があった。',
    'SNSに時間を溶かした一年だった。',
    '好きな芸能人にすごくハマっていた。',
    '友達と深夜まで語り合った夏の夜があった。',
  ],
  young: [
    'ひとりで旅行に行き、思いがけず気持ちが楽になった。',
    '引っ越しを考えたが、結局やめた。',
    '健康的な生活を目指して三日坊主になった。',
    '昔の日記を見つけて、恥ずかしくなった。',
    '好きな映画に何度も通った。',
    '新しい料理にはまって、毎週末に作り続けた。',
  ],
  adult: [
    '疲れた夜に、ふと夜空を見上げた。',
    '旬の食材で料理をして、少し満足した。',
    '久しぶりに子供の頃の音楽を聴いた。',
    '同期の近況を聞いて、複雑な気持ちになった。',
    'スマートフォンの写真を整理したら、懐かしい顔が並んでいた。',
    '週末に映画を観た。感想を話せる人がいなかった。',
  ],
  middle: [
    '体力の衰えを感じる場面があった。',
    '昔の写真を見て、時間の速さに驚いた。',
    '健康のために野菜を意識して食べ始めた。',
    '近所に新しい店ができた。意外と気に入った。',
    'ふと立ち止まって、自分の人生を振り返った。',
    '昔の友人のことを突然思い出した。',
  ],
  elder: [
    'テレビを見ながら、昔をしみじみ懐かしんだ。',
    '散歩の途中で知らない猫に出会った。',
    '天気のいい日に縁側でゆっくりお茶を飲んだ。',
    '若い世代の話についていくのが大変になってきた。',
    '夜、なかなか眠れない日が増えた。',
    '生きてきた証を、何か形に残したいと思った。',
  ],
};

function getFiller(age) {
  let pool;
  if      (age < 13) pool = FILLER.child;
  else if (age < 19) pool = FILLER.teen;
  else if (age < 28) pool = FILLER.young;
  else if (age < 50) pool = FILLER.adult;
  else if (age < 65) pool = FILLER.middle;
  else               pool = FILLER.elder;
  return pool[Math.floor(Math.random() * pool.length)];
}


// ===========================
// イベントデータ
// ===========================

const EVENTS = [

  // --- 誕生（0歳）---
  { id: 'birth_rich',   ageMin:0, ageMax:0, once:true, probability:1.0, condition:{background:'rich'},
    text:'裕福な家庭の子として生まれた。広い家に両親の笑顔があった。', tone:'milestone',
    effects:{health:10, happiness:10, wealth:25, social:0} },
  { id: 'birth_normal', ageMin:0, ageMax:0, once:true, probability:1.0, condition:{background:'normal'},
    text:'ごく普通の家庭に生まれた。豊かでも貧しくもない、穏やかな始まりだった。', tone:'milestone',
    effects:{health:5, happiness:5, wealth:0, social:0} },
  { id: 'birth_poor',   ageMin:0, ageMax:0, once:true, probability:1.0, condition:{background:'poor'},
    text:'貧しい家庭に生まれた。狭い家の中で、それでも両親は精一杯愛してくれた。', tone:'milestone',
    effects:{health:-5, happiness:0, wealth:-15, social:0} },
  { id: 'birth_rural',  ageMin:0, ageMax:0, once:true, probability:1.0, condition:{location:'rural'},
    text:'自然豊かな地方の、静かな土地で育ちはじめた。', tone:'neutral',
    effects:{health:5, happiness:0, wealth:0, social:0} },
  { id: 'birth_urban',  ageMin:0, ageMax:0, once:true, probability:1.0, condition:{location:'urban'},
    text:'賑やかな都市の一角で、車の音と人の声に包まれて育ちはじめた。', tone:'neutral',
    effects:{health:0, happiness:5, wealth:0, social:5} },

  // --- 乳幼児 ---
  { id: 'first_steps', ageMin:1, ageMax:1, once:true, probability:1.0,
    text:'初めて一人で歩いた。両親が手を叩いて喜んでくれた。', tone:'milestone',
    effects:{health:0, happiness:10, wealth:0, social:5} },
  { id: 'toddler_play', ageMin:2, ageMax:3, probability:0.6,
    text:'近所の子と砂場で遊んだ。泥だらけになって帰ると怒られた。', tone:'positive',
    effects:{health:5, happiness:10, wealth:0, social:10} },

  // --- 幼稚園 ---
  { id: 'kindergarten', ageMin:4, ageMax:4, once:true, probability:1.0,
    text:'幼稚園に入った。初めて親と離れる朝、泣いてしまった。', tone:'milestone',
    effects:{health:0, happiness:5, wealth:0, social:10} },
  { id: 'first_friend', ageMin:4, ageMax:6, once:true, probability:0.65,
    text:'幼稚園で初めての親友ができた。毎日一緒に走り回った。', tone:'positive',
    effects:{health:0, happiness:15, wealth:0, social:15} },
  { id: 'injury_small', ageMin:3, ageMax:6, probability:0.4,
    text:'遊んでいて転び、膝を擦りむいた。泣きながらもばんそうこうを貼ってもらった。', tone:'neutral',
    effects:{health:-3, happiness:-3, wealth:0, social:0} },
  { id: 'rural_field', ageMin:4, ageMax:6, probability:0.65, condition:{location:'rural'},
    text:'田んぼのあぜ道をかけ回り、虫や草花と友達になった。', tone:'positive',
    effects:{health:8, happiness:12, wealth:0, social:5} },

  // --- 小学生 ---
  { id: 'elementary_start', ageMin:7, ageMax:7, once:true, probability:1.0,
    text:'小学校に入学した。新しいランドセルを背負い、胸がどきどきした。', tone:'milestone',
    effects:{health:0, happiness:10, wealth:-5, social:10} },
  { id: 'sports_day', ageMin:8, ageMax:11, probability:0.3,
    text:'運動会でリレーの選手に選ばれた。全力で走り、チームは3位だった。', tone:'positive',
    effects:{health:5, happiness:15, wealth:0, social:10} },
  { id: 'study_success', ageMin:8, ageMax:12, probability:0.25,
    text:'テストで満点を取った。先生に褒められ、少し自信がついた。', tone:'positive',
    effects:{health:0, happiness:12, wealth:0, social:5} },
  { id: 'study_fail', ageMin:8, ageMax:12, probability:0.2,
    text:'テストで悪い点を取ってしまった。親に怒られ、しょんぼりした夜だった。', tone:'negative',
    effects:{health:0, happiness:-10, wealth:0, social:-3} },
  { id: 'pet_death', ageMin:7, ageMax:12, probability:0.15,
    text:'飼っていた金魚が死んだ。初めて「死」を身近に感じた日だった。', tone:'negative',
    effects:{health:0, happiness:-12, wealth:0, social:-3} },
  { id: 'bully', ageMin:8, ageMax:12, probability:0.1, condition:{maxSocial:40},
    text:'クラスで仲間外れにされた時期があった。学校に行くのが辛かった。', tone:'negative',
    effects:{health:-5, happiness:-20, wealth:0, social:-15} },
  { id: 'juku', ageMin:9, ageMax:12, once:true, probability:0.45, condition:{background:'rich', location:'urban'},
    text:'塾に通い始めた。放課後も勉強漬けの日々だったが、少しずつ力がついた。', tone:'neutral',
    effects:{health:-3, happiness:-5, wealth:-8, social:0} },
  { id: 'river_play', ageMin:7, ageMax:12, probability:0.5, condition:{location:'rural'},
    text:'近所の川でザリガニを捕まえた。夏の日の宝物になった。', tone:'positive',
    effects:{health:8, happiness:15, wealth:0, social:8} },
  { id: 'summer_adventure', ageMin:9, ageMax:12, probability:0.35,
    text:'友達と夏休みに探検ごっこをした。秘密基地を作り、子供だけの王国だった。', tone:'positive',
    effects:{health:5, happiness:20, wealth:0, social:12} },
  { id: 'elementary_end', ageMin:12, ageMax:12, once:true, probability:1.0,
    text:'小学校を卒業した。6年間の思い出を胸に、新しいステージへ進む。', tone:'milestone',
    effects:{health:0, happiness:10, wealth:0, social:5} },

  // --- 中学生 ---
  { id: 'middle_start', ageMin:13, ageMax:13, once:true, probability:1.0,
    text:'中学校に入学した。制服を着た自分が、少し大人に見えた。', tone:'milestone',
    effects:{health:0, happiness:8, wealth:-5, social:10} },
  { id: 'club', ageMin:13, ageMax:13, once:true, probability:0.8,
    text:'部活動に入った。毎日汗をかき、仲間と一緒に成長した。', tone:'positive',
    effects:{health:10, happiness:15, wealth:0, social:15} },
  { id: 'first_love', ageMin:13, ageMax:15, once:true, probability:0.55,
    text:'初恋をした。その人のことを考えると、胸がドキドキした。', tone:'positive',
    effects:{health:0, happiness:20, wealth:0, social:10} },
  { id: 'confession_fail', ageMin:13, ageMax:15, probability:0.35,
    text:'好きな人に告白したが、断られてしまった。しばらく立ち直れなかった。', tone:'negative',
    effects:{health:0, happiness:-15, wealth:0, social:-5} },
  { id: 'smartphone', ageMin:13, ageMax:14, once:true, probability:0.65, condition:{notBackground:'poor'},
    text:'スマートフォンを買ってもらった。世界が一気に広がった気がした。', tone:'positive',
    effects:{health:0, happiness:12, wealth:-5, social:10} },
  { id: 'exam_pressure', ageMin:15, ageMax:15, once:true, probability:1.0,
    text:'高校受験が近づいた。どう立ち向かうか、自分なりに考えた。', tone:'neutral',
    effects:{health:-2, happiness:-3, wealth:0, social:0},
    choices:[
      { text:'猛勉強で乗り越える',  followup:'睡眠を削って参考書と向き合った。', effects:{wealth:10, health:-6, happiness:-10}, flag:{exam_method:'study'} },
      { text:'推薦入試を狙う',      followup:'先生との関係を大切にして推薦をもらえた。', effects:{social:10, happiness:5, wealth:3}, flag:{exam_method:'recommend'} },
      { text:'マイペースで挑む',    followup:'自分のリズムを守って挑んだ。', effects:{health:3, happiness:8}, flag:{exam_method:'relax'} },
    ]},

  // --- 高校生 ---
  { id: 'high_start', ageMin:16, ageMax:16, once:true, probability:1.0,
    text:'高校に入学した。新しい仲間と、新しい自分が始まる。', tone:'milestone',
    effects:{health:0, happiness:12, wealth:-5, social:12} },
  { id: 'part_time_hs', ageMin:16, ageMax:18, once:true, probability:0.5, condition:{notBackground:'rich'},
    text:'初めてアルバイトをした。自分で稼いだお金は格別においしかった。', tone:'positive',
    effects:{health:-3, happiness:10, wealth:12, social:8} },
  { id: 'dating', ageMin:16, ageMax:18, once:true, probability:0.4,
    text:'恋人ができた。放課後に一緒に帰るだけで、幸せな気分になれた。', tone:'positive',
    effects:{health:0, happiness:20, wealth:-5, social:15} },
  { id: 'breakup_hs', ageMin:16, ageMax:18, probability:0.3,
    text:'恋人と別れた。しばらくは何もする気になれなかった。', tone:'negative',
    effects:{health:-3, happiness:-18, wealth:0, social:-8} },
  { id: 'best_friend', ageMin:16, ageMax:18, once:true, probability:0.5,
    text:'何でも話せる親友ができた。この友情は一生ものだと感じた。', tone:'positive',
    effects:{health:0, happiness:15, wealth:0, social:20} },
  { id: 'college_exam_study', ageMin:18, ageMax:18, once:true, probability:1.0,
    text:'大学受験に向けて最後の追い込みをした。睡眠を削って参考書と向き合った。', tone:'neutral',
    effects:{health:-5, happiness:-8, wealth:0, social:-5} },
  { id: 'college_pass', ageMin:18, ageMax:18, once:true, probability:0.5, condition:{notBackground:'poor', minHappiness:30},
    text:'志望大学に合格した。家族みんなで喜び、思わず涙が出た。', tone:'positive',
    effects:{health:0, happiness:25, wealth:-5, social:10} },
  { id: 'college_fail', ageMin:18, ageMax:18, once:true, probability:0.35,
    text:'大学受験に失敗してしまった。しばらく立ち直れなかったが、別の道を探した。', tone:'negative',
    effects:{health:-3, happiness:-20, wealth:0, social:-5} },
  { id: 'work_start_poor', ageMin:18, ageMax:18, once:true, probability:0.7, condition:{background:'poor'},
    text:'進学を諦め、高校卒業後すぐに就職した。お金の大切さを体で覚えた。', tone:'neutral',
    effects:{health:-5, happiness:-8, wealth:10, social:5} },

  // --- 青年期 ---
  { id: 'college_life', ageMin:19, ageMax:19, once:true, probability:0.7, condition:{notBackground:'poor'},
    text:'大学生活が始まった。講義に飲み会、サークルと、自由すぎる日々だった。', tone:'positive',
    effects:{health:0, happiness:18, wealth:-10, social:15} },
  { id: 'alone_living', ageMin:19, ageMax:19, once:true, probability:0.5,
    text:'初めて一人暮らしを始めた。自炊は難しく、最初の一週間はカップ麺ばかりだった。', tone:'neutral',
    effects:{health:-5, happiness:8, wealth:-15, social:5} },
  { id: 'travel_youth', ageMin:19, ageMax:22, probability:0.35,
    text:'友人たちと旅行に行った。深夜まで語り合い、かけがえのない思い出が増えた。', tone:'positive',
    effects:{health:5, happiness:20, wealth:-10, social:15} },
  { id: 'part_time_college', ageMin:19, ageMax:22, probability:0.6, condition:{background:'poor'},
    text:'アルバイトで学費と生活費を稼いだ。休む暇もなかったが、強くなれた。', tone:'neutral',
    effects:{health:-8, happiness:-5, wealth:15, social:5} },
  { id: 'graduation_college', ageMin:22, ageMax:22, once:true, probability:0.65, condition:{notBackground:'poor'},
    text:'大学を卒業した。4年間があっという間に過ぎ去っていた。', tone:'milestone',
    effects:{health:0, happiness:12, wealth:0, social:5} },
  { id: 'job_hunt', ageMin:22, ageMax:22, once:true, probability:0.8,
    text:'就職先を決める時期が来た。何社も回り、ようやく内定が出た。', tone:'neutral',
    effects:{health:-3, happiness:-5, wealth:0, social:0},
    choices:[
      { text:'大企業の安定した道を選ぶ',  followup:'安定した収入を得た。少し窮屈な気もした。', effects:{wealth:15, happiness:3, social:3}, flag:{job_type:'corporate'} },
      { text:'ベンチャーに飛び込む',       followup:'毎日が刺激的だった。体はきつかった。',     effects:{wealth:-5, happiness:18, social:10, health:-5}, flag:{job_type:'venture'} },
      { text:'公務員を目指す',             followup:'試験勉強に励み、安定した仕事を得た。',     effects:{wealth:8, happiness:5, social:3}, flag:{job_type:'government'} },
    ]},

  // --- 社会人スタート ---
  { id: 'first_job', ageMin:22, ageMax:24, once:true, probability:0.9,
    text:'社会人になった。スーツ姿の自分が、まだ慣れない。', tone:'milestone',
    effects:{health:-3, happiness:10, wealth:10, social:10} },
  { id: 'first_salary', ageMin:22, ageMax:24, once:true, probability:0.85,
    text:'初任給をもらった。全額を親に見せ、食事をご馳走した。', tone:'positive',
    effects:{health:0, happiness:20, wealth:10, social:8} },
  { id: 'work_hard', ageMin:22, ageMax:30, probability:0.35,
    text:'仕事に追われ、帰宅は毎日深夜だった。でも少しずつ実力がついた。', tone:'negative',
    effects:{health:-8, happiness:-10, wealth:5, social:-5} },
  { id: 'good_boss', ageMin:22, ageMax:32, probability:0.25,
    text:'尊敬できる上司に出会った。仕事の楽しさを初めて感じた。', tone:'positive',
    effects:{health:0, happiness:15, wealth:5, social:15} },
  { id: 'work_friend', ageMin:22, ageMax:32, probability:0.3,
    text:'職場で仲良くなった同僚と、帰りに飲みに行くようになった。', tone:'positive',
    effects:{health:-3, happiness:12, wealth:-5, social:15} },

  // --- 社会人前期 ---
  { id: 'promotion', ageMin:26, ageMax:42, probability:0.2, condition:{minWealth:40},
    text:'昇進した。責任が増えたが、認められた喜びは大きかった。', tone:'positive',
    effects:{health:-3, happiness:15, wealth:20, social:8} },
  { id: 'job_change', ageMin:25, ageMax:40, probability:0.15,
    text:'転職のチャンスが来た。悩んだ末、動くことにした。', tone:'neutral',
    effects:{health:3, happiness:3, wealth:0, social:0},
    choices:[
      { text:'給料アップを優先する', followup:'収入は上がったが、激務だった。', effects:{wealth:18, health:-8, happiness:-5}, flag:{career_choice:'money'} },
      { text:'やりがいを優先する',   followup:'仕事が本当に好きになった。',   effects:{happiness:18, social:8, wealth:-3}, flag:{career_choice:'passion'} },
    ]},
  { id: 'marriage', ageMin:26, ageMax:36, once:true, probability:0.45,
    text:'結婚することになった。人生の大きな決断だった。', tone:'milestone',
    effects:{health:3, happiness:15, wealth:-8, social:10},
    choices:[
      { text:'安定感のある人を選んだ', followup:'穏やかで確かな毎日が続いた。',     effects:{wealth:8, happiness:10, health:3}, flag:{marriage_type:'stable'} },
      { text:'情熱的な人を選んだ',     followup:'毎日がドラマチックだった。',        effects:{happiness:20, social:10, wealth:-5, health:-3}, flag:{marriage_type:'passionate'} },
    ]},
  { id: 'child_born', ageMin:27, ageMax:38, once:true, probability:0.4,
    text:'子供が生まれた。この小さな命の重さに、覚悟が決まった。', tone:'milestone',
    effects:{health:-3, happiness:20, wealth:-18, social:8},
    choices:[
      { text:'厳しくも愛情深く育てる', followup:'勉強と礼儀を大切にして育てた。', effects:{social:5, wealth:-5, happiness:-5}, flag:{child_style:'strict'} },
      { text:'のびのびと自由に育てる', followup:'子供の個性を尊重して育てた。',   effects:{happiness:12, social:8, wealth:-3}, flag:{child_style:'free'} },
    ]},
  { id: 'house_buy', ageMin:30, ageMax:42, once:true, probability:0.25, condition:{notBackground:'poor', minWealth:50},
    text:'マイホームを購入した。35年ローンに震えつつも、ここが自分の家だ。', tone:'positive',
    effects:{health:0, happiness:20, wealth:-25, social:5} },
  { id: 'divorce', ageMin:28, ageMax:44, probability:0.12, condition:{maxHappiness:38},
    text:'離婚した。長い話し合いの末、別々の道を歩むことになった。', tone:'negative',
    effects:{health:-5, happiness:-25, wealth:-15, social:-15} },
  { id: 'hobby_find', ageMin:28, ageMax:48, probability:0.2,
    text:'新しい趣味を見つけた。週末が待ち遠しくなった。', tone:'positive',
    effects:{health:5, happiness:18, wealth:-5, social:8} },
  { id: 'life_crossroads', ageMin:30, ageMax:38, once:true, probability:0.7,
    text:'人生の岐路に立った気がした。このまま続けるか、変えるか。', tone:'neutral',
    effects:{health:0, happiness:0, wealth:0, social:0},
    choices:[
      { text:'今の道を信じて続ける', followup:'地に足のついた安定を選んだ。',                effects:{wealth:8, happiness:5, social:5}, flag:{life_direction:'stable'} },
      { text:'思い切って環境を変える', followup:'リスクを取って新しい一歩を踏み出した。',   effects:{happiness:15, social:10, health:-5, wealth:-8}, flag:{life_direction:'change'} },
    ]},

  // --- 中年期 ---
  { id: 'manager', ageMin:38, ageMax:50, once:true, probability:0.25, condition:{minWealth:55},
    text:'管理職になった。部下ができ、孤独な責任の重さを知った。', tone:'positive',
    effects:{health:-5, happiness:10, wealth:25, social:5} },
  { id: 'health_check', ageMin:40, ageMax:58, probability:0.25, condition:{maxHealth:55},
    text:'健康診断で要再検査の通知が来た。生活を見直すきっかけになった。', tone:'negative',
    effects:{health:-8, happiness:-12, wealth:-8, social:0} },
  { id: 'child_exam', ageMin:42, ageMax:52, probability:0.3,
    text:'子供の受験でバタバタした一年だった。親としての自分も試された。', tone:'neutral',
    effects:{health:-3, happiness:-5, wealth:-12, social:5} },
  { id: 'colleague_retire', ageMin:42, ageMax:56, probability:0.2,
    text:'長く一緒に働いた同僚が退職した。会社での孤独を少し感じた。', tone:'negative',
    effects:{health:0, happiness:-8, wealth:0, social:-10} },
  { id: 'parent_sick', ageMin:45, ageMax:62, probability:0.3,
    text:'親の体調が悪化した。どう向き合うか、真剣に考えた。', tone:'negative',
    effects:{health:-2, happiness:-8, wealth:-5, social:0},
    choices:[
      { text:'仕事を調整して自分で支える', followup:'親のそばで支えた。自分も消耗したが後悔はない。', effects:{social:10, happiness:-5, wealth:-8, health:-5} },
      { text:'信頼できる施設に任せる',     followup:'プロに委ねた。罪悪感はあったが楽になった。',   effects:{wealth:-12, happiness:5} },
    ]},
  { id: 'sport_habit', ageMin:40, ageMax:60, once:true, probability:0.2,
    text:'ウォーキングを習慣にした。体が軽くなり、頭もすっきりした。', tone:'positive',
    effects:{health:15, happiness:10, wealth:0, social:5} },
  { id: 'second_love', ageMin:35, ageMax:50, once:true, probability:0.15,
    text:'新しい恋をした。この年齢でもこんな気持ちになれるとは思わなかった。', tone:'positive',
    effects:{health:0, happiness:22, wealth:0, social:10} },
  { id: 'savings_plan', ageMin:43, ageMax:50, once:true, probability:0.7,
    text:'老後のことを真剣に考えはじめた。どう備えるか。', tone:'neutral',
    effects:{health:0, happiness:0, wealth:0, social:0},
    choices:[
      { text:'貯蓄・投資を始める',     followup:'将来への備えを固めた。',          effects:{wealth:12, happiness:-3} },
      { text:'今の生活を豊かにする', followup:'今この瞬間を精一杯楽しんだ。',   effects:{happiness:15, wealth:-8} },
    ]},

  // --- 初老 ---
  { id: 'parent_death', ageMin:52, ageMax:68, probability:0.3,
    text:'親が亡くなった。孤独の中に、感謝しきれなかった後悔が残った。', tone:'negative',
    effects:{health:-5, happiness:-28, wealth:5, social:-10} },
  { id: 'child_independent', ageMin:50, ageMax:60, probability:0.3,
    text:'子供が独立した。家が静かになり、寂しさと安堵が混ざり合った。', tone:'neutral',
    effects:{health:0, happiness:5, wealth:15, social:-8} },
  { id: 'glasses', ageMin:46, ageMax:55, once:true, probability:0.6,
    text:'老眼鏡が必要になった。これが老いるということかと、苦笑いした。', tone:'neutral',
    effects:{health:-3, happiness:-5, wealth:-3, social:0} },
  { id: 'reconnect_friend', ageMin:50, ageMax:65, probability:0.2,
    text:'昔の友人と久しぶりに再会した。あの頃と変わらぬ笑顔に、胸が温かくなった。', tone:'positive',
    effects:{health:0, happiness:20, wealth:0, social:15} },
  { id: 'retirement', ageMin:60, ageMax:65, once:true, probability:0.8,
    text:'定年退職した。長い労働生活にひとつの区切りがついた。', tone:'milestone',
    effects:{health:3, happiness:8, wealth:-8, social:-3},
    choices:[
      { text:'趣味と旅行で自由を満喫する', followup:'念願だった自由な時間を満喫した。',   effects:{happiness:18, health:5, wealth:-8} },
      { text:'再雇用・再就職する',         followup:'まだ現役でいられると実感できた。',   effects:{wealth:12, social:8, health:-3, happiness:5} },
    ]},

  // --- 老年期 ---
  { id: 'grandchild', ageMin:58, ageMax:72, probability:0.35,
    text:'孫が生まれた。この小さな存在を見て、人生が続いていくと感じた。', tone:'positive',
    effects:{health:0, happiness:30, wealth:-8, social:15} },
  { id: 'old_travel', ageMin:65, ageMax:78, probability:0.25, condition:{minHealth:45},
    text:'念願だった旅行に行った。この年齢でも世界はまだ広かった。', tone:'positive',
    effects:{health:-3, happiness:22, wealth:-15, social:10} },
  { id: 'old_hobby', ageMin:65, ageMax:80, probability:0.3, condition:{minHappiness:50},
    text:'趣味に没頭できる老後を送った。人生でこんなに自由な時間は初めてだった。', tone:'positive',
    effects:{health:5, happiness:18, wealth:-5, social:5} },
  { id: 'old_friend_reunion', ageMin:66, ageMax:80, probability:0.25,
    text:'学生時代の友人と再会した。互いの白髪を笑い合えた。', tone:'positive',
    effects:{health:0, happiness:18, wealth:0, social:12} },
  { id: 'spouse_ill', ageMin:68, ageMax:80, probability:0.25,
    text:'配偶者が体調を崩した。看病しながら、この人のそばにいてよかったと思った。', tone:'negative',
    effects:{health:-5, happiness:-18, wealth:-12, social:-5} },
  { id: 'hospitalized', ageMin:68, ageMax:80, probability:0.3, condition:{maxHealth:45},
    text:'入院した。病室の窓から空を見上げながら、色々なことを考えた。', tone:'negative',
    effects:{health:-15, happiness:-15, wealth:-15, social:-3} },
  { id: 'wisdom', ageMin:70, ageMax:80, probability:0.3,
    text:'長く生きてきてわかることがある。若い世代に伝えたいことが増えた。', tone:'positive',
    effects:{health:0, happiness:12, wealth:0, social:8} },

  // --- 選択の連鎖イベント（フラグ参照）---
  { id: 'venture_opportunity', ageMin:28, ageMax:35, once:true, probability:0.55, condition:{flag:'job_type', flagValue:'venture'},
    text:'ベンチャーで培ったノウハウを活かせる機会が来た。起業するか、続けるか。', tone:'milestone',
    effects:{health:0, happiness:0, wealth:0, social:0},
    choices:[
      { text:'起業する',          followup:'すべてを賭けて自分の会社を立ち上げた。', effects:{wealth:-10, happiness:25, health:-8, social:10} },
      { text:'このまま続ける',    followup:'今の会社でさらに実力をつけることにした。', effects:{wealth:10, happiness:5} },
    ]},
  { id: 'corporate_burnout', ageMin:27, ageMax:38, probability:0.3, condition:{flag:'job_type', flagValue:'corporate'},
    text:'大企業の歯車として、燃え尽きそうになった時期があった。', tone:'negative',
    effects:{health:-8, happiness:-15, social:-5} },
  { id: 'passionate_trouble', ageMin:30, ageMax:42, probability:0.22, condition:{flag:'marriage_type', flagValue:'passionate'},
    text:'情熱的なパートナーとの関係は、時に激しい衝突を生んだ。', tone:'negative',
    effects:{happiness:-15, health:-3, social:-8} },
  { id: 'strict_child_achievement', ageMin:52, ageMax:58, once:true, probability:0.55, condition:{flag:'child_style', flagValue:'strict'},
    text:'厳しく育てた子供が、難関校に合格した。その姿に感無量だった。', tone:'positive',
    effects:{happiness:25, social:8} },
  { id: 'free_child_friendship', ageMin:52, ageMax:58, once:true, probability:0.55, condition:{flag:'child_style', flagValue:'free'},
    text:'自由に育てた子供と、親友のような関係を築いていた。かけがえない縁だった。', tone:'positive',
    effects:{happiness:22, social:12} },

  // --- 性別専用イベント ---
  { id: 'workplace_gender_bias', ageMin:22, ageMax:35, probability:0.25, condition:{gender:'female'},
    text:'職場で女性であることを理由に不当な扱いを受けた。悔しかったが、諦めなかった。', tone:'negative',
    effects:{happiness:-18, social:-5, health:-3} },
  { id: 'maternity', ageMin:27, ageMax:35, probability:0.35, condition:{gender:'female'},
    text:'産休・育休を取った。職場への申し訳なさと我が子への愛が交差した。', tone:'neutral',
    effects:{happiness:10, health:-5, wealth:-8, social:5} },
  { id: 'return_work', ageMin:29, ageMax:37, probability:0.3, condition:{gender:'female'},
    text:'育休から職場に復帰した。ブランクへの不安と、また働ける喜びが混じった。', tone:'positive',
    effects:{happiness:8, wealth:8, social:5} },
  { id: 'female_recognition', ageMin:35, ageMax:48, probability:0.2, condition:{gender:'female'},
    text:'女性リーダーとして周囲から注目されるようになった。プレッシャーと誇りが共存した。', tone:'positive',
    effects:{happiness:12, social:10, health:-3, wealth:8} },
  { id: 'paternity', ageMin:27, ageMax:35, probability:0.2, condition:{gender:'male'},
    text:'育児休業を取った。周りに驚かれたが、この時間は宝物になった。', tone:'positive',
    effects:{happiness:20, social:8, wealth:-5} },
  { id: 'father_presence', ageMin:35, ageMax:48, probability:0.2, condition:{gender:'male'},
    text:'仕事を少し調整して、子供と過ごす時間を意識的に増やした。', tone:'positive',
    effects:{happiness:15, social:10, wealth:-3, health:3} },

  // --- 出身地専用イベント ---
  { id: 'city_loneliness', ageMin:22, ageMax:38, probability:0.22, condition:{location:'urban'},
    text:'都市の人混みの中で、誰とも繋がれていない孤独を感じることがあった。', tone:'negative',
    effects:{happiness:-10, social:-8} },
  { id: 'city_opportunity', ageMin:25, ageMax:40, probability:0.2, condition:{location:'urban'},
    text:'都市に住んでいるからこその出会いや機会があった。場所は人を変える。', tone:'positive',
    effects:{happiness:10, social:12, wealth:5} },
  { id: 'city_rent', ageMin:22, ageMax:45, probability:0.18, condition:{location:'urban'},
    text:'家賃が上がった。都市で生きることのコストを改めて感じた。', tone:'negative',
    effects:{wealth:-10, happiness:-5} },
  { id: 'rural_community', ageMin:30, ageMax:65, probability:0.22, condition:{location:'rural'},
    text:'地域の祭りや行事を通じて、顔なじみが自然と増えた。', tone:'positive',
    effects:{happiness:12, social:15} },
  { id: 'rural_nature_peace', ageMin:40, ageMax:75, probability:0.25, condition:{location:'rural'},
    text:'四季の変化を体全体で感じた一年だった。都市では味わえない豊かさだ。', tone:'positive',
    effects:{health:5, happiness:15} },
  { id: 'rural_gap', ageMin:18, ageMax:25, once:true, probability:0.45, condition:{location:'rural'},
    text:'都会に出て行く友人が続いた。寂しさと羨ましさが入り混じった。', tone:'neutral',
    effects:{happiness:-5, social:-5} },
  { id: 'rural_comeback', ageMin:35, ageMax:55, once:true, probability:0.2, condition:{location:'rural'},
    text:'Uターン移住者が増え、地元が少し活気づいた。故郷が誇らしかった。', tone:'positive',
    effects:{happiness:10, social:8} },

  // --- ランダムイベント ---
  { id: 'accident', ageMin:15, ageMax:79, probability:0.018,
    text:'事故に巻き込まれた。軽傷で済んだが、命の大切さを改めて感じた。', tone:'negative',
    effects:{health:-20, happiness:-15, wealth:-10, social:0} },
  { id: 'serious_illness', ageMin:25, ageMax:79, probability:0.012,
    text:'大きな病気にかかった。入院し、生死をさまよった。', tone:'negative',
    effects:{health:-28, happiness:-20, wealth:-20, social:-5} },
  { id: 'windfall', ageMin:20, ageMax:79, probability:0.01,
    text:'思いがけない臨時収入があった。何に使おうか、しばらく迷った。', tone:'positive',
    effects:{health:0, happiness:15, wealth:20, social:0} },
  { id: 'natural_disaster', ageMin:0, ageMax:79, probability:0.008,
    text:'自然災害に見舞われた。大変だったが、地域の助け合いで乗り越えた。', tone:'negative',
    effects:{health:-8, happiness:-10, wealth:-15, social:5} },
];


// ===========================
// 年間行動データ
// ===========================

const ACTIONS_DATA = {
  child: [
    { id:'study',   text:'勉強する',         hint:'財産+',     effects:{wealth:3, happiness:-3} },
    { id:'play',    text:'外で遊ぶ',          hint:'健康+',     effects:{health:8, happiness:8} },
    { id:'friends', text:'友達と遊ぶ',        hint:'縁+',       effects:{happiness:6, social:8} },
  ],
  teen: [
    { id:'study',    text:'勉強する',         hint:'財産+',     effects:{wealth:5, happiness:-5} },
    { id:'club',     text:'部活に打ち込む',   hint:'健康・縁+', effects:{health:8, social:6, happiness:3} },
    { id:'parttime', text:'バイトする',       hint:'財産+',     effects:{wealth:10, happiness:-3, health:-3} },
    { id:'friends',  text:'友達と遊ぶ',       hint:'幸福・縁+', effects:{happiness:10, social:8, wealth:-3} },
  ],
  adult: [
    { id:'work',     text:'仕事を頑張る',     hint:'財産+',     effects:{wealth:10, health:-5, happiness:-3} },
    { id:'exercise', text:'運動する',         hint:'健康+',     effects:{health:12, happiness:5} },
    { id:'hobby',    text:'趣味を楽しむ',     hint:'幸福+',     effects:{happiness:12, wealth:-3} },
    { id:'social',   text:'人間関係を深める', hint:'縁+',       effects:{social:12, happiness:5} },
  ],
  elder: [
    { id:'exercise', text:'運動する',         hint:'健康+',     effects:{health:8, happiness:5} },
    { id:'hobby',    text:'趣味を楽しむ',     hint:'幸福+',     effects:{happiness:12, wealth:-3} },
    { id:'family',   text:'家族と過ごす',     hint:'幸福・縁+', effects:{happiness:10, social:8} },
    { id:'rest',     text:'のんびり休む',     hint:'健康+',     effects:{health:8, happiness:6} },
  ],
};

function getActionsForAge(age) {
  if (age < 7)  return [];
  if (age < 13) return ACTIONS_DATA.child;
  if (age < 19) return ACTIONS_DATA.teen;
  if (age < 61) return ACTIONS_DATA.adult;
  return ACTIONS_DATA.elder;
}


// ===========================
// 実績データ
// ===========================

const ACHIEVEMENT_DEFS = [
  { id:'long_life',      name:'長寿',       desc:'80歳まで生きた' },
  { id:'early_death',    name:'短命',       desc:'健康が尽きて亡くなった' },
  { id:'wealthy',        name:'富豪',       desc:'財産が85を超えた' },
  { id:'happy_max',      name:'幸福者',     desc:'幸福が85を超えた' },
  { id:'healthy_max',    name:'健康優良',   desc:'健康が85を超えた' },
  { id:'well_connected', name:'人脈王',     desc:'縁が85を超えた' },
  { id:'all_balanced',   name:'バランス型', desc:'全ステータスが60以上' },
  { id:'married',        name:'伴侶',       desc:'結婚した' },
  { id:'parent',         name:'親',         desc:'子供が生まれた' },
  { id:'grandparent',    name:'祖父母',     desc:'孫が生まれた' },
  { id:'promoted',       name:'出世頭',     desc:'管理職になった' },
  { id:'homeowner',      name:'マイホーム', desc:'家を購入した' },
  { id:'survivor',       name:'生存者',     desc:'大きな病気・事故を乗り越えた' },
  { id:'rags_to_riches', name:'逆転人生',   desc:'貧しい生まれで財産60以上' },
  { id:'entrepreneur',   name:'起業家',     desc:'会社を立ち上げた' },
];

function checkAchievements() {
  const checks = {
    wealthy:        () => state.stats.wealth    >= 85,
    happy_max:      () => state.stats.happiness >= 85,
    healthy_max:    () => state.stats.health    >= 85,
    well_connected: () => state.stats.social    >= 85,
    all_balanced:   () => Object.values(state.stats).every(v => v >= 60),
    married:        () => state.triggered.has('marriage'),
    parent:         () => state.triggered.has('child_born'),
    grandparent:    () => state.triggered.has('grandchild'),
    promoted:       () => state.triggered.has('manager'),
    homeowner:      () => state.triggered.has('house_buy'),
    survivor:       () => state.triggered.has('accident') || state.triggered.has('serious_illness'),
    rags_to_riches: () => state.background === 'poor' && state.stats.wealth >= 60,
    entrepreneur:   () => state.triggered.has('venture_opportunity') && state.flags.venture_choice === 'start',
  };

  let delay = 0;
  for (const [id, check] of Object.entries(checks)) {
    if (!state.achievements.has(id) && check()) {
      state.achievements.add(id);
      setTimeout(() => showAchievementToast(id), delay);
      delay += 1600;
    }
  }
}


// ===========================
// ゲームの状態
// ===========================

let state = {};

function initState(gender, background, location, goal) {
  const base = {
    rich:   { health:60, happiness:60, wealth:75, social:50 },
    normal: { health:55, happiness:50, wealth:45, social:50 },
    poor:   { health:45, happiness:40, wealth:20, social:45 },
  };
  state = {
    age: 0, gender, background, location, goal,
    stats: { ...base[background] },
    triggered: new Set(),
    flags: {},
    alive: true,
    lifeLog: [],
    pendingChoices: [],
    actionUsed: false,
    achievements: new Set(),
    healthWarnShown: false,
  };
}

function clamp(v) { return Math.max(0, Math.min(100, Math.round(v))); }

function applyEffects(effects) {
  if (!effects) return;
  ['health','happiness','wealth','social'].forEach(k => {
    if (effects[k]) state.stats[k] = clamp(state.stats[k] + effects[k]);
  });
}

function checkCondition(ev) {
  const c = ev.condition;
  if (!c) return true;
  if (c.gender        && c.gender        !== state.gender)     return false;
  if (c.background    && c.background    !== state.background) return false;
  if (c.location      && c.location      !== state.location)   return false;
  if (c.notBackground && c.notBackground === state.background) return false;
  if (c.flag !== undefined && state.flags[c.flag] !== c.flagValue) return false;
  const s = state.stats;
  if (c.minHealth    !== undefined && s.health    < c.minHealth)    return false;
  if (c.maxHealth    !== undefined && s.health    > c.maxHealth)    return false;
  if (c.minHappiness !== undefined && s.happiness < c.minHappiness) return false;
  if (c.maxHappiness !== undefined && s.happiness > c.maxHappiness) return false;
  if (c.minWealth    !== undefined && s.wealth    < c.minWealth)    return false;
  if (c.maxWealth    !== undefined && s.wealth    > c.maxWealth)    return false;
  if (c.minSocial    !== undefined && s.social    < c.minSocial)    return false;
  if (c.maxSocial    !== undefined && s.social    > c.maxSocial)    return false;
  return true;
}

function getEventsForAge(age) {
  const events = EVENTS.filter(ev => {
    if (age < ev.ageMin || age > ev.ageMax) return false;
    if (ev.once && state.triggered.has(ev.id)) return false;
    if (!checkCondition(ev)) return false;
    if (Math.random() > ev.probability) return false;
    if (ev.once) state.triggered.add(ev.id);
    return true;
  });

  // 7歳以上で何もなければフィラーテキストを追加
  if (events.length === 0 && age >= 7) {
    events.push({ id:'filler_'+age, text: getFiller(age), tone:'filler', effects:{} });
  }

  return events;
}


// ===========================
// ゲームロジック
// ===========================

function advanceYear(skipMode) {
  const age = state.age;
  const events = getEventsForAge(age);

  if (age >= 70) state.stats.health = clamp(state.stats.health - 3);
  else if (age >= 60) state.stats.health = clamp(state.stats.health - 1);

  events.forEach(ev => applyEffects(ev.effects));

  if (skipMode) {
    events.filter(ev => ev.choices).forEach(ev => {
      applyEffects(ev.choices[0].effects);
      if (ev.choices[0].flag) Object.assign(state.flags, ev.choices[0].flag);
    });
  } else {
    state.pendingChoices.push(...events.filter(ev => ev.choices));
  }

  state.lifeLog.push({ age, events, skipMode: !!skipMode });

  if (state.stats.health <= 0) { state.alive = false; return 'death'; }
  if (age >= 80) return 'end';
  state.age++;
  return 'continue';
}


// ===========================
// UI関数
// ===========================

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

let deltaTimers = {};
function updateStats(before) {
  document.getElementById('current-age').textContent = state.age;
  ['health','happiness','wealth','social'].forEach(key => {
    const val = state.stats[key];
    const bar = document.getElementById('bar-' + key);
    const num = document.getElementById('val-' + key);
    const dEl = document.getElementById('delta-' + key);

    bar.style.width = val + '%';
    num.textContent = val;

    // 危険域の色変化
    num.className = 'sv' + (val <= 20 ? ' sv-danger' : val <= 35 ? ' sv-warning' : val >= 76 ? ' sv-great' : '');
    if (key === 'health') {
      bar.className = 'bar-fill bar-health' + (val <= 20 ? ' bar-danger' : val <= 35 ? ' bar-warning' : '');
    }

    // ステータス変化量フラッシュ
    if (before) {
      const delta = val - before[key];
      if (delta !== 0 && dEl) {
        clearTimeout(deltaTimers[key]);
        dEl.textContent = (delta > 0 ? '+' : '') + delta;
        dEl.className = 'stat-delta show ' + (delta > 0 ? 'pos' : 'neg');
        deltaTimers[key] = setTimeout(() => { dEl.className = 'stat-delta'; }, 1600);
      }
    }
  });

  // 目標達成チェック（ゲーム中の目標名の色変化）
  const goalDef = GOALS[state.goal];
  if (goalDef && goalDef.check(state, 'ongoing')) {
    document.getElementById('goal-name').classList.add('goal-achieved');
  }
}

function renderActions() {
  const actions = getActionsForAge(state.age);
  const area    = document.getElementById('action-area');
  const btns    = document.getElementById('action-buttons');
  btns.innerHTML = '';

  if (actions.length === 0) { area.classList.add('hidden'); return; }
  area.classList.remove('hidden');

  actions.forEach(action => {
    const btn = document.createElement('button');
    btn.className = 'action-btn';
    btn.textContent = action.text + '（' + action.hint + '）';
    btn.onclick = () => selectAction(action, btn);
    btns.appendChild(btn);
  });
}

function selectAction(action, clickedBtn) {
  if (state.actionUsed) return;
  state.actionUsed = true;
  const before = { ...state.stats };
  applyEffects(action.effects);
  updateStats(before);
  document.querySelectorAll('.action-btn').forEach(b => {
    b.classList.add('used');
    if (b === clickedBtn) b.classList.add('selected');
  });
}

function addYearToLog(age, events, skipMode) {
  const logArea = document.getElementById('log-area');
  const block   = document.createElement('div');
  block.className = 'year-block';

  // 重要フラグ判定（milestone / positive / negative / choiceはすべて重要）
  const hasImportant = events.some(ev => ev.tone && ev.tone !== 'neutral' && ev.tone !== 'filler');
  if (!hasImportant) block.dataset.minor = 'true';

  // フィルター適用
  if (document.getElementById('filter-check').checked && !hasImportant) {
    block.classList.add('hidden-by-filter');
  }

  const label = document.createElement('div');
  label.className = 'year-label';
  label.textContent = age + '歳';
  block.appendChild(label);

  // 健康危険警告
  if (!state.healthWarnShown && state.stats.health <= 25 && state.stats.health > 0) {
    state.healthWarnShown = true;
    const warn = document.createElement('div');
    warn.className = 'health-warning-card';
    warn.textContent = '健康状態が危険域に達しています。このまま悪化すると命に関わります。';
    block.appendChild(warn);
  }

  if (events.length === 0) {
    const quiet = document.createElement('div');
    quiet.className = 'quiet-year';
    quiet.textContent = '穏やかな一年だった。';
    block.appendChild(quiet);
  } else {
    events.forEach(ev => {
      const card = document.createElement('div');
      card.className = 'event-card ' + (ev.tone || 'neutral');
      card.textContent = ev.text;

      if (ev.choices && !skipMode) {
        card.id = 'choice-card-' + ev.id;
        const btnArea = document.createElement('div');
        btnArea.className = 'choice-buttons';
        ev.choices.forEach((choice, i) => {
          const btn = document.createElement('button');
          btn.className = 'choice-btn';
          btn.textContent = choice.text;
          btn.onclick = () => resolveChoice(ev, i);
          btnArea.appendChild(btn);
        });
        card.appendChild(btnArea);
      } else if (ev.choices && skipMode) {
        const followup = document.createElement('div');
        followup.className = 'choice-followup';
        followup.textContent = '→ ' + (ev.choices[0].followup || ev.choices[0].text);
        card.appendChild(followup);
      }

      block.appendChild(card);
    });
  }

  logArea.appendChild(block);
  return block;
}

function resolveChoice(event, choiceIndex) {
  const choice = event.choices[choiceIndex];
  const before = { ...state.stats };
  applyEffects(choice.effects);

  // フラグを記録
  if (choice.flag) Object.assign(state.flags, choice.flag);
  // 起業した場合の専用フラグ
  if (event.id === 'venture_opportunity' && choiceIndex === 0) state.flags.venture_choice = 'start';

  updateStats(before);

  const card = document.getElementById('choice-card-' + event.id);
  if (card) {
    const btnArea = card.querySelector('.choice-buttons');
    if (btnArea) btnArea.remove();
    if (choice.followup) {
      const followup = document.createElement('div');
      followup.className = 'choice-followup';
      followup.textContent = '→ ' + choice.followup;
      card.appendChild(followup);
    }
  }

  const idx = state.pendingChoices.indexOf(event);
  if (idx > -1) state.pendingChoices.splice(idx, 1);

  if (state.pendingChoices.length === 0) {
    document.getElementById('next-btn').disabled   = false;
    document.getElementById('skip5-btn').disabled  = false;
    state.actionUsed = false;
    renderActions();
    checkAchievements();
  }
}

let toastTimer = null;
function showAchievementToast(id) {
  const def   = ACHIEVEMENT_DEFS.find(a => a.id === id);
  if (!def) return;
  const toast = document.getElementById('achievement-toast');
  toast.innerHTML =
    '<div class="toast-label">実績解除</div>' +
    '<div class="toast-name">' + def.name + '</div>' +
    '<div class="toast-desc">' + def.desc + '</div>';
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
}

function showEndScreen(cause) {
  showScreen('end-screen');
  const s     = state.stats;
  const last  = state.lifeLog[state.lifeLog.length - 1];
  const age   = last ? last.age : state.age;
  const score = Math.round((s.health + s.happiness + s.wealth + s.social) / 4);

  if (cause === 'death') state.achievements.add('early_death');
  else                   state.achievements.add('long_life');

  let rating, comment;
  if      (cause === 'death')  { rating = '波乱の生涯';       comment = age+'歳で人生の幕が閉じた。\n健康が尽き、静かに逝ってしまった。\nそれでも、ひとつの命が確かにここにあった。'; }
  else if (score >= 75)        { rating = '充実した人生';      comment = age+'歳まで生きた。\n健康・幸福・財産・縁、どれも恵まれた素晴らしい人生だった。'; }
  else if (score >= 55)        { rating = '悪くない人生';      comment = age+'歳まで生きた。\n山あり谷あり、それでもしっかりと歩んだ人生だった。'; }
  else if (score >= 38)        { rating = '普通の人生';        comment = age+'歳まで生きた。\n特別派手でも惨めでもなく、人並みの人生を送った。'; }
  else                         { rating = '苦労の多い人生';    comment = age+'歳まで生きた。\n波乱続きだったが、それでも最後まで生き抜いた。'; }

  document.getElementById('end-summary').innerHTML = `
    <div class="summary-card">
      <div class="summary-label">享年</div>
      <div class="summary-value">${age}歳</div>
    </div>
    <div class="summary-card">
      <div class="summary-label">最終ステータス</div>
      <div class="summary-stats-grid">
        <div class="summary-stat-item">健康 <strong>${s.health}</strong></div>
        <div class="summary-stat-item">幸福 <strong>${s.happiness}</strong></div>
        <div class="summary-stat-item">財産 <strong>${s.wealth}</strong></div>
        <div class="summary-stat-item">縁 <strong>${s.social}</strong></div>
      </div>
    </div>
    <div class="summary-card">
      <div class="summary-label">人生の評価</div>
      <div class="summary-value">${rating}</div>
      <div class="summary-comment">${comment}</div>
    </div>
  `;

  // 目標達成判定
  const goalDef = GOALS[state.goal];
  if (goalDef) {
    const achieved = goalDef.check(state, cause);
    document.getElementById('end-goal').innerHTML = `
      <div class="goal-result-card ${achieved ? 'achieved' : 'failed'}">
        <div class="goal-result-status ${achieved ? 'achieved' : 'failed'}">${achieved ? '目標達成' : '目標未達'}</div>
        <div class="goal-result-name">${goalDef.name}</div>
        <div class="goal-result-desc">${goalDef.desc}</div>
      </div>
    `;
  }

  // 実績一覧
  const unlocked = ACHIEVEMENT_DEFS.filter(a => state.achievements.has(a.id));
  const achSection = document.getElementById('end-achievements');
  if (unlocked.length > 0) {
    achSection.innerHTML =
      '<div class="achievements-section-title">獲得した実績（' + unlocked.length + '/' + ACHIEVEMENT_DEFS.length + '）</div>' +
      '<div class="achievements-grid">' +
      unlocked.map(a => '<div class="achievement-badge"><div class="badge-name">' + a.name + '</div><div class="badge-desc">' + a.desc + '</div></div>').join('') +
      '</div>';
  } else {
    achSection.innerHTML = '';
  }
}


// ===========================
// ゲームフロー
// ===========================

function doNextYear(skipMode) {
  const before = { ...state.stats };
  const result = advanceYear(skipMode);
  const last   = state.lifeLog[state.lifeLog.length - 1];
  const block  = addYearToLog(last.age, last.events, skipMode);

  if (!skipMode) {
    setTimeout(() => block.scrollIntoView({ behavior:'smooth', block:'end' }), 50);
  }

  updateStats(before);

  if (result === 'death' || result === 'end') {
    document.getElementById('next-btn').disabled  = true;
    document.getElementById('skip5-btn').disabled = true;
    document.getElementById('action-area').classList.add('hidden');
    setTimeout(() => showEndScreen(result), state.pendingChoices.length > 0 ? 2000 : 1200);
    return result;
  }

  if (state.pendingChoices.length > 0 && !skipMode) {
    document.getElementById('next-btn').disabled  = true;
    document.getElementById('skip5-btn').disabled = true;
  } else if (!skipMode) {
    state.actionUsed = false;
    renderActions();
    checkAchievements();
  }

  return result;
}

function doSkip(years) {
  state.pendingChoices.forEach(ev => {
    applyEffects(ev.choices[0].effects);
    if (ev.choices[0].flag) Object.assign(state.flags, ev.choices[0].flag);
  });
  state.pendingChoices = [];

  let result = 'continue';
  for (let i = 0; i < years && result === 'continue'; i++) {
    result = doNextYear(true);
  }

  setTimeout(() => {
    const last = document.getElementById('log-area').lastElementChild;
    if (last) last.scrollIntoView({ behavior:'smooth', block:'end' });
  }, 100);

  if (result === 'continue') {
    state.actionUsed = false;
    renderActions();
    checkAchievements();
  }
}


// ===========================
// イベントリスナー
// ===========================

document.querySelectorAll('.opt').forEach(btn => {
  btn.addEventListener('click', () => {
    const key = btn.dataset.key;
    document.querySelectorAll(`.opt[data-key="${key}"]`).forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
  });
});

document.getElementById('start-btn').addEventListener('click', () => {
  const gender     = document.querySelector('.opt.selected[data-key="gender"]').dataset.val;
  const background = document.querySelector('.opt.selected[data-key="background"]').dataset.val;
  const location   = document.querySelector('.opt.selected[data-key="location"]').dataset.val;
  const goal       = document.querySelector('.opt.selected[data-key="goal"]').dataset.val;

  document.getElementById('log-area').innerHTML  = '';
  document.getElementById('next-btn').disabled   = false;
  document.getElementById('skip5-btn').disabled  = false;
  document.getElementById('end-achievements').innerHTML = '';
  document.getElementById('end-goal').innerHTML  = '';

  initState(gender, background, location, goal);
  showScreen('game-screen');

  const goalDef = GOALS[goal];
  if (goalDef) document.getElementById('goal-name').textContent = goalDef.name;

  updateStats(null);
  doNextYear(false);
});

document.getElementById('next-btn').addEventListener('click', () => doNextYear(false));
document.getElementById('skip5-btn').addEventListener('click', () => doSkip(5));
document.getElementById('restart-btn').addEventListener('click', () => showScreen('setup-screen'));

document.getElementById('filter-check').addEventListener('change', function () {
  const isFiltered = this.checked;
  document.querySelectorAll('.year-block[data-minor="true"]').forEach(block => {
    block.classList.toggle('hidden-by-filter', isFiltered);
  });
});
