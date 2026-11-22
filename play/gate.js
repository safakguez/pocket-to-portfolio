// Schulversion: Code-Abfrage vor dem Spiel (wird von tool/build_school_web.sh in play/index.html eingebunden).
//
// Gültige Codes stehen als SHA-256-Hash mit Ablaufdatum in codes.json (erzeugt aus der privaten Liste
// store/schulcodes.csv mit tool/schulcode.py). Klassenlink: …/play/?code=ABCD-2345 – der Browser merkt
// sich den Code, danach startet das Spiel direkt. Ohne gültigen Code: Hinweis auf die Apps.
// Keine Cookies, keine externen Anfragen; Schriften kommen aus dem eigenen assets-Ordner.
(function () {
  'use strict';
  var SALT = 'p2p-school-v1:';
  var KEY = 'p2p_school_code';
  var MAIL = 'contact@decly.app';
  var PLAY = 'https://play.google.com/store/apps/details?id=com.pockettoportfolio.app';
  var IOS = 'https://apps.apple.com/app/id6825674286';
  var SITE = '/pocket-to-portfolio/';

  var T = {
    de: ['Schulversion', 'Pocket to Portfolio für den Unterricht – ohne Werbung und ohne Käufe. Gib den Schulcode deiner Lehrkraft ein oder öffne den Klassenlink.', 'Schulcode, z. B. ABCD-2345', 'Spielen', 'Dieser Code gilt nicht. Prüf die Schreibweise oder frag deine Lehrkraft.', 'Dieser Code ist abgelaufen. Deine Lehrkraft kann kostenlos einen neuen anfordern.', 'Sie unterrichten? Den Schulcode gibt es kostenlos per Mail an', 'Privat spielen? Die App gibt es kostenlos:', 'Leitfaden für Lehrkräfte', 'Spiel wird geladen …', 'lehrkraefte.html'],
    en: ['School edition', 'Pocket to Portfolio for the classroom – no ads, no purchases. Enter the school code from your teacher or open your class link.', 'School code, e.g. ABCD-2345', 'Play', "This code isn't valid. Check the spelling or ask your teacher.", 'This code has expired. Your teacher can request a new one for free.', 'Are you a teacher? Get a free school code by emailing', 'Playing at home? Get the free app:', "Teachers' guide", 'Loading the game …', 'teachers.html'],
    es: ['Versión escolar', 'Pocket to Portfolio para el aula: sin anuncios y sin compras. Introduce el código escolar que te dieron en clase o abre el enlace de tu clase.', 'Código escolar, p. ej. ABCD-2345', 'Jugar', 'Este código no es válido. Revisa cómo lo escribiste o pregunta en clase.', 'Este código ha caducado. Se puede pedir uno nuevo gratis.', '¿Das clase? El código escolar es gratuito: escribe a', '¿Juegas en casa? La app es gratuita:', 'Guía para docentes', 'Cargando el juego…', 'teachers-es.html'],
    fr: ['Version scolaire', 'Pocket to Portfolio pour la classe : sans publicité ni achats. Saisis le code scolaire reçu en classe ou ouvre le lien de ta classe.', 'Code scolaire, p. ex. ABCD-2345', 'Jouer', "Ce code n'est pas valable. Vérifie la saisie ou renseigne-toi en classe.", 'Ce code a expiré. Un nouveau code peut être demandé gratuitement.', 'Vous enseignez ? Le code scolaire est gratuit : écrivez à', "Pour jouer à la maison, l'app est gratuite :", 'Guide pédagogique', 'Chargement du jeu…', 'teachers-fr.html'],
    it: ['Versione scuola', 'Pocket to Portfolio per la classe: senza pubblicità e senza acquisti. Inserisci il codice scolastico ricevuto in classe o apri il link della tua classe.', 'Codice scolastico, es. ABCD-2345', 'Gioca', "Questo codice non è valido. Controlla come l'hai scritto o chiedi in classe.", 'Questo codice è scaduto. Se ne può richiedere uno nuovo gratis.', 'Insegni? Il codice scolastico è gratuito: scrivi a', "Giochi a casa? L'app è gratuita:", 'Guida per docenti', 'Caricamento del gioco…', 'teachers-it.html'],
    pt: ['Versão escolar', 'Pocket to Portfolio para a sala de aula: sem anúncios e sem compras. Digite o código escolar recebido na aula ou abra o link da sua turma.', 'Código escolar, ex.: ABCD-2345', 'Jogar', 'Este código não é válido. Confira a digitação ou pergunte na aula.', 'Este código expirou. É possível pedir um novo de graça.', 'Você dá aulas? O código escolar é gratuito: escreva para', 'Vai jogar em casa? O app é gratuito:', 'Guia para docentes', 'Carregando o jogo…', 'teachers-pt.html'],
    nl: ['Schoolversie', 'Pocket to Portfolio voor in de klas: zonder reclame en zonder aankopen. Voer de schoolcode in die je in de les kreeg, of open de klaslink.', 'Schoolcode, bijv. ABCD-2345', 'Spelen', 'Deze code is niet geldig. Controleer de spelling of vraag het in de les.', 'Deze code is verlopen. Een nieuwe code is gratis aan te vragen.', 'Geeft u les? De schoolcode is gratis: mail naar', 'Thuis spelen? De app is gratis:', 'Handleiding voor docenten', 'Spel wordt geladen…', 'teachers-nl.html'],
    pl: ['Wersja szkolna', 'Pocket to Portfolio na lekcje: bez reklam i bez zakupów. Wpisz kod szkolny otrzymany na lekcji albo otwórz link klasy.', 'Kod szkolny, np. ABCD-2345', 'Graj', 'Ten kod jest nieprawidłowy. Sprawdź pisownię albo zapytaj na lekcji.', 'Ten kod wygasł. Nowy kod można zamówić bezpłatnie.', 'Uczysz? Kod szkolny jest bezpłatny – napisz na', 'Grasz w domu? Aplikacja jest bezpłatna:', 'Przewodnik dla nauczycieli', 'Ładowanie gry…', 'teachers-pl.html'],
    tr: ['Okul sürümü', 'Ders için Pocket to Portfolio: reklam yok, satın alma yok. Derste aldığın okul kodunu gir ya da sınıf bağlantısını aç.', 'Okul kodu, ör. ABCD-2345', 'Oyna', 'Bu kod geçerli değil. Yazımı kontrol et ya da derste sor.', 'Bu kodun süresi doldu. Ücretsiz yeni bir kod istenebilir.', 'Öğretmen misiniz? Okul kodu ücretsizdir, yazın:', 'Evde mi oynayacaksın? Uygulama ücretsiz:', 'Öğretmen rehberi', 'Oyun yükleniyor…', 'teachers-tr.html'],
    ru: ['Школьная версия', 'Pocket to Portfolio для уроков: без рекламы и без покупок. Введи школьный код, полученный на уроке, или открой ссылку класса.', 'Школьный код, напр. ABCD-2345', 'Играть', 'Этот код недействителен. Проверь написание или спроси на уроке.', 'Срок действия кода истёк. Новый код можно запросить бесплатно.', 'Вы преподаёте? Школьный код бесплатный — пишите на', 'Играешь дома? Приложение бесплатное:', 'Руководство для учителей', 'Игра загружается…', 'teachers-ru.html'],
    ja: ['学校版', '授業用の Pocket to Portfolio：広告なし・購入なし。授業で受け取った学校コードを入力するか、クラスのリンクを開いてください。', '学校コード（例：ABCD-2345）', 'プレイ', 'このコードは無効です。入力内容を確かめるか、授業で確認してください。', 'このコードは有効期限が切れています。新しいコードは無料で申し込めます。', '先生の方へ：学校コードは無料です。お申し込み先', '家で遊ぶなら無料アプリをどうぞ：', '先生向けガイド', 'ゲームを読み込み中…', 'teachers-ja.html'],
    ko: ['학교용 버전', '수업용 Pocket to Portfolio: 광고도 구매도 없습니다. 수업에서 받은 학교 코드를 입력하거나 반 링크를 여세요.', '학교 코드 (예: ABCD-2345)', '시작하기', '유효하지 않은 코드입니다. 입력한 내용을 확인하거나 수업 중에 물어보세요.', '만료된 코드입니다. 새 코드는 무료로 신청할 수 있어요.', '선생님이신가요? 학교 코드는 무료입니다. 신청:', '집에서 플레이하나요? 무료 앱을 받으세요:', '교사용 가이드', '게임을 불러오는 중…', 'teachers-ko.html'],
    zh: ['学校版', '课堂用的 Pocket to Portfolio：没有广告，没有购买。请输入课堂上拿到的学校代码，或打开班级链接。', '学校代码，例如 ABCD-2345', '开始游戏', '此代码无效。请检查输入，或在课堂上询问。', '此代码已过期。可以免费申请新的代码。', '您是教师吗？学校代码免费提供，请发邮件至', '在家玩？免费下载 App：', '教师指南', '游戏加载中…', 'teachers-zh.html'],
    'zh-Hant': ['學校版', '課堂用的 Pocket to Portfolio：沒有廣告，沒有購買。請輸入課堂上拿到的學校代碼，或打開班級連結。', '學校代碼，例如 ABCD-2345', '開始遊戲', '此代碼無效。請檢查輸入，或在課堂上詢問。', '此代碼已過期。可以免費申請新的代碼。', '您是老師嗎？學校代碼免費提供，請寄信至', '在家玩？免費下載 App：', '教師指南', '遊戲載入中…', 'teachers-zh.html'],
    az: ['Məktəb versiyası', 'Dərs üçün Pocket to Portfolio: reklamsız və alış-verişsiz. Dərsdə aldığın məktəb kodunu daxil et və ya sinif linkini aç.', 'Məktəb kodu, məs. ABCD-2345', 'Oyna', 'Bu kod etibarlı deyil. Yazılışı yoxla və ya dərsdə soruş.', 'Bu kodun müddəti bitib. Yeni kodu pulsuz istəmək olar.', 'Müəllimsiniz? Məktəb kodu pulsuzdur, yazın:', 'Evdə oynayırsan? Tətbiq pulsuzdur:', 'Müəllimlər üçün bələdçi', 'Oyun yüklənir…', 'teachers.html'],
    ka: ['სასკოლო ვერსია', 'Pocket to Portfolio გაკვეთილისთვის: რეკლამისა და შესყიდვების გარეშე. შეიყვანე გაკვეთილზე მიღებული სასკოლო კოდი ან გახსენი კლასის ბმული.', 'სასკოლო კოდი, მაგ. ABCD-2345', 'თამაში', 'ეს კოდი არასწორია. შეამოწმე ჩანაწერი ან იკითხე გაკვეთილზე.', 'ამ კოდს ვადა გაუვიდა. ახალი კოდის მოთხოვნა უფასოა.', 'მასწავლებელი ხართ? სასკოლო კოდი უფასოა, მოგვწერეთ:', 'სახლში თამაშობ? აპი უფასოა:', 'სახელმძღვანელო მასწავლებლებისთვის', 'თამაში იტვირთება…', 'teachers.html']
  };

  var params = new URLSearchParams(location.search);

  function pickLang(raw) {
    var l = String(raw || 'en').replace('_', '-').toLowerCase();
    if (l.indexOf('zh') === 0) return /hant|-tw|-hk|-mo/.test(l) ? 'zh-Hant' : 'zh';
    var base = l.split('-')[0];
    return T[base] ? base : 'en';
  }
  var lang = pickLang(params.get('lang') || (navigator.languages && navigator.languages[0]) || navigator.language);
  var t = T[lang];
  document.documentElement.lang = lang;

  function norm(code) { return String(code || '').toUpperCase().replace(/[^A-Z0-9]/g, ''); }

  function sha256(text) {
    return crypto.subtle.digest('SHA-256', new TextEncoder().encode(text)).then(function (buf) {
      return Array.prototype.map.call(new Uint8Array(buf), function (b) { return ('0' + b.toString(16)).slice(-2); }).join('');
    });
  }

  var db = null;
  function codes() {
    if (db) return Promise.resolve(db);
    return fetch('codes.json', { cache: 'no-cache' }).then(function (r) { return r.json(); }).then(function (j) { db = j; return j; });
  }

  // 'ok' | 'invalid' | 'expired'
  function check(code) {
    var n = norm(code);
    if (n.length !== 8) return Promise.resolve('invalid');
    return Promise.all([codes(), sha256(SALT + n)]).then(function (r) {
      var until = r[0].codes[r[1]];
      if (!until) return 'invalid';
      var today = new Date();
      var iso = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
      return iso > until ? 'expired' : 'ok';
    });
  }

  function store(code) { try { localStorage.setItem(KEY, norm(code)); } catch (e) { /* privates Fenster */ } }
  function saved() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function forget() { try { localStorage.removeItem(KEY); } catch (e) { /* egal */ } }

  var css = [
    "@font-face{font-family:'Nunito';src:url('assets/assets/google_fonts/Nunito-Regular.ttf');font-weight:400}",
    "@font-face{font-family:'Nunito';src:url('assets/assets/google_fonts/Nunito-ExtraBold.ttf');font-weight:800}",
    "@font-face{font-family:'Fredoka';src:url('assets/assets/google_fonts/Fredoka-SemiBold.ttf');font-weight:600}",
    'html,body{margin:0;background:#EDF3EF;color:#13261D;font-family:Nunito,system-ui,sans-serif}',
    '#gate{box-sizing:border-box;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px 16px}',
    '#gate .card{background:#fff;border-radius:24px;max-width:440px;width:100%;padding:28px 24px;box-shadow:0 2px 0 #D5E0DA}',
    '#gate .brand{display:flex;align-items:center;gap:12px;margin-bottom:4px}',
    '#gate .brand img{width:44px;height:44px;border-radius:12px}',
    "#gate h1{font-family:Fredoka,Nunito,sans-serif;font-weight:600;font-size:24px;margin:0;line-height:1.15}",
    '#gate .sub{color:#1D7A52;font-weight:800;font-size:14px;margin:0}',
    '#gate p{line-height:1.5;margin:14px 0}',
    '#gate form{display:flex;gap:8px;flex-wrap:wrap}',
    '#gate input{flex:1 1 180px;min-width:0;font:inherit;font-size:18px;letter-spacing:1px;padding:12px 14px;border:2px solid #D5E0DA;border-radius:14px}',
    '#gate input:not(:placeholder-shown){text-transform:uppercase}',
    '#gate input:focus{outline:none;border-color:#1D7A52}',
    '#gate button{font:inherit;font-weight:800;font-size:17px;color:#fff;background:#1D7A52;border:0;border-radius:14px;padding:12px 22px;box-shadow:0 3px 0 #145C3D;cursor:pointer}',
    '#gate button:disabled{opacity:.6;cursor:default}',
    '#gate .err{color:#B9472F;font-weight:800;min-height:1.5em;margin:10px 0 0}',
    '#gate .small{font-size:14px;color:#4F6259}',
    '#gate a{color:#145C3D;font-weight:800}',
    '#gate .stores{display:flex;gap:8px;flex-wrap:wrap;margin-top:8px}',
    '#gate .stores a{display:inline-block;text-decoration:none;color:#13261D;background:#FFF4DA;border:2px solid #F2B33D;border-radius:12px;padding:8px 12px;font-size:14px}',
    '#gate hr{border:0;border-top:1px solid #D5E0DA;margin:20px 0}',
    '#loading{min-height:100vh;display:flex;align-items:center;justify-content:center;color:#4F6259;font-weight:800}'
  ].join('\n');

  function el(tag, attrs, text) {
    var e = document.createElement(tag);
    for (var k in attrs || {}) e.setAttribute(k, attrs[k]);
    if (text != null) e.textContent = text;
    return e;
  }

  var style = el('style', {}, css);
  document.head.appendChild(style);

  function startGame() {
    var g = document.getElementById('gate');
    if (g) g.remove();
    var loading = el('div', { id: 'loading' }, t[9]);
    document.body.appendChild(loading);
    var s = el('script', { src: 'flutter_bootstrap.js', async: '' });
    document.body.appendChild(s);
    // Flutter legt seine Fläche selbst an; den Ladehinweis entfernen, sobald sie da ist.
    var obs = new MutationObserver(function () {
      if (document.querySelector('flutter-view, flt-glass-pane')) { loading.remove(); obs.disconnect(); style.remove(); }
    });
    obs.observe(document.body, { childList: true, subtree: true });
  }

  function cleanUrl() {
    if (!params.has('code')) return;
    params.delete('code');
    var q = params.toString();
    history.replaceState(null, '', location.pathname + (q ? '?' + q : ''));
  }

  function showGate(problem) {
    var gate = el('div', { id: 'gate' });
    var card = el('div', { class: 'card' });
    var brand = el('div', { class: 'brand' });
    brand.appendChild(el('img', { src: 'icons/Icon-192.png', alt: '' }));
    var names = el('div');
    names.appendChild(el('h1', {}, 'Pocket to Portfolio'));
    names.appendChild(el('p', { class: 'sub' }, t[0]));
    brand.appendChild(names);
    card.appendChild(brand);
    card.appendChild(el('p', {}, t[1]));

    var form = el('form', { autocomplete: 'off' });
    var input = el('input', { type: 'text', placeholder: t[2], 'aria-label': t[2], maxlength: '12', autocapitalize: 'characters', spellcheck: 'false' });
    var btn = el('button', { type: 'submit' }, t[3]);
    form.appendChild(input);
    form.appendChild(btn);
    card.appendChild(form);
    var err = el('p', { class: 'err', role: 'alert' }, problem === 'expired' ? t[5] : problem === 'invalid' ? t[4] : '');
    card.appendChild(err);

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      btn.disabled = true;
      check(input.value).then(function (r) {
        if (r === 'ok') { store(input.value); cleanUrl(); startGame(); return; }
        err.textContent = r === 'expired' ? t[5] : t[4];
        btn.disabled = false;
      }).catch(function () { err.textContent = t[4]; btn.disabled = false; });
    });

    card.appendChild(el('hr'));
    var teach = el('p', { class: 'small' }, t[6] + ' ');
    var subject = encodeURIComponent('Schulcode / School code – Pocket to Portfolio');
    teach.appendChild(el('a', { href: 'mailto:' + MAIL + '?subject=' + subject }, MAIL));
    teach.appendChild(document.createTextNode(' · '));
    teach.appendChild(el('a', { href: SITE + t[10] }, t[8]));
    card.appendChild(teach);
    var priv = el('p', { class: 'small' }, t[7]);
    var stores = el('div', { class: 'stores' });
    stores.appendChild(el('a', { href: PLAY }, 'Google Play'));
    stores.appendChild(el('a', { href: IOS }, 'App Store'));
    priv.appendChild(stores);
    card.appendChild(priv);

    gate.appendChild(card);
    document.body.appendChild(gate);
    if (problem !== 'expired') input.focus();
  }

  function boot() {
    var fromUrl = params.get('code');
    var code = fromUrl || saved();
    if (!code || !window.crypto || !crypto.subtle) { showGate(fromUrl ? 'invalid' : null); return; }
    check(code).then(function (r) {
      if (r === 'ok') { store(code); cleanUrl(); startGame(); return; }
      if (!fromUrl) forget();
      showGate(r);
    }).catch(function () { showGate(null); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
