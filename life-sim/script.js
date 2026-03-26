// ===========================
// イベントデータ
// ===========================

const EVENTS = [

  // --- 誕生（0歳）---
  {
    id: 'birth_rich', ageMin: 0, ageMax: 0, once: true, probability: 1.0,
    condition: { background: 'rich' },
    text: '裕福な家庭の子として生まれた。広い家に両親の笑顔があった。',
    tone: 'milestone',
    effects: { health: 10, happiness: 10, wealth: 25, social: 0 }
  },
  {
    id: 'birth_normal', ageMin: 0, ageMax: 0, once: true, probability: 1.0,
    condition: { background: 'normal' },
    text: 'ごく普通の家庭に生まれた。取り立てて豊かでも貧しくもない、穏やかな始まりだった。',
    tone: 'milestone',
    effects: { health: 5, happiness: 5, wealth: 0, social: 0 }
  },
  {
    id: 'birth_poor', ageMin: 0, ageMax: 0, once: true, probability: 1.0,
    condition: { background: 'poor' },
    text: '貧しい家庭に生まれた。狭い家の中で、それでも両親は精一杯愛してくれた。',
    tone: 'milestone',
    effects: { health: -5, happiness: 0, wealth: -15, social: 0 }
  },
  {
    id: 'birth_rural', ageMin: 0, ageMax: 0, once: true, probability: 1.0,
    condition: { location: 'rural' },
    text: '自然豊かな地方の、静かな土地で育ちはじめた。',
    tone: 'neutral',
    effects: { health: 5, happiness: 0, wealth: 0, social: 0 }
  },
  {
    id: 'birth_urban', ageMin: 0, ageMax: 0, once: true, probability: 1.0,
    condition: { location: 'urban' },
    text: '賑やかな都市の一角で、車の音と人の声に包まれて育ちはじめた。',
    tone: 'neutral',
    effects: { health: 0, happiness: 5, wealth: 0, social: 5 }
  },

  // --- 乳幼児（1〜3歳）---
  {
    id: 'first_steps', ageMin: 1, ageMax: 1, once: true, probability: 1.0,
    text: '初めて一人で歩いた。両親が手を叩いて喜んでくれた。',
    tone: 'milestone',
    effects: { health: 0, happiness: 10, wealth: 0, social: 5 }
  },
  {
    id: 'toddler_play', ageMin: 2, ageMax: 3, probability: 0.6,
    text: '近所の子と砂場で遊んだ。泥だらけになって帰ると怒られた。',
    tone: 'positive',
    effects: { health: 5, happiness: 10, wealth: 0, social: 10 }
  },

  // --- 幼稚園（4〜6歳）---
  {
    id: 'kindergarten', ageMin: 4, ageMax: 4, once: true, probability: 1.0,
    text: '幼稚園に入った。初めて親と離れる朝、泣いてしまった。',
    tone: 'milestone',
    effects: { health: 0, happiness: 5, wealth: 0, social: 10 }
  },
  {
    id: 'first_friend', ageMin: 4, ageMax: 6, once: true, probability: 0.65,
    text: '幼稚園で初めての親友ができた。毎日一緒に走り回った。',
    tone: 'positive',
    effects: { health: 0, happiness: 15, wealth: 0, social: 15 }
  },
  {
    id: 'injury_small', ageMin: 3, ageMax: 6, probability: 0.4,
    text: '遊んでいて転び、膝を擦りむいた。泣きながらもばんそうこうを貼ってもらった。',
    tone: 'neutral',
    effects: { health: -3, happiness: -3, wealth: 0, social: 0 }
  },
  {
    id: 'rural_field', ageMin: 4, ageMax: 6, probability: 0.65,
    condition: { location: 'rural' },
    text: '田んぼのあぜ道をかけ回り、虫や草花と友達になった。',
    tone: 'positive',
    effects: { health: 8, happiness: 12, wealth: 0, social: 5 }
  },

  // --- 小学生（7〜12歳）---
  {
    id: 'elementary_start', ageMin: 7, ageMax: 7, once: true, probability: 1.0,
    text: '小学校に入学した。新しいランドセルを背負い、胸がどきどきした。',
    tone: 'milestone',
    effects: { health: 0, happiness: 10, wealth: -5, social: 10 }
  },
  {
    id: 'sports_day', ageMin: 8, ageMax: 11, probability: 0.3,
    text: '運動会でリレーの選手に選ばれた。全力で走り、チームは見事3位だった。',
    tone: 'positive',
    effects: { health: 5, happiness: 15, wealth: 0, social: 10 }
  },
  {
    id: 'study_success', ageMin: 8, ageMax: 12, probability: 0.25,
    text: 'テストで満点を取った。先生に褒められ、少し自信がついた。',
    tone: 'positive',
    effects: { health: 0, happiness: 12, wealth: 0, social: 5 }
  },
  {
    id: 'study_fail', ageMin: 8, ageMax: 12, probability: 0.2,
    text: 'テストで悪い点を取ってしまった。親に怒られ、しょんぼりした夜だった。',
    tone: 'negative',
    effects: { health: 0, happiness: -10, wealth: 0, social: -3 }
  },
  {
    id: 'pet_death', ageMin: 7, ageMax: 12, probability: 0.15,
    text: '飼っていた金魚が死んだ。初めて「死」を身近に感じた日だった。',
    tone: 'negative',
    effects: { health: 0, happiness: -12, wealth: 0, social: -3 }
  },
  {
    id: 'bully', ageMin: 8, ageMax: 12, probability: 0.1,
    condition: { maxSocial: 40 },
    text: 'クラスで仲間外れにされた時期があった。学校に行くのが辛かった。',
    tone: 'negative',
    effects: { health: -5, happiness: -20, wealth: 0, social: -15 }
  },
  {
    id: 'juku', ageMin: 9, ageMax: 12, once: true, probability: 0.45,
    condition: { background: 'rich', location: 'urban' },
    text: '塾に通い始めた。放課後も勉強漬けの日々だったが、少しずつ力がついた。',
    tone: 'neutral',
    effects: { health: -3, happiness: -5, wealth: -8, social: 0 }
  },
  {
    id: 'river_play', ageMin: 7, ageMax: 12, probability: 0.5,
    condition: { location: 'rural' },
    text: '近所の川でザリガニを捕まえた。夏の日の宝物になった。',
    tone: 'positive',
    effects: { health: 8, happiness: 15, wealth: 0, social: 8 }
  },
  {
    id: 'summer_adventure', ageMin: 9, ageMax: 12, probability: 0.35,
    text: '友達と夏休みに探検ごっこをした。秘密基地を作り、子供だけの王国だった。',
    tone: 'positive',
    effects: { health: 5, happiness: 20, wealth: 0, social: 12 }
  },
  {
    id: 'elementary_end', ageMin: 12, ageMax: 12, once: true, probability: 1.0,
    text: '小学校を卒業した。6年間の思い出を胸に、新しいステージへ進む。',
    tone: 'milestone',
    effects: { health: 0, happiness: 10, wealth: 0, social: 5 }
  },

  // --- 中学生（13〜15歳）---
  {
    id: 'middle_start', ageMin: 13, ageMax: 13, once: true, probability: 1.0,
    text: '中学校に入学した。制服を着た自分が、少し大人に見えた。',
    tone: 'milestone',
    effects: { health: 0, happiness: 8, wealth: -5, social: 10 }
  },
  {
    id: 'club', ageMin: 13, ageMax: 13, once: true, probability: 0.8,
    text: '部活動に入った。毎日汗をかき、仲間と一緒に成長した。',
    tone: 'positive',
    effects: { health: 10, happiness: 15, wealth: 0, social: 15 }
  },
  {
    id: 'first_love', ageMin: 13, ageMax: 15, once: true, probability: 0.55,
    text: '初恋をした。その人のことを考えると、胸がドキドキした。',
    tone: 'positive',
    effects: { health: 0, happiness: 20, wealth: 0, social: 10 }
  },
  {
    id: 'confession_fail', ageMin: 13, ageMax: 15, probability: 0.35,
    text: '好きな人に告白したが、断られてしまった。しばらく立ち直れなかった。',
    tone: 'negative',
    effects: { health: 0, happiness: -15, wealth: 0, social: -5 }
  },
  {
    id: 'smartphone', ageMin: 13, ageMax: 14, once: true, probability: 0.65,
    condition: { notBackground: 'poor' },
    text: 'スマートフォンを買ってもらった。世界が一気に広がった気がした。',
    tone: 'positive',
    effects: { health: 0, happiness: 12, wealth: -5, social: 10 }
  },
  {
    id: 'exam_pressure', ageMin: 15, ageMax: 15, once: true, probability: 1.0,
    text: '高校受験が近づき、毎晩遅くまで勉強した。プレッシャーで胃が痛くなった。',
    tone: 'negative',
    effects: { health: -5, happiness: -10, wealth: 0, social: -5 }
  },

  // --- 高校生（16〜18歳）---
  {
    id: 'high_start', ageMin: 16, ageMax: 16, once: true, probability: 1.0,
    text: '高校に入学した。新しい仲間と、新しい自分が始まる。',
    tone: 'milestone',
    effects: { health: 0, happiness: 12, wealth: -5, social: 12 }
  },
  {
    id: 'part_time_hs', ageMin: 16, ageMax: 18, once: true, probability: 0.5,
    condition: { notBackground: 'rich' },
    text: '初めてアルバイトをした。自分で稼いだお金は格別においしかった。',
    tone: 'positive',
    effects: { health: -3, happiness: 10, wealth: 12, social: 8 }
  },
  {
    id: 'dating', ageMin: 16, ageMax: 18, once: true, probability: 0.4,
    text: '恋人ができた。放課後に一緒に帰るだけで、幸せな気分になれた。',
    tone: 'positive',
    effects: { health: 0, happiness: 20, wealth: -5, social: 15 }
  },
  {
    id: 'breakup_hs', ageMin: 16, ageMax: 18, probability: 0.3,
    text: '恋人と別れた。しばらくは何もする気になれなかった。',
    tone: 'negative',
    effects: { health: -3, happiness: -18, wealth: 0, social: -8 }
  },
  {
    id: 'best_friend', ageMin: 16, ageMax: 18, once: true, probability: 0.5,
    text: '何でも話せる親友ができた。この友情は一生ものだと感じた。',
    tone: 'positive',
    effects: { health: 0, happiness: 15, wealth: 0, social: 20 }
  },
  {
    id: 'college_exam_study', ageMin: 18, ageMax: 18, once: true, probability: 1.0,
    text: '大学受験に向けて最後の追い込みをした。睡眠を削って参考書と向き合った。',
    tone: 'neutral',
    effects: { health: -5, happiness: -8, wealth: 0, social: -5 }
  },
  {
    id: 'college_pass', ageMin: 18, ageMax: 18, once: true, probability: 0.5,
    condition: { notBackground: 'poor', minHappiness: 30 },
    text: '志望大学に合格した。家族みんなで喜び、思わず涙が出た。',
    tone: 'positive',
    effects: { health: 0, happiness: 25, wealth: -5, social: 10 }
  },
  {
    id: 'college_fail', ageMin: 18, ageMax: 18, once: true, probability: 0.35,
    text: '大学受験に失敗してしまった。しばらく立ち直れなかったが、別の道を探した。',
    tone: 'negative',
    effects: { health: -3, happiness: -20, wealth: 0, social: -5 }
  },
  {
    id: 'work_start_poor', ageMin: 18, ageMax: 18, once: true, probability: 0.7,
    condition: { background: 'poor' },
    text: '進学を諦め、高校卒業後すぐに就職した。お金の大切さを体で覚えた。',
    tone: 'neutral',
    effects: { health: -5, happiness: -8, wealth: 10, social: 5 }
  },

  // --- 青年期（19〜22歳）---
  {
    id: 'college_life', ageMin: 19, ageMax: 19, once: true, probability: 0.7,
    condition: { notBackground: 'poor' },
    text: '大学生活が始まった。講義に飲み会、サークルと、自由すぎる日々だった。',
    tone: 'positive',
    effects: { health: 0, happiness: 18, wealth: -10, social: 15 }
  },
  {
    id: 'alone_living', ageMin: 19, ageMax: 19, once: true, probability: 0.5,
    text: '初めて一人暮らしを始めた。自炊は難しく、最初の一週間はカップ麺ばかりだった。',
    tone: 'neutral',
    effects: { health: -5, happiness: 8, wealth: -15, social: 5 }
  },
  {
    id: 'travel_youth', ageMin: 19, ageMax: 22, probability: 0.35,
    text: '友人たちと旅行に行った。深夜まで語り合い、かけがえのない思い出が増えた。',
    tone: 'positive',
    effects: { health: 5, happiness: 20, wealth: -10, social: 15 }
  },
  {
    id: 'part_time_college', ageMin: 19, ageMax: 22, probability: 0.6,
    condition: { background: 'poor' },
    text: 'アルバイトで学費と生活費を稼いだ。休む暇もなかったが、強くなれた。',
    tone: 'neutral',
    effects: { health: -8, happiness: -5, wealth: 15, social: 5 }
  },
  {
    id: 'graduation_college', ageMin: 22, ageMax: 22, once: true, probability: 0.65,
    condition: { notBackground: 'poor' },
    text: '大学を卒業した。4年間があっという間に過ぎ去っていた。',
    tone: 'milestone',
    effects: { health: 0, happiness: 12, wealth: 0, social: 5 }
  },
  {
    id: 'job_hunt', ageMin: 22, ageMax: 22, once: true, probability: 0.7,
    text: '就職活動に苦労した。何社も落ち、自分の価値を問い続けた日々だった。',
    tone: 'negative',
    effects: { health: -5, happiness: -12, wealth: 0, social: 5 }
  },

  // --- 社会人スタート（22〜25歳）---
  {
    id: 'first_job', ageMin: 22, ageMax: 24, once: true, probability: 0.9,
    text: '社会人になった。スーツ姿の自分が、まだ慣れない。',
    tone: 'milestone',
    effects: { health: -3, happiness: 10, wealth: 10, social: 10 }
  },
  {
    id: 'first_salary', ageMin: 22, ageMax: 24, once: true, probability: 0.85,
    text: '初任給をもらった。全額を親に見せ、食事をご馳走した。',
    tone: 'positive',
    effects: { health: 0, happiness: 20, wealth: 10, social: 8 }
  },
  {
    id: 'work_hard', ageMin: 22, ageMax: 30, probability: 0.35,
    text: '仕事に追われ、帰宅は毎日深夜だった。でも少しずつ実力がついた。',
    tone: 'negative',
    effects: { health: -8, happiness: -10, wealth: 5, social: -5 }
  },
  {
    id: 'good_boss', ageMin: 22, ageMax: 32, probability: 0.25,
    text: '尊敬できる上司に出会った。仕事の楽しさを初めて感じた。',
    tone: 'positive',
    effects: { health: 0, happiness: 15, wealth: 5, social: 15 }
  },
  {
    id: 'work_friend', ageMin: 22, ageMax: 32, probability: 0.3,
    text: '職場で仲良くなった同僚と、帰りに飲みに行くようになった。',
    tone: 'positive',
    effects: { health: -3, happiness: 12, wealth: -5, social: 15 }
  },

  // --- 社会人前期（25〜38歳）---
  {
    id: 'promotion', ageMin: 26, ageMax: 42, probability: 0.2,
    condition: { minWealth: 40 },
    text: '昇進した。責任が増えたが、認められた喜びは大きかった。',
    tone: 'positive',
    effects: { health: -3, happiness: 15, wealth: 20, social: 8 }
  },
  {
    id: 'job_change', ageMin: 25, ageMax: 40, probability: 0.15,
    text: '転職した。新しい環境に緊張しつつ、リセットできた気がした。',
    tone: 'neutral',
    effects: { health: 5, happiness: 8, wealth: 10, social: -5 }
  },
  {
    id: 'marriage', ageMin: 26, ageMax: 36, once: true, probability: 0.45,
    text: '結婚した。誓いの言葉を言うとき、声が震えた。',
    tone: 'milestone',
    effects: { health: 5, happiness: 30, wealth: -10, social: 20 }
  },
  {
    id: 'child_born', ageMin: 27, ageMax: 38, once: true, probability: 0.4,
    text: '子供が生まれた。この小さな命の重さに、涙が止まらなかった。',
    tone: 'milestone',
    effects: { health: -3, happiness: 35, wealth: -20, social: 15 }
  },
  {
    id: 'house_buy', ageMin: 30, ageMax: 42, once: true, probability: 0.25,
    condition: { notBackground: 'poor', minWealth: 50 },
    text: 'マイホームを購入した。35年ローンに震えつつも、ここが自分の家だ。',
    tone: 'positive',
    effects: { health: 0, happiness: 20, wealth: -25, social: 5 }
  },
  {
    id: 'divorce', ageMin: 28, ageMax: 44, probability: 0.12,
    condition: { maxHappiness: 38 },
    text: '離婚した。長い話し合いの末、別々の道を歩むことになった。',
    tone: 'negative',
    effects: { health: -5, happiness: -25, wealth: -15, social: -15 }
  },
  {
    id: 'hobby_find', ageMin: 28, ageMax: 48, probability: 0.2,
    text: '新しい趣味を見つけた。週末が待ち遠しくなった。',
    tone: 'positive',
    effects: { health: 5, happiness: 18, wealth: -5, social: 8 }
  },

  // --- 中年期（38〜55歳）---
  {
    id: 'manager', ageMin: 38, ageMax: 50, once: true, probability: 0.25,
    condition: { minWealth: 55 },
    text: '管理職になった。部下ができ、孤独な責任の重さを知った。',
    tone: 'positive',
    effects: { health: -5, happiness: 10, wealth: 25, social: 5 }
  },
  {
    id: 'health_check', ageMin: 40, ageMax: 58, probability: 0.25,
    condition: { maxHealth: 55 },
    text: '健康診断で要再検査の通知が来た。生活を見直すきっかけになった。',
    tone: 'negative',
    effects: { health: -8, happiness: -12, wealth: -8, social: 0 }
  },
  {
    id: 'child_exam', ageMin: 42, ageMax: 52, probability: 0.3,
    text: '子供の受験でバタバタした一年だった。親としての自分も試された。',
    tone: 'neutral',
    effects: { health: -3, happiness: -5, wealth: -12, social: 5 }
  },
  {
    id: 'colleague_retire', ageMin: 42, ageMax: 56, probability: 0.2,
    text: '長く一緒に働いた同僚が退職した。会社での孤独を少し感じた。',
    tone: 'negative',
    effects: { health: 0, happiness: -8, wealth: 0, social: -10 }
  },
  {
    id: 'parent_sick', ageMin: 45, ageMax: 62, probability: 0.3,
    text: '親が体調を崩した。遠くに住んでいると、心配が膨らむばかりだった。',
    tone: 'negative',
    effects: { health: -3, happiness: -15, wealth: -10, social: -5 }
  },
  {
    id: 'sport_habit', ageMin: 40, ageMax: 60, once: true, probability: 0.2,
    text: 'ウォーキングを習慣にした。体が軽くなり、頭もすっきりした。',
    tone: 'positive',
    effects: { health: 15, happiness: 10, wealth: 0, social: 5 }
  },
  {
    id: 'second_love', ageMin: 35, ageMax: 50, once: true, probability: 0.15,
    text: '新しい恋をした。この年齢でもこんな気持ちになれるとは思わなかった。',
    tone: 'positive',
    effects: { health: 0, happiness: 22, wealth: 0, social: 10 }
  },

  // --- 初老（50〜65歳）---
  {
    id: 'parent_death', ageMin: 52, ageMax: 68, probability: 0.3,
    text: '親が亡くなった。孤独の中に、感謝しきれなかった後悔が残った。',
    tone: 'negative',
    effects: { health: -5, happiness: -28, wealth: 5, social: -10 }
  },
  {
    id: 'child_independent', ageMin: 50, ageMax: 60, probability: 0.3,
    text: '子供が独立した。家が静かになり、寂しさと安堵が混ざり合った。',
    tone: 'neutral',
    effects: { health: 0, happiness: 5, wealth: 15, social: -8 }
  },
  {
    id: 'glasses', ageMin: 46, ageMax: 55, once: true, probability: 0.6,
    text: '老眼鏡が必要になった。これが老いるということかと、苦笑いした。',
    tone: 'neutral',
    effects: { health: -3, happiness: -5, wealth: -3, social: 0 }
  },
  {
    id: 'reconnect_friend', ageMin: 50, ageMax: 65, probability: 0.2,
    text: '昔の友人と久しぶりに再会した。あの頃と変わらぬ笑顔に、胸が温かくなった。',
    tone: 'positive',
    effects: { health: 0, happiness: 20, wealth: 0, social: 15 }
  },
  {
    id: 'retirement', ageMin: 60, ageMax: 65, once: true, probability: 0.8,
    text: '定年退職した。長い労働生活にひとつの区切りがついた。',
    tone: 'milestone',
    effects: { health: 5, happiness: 15, wealth: -10, social: -5 }
  },

  // --- 老年期（65〜80歳）---
  {
    id: 'grandchild', ageMin: 58, ageMax: 72, probability: 0.35,
    text: '孫が生まれた。この小さな存在を見て、人生が続いていくと感じた。',
    tone: 'positive',
    effects: { health: 0, happiness: 30, wealth: -8, social: 15 }
  },
  {
    id: 'old_travel', ageMin: 65, ageMax: 78, probability: 0.25,
    condition: { minHealth: 45 },
    text: '念願だった旅行に行った。この年齢でも世界はまだ広かった。',
    tone: 'positive',
    effects: { health: -3, happiness: 22, wealth: -15, social: 10 }
  },
  {
    id: 'old_hobby', ageMin: 65, ageMax: 80, probability: 0.3,
    condition: { minHappiness: 50 },
    text: '趣味に没頭できる老後を送った。人生でこんなに自由な時間は初めてだった。',
    tone: 'positive',
    effects: { health: 5, happiness: 18, wealth: -5, social: 5 }
  },
  {
    id: 'old_friend_reunion', ageMin: 66, ageMax: 80, probability: 0.25,
    text: '学生時代の友人と再会した。互いの白髪を笑い合えた。',
    tone: 'positive',
    effects: { health: 0, happiness: 18, wealth: 0, social: 12 }
  },
  {
    id: 'spouse_ill', ageMin: 68, ageMax: 80, probability: 0.25,
    text: '配偶者が体調を崩した。看病しながら、この人のそばにいてよかったと思った。',
    tone: 'negative',
    effects: { health: -5, happiness: -18, wealth: -12, social: -5 }
  },
  {
    id: 'hospitalized', ageMin: 68, ageMax: 80, probability: 0.3,
    condition: { maxHealth: 45 },
    text: '入院した。病室の窓から空を見上げながら、色々なことを考えた。',
    tone: 'negative',
    effects: { health: -15, happiness: -15, wealth: -15, social: -3 }
  },
  {
    id: 'wisdom', ageMin: 70, ageMax: 80, probability: 0.3,
    text: '長く生きてきてわかることがある。若い世代に伝えたいことが増えた。',
    tone: 'positive',
    effects: { health: 0, happiness: 12, wealth: 0, social: 8 }
  },

  // --- ランダムイベント（どの年代でも）---
  {
    id: 'accident', ageMin: 15, ageMax: 79, probability: 0.018,
    text: '事故に巻き込まれた。軽傷で済んだが、命の大切さを改めて感じた。',
    tone: 'negative',
    effects: { health: -20, happiness: -15, wealth: -10, social: 0 }
  },
  {
    id: 'serious_illness', ageMin: 25, ageMax: 79, probability: 0.012,
    text: '大きな病気にかかった。入院し、生死をさまよった。',
    tone: 'negative',
    effects: { health: -28, happiness: -20, wealth: -20, social: -5 }
  },
  {
    id: 'windfall', ageMin: 20, ageMax: 79, probability: 0.01,
    text: '思いがけない臨時収入があった。何に使おうか、しばらく迷った。',
    tone: 'positive',
    effects: { health: 0, happiness: 15, wealth: 20, social: 0 }
  },
  {
    id: 'natural_disaster', ageMin: 0, ageMax: 79, probability: 0.008,
    text: '自然災害に見舞われた。大変だったが、地域の助け合いで乗り越えた。',
    tone: 'negative',
    effects: { health: -8, happiness: -10, wealth: -15, social: 5 }
  },
];


// ===========================
// ゲームの状態
// ===========================

let state = {};

function initState(gender, background, location) {
  const initialStats = {
    rich:   { health: 60, happiness: 60, wealth: 75, social: 50 },
    normal: { health: 55, happiness: 50, wealth: 45, social: 50 },
    poor:   { health: 45, happiness: 40, wealth: 20, social: 45 }
  };

  state = {
    age: 0,
    gender,
    background,
    location,
    stats: { ...initialStats[background] },
    triggered: new Set(),
    alive: true,
    lifeLog: []
  };
}

function clamp(val) {
  return Math.max(0, Math.min(100, Math.round(val)));
}

function applyEffects(effects) {
  ['health', 'happiness', 'wealth', 'social'].forEach(key => {
    if (effects[key]) {
      state.stats[key] = clamp(state.stats[key] + effects[key]);
    }
  });
}

function checkCondition(event) {
  const c = event.condition;
  if (!c) return true;

  if (c.gender      && c.gender      !== state.gender)      return false;
  if (c.background  && c.background  !== state.background)  return false;
  if (c.location    && c.location    !== state.location)     return false;
  if (c.notBackground && c.notBackground === state.background) return false;

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
  return EVENTS.filter(ev => {
    if (age < ev.ageMin || age > ev.ageMax) return false;
    if (ev.once && state.triggered.has(ev.id)) return false;
    if (!checkCondition(ev)) return false;
    if (Math.random() > ev.probability) return false;

    if (ev.once) state.triggered.add(ev.id);
    return true;
  });
}

function advanceYear() {
  const age = state.age;
  const events = getEventsForAge(age);

  // 加齢による健康低下
  if (age >= 70) state.stats.health = clamp(state.stats.health - 3);
  else if (age >= 60) state.stats.health = clamp(state.stats.health - 1);

  // イベントのステータス反映
  events.forEach(ev => applyEffects(ev.effects));

  // ログに記録
  state.lifeLog.push({ age, events });

  // 死亡判定
  if (state.stats.health <= 0) {
    state.alive = false;
    return 'death';
  }

  // 80歳で終了
  if (age >= 80) return 'end';

  state.age++;
  return 'continue';
}


// ===========================
// UI 操作
// ===========================

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function updateStats() {
  document.getElementById('current-age').textContent = state.age;
  ['health', 'happiness', 'wealth', 'social'].forEach(key => {
    const val = state.stats[key];
    document.getElementById('bar-' + key).style.width = val + '%';
    document.getElementById('val-' + key).textContent = val;
  });
}

function addYearToLog(age, events) {
  const logArea = document.getElementById('log-area');
  const block = document.createElement('div');
  block.className = 'year-block';

  const label = document.createElement('div');
  label.className = 'year-label';
  label.textContent = age + '歳';
  block.appendChild(label);

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
      block.appendChild(card);
    });
  }

  logArea.appendChild(block);
  setTimeout(() => block.scrollIntoView({ behavior: 'smooth', block: 'end' }), 50);
}

function showEndScreen(cause) {
  showScreen('end-screen');

  const s = state.stats;
  const age = state.lifeLog[state.lifeLog.length - 1].age;
  const score = Math.round((s.health + s.happiness + s.wealth + s.social) / 4);

  let rating, comment;

  if (cause === 'death') {
    rating = '波乱の生涯';
    comment = age + '歳で人生の幕が閉じた。\n健康が尽き、静かに逝ってしまった。\nそれでも、ひとつの命が確かにここにあった。';
  } else if (score >= 75) {
    rating = '充実した人生';
    comment = age + '歳まで生きた。\n健康・幸福・財産・縁、どれも恵まれた素晴らしい人生だった。';
  } else if (score >= 55) {
    rating = '悪くない人生';
    comment = age + '歳まで生きた。\n山あり谷あり、それでもしっかりと歩んだ人生だった。';
  } else if (score >= 38) {
    rating = '普通の人生';
    comment = age + '歳まで生きた。\n特別派手でも惨めでもなく、人並みの人生を送った。';
  } else {
    rating = '苦労の多い人生';
    comment = age + '歳まで生きた。\n波乱続きだったが、それでも最後まで生き抜いた。';
  }

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
}

function doNextYear() {
  const result = advanceYear();
  const last = state.lifeLog[state.lifeLog.length - 1];
  addYearToLog(last.age, last.events);
  updateStats();

  if (result === 'death' || result === 'end') {
    document.getElementById('next-btn').disabled = true;
    setTimeout(() => showEndScreen(result), 1200);
  }
}


// ===========================
// イベントリスナー
// ===========================

// 選択ボタン
document.querySelectorAll('.opt').forEach(btn => {
  btn.addEventListener('click', () => {
    const key = btn.dataset.key;
    document.querySelectorAll(`.opt[data-key="${key}"]`).forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
  });
});

// スタートボタン
document.getElementById('start-btn').addEventListener('click', () => {
  const gender     = document.querySelector('.opt.selected[data-key="gender"]').dataset.val;
  const background = document.querySelector('.opt.selected[data-key="background"]').dataset.val;
  const location   = document.querySelector('.opt.selected[data-key="location"]').dataset.val;

  document.getElementById('log-area').innerHTML = '';
  document.getElementById('next-btn').disabled = false;

  initState(gender, background, location);
  showScreen('game-screen');
  updateStats();

  // 誕生イベント（0歳）を自動表示
  doNextYear();
});

// 次の年へボタン
document.getElementById('next-btn').addEventListener('click', doNextYear);

// もう一度ボタン
document.getElementById('restart-btn').addEventListener('click', () => {
  showScreen('setup-screen');
});
