/* ================= alapok ================= */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const slug = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const store = {
  get(k, d) { try { const v = localStorage.getItem('szervora.' + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem('szervora.' + k, JSON.stringify(v)); } catch (e) {} }
};

/* ================= nyelv ================= */
const PACK = window.SZ_LANG || {};
const LANGS = Object.keys(PACK);
let lang = store.get('lang', null) || ((navigator.language || '').toLowerCase().startsWith('hu') ? 'hu' : 'en');
if (!PACK[lang]) lang = 'hu';
const t = (k, v = {}) => { let s = PACK[lang].ui[k] ?? PACK.hu.ui[k] ?? k; if (Array.isArray(s)) s = s[v.n === 1 ? 0 : 1]; return String(s).replace(/\{(\w+)\}/g, (_, x) => (v[x] ?? '')); };
const C = (sec, key) => { const a = PACK[lang].c[sec], b = PACK.hu.c[sec]; if (key === undefined) return a || b; return (a && a[key] !== undefined) ? a[key] : b[key]; };
const loc = () => PACK[lang].locale;
const isWho = () => PACK[lang].codes === 'who';
const WHO_CH = { T: 'LU', Vab: 'LI', Gy: 'ST', Lh: 'SP', Sz: 'HT', 'Véb': 'SI', H: 'BL', V: 'KI', Szb: 'PC', Hm: 'TE', Eh: 'GB', M: 'LR', Kor: 'GV', Bef: 'CV' };
const chA = (c) => isWho() ? WHO_CH[c] : c;
const pc = (p) => isWho() ? p.who : p.id;
const pc2 = (p) => isWho() ? p.id : p.who;
const orgN = (c) => C('org', c)[0];
const elT = (k) => C('el', k);
const chT = (c) => C('ch', c);
const ptT = (id) => C('pts', id);
const num = (n) => n.toLocaleString(loc(), { maximumFractionDigits: 1 });

/* ================= ikonok ================= */
const IC = {
  full: '<path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5"/>', fullx: '<path d="M9 4v5H4M20 9h-5V4M15 20v-5h5M4 15h5v5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>', practice: '<path d="M3 8h11a3 3 0 1 0-3-3M3 12h16a3 3 0 1 1-3 3M3 16h8"/>',
  layers: '<path d="M12 3 3 8l9 5 9-5-9-5zM3 13l9 5 9-5"/>', elements: '<path d="M12 3l8.6 6.2-3.3 10.1H6.7L3.4 9.2z"/><circle cx="12" cy="12" r="2.5"/>',
  body: '<circle cx="12" cy="4" r="2"/><path d="M8 8h8l-1 7h-1.5l-.5 6h-2l-.5-6H9z"/>', move: '<circle cx="12" cy="5" r="2"/><path d="M12 8v6M6 11l6-1 6 1M12 14l-4 6M12 14l4 6"/>',
  breath: '<path d="M3 9h10a3 3 0 1 0-3-3M3 13h15a3 3 0 1 1-3 3M3 17h6"/>', food: '<path d="M3 11h18a9 9 0 0 1-18 0zM8 7c0-1.5 1-1.5 1-3M13 7c0-1.5 1-1.5 1-3"/>',
  point: '<circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="8"/>', emotion: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
  herb: '<path d="M5 19c0-8 5-14 15-14 0 10-6 15-14 15M5 19l8-8"/>', season: '<circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>',
  sleep: '<path d="M20 14A8 8 0 1 1 10 4a6.5 6.5 0 0 0 10 10z"/>', book: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 5v16M8 7h7"/>',
  hand: '<path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V11M11 10V4.5a1.5 1.5 0 0 1 3 0V11M14 10.5V6a1.5 1.5 0 0 1 3 0v7c0 4-2.5 7-6 7-2.5 0-4-1.5-5.5-4L4 13a1.5 1.5 0 0 1 2.5-1.5L8 13"/>',
  eye: '<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>', travel: '<path d="M3 13l18-7-7 18-3-8z"/>',
  sun: '<circle cx="12" cy="14" r="4"/><path d="M12 4v3M4.9 8.9l2.1 2.1M19.1 8.9 17 11M3 20h18"/>', search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
  warn: '<path d="M12 3.5l9 16H3z"/><path d="M12 10v4M12 17h.01"/>', play: '<path d="M7 5l12 7-12 7z"/>', pause: '<path d="M8 5v14M16 5v14"/>', stop: '<rect x="6" y="6" width="12" height="12" rx="2"/>',
  chev: '<path d="M9 6l6 6-6 6"/>', back: '<path d="M15 6l-6 6 6 6"/>', reset: '<path d="M4 12a8 8 0 1 0 2.3-5.7M4 4v4h4"/>',
  prev: '<path d="M18 6l-8 6 8 6zM6 6v12"/>', bone: '<path d="M8.5 15.5l7-7"/><path d="M6.5 13.5a2.2 2.2 0 1 0-1.8 3.4 2.2 2.2 0 1 0 3.4 1.8M17.5 10.5a2.2 2.2 0 1 0 1.8-3.4 2.2 2.2 0 1 0-3.4-1.8"/>', nofood: '<path d="M7 3v8M5 3v4a2 2 0 0 0 4 0V3M7 11v10M16 3c-1.7 1.5-2.5 4-2.5 7h3V21M3 3l18 18"/>', next: '<path d="M6 6l8 6-8 6zM18 6v12"/>', globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18"/>'
};
const ic = (n, s = 22, w = 1.8) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IC[n]}</svg>`;

/* ================= nyelvfüggetlen adatok ================= */
const ELK = ['fa', 'tuz', 'fold', 'fem', 'viz'];
const HAN = { fa: '木', tuz: '火', fold: '土', fem: '金', viz: '水' };
const PY = { fa: 'Mù', tuz: 'Huǒ', fold: 'Tǔ', fem: 'Jīn', viz: 'Shuǐ' };
const ELORG = { fa: ['M', 'Eh'], tuz: ['Sz', 'Véb', 'Szb', 'Hm'], fold: ['Lh', 'Gy'], fem: ['T', 'Vab'], viz: ['V', 'H'] };
const GEN = { fa: 'tuz', tuz: 'fold', fold: 'fem', fem: 'viz', viz: 'fa' };
const CTRL = { fa: 'fold', fold: 'viz', viz: 'tuz', tuz: 'fem', fem: 'fa' };
const ORG = [['Eh', 'Dǎn', '胆', 'fa', 'yang', 23], ['M', 'Gān', '肝', 'fa', 'yin', 1], ['T', 'Fèi', '肺', 'fem', 'yin', 3], ['Vab', 'Dàcháng', '大肠', 'fem', 'yang', 5], ['Gy', 'Wèi', '胃', 'fold', 'yang', 7], ['Lh', 'Pí', '脾', 'fold', 'yin', 9], ['Sz', 'Xīn', '心', 'tuz', 'yin', 11], ['Véb', 'Xiǎocháng', '小肠', 'tuz', 'yang', 13], ['H', 'Pángguāng', '膀胱', 'viz', 'yang', 15], ['V', 'Shèn', '肾', 'viz', 'yin', 17], ['Szb', 'Xīnbāo', '心包', 'tuz', 'yin', 19], ['Hm', 'Sānjiāo', '三焦', 'tuz', 'yang', 21]]
  .map(([c, py, han, el, yy, s]) => ({ c, py, han, el, yy, s }));
const OBY = Object.fromEntries(ORG.map((o) => [o.c, o]));
const PAIR = { Eh: 'M', M: 'Eh', T: 'Vab', Vab: 'T', Gy: 'Lh', Lh: 'Gy', Sz: 'Véb', 'Véb': 'Sz', H: 'V', V: 'H', Szb: 'Hm', Hm: 'Szb' };
const CHEL = { T: 'fem', Vab: 'fem', Gy: 'fold', Lh: 'fold', Sz: 'tuz', 'Véb': 'tuz', H: 'viz', V: 'viz', Szb: 'tuz', Hm: 'tuz', Eh: 'fa', M: 'fa', Kor: 'er', Bef: 'er' };
const CHN = { T: 11, Vab: 20, Gy: 45, Lh: 21, Sz: 9, 'Véb': 19, H: 67, V: 27, Szb: 9, Hm: 23, Eh: 44, M: 14, Kor: 28, Bef: 24 };
const CHORDER = ['T', 'Vab', 'Gy', 'Lh', 'Sz', 'Véb', 'H', 'V', 'Szb', 'Hm', 'Eh', 'M', 'Kor', 'Bef'];
const SOUND_OF = { T: 'T', Vab: 'T', V: 'V', H: 'V', M: 'M', Eh: 'M', Sz: 'Sz', 'Véb': 'Sz', Lh: 'Lh', Gy: 'Lh', Szb: 'Hm', Hm: 'Hm' };
/* sematikus csatornautak a 310×480-as testrajzon, az áramlás irányában */
const CHP = {
  T: ['f', 'M@T-1 Q201 114 202 124 L@T-5 L@T-7 L@T-9 L262 262 L267 280'],
  Vab: ['f', 'M263 287 L@Vab-4 L259 250 L247 205 L@Vab-11 L206 120 L196 96 Q180 84 162 72 Q158 60 157 52 L@Vab-20'],
  Gy: ['f', 'M157 40 L159 54 Q163 62 160 70 L160 80 Q164 88 168 96 L172 128 L163 170 L162 230 L161 246 L172 300 L178 352 L@Gy-36 L@Gy-40 L179 448 L186 469'],
  Lh: ['f', 'M171 467 L169 458 L166 446 L@Lh-6 L164 405 L@Lh-9 L@Lh-10 L157 290 L163 252 L174 215 L180 170 L186 118 Q192 132 194 150'],
  Sz: ['f', 'M165 126 Q186 124 201 140 L213.4 165.7 L@Sz-3 L@Sz-7 L252.7 271.2 L256 288'],
  'Véb': ['b', 'M251 289 L@Véb-3 L242 248 L219.7 181 L198 136 L188 112 L168 120 L182 128 L164 108 L158 82 Q166 70 168 60 L170 46'],
  H: ['b', 'M150 14 Q153 30 155 50 L157 70 L159 90 L@H-23 L158 240 L163 254 L168 300 L@H-40 L175 400 L182 440 L@H-60 L192 466'],
  V: ['f', 'M174 469 L169 458 L@V-3 L165 420 L162 358 L157 300 L153 248 L153 175 L160 150 L160 98'],
  Szb: ['f', 'M182 128 Q192 132 198 140 L213 162 L225.5 177.5 L@Szb-6 L@Szb-8 L258 290'],
  Hm: ['b', 'M256 289 L256 270 L@Hm-5 L226 178 L206 136 L192 98 Q174 84 164 72 Q168 56 170 44 Q166 32 160 30'],
  Eh: ['f', 'M163 36 Q170 32 169 26 Q174 40 170 52 Q166 62 162 68 L172 90 L195 130 L193 200 L190 250 L185 300 L185 358 L@Eh-34 L186 420 L186 448 L190 469'],
  M: ['f', 'M176 469 L@M-3 L170 447 L166 410 L162 360 L157 300 L160 252 L176 205 L190 188 L172 150'],
  Kor: ['b', 'M150 250 L@Kor-4 L@Kor-14 L150 60 L@Kor-20'],
  Bef: ['f', 'M150 248 L@Bef-4 L@Bef-6 L@Bef-12 L@Bef-17 L150 66']
};
const PTS = [
  ['Kor-20', 'GV20', 'Baihui', 'fb', 150, 16], ['H-1', 'BL1', 'Jingming', 'f', 153.5, 35], ['Kor-26', 'GV26', 'Renzhong', 'f', 150, 50], ['Vab-20', 'LI20', 'Yingxiang', 'f', 155.5, 46],
  ['T-1', 'LU1', 'Zhongfu', 'f', 180, 106], ['Bef-17', 'CV17', 'Shanzhong', 'f', 150, 128], ['Bef-12', 'CV12', 'Zhongwan', 'f', 150, 183], ['Bef-6', 'CV6', 'Qihai', 'f', 150, 213],
  ['Bef-4', 'CV4', 'Guanyuan', 'f', 150, 222], ['T-5', 'LU5', 'Chize', 'f', 230.6, 174.2], ['Vab-11', 'LI11', 'Quchi', 'f', 235.3, 172.3], ['T-7', 'LU7', 'Lieque', 'f', 253.7, 238.5],
  ['T-9', 'LU9', 'Taiyuan', 'f', 256.7, 247.8], ['Szb-6', 'PC6', 'Neiguan', 'f', 246, 237.6], ['Szb-8', 'PC8', 'Laogong', 'f', 259.5, 268.5], ['Sz-3', 'HT3', 'Shaohai', 'f', 219.7, 179.5],
  ['Sz-7', 'HT7', 'Shenmen', 'f', 243.3, 252.2], ['Lh-10', 'SP10', 'Xuehai', 'f', 160, 335], ['Lh-9', 'SP9', 'Yinlingquan', 'f', 164, 370], ['Gy-36', 'ST36', 'Zusanli', 'f', 181, 378],
  ['Eh-34', 'GB34', 'Yanglingquan', 'f', 183, 368], ['Gy-40', 'ST40', 'Fenglong', 'f', 183, 406], ['Lh-6', 'SP6', 'Sanyinjiao', 'f', 167, 435], ['V-3', 'KI3', 'Taixi', 'f', 167, 451],
  ['M-3', 'LR3', 'Taichong', 'f', 178, 463], ['Eh-20', 'GB20', 'Fengchi', 'b', 158, 63], ['Kor-14', 'GV14', 'Dazhui', 'b', 150, 86], ['Eh-21', 'GB21', 'Jianjing', 'b', 172, 92],
  ['H-23', 'BL23', 'Shenshu', 'b', 159, 205], ['Kor-4', 'GV4', 'Mingmen', 'b', 150, 205], ['H-40', 'BL40', 'Weizhong', 'b', 172, 358], ['H-60', 'BL60', 'Kunlun', 'b', 184, 451],
  ['Hm-5', 'TE5', 'Waiguan', 'b', 246, 237.6], ['Vab-4', 'LI4', 'Hegu', 'b', 262, 266], ['Véb-3', 'SI3', 'Houxi', 'b', 251, 278],
  // bővítés (WHO 2008 helyek alapján): a helyük a PSPEC-ből számolódik
  ['Eh-14', 'GB14', 'Yangbai', 'f', 150, 150], ['H-2', 'BL2', 'Cuanzhu', 'f', 150, 150], ['Gy-2', 'ST2', 'Sibai', 'f', 150, 150], ['Véb-19', 'SI19', 'Tinggong', 'f', 150, 150], ['Gy-6', 'ST6', 'Jiache', 'f', 150, 150], ['Kor-24', 'GV24', 'Shenting', 'f', 150, 150], ['H-10', 'BL10', 'Tianzhu', 'b', 150, 150], ['Bef-22', 'CV22', 'Tiantu', 'f', 150, 150], ['Gy-25', 'ST25', 'Tianshu', 'f', 150, 150], ['Bef-14', 'CV14', 'Juque', 'f', 150, 150], ['Bef-3', 'CV3', 'Zhongji', 'f', 150, 150], ['M-14', 'LR14', 'Qimen', 'f', 150, 150], ['M-13', 'LR13', 'Zhangmen', 'f', 150, 150], ['T-2', 'LU2', 'Yunmen', 'f', 150, 150], ['V-27', 'KI27', 'Shufu', 'f', 150, 150], ['H-13', 'BL13', 'Feishu', 'b', 150, 150], ['H-15', 'BL15', 'Xinshu', 'b', 150, 150], ['H-17', 'BL17', 'Geshu', 'b', 150, 150], ['H-18', 'BL18', 'Ganshu', 'b', 150, 150], ['H-20', 'BL20', 'Pishu', 'b', 150, 150], ['H-21', 'BL21', 'Weishu', 'b', 150, 150], ['H-25', 'BL25', 'Dachangshu', 'b', 150, 150], ['Kor-12', 'GV12', 'Shenzhu', 'b', 150, 150], ['Véb-11', 'SI11', 'Tianzong', 'b', 150, 150], ['Vab-10', 'LI10', 'Shousanli', 'f', 150, 150], ['Vab-15', 'LI15', 'Jianyu', 'f', 150, 150], ['Hm-14', 'TE14', 'Jianliao', 'b', 150, 150], ['Szb-7', 'PC7', 'Daling', 'f', 150, 150], ['Hm-4', 'TE4', 'Yangchi', 'b', 150, 150], ['T-6', 'LU6', 'Kongzui', 'f', 150, 150], ['Gy-34', 'ST34', 'Liangqiu', 'f', 150, 150], ['Gy-35', 'ST35', 'Dubi', 'f', 150, 150], ['Eh-30', 'GB30', 'Huantiao', 'b', 150, 150], ['Eh-39', 'GB39', 'Xuanzhong', 'f', 150, 150], ['Eh-40', 'GB40', 'Qiuxu', 'f', 150, 150], ['Eh-41', 'GB41', 'Zulinqi', 'f', 150, 150], ['H-57', 'BL57', 'Chengshan', 'b', 150, 150], ['H-62', 'BL62', 'Shenmai', 'b', 150, 150], ['V-6', 'KI6', 'Zhaohai', 'f', 150, 150], ['V-7', 'KI7', 'Fuliu', 'f', 150, 150], ['Lh-4', 'SP4', 'Gongsun', 'f', 150, 150], ['M-8', 'LR8', 'Ququan', 'f', 150, 150]
].map(([id, who, py, v, x, y]) => { const ch = id.split('-')[0]; return { id, who, py, v, x, y, ch, el: CHEL[ch], s: slug(id), goals: [] }; });
// a pontok kínai neve (írásjegyek) és hagyományos szerepe (magyarázat: c.pcat, c.vessel, c.hui)
const PHAN = {"Kor-20": "百会", "H-1": "睛明", "Kor-26": "人中", "Vab-20": "迎香", "T-1": "中府", "Bef-17": "膻中", "Bef-12": "中脘", "Bef-6": "气海", "Bef-4": "关元", "T-5": "尺泽", "Vab-11": "曲池", "T-7": "列缺", "T-9": "太渊", "Szb-6": "内关", "Szb-8": "劳宫", "Sz-3": "少海", "Sz-7": "神门", "Lh-10": "血海", "Lh-9": "阴陵泉", "Gy-36": "足三里", "Eh-34": "阳陵泉", "Gy-40": "丰隆", "Lh-6": "三阴交", "V-3": "太溪", "M-3": "太冲", "Eh-20": "风池", "Kor-14": "大椎", "Eh-21": "肩井", "H-23": "肾俞", "Kor-4": "命门", "H-40": "委中", "H-60": "昆仑", "Hm-5": "外关", "Vab-4": "合谷", "Véb-3": "后溪", "T-11": "少商", "Vab-1": "商阳", "Szb-9": "中冲", "Hm-1": "关冲", "Sz-9": "少冲", "Véb-1": "少泽", "T-10": "鱼际", "Sz-8": "少府", "Hm-3": "中渚", "Lh-1": "隐白", "M-1": "大敦", "M-2": "行间", "Gy-44": "内庭", "Gy-45": "厉兑", "Eh-44": "足窍阴", "H-67": "至阴", "V-1": "涌泉", "Eh-14": "阳白", "H-2": "攒竹", "Gy-2": "四白", "Véb-19": "听宫", "Gy-6": "颊车", "Kor-24": "神庭", "H-10": "天柱", "Bef-22": "天突", "Gy-25": "天枢", "Bef-14": "巨阙", "Bef-3": "中极", "M-14": "期门", "M-13": "章门", "T-2": "云门", "V-27": "俞府", "H-13": "肺俞", "H-15": "心俞", "H-17": "膈俞", "H-18": "肝俞", "H-20": "脾俞", "H-21": "胃俞", "H-25": "大肠俞", "Kor-12": "身柱", "Véb-11": "天宗", "Vab-10": "手三里", "Vab-15": "肩髃", "Hm-14": "肩髎", "Szb-7": "大陵", "Hm-4": "阳池", "T-6": "孔最", "Gy-34": "梁丘", "Gy-35": "犊鼻", "Eh-30": "环跳", "Eh-39": "悬钟", "Eh-40": "丘墟", "Eh-41": "足临泣", "H-57": "承山", "H-62": "申脉", "V-6": "照海", "V-7": "复溜", "Lh-4": "公孙", "M-8": "曲泉"};
const PCAT = {"T-1": "start mu:T", "T-5": "five:viz", "T-6": "xi", "T-7": "lo conf:Ren", "T-9": "yuan five:fold hui:vessels", "T-10": "five:tuz", "T-11": "five:fa end", "Vab-1": "five:fem start", "Vab-4": "yuan", "Vab-11": "five:fold", "Vab-15": "meet", "Vab-20": "end meet", "Gy-25": "mu:Vab", "Gy-34": "xi", "Gy-36": "five:fold", "Gy-40": "lo", "Gy-44": "five:viz", "Gy-45": "five:fem end", "Lh-1": "five:fa start", "Lh-4": "lo conf:Chong", "Lh-6": "meet", "Lh-9": "five:viz", "Sz-3": "five:viz", "Sz-7": "yuan five:fold", "Sz-8": "five:tuz", "Sz-9": "five:fa end", "Véb-1": "five:fem start", "Véb-3": "five:fa conf:Du", "Véb-19": "end meet", "H-1": "start meet", "H-13": "bshu", "H-15": "bshu", "H-17": "bshu hui:blood", "H-18": "bshu", "H-20": "bshu", "H-21": "bshu", "H-23": "bshu", "H-25": "bshu", "H-40": "five:fold", "H-60": "five:tuz", "H-62": "conf:YangQ", "H-67": "five:fem end", "V-1": "five:fa start", "V-3": "yuan five:fold", "V-6": "conf:YinQ", "V-7": "five:fem", "V-27": "end", "Szb-6": "lo conf:YinW", "Szb-7": "yuan five:fold", "Szb-8": "five:tuz", "Szb-9": "five:fa end", "Hm-1": "five:fem start", "Hm-3": "five:fa", "Hm-4": "yuan", "Hm-5": "lo conf:YangW", "Eh-14": "meet", "Eh-20": "meet", "Eh-21": "meet", "Eh-30": "meet", "Eh-34": "five:fold hui:tendons", "Eh-39": "hui:marrow", "Eh-40": "yuan", "Eh-41": "five:fa conf:Dai", "Eh-44": "five:fem end", "M-1": "five:fa start", "M-2": "five:tuz", "M-3": "yuan five:fold", "M-8": "five:viz", "M-13": "mu:Lh hui:zang", "M-14": "mu:M end", "Kor-14": "meet", "Kor-20": "meet", "Kor-24": "meet", "Kor-26": "meet", "Bef-3": "mu:H meet", "Bef-4": "mu:Véb meet", "Bef-12": "mu:Gy hui:fu", "Bef-14": "mu:Sz", "Bef-17": "mu:Szb hui:qi", "Bef-22": "meet"};
const PBY = Object.fromEntries(PTS.map((p) => [p.id, p]));
/* ================= teák és fűszerek =================
   Hétköznapi konyhai és teanövények – nem gyógyszerek. Kínai hagyományos besorolás (hőhatás, íz, csatornák) csak ott,
   ahol a növény a kínai hagyományban is ismert; a többinél európai hagyomány. Biztonsági szöveg (c.herbs[id][3]) mindegyiknél
   kötelező; forrás: az EMA gyógynövény-monográfiái (ema), Wikidata (q). prep: [módszer, víz °C, perc min, perc max, mennyiség].
   stim: élénkítő (koffein vagy hagyományosan élénkítő) – este és a lecsendesedési sávban nem ajánljuk; calm: esti, nyugodt tea. */
const HERBS = [{"id": "gyomber", "lat": "Zingiber officinale", "q": "Q35625", "han": "生姜", "py": "shēngjiāng", "part": "rhizome", "temp": "warm", "taste": ["pungent"], "ch": ["T", "Lh", "Gy"], "prep": ["decoct", 100, 10, 15, "slices"], "alt": "infuse", "stim": true, "calm": false, "ema": "zingiberis-rhizoma"}, {"id": "fahej", "lat": "Cinnamomum cassia", "q": "Q204148", "han": "肉桂", "py": "ròuguì", "part": "bark", "temp": "hot", "taste": ["pungent", "sweet"], "ch": ["V", "Lh", "Sz", "M"], "prep": ["decoct", 100, 10, 15, "stick"], "alt": "infuse", "stim": false, "calm": false, "ema": "cinnamomi-cortex"}, {"id": "borsmenta", "lat": "Mentha × piperita", "q": "Q156811", "han": "薄荷", "py": "bòhe", "part": "leaf", "temp": "cool", "taste": ["pungent"], "ch": ["T", "M"], "prep": ["infuse", 100, 5, 10, "tsp"], "alt": "cold", "stim": false, "calm": false, "ema": "menthae-piperitae-folium"}, {"id": "krizantem", "lat": "Chrysanthemum morifolium", "q": "Q15530181", "han": "菊花", "py": "júhuā", "part": "flower", "temp": "cool", "taste": ["pungent", "sweet", "bitter"], "ch": ["T", "M"], "prep": ["infuse", 90, 5, 8, "flowers"], "alt": "", "stim": false, "calm": true, "ema": ""}, {"id": "goji", "lat": "Lycium barbarum", "q": "Q196332", "han": "枸杞子", "py": "gǒuqǐzǐ", "part": "fruit", "temp": "neutral", "taste": ["sweet"], "ch": ["M", "V", "T"], "prep": ["infuse", 90, 5, 10, "tbsp"], "alt": "food", "stim": false, "calm": true, "ema": ""}, {"id": "jujuba", "lat": "Ziziphus jujuba", "q": "Q11181633", "han": "大枣", "py": "dàzǎo", "part": "fruit", "temp": "warm", "taste": ["sweet"], "ch": ["Lh", "Gy"], "prep": ["decoct", 100, 15, 20, "dates"], "alt": "food", "stim": false, "calm": true, "ema": ""}, {"id": "zoldtea", "lat": "Camellia sinensis", "q": "Q101815", "han": "绿茶", "py": "lǜchá", "part": "leaf", "temp": "cool", "taste": ["bitter", "sweet"], "ch": ["Sz", "T", "Gy"], "prep": ["infuse", 75, 2, 3, "tsp"], "alt": "", "stim": true, "calm": false, "ema": ""}, {"id": "feketetea", "lat": "Camellia sinensis", "q": "Q101815", "han": "红茶", "py": "hóngchá", "part": "leaf", "temp": "warm", "taste": ["sweet", "bitter"], "ch": ["Lh", "Gy"], "prep": ["infuse", 100, 3, 5, "tsp"], "alt": "", "stim": true, "calm": false, "ema": ""}, {"id": "eperfalevel", "lat": "Morus alba", "q": "Q157307", "han": "桑叶", "py": "sāngyè", "part": "leaf", "temp": "cold", "taste": ["bitter", "sweet"], "ch": ["T", "M"], "prep": ["infuse", 100, 5, 10, "tsp"], "alt": "", "stim": false, "calm": false, "ema": ""}, {"id": "mandarinhej", "lat": "Citrus reticulata", "q": "Q125337", "han": "陈皮", "py": "chénpí", "part": "peel", "temp": "warm", "taste": ["bitter", "pungent"], "ch": ["T", "Lh"], "prep": ["infuse", 100, 8, 10, "peel"], "alt": "decoct", "stim": false, "calm": false, "ema": ""}, {"id": "szegfuszeg", "lat": "Syzygium aromaticum", "q": "Q26736", "han": "丁香", "py": "dīngxiāng", "part": "bud", "temp": "warm", "taste": ["pungent"], "ch": ["Lh", "Gy", "V"], "prep": ["infuse", 100, 5, 10, "cloves"], "alt": "spice", "stim": false, "calm": false, "ema": ""}, {"id": "csillaganizs", "lat": "Illicium verum", "q": "Q2878644", "han": "八角", "py": "bājiǎo", "part": "fruit", "temp": "warm", "taste": ["pungent"], "ch": ["M", "V", "Lh", "Gy"], "prep": ["infuse", 100, 8, 10, "star"], "alt": "spice", "stim": false, "calm": false, "ema": ""}, {"id": "edeskomeny", "lat": "Foeniculum vulgare", "q": "Q43511", "han": "小茴香", "py": "xiǎohuíxiāng", "part": "seed", "temp": "warm", "taste": ["pungent"], "ch": ["M", "V", "Lh", "Gy"], "prep": ["infuse", 100, 10, 15, "tsp_crushed"], "alt": "", "stim": false, "calm": true, "ema": "foeniculi-dulcis-fructus"}, {"id": "rozsabimbo", "lat": "Rosa rugosa", "q": "Q634975", "han": "玫瑰花", "py": "méiguihuā", "part": "flower", "temp": "warm", "taste": ["sweet", "bitter"], "ch": ["M", "Lh"], "prep": ["infuse", 90, 5, 8, "buds"], "alt": "", "stim": false, "calm": true, "ema": ""}, {"id": "jazmin", "lat": "Jasminum sambac", "q": "Q1356614", "han": "茉莉花", "py": "mòlìhuā", "part": "flower", "temp": "warm", "taste": ["pungent", "sweet"], "ch": ["M", "Gy"], "prep": ["infuse", 80, 2, 3, "tsp"], "alt": "", "stim": true, "calm": false, "ema": ""}, {"id": "arpa", "lat": "Hordeum vulgare", "q": "Q11577", "han": "大麦茶", "py": "dàmàichá", "part": "grain", "temp": "cool", "taste": ["sweet"], "ch": ["Lh", "Gy"], "prep": ["decoct", 100, 5, 10, "tbsp"], "alt": "infuse", "stim": false, "calm": true, "ema": ""}, {"id": "perilla", "lat": "Perilla frutescens", "q": "Q1076038", "han": "紫苏叶", "py": "zǐsūyè", "part": "leaf", "temp": "warm", "taste": ["pungent"], "ch": ["T", "Lh"], "prep": ["infuse", 100, 5, 10, "tsp"], "alt": "food", "stim": false, "calm": false, "ema": ""}, {"id": "pitypang", "lat": "Taraxacum officinale", "q": "Q131219", "han": "蒲公英", "py": "púgōngyīng", "part": "leaf_root", "temp": "cold", "taste": ["bitter", "sweet"], "ch": ["M", "Gy"], "prep": ["infuse", 100, 10, 15, "tsp"], "alt": "decoct", "stim": false, "calm": false, "ema": "taraxaci-folium"}, {"id": "longan", "lat": "Dimocarpus longan", "q": "Q193449", "han": "龙眼肉", "py": "lóngyǎnròu", "part": "fruit", "temp": "warm", "taste": ["sweet"], "ch": ["Sz", "Lh"], "prep": ["infuse", 100, 8, 10, "tbsp"], "alt": "food", "stim": false, "calm": true, "ema": ""}, {"id": "feketebors", "lat": "Piper nigrum", "q": "Q43084", "han": "胡椒", "py": "hújiāo", "part": "fruit", "temp": "hot", "taste": ["pungent"], "ch": ["Gy", "Vab"], "prep": ["spice", 0, 0, 0, "pinch"], "alt": "", "stim": true, "calm": false, "ema": ""}, {"id": "koriander", "lat": "Coriandrum sativum", "q": "Q41611", "han": "芫荽", "py": "yánsuī", "part": "leaf_seed", "temp": "warm", "taste": ["pungent"], "ch": ["T", "Gy"], "prep": ["infuse", 100, 10, 10, "tsp_crushed"], "alt": "food", "stim": false, "calm": false, "ema": ""}, {"id": "kurkuma", "lat": "Curcuma longa", "q": "Q42562", "han": "姜黄", "py": "jiānghuáng", "part": "rhizome", "temp": "warm", "taste": ["pungent", "bitter"], "ch": ["Lh", "M"], "prep": ["decoct", 100, 10, 10, "tsp_powder"], "alt": "food", "stim": false, "calm": false, "ema": "curcumae-longae-rhizoma"}, {"id": "kamilla", "lat": "Matricaria chamomilla", "q": "Q28437", "han": "", "py": "", "part": "flower", "temp": "", "taste": [], "ch": [], "prep": ["infuse", 100, 5, 10, "tbsp"], "alt": "", "stim": false, "calm": true, "ema": "matricariae-flos"}, {"id": "citromfu", "lat": "Melissa officinalis", "q": "Q148396", "han": "", "py": "", "part": "leaf", "temp": "", "taste": [], "ch": [], "prep": ["infuse", 100, 10, 15, "tsp"], "alt": "", "stim": false, "calm": true, "ema": "melissae-folium"}, {"id": "hars", "lat": "Tilia cordata", "q": "Q158746", "han": "", "py": "", "part": "flower", "temp": "", "taste": [], "ch": [], "prep": ["infuse", 100, 10, 10, "tsp"], "alt": "", "stim": false, "calm": true, "ema": "tiliae-flos"}, {"id": "levendula", "lat": "Lavandula angustifolia", "q": "Q42081", "han": "", "py": "", "part": "flower", "temp": "", "taste": [], "ch": [], "prep": ["infuse", 100, 5, 10, "tsp"], "alt": "", "stim": false, "calm": true, "ema": "lavandulae-flos"}, {"id": "kakukkfu", "lat": "Thymus vulgaris", "q": "Q148668", "han": "", "py": "", "part": "herb", "temp": "", "taste": [], "ch": [], "prep": ["infuse", 100, 10, 10, "tsp"], "alt": "food", "stim": false, "calm": false, "ema": "thymi-herba"}, {"id": "zsalya", "lat": "Salvia officinalis", "q": "Q1111359", "han": "", "py": "", "part": "leaf", "temp": "", "taste": [], "ch": [], "prep": ["infuse", 100, 5, 10, "tsp"], "alt": "food", "stim": false, "calm": false, "ema": "salviae-officinalis-folium"}, {"id": "rozmaring", "lat": "Salvia rosmarinus", "q": "Q102240169", "han": "", "py": "", "part": "leaf", "temp": "", "taste": [], "ch": [], "prep": ["infuse", 100, 10, 15, "tsp"], "alt": "food", "stim": true, "calm": false, "ema": "rosmarini-folium"}, {"id": "csalan", "lat": "Urtica dioica", "q": "Q155909", "han": "", "py": "", "part": "leaf", "temp": "", "taste": [], "ch": [], "prep": ["infuse", 100, 10, 15, "tsp"], "alt": "food", "stim": false, "calm": false, "ema": "urticae-folium"}, {"id": "bodza", "lat": "Sambucus nigra", "q": "Q22701", "han": "", "py": "", "part": "flower", "temp": "", "taste": [], "ch": [], "prep": ["infuse", 100, 10, 15, "tsp"], "alt": "cold", "stim": false, "calm": false, "ema": "sambuci-flos"}, {"id": "csipkebogyo", "lat": "Rosa canina", "q": "Q146066", "han": "", "py": "", "part": "fruit", "temp": "", "taste": [], "ch": [], "prep": ["decoct", 100, 10, 15, "tbsp"], "alt": "cold", "stim": false, "calm": true, "ema": ""}, {"id": "anizs", "lat": "Pimpinella anisum", "q": "Q28692", "han": "", "py": "", "part": "seed", "temp": "", "taste": [], "ch": [], "prep": ["infuse", 100, 10, 15, "tsp_crushed"], "alt": "spice", "stim": false, "calm": true, "ema": "anisi-fructus"}, {"id": "komeny", "lat": "Carum carvi", "q": "Q26811", "han": "", "py": "", "part": "seed", "temp": "", "taste": [], "ch": [], "prep": ["infuse", 100, 10, 15, "tsp_crushed"], "alt": "spice", "stim": false, "calm": false, "ema": "carvi-fructus"}, {"id": "hibiszkusz", "lat": "Hibiscus sabdariffa", "q": "Q319390", "han": "", "py": "", "part": "calyx", "temp": "", "taste": [], "ch": [], "prep": ["infuse", 100, 5, 10, "tsp"], "alt": "cold", "stim": false, "calm": false, "ema": ""}, {"id": "cickafark", "lat": "Achillea millefolium", "q": "Q25408", "han": "", "py": "", "part": "herb", "temp": "", "taste": [], "ch": [], "prep": ["infuse", 100, 10, 15, "tsp"], "alt": "", "stim": false, "calm": false, "ema": "millefolii-herba"}, {"id": "rooibos", "lat": "Aspalathus linearis", "q": "Q272181", "han": "", "py": "", "part": "leaf", "temp": "", "taste": [], "ch": [], "prep": ["infuse", 100, 5, 8, "tsp"], "alt": "cold", "stim": false, "calm": true, "ema": ""}, {"id": "majoranna", "lat": "Origanum majorana", "q": "Q22694", "han": "", "py": "", "part": "herb", "temp": "", "taste": [], "ch": [], "prep": ["infuse", 100, 5, 10, "tsp"], "alt": "food", "stim": false, "calm": false, "ema": ""}, {"id": "kardamom", "lat": "Elettaria cardamomum", "q": "Q33466", "han": "", "py": "", "part": "seed", "temp": "", "taste": [], "ch": [], "prep": ["decoct", 100, 5, 10, "pods"], "alt": "spice", "stim": false, "calm": false, "ema": ""}, {"id": "galagonya", "lat": "Crataegus monogyna", "q": "Q161511", "han": "", "py": "", "part": "leaf_flower", "temp": "", "taste": [], "ch": [], "prep": ["infuse", 100, 10, 15, "tsp"], "alt": "", "stim": false, "calm": true, "ema": "crataegi-folium-cum-flore"}, {"id": "lotuszlevel", "lat": "Nelumbo nucifera", "q": "Q16528", "han": "荷叶", "py": "héyè", "part": "leaf", "temp": "neutral", "taste": ["bitter"], "ch": ["M", "Lh", "Gy"], "prep": ["infuse", 100, 5, 10, "tsp"], "alt": "", "stim": false, "calm": false, "ema": ""}];
const HBY = Object.fromEntries(HERBS.map((h) => [h.id, h]));
const TASTE_EL = { sour: 'fa', bitter: 'tuz', sweet: 'fold', pungent: 'fem', salty: 'viz' };
const herbEls = (h) => [...new Set(h.taste.map((x) => TASTE_EL[x]))];
// napszakhoz illik-e: a lecsendesedési sávban csak esti (calm), nem élénkítő; este és éjjel nem élénkítő; nappal bármi
const herbFits = (h, d = now()) => CALM(d) ? (h.calm && !h.stim) : ['evening', 'night'].includes(daypart(d)) ? !h.stim : true;
const PBS = Object.fromEntries(PTS.map((p) => [p.s, p]));
const GOALS = [['alvas', ['Sz-7', 'Szb-6', 'Lh-6', 'V-3', 'Kor-20']], ['fesz', ['M-3', 'Szb-6', 'Bef-17', 'Sz-7', 'Eh-21']], ['izgul', ['Sz-7', 'Szb-8', 'Szb-6']], ['fej', ['Vab-4', 'Eh-20', 'M-3', 'Kor-20', 'T-7']], ['nyak', ['Eh-20', 'Eh-21', 'Kor-14', 'Véb-3']], ['derek', ['H-23', 'Kor-4', 'H-40', 'H-60']], ['emeszt', ['Bef-12', 'Gy-36', 'Szb-6', 'Lh-6', 'Lh-9']], ['hany', ['Szb-6', 'Bef-12']], ['legzes', ['T-1', 'Bef-17', 'T-9', 'T-5']], ['megf', ['T-7', 'Vab-4', 'Kor-14', 'Hm-5', 'Vab-20']], ['szem', ['H-1', 'Eh-20']], ['ero', ['Gy-36', 'Bef-6', 'V-3', 'Kor-4', 'Bef-4']], ['izom', ['Eh-34', 'H-40', 'Lh-9']], ['ajul', ['Kor-26']]].map(([k, ids]) => ({ k, ids }));
GOALS.forEach((g) => g.ids.forEach((id) => PBY[id].goals.push(g.k)));
const GBY = Object.fromEntries(GOALS.map((g) => [g.k, g]));
/* vezetett rutinok: [pont, másodperc, kétoldali (váltás félidőben)] */
const ROUT = [
  { id: 'esti', icon: 'sleep', steps: [['Kor-20', 45, 0], ['Bef-17', 45, 0], ['Szb-6', 60, 1], ['Sz-7', 60, 1], ['Szb-8', 40, 1], ['V-3', 60, 1]] },
  { id: 'reggel', icon: 'sun', steps: [['Kor-20', 30, 0], ['T-1', 40, 1], ['T-9', 30, 1], ['Gy-36', 60, 1], ['H-23', 45, 0]] },
  { id: 'kepernyo', icon: 'eye', steps: [['H-1', 30, 0], ['Eh-20', 60, 0], ['Kor-14', 45, 0], ['Véb-3', 60, 1], ['T-7', 40, 1]] },
  { id: 'utazas', icon: 'travel', steps: [['Szb-6', 120, 1], ['Gy-36', 60, 1]] },
  { id: 'emesztes', icon: 'food', steps: [['Bef-12', 60, 0], ['Gy-36', 60, 1], ['Szb-6', 40, 1], ['Lh-9', 40, 1]] },
  { id: 'lampalaz', icon: 'emotion', steps: [['Szb-8', 40, 1], ['Sz-7', 60, 1], ['Bef-17', 45, 0]] },
  // kínai szemtorna (a hagyományos iskolai szemtorna mintájára): szemöldök, belső szemzug, szem alatt, homlok, tarkó – két oldalon egyszerre
  { id: 'szem', icon: 'eye', steps: [['H-2', 30, 0], ['H-1', 30, 0], ['Gy-2', 30, 0], ['Eh-14', 30, 0], ['Eh-20', 45, 0]] }
];
ROUT.forEach((r) => { r.sec = r.steps.reduce((s, x) => s + x[1], 0); });
const RBY = Object.fromEntries(ROUT.map((r) => [r.id, r]));
/* mozgásos szemtorna: [azonosító, másodperc, animáció] – szöveg: c.eyex[id] = [cím, útmutatás, hangos vezetés] */
const EYEX = [['palm', 45, 'palm'], ['blink', 20, 'blink'], ['updown', 30, 'updown'], ['side', 30, 'lr'], ['diag', 30, 'diag'], ['circle', 40, 'circle'], ['eight', 30, 'eight'], ['focus', 60, 'focus'], ['far', 20, 'far'], ['rest', 30, 'palm']];
const EYEX_SEC = EYEX.reduce((s, x) => s + x[1], 0);
const CYCST = { tap: { pairs: Object.entries(GEN), curve: true, c: 'var(--jade-t)', w: 2.5 }, szab: { pairs: Object.entries(CTRL), c: 'var(--ink)', w: 2.5 }, vissza: { pairs: Object.entries(CTRL).map(([a, b]) => [b, a]), c: 'var(--tuz)', w: 2.5, dash: '7 5' }, legy: { pairs: Object.entries(CTRL), c: 'var(--tuz)', w: 4.5 } };
const LAYERS = [['', [['base', 'clock']]], ['g_know', [['elemek', 'elements'], ['kapcsolatok', 'book'], ['meridianok', 'body'], ['atlasz', 'point'], ['csontok', 'bone'], ['technikak', 'hand']]], ['g_prac', [['rutinok', 'hand'], ['mozgas', 'move'], ['legzes', 'breath'], ['taplalkozas', 'food']]], ['g_extra', [['erzelmek', 'emotion'], ['gyogynovenyek', 'herb'], ['evszak', 'season'], ['alvas', 'sleep']]]];
const DEFAULT_LAYERS = { elemek: true, kapcsolatok: true, meridianok: true, atlasz: true, csontok: true, technikak: true, rutinok: true, mozgas: true, legzes: true, taplalkozas: true, erzelmek: false, gyogynovenyek: true, evszak: false, alvas: false, labujj: true, videok: true };
let L = Object.assign({}, DEFAULT_LAYERS, store.get('layers', {}));
let MODEL = store.get('model', 'f');
const ec = (el) => ({ c: `var(--${el})`, l: `var(--${el}-l)`, t: `var(--${el}-t)` });

/* ================= idő ================= */
const now = () => new Date();
const orgAt = (d) => ORG[Math.floor(((d.getHours() + 1) % 24) / 2)];
const seasonEl = (d) => { const m = d.getMonth() + 1; return m >= 3 && m <= 5 ? 'fa' : m <= 7 && m >= 6 ? 'tuz' : m === 8 ? 'fold' : m >= 9 && m <= 11 ? 'fem' : 'viz'; };
const minsLeft = (o, d) => { const end = ((o.s + 2) % 24) * 60, cur = d.getHours() * 60 + d.getMinutes(); const diff = (end - cur + 1440) % 1440; return diff === 0 ? 120 : diff; };
const fmtLeft = (m) => m >= 60 ? t('left_hm', { h: Math.floor(m / 60), m: m % 60 }) : t('left_m', { m });
const win = (o) => `${o.s}–${(o.s + 2) % 24}`;
/* ---- napirend: az esti határok a felhasználó lefekvési és ébredési idejéből ----
   Képlet (L = szokásos lefekvés, É = ébredés, órában):
   - étkezési szünet: L − 3 órától É-ig
   - esti lecsendesedés az első ajánlás: L − 1,5 órától É − 2 óráig
   Ha a felhasználó nem adta meg (Beállítások → Napirend), az alap L a mai naplemente + 3,5 óra
   (negyedórára kerekítve, 21:30 és 22:30 közé szorítva), az alap É 7:00. Adat csak az eszközön (store 'sched').
   A naplemente helye a készülék órájából jön: az időzóna (pl. Europe/Budapest) fővárosának koordinátája
   (src/tzcoords.js); ismeretlen zónánál a UTC-eltolásból becsült hosszúság, 47,5° szélesség.
   Nincs hálózati kérés és nincs helymeghatározás. */
let SUN_LOC = null;
function sunLoc() {
  if (SUN_LOC) return SUN_LOC;
  let tz = ''; try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (e) {}
  const hit = TZ_COORDS.split(';').find((x) => x.startsWith(tz + ':'));
  if (tz && hit) { const [la, lo] = hit.slice(tz.length + 1).split(',').map(Number); return (SUN_LOC = { lat: la, lon: lo, tz, place: tz.split('/').pop().replace(/_/g, ' ') }); }
  const y = new Date().getFullYear(), std = Math.max(new Date(y, 0, 1).getTimezoneOffset(), new Date(y, 6, 1).getTimezoneOffset());
  return (SUN_LOC = { lat: 47.5, lon: -std / 4, tz, place: '' });
}
const SCHED_DEF_WAKE = 7, SCHED_BED_MIN = 21.5, SCHED_BED_MAX = 22.5;
const mod24 = (x) => ((x % 24) + 24) % 24;
const hm = (s) => { const [a, b] = String(s).split(':').map(Number); return a + (b || 0) / 60; };
const fmtH = (x) => { const m = Math.round(mod24(x) * 60) % 1440; return `${Math.floor(m / 60)}:${String(m % 60).padStart(2, '0')}`; };
const hOf = (d) => d.getHours() + d.getMinutes() / 60;
const inWin = (x, a, b) => (a <= b ? x >= a && x < b : x >= a || x < b);
function sunEventH(d, rise, { lat, lon } = sunLoc()) {
  // NOAA közelítés; helyi idő órában (a böngésző időzónájával). rise: napkelte, különben naplemente.
  const n = Math.floor((new Date(d.getFullYear(), d.getMonth(), d.getDate()) - new Date(d.getFullYear(), 0, 0)) / 864e5);
  const g = 2 * Math.PI / 365 * (n - 1);
  const eq = 229.18 * (0.000075 + 0.001868 * Math.cos(g) - 0.032077 * Math.sin(g) - 0.014615 * Math.cos(2 * g) - 0.040849 * Math.sin(2 * g));
  const dec = 0.006918 - 0.399912 * Math.cos(g) + 0.070257 * Math.sin(g) - 0.006758 * Math.cos(2 * g) + 0.000907 * Math.sin(2 * g) - 0.002697 * Math.cos(3 * g) + 0.00148 * Math.sin(3 * g);
  const la = lat * Math.PI / 180, ha = Math.acos(Math.min(1, Math.max(-1, Math.cos(90.833 * Math.PI / 180) / (Math.cos(la) * Math.cos(dec)) - Math.tan(la) * Math.tan(dec)))) * 180 / Math.PI;
  const noon = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 12);
  return mod24((720 - 4 * (lon + (rise ? ha : -ha)) - eq) / 60 - noon.getTimezoneOffset() / 60);
}
const sunsetH = (d) => sunEventH(d, false);
const sunriseH = (d) => sunEventH(d, true);
const getSched = () => { const u = store.get('sched', null); return u && u.bed && u.wake ? u : null; };
function sched(d = now()) {
  const u = getSched();
  const bed = u ? hm(u.bed) : Math.min(SCHED_BED_MAX, Math.max(SCHED_BED_MIN, Math.round((sunsetH(d) + 3.5) * 4) / 4));
  const wake = u ? hm(u.wake) : SCHED_DEF_WAKE;
  return { own: !!u, bed, wake, eat0: mod24(bed - 3), calm0: mod24(bed - 1.5), calm1: mod24(wake - 2) };
}
const eatAt = (x, s) => !inWin(mod24(x), s.eat0, s.wake);
const EAT = (d) => eatAt(hOf(d), sched(d));
const CALM = (d) => { const s = sched(d); return inWin(hOf(d), s.calm0, s.calm1); };
const nightOrg = (o) => !eatAt(o.s + 1, sched());
/* Napszak a napirendből (a gyakorlatok ehhez igazodnak):
   'night'   – a lecsendesedési sáv (CALM): lefekvés − 1,5 óra → ébredés − 2 óra
   'morning' – ébredés − 2 óra → ébredés + 3 óra
   'evening' – lefekvés − 3 óra → a lecsendesedés kezdete
   'day'     – minden más */
function daypart(d = now()) {
  const s = sched(d), x = hOf(d);
  if (inWin(x, s.calm0, s.calm1)) return 'night';
  if (inWin(x, s.calm1, mod24(s.wake + 3))) return 'morning';
  if (inWin(x, s.eat0, s.calm0)) return 'evening';
  return 'day';
}
// Légzésminták: mikor kínáljuk, és melyik az alapértelmezett az adott napszakban.
const PAT_FIT = { calm: ['morning', 'day', 'evening', 'night'], even: ['morning', 'day', 'evening'], sleep: ['night'] };
const PAT_DEF = { morning: 'even', day: 'even', evening: 'calm', night: 'sleep' };
// Rutinok: mely napszakban illenek (ami nincs itt, az mindig); az emésztési rutin evési szünetben nem.
const ROUT_FIT = { szem: ['morning', 'day', 'evening'], esti: ['evening', 'night'], reggel: ['morning'], kepernyo: ['morning', 'day', 'evening'], kez_reggel: ['morning', 'day'], kez_este: ['evening', 'night'], lab_este: ['evening', 'night'] };
const ROUT_WHEN = { szem: 'fit_day', esti: 'fit_night', reggel: 'fit_morning', kepernyo: 'fit_day', emesztes: 'fit_meal', kez_reggel: 'fit_morning', kez_este: 'fit_night', lab_este: 'fit_night' };
const routFits = (id, d = now()) => (id !== 'emesztes' || EAT(d)) && (!ROUT_FIT[id] || ROUT_FIT[id].includes(daypart(d)));
const mmss = (s) => { s = Math.max(0, Math.round(s)); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; };
const qt = (s) => lang === 'hu' ? `„${s}”` : `“${s}”`;

/* ================= csontváz-adatbázis =================
   A test tájékozódási pontjai (csontos jelek) modellenként, a 310×480-as rajz koordinátáiban.
   A rajz, a pontok és a csatornák is ebből számolódnak. */
const SKEL = { m: {
  shoulder: [188, 96], elbow: [226, 176], wrist: [250, 250], hand: [256.5, 270], fingertip: [262, 289], hip: [166, 246], knee: [172, 360], ankle: [176, 452], foot: [182, 462],
  vertex: [150, 16], canthus: [153.5, 35], philtrum: [150, 50], nostril: [155.5, 46], occiput: [150, 62], c7: [150, 86], acromion: [192, 90], shoulder_mid: [171, 91],
  jugulum: [150, 92], xiphoid: [150, 164], navel: [150, 205], pubis: [150, 233], pubis_side: [154, 240], axfold: [199, 136],
  patella_med: [161, 344], tibia_cond: [165, 367], mal_med: [169, 449], popliteal_l: [178, 360], popliteal_c: [172, 359], mal_lat: [185, 449], mt12: [178, 463]
} };
SKEL.f = Object.assign({}, SKEL.m, { shoulder: [185, 97], elbow: [222, 177], wrist: [246, 250], hand: [252.5, 270], fingertip: [258, 289], axfold: [195, 136], acromion: [188, 91], shoulder_mid: [169, 92] });
const VERT = 8.5, HEADCUN = 4.7, BACKCUN = 8;
/* csontarányos szakaszok: [kezdő jel, záró jel, hossz cunban, testtáj (t: törzs, a: kar, l: láb), közelítő] */
const SEG = { sternum: ['jugulum', 'xiphoid', 9, 't'], abd_up: ['xiphoid', 'navel', 8, 't'], abd_lo: ['navel', 'pubis', 5, 't'], uarm: ['axfold', 'elbow', 9, 'a'], farm: ['elbow', 'wrist', 12, 'a'], hand: ['wrist', 'fingertip', 8, 'a', 1], thigh_m: ['pubis_side', 'patella_med', 18, 'l'], leg_m: ['tibia_cond', 'mal_med', 13, 'l'], leg_l: ['popliteal_l', 'mal_lat', 16, 'l'] };
/* pontok helye: szakasz + távolság (cun) + oldalirányú eltolás (cun), vagy tájékozódási pont, vagy csigolya */
const PSPEC = {
  'Kor-20': { k: 'lm', lm: 'vertex', b: 'skull' }, 'H-1': { k: 'lm', lm: 'canthus', b: 'orbit' }, 'Kor-26': { k: 'lm', lm: 'philtrum', b: 'maxilla' }, 'Vab-20': { k: 'lm', lm: 'nostril', b: 'maxilla' },
  'T-1': { k: 'seg', seg: 'sternum', d: 2, o: 6, b: 'clavicle' }, 'Bef-17': { k: 'seg', seg: 'sternum', d: 4.5, o: 0, b: 'sternum' }, 'Bef-12': { k: 'seg', seg: 'abd_up', d: 4, o: 0, b: 'sternum' },
  'Bef-6': { k: 'seg', seg: 'abd_lo', d: 1.5, o: 0, b: 'pelvis' }, 'Bef-4': { k: 'seg', seg: 'abd_lo', d: 3, o: 0, b: 'pelvis' },
  'T-5': { k: 'seg', seg: 'farm', d: 0, o: 0.5, b: 'humerus' }, 'Vab-11': { k: 'seg', seg: 'farm', d: 0, o: 1.5, b: 'humerus' }, 'Sz-3': { k: 'seg', seg: 'farm', d: 0, o: -1, b: 'humerus' },
  'T-7': { k: 'seg', seg: 'farm', from: 'B', d: 1.5, o: 1, b: 'radius' }, 'T-9': { k: 'seg', seg: 'farm', from: 'B', d: 0, o: 1, b: 'radius' }, 'Szb-6': { k: 'seg', seg: 'farm', from: 'B', d: 2, o: 0, b: 'forearm' },
  'Hm-5': { k: 'seg', seg: 'farm', from: 'B', d: 2, o: 0, b: 'forearm' }, 'Sz-7': { k: 'seg', seg: 'farm', from: 'B', d: 0, o: -1, b: 'ulna' },
  'Szb-8': { k: 'seg', seg: 'hand', d: 3.5, o: 0, b: 'metacarpals' }, 'Vab-4': { k: 'seg', seg: 'hand', d: 3, o: 1.5, b: 'metacarpals' }, 'Véb-3': { k: 'seg', seg: 'hand', d: 4.5, o: -1.5, b: 'metacarpals' },
  'Lh-10': { k: 'seg', seg: 'thigh_m', from: 'B', d: 2, o: 0, b: 'femur' }, 'Lh-9': { k: 'seg', seg: 'leg_m', d: 0, o: 0, b: 'tibia' }, 'Lh-6': { k: 'seg', seg: 'leg_m', from: 'B', d: 3, o: 0, b: 'tibia' },
  'V-3': { k: 'seg', seg: 'leg_m', from: 'B', d: 0, o: -0.5, b: 'tibia' }, 'Gy-36': { k: 'seg', seg: 'leg_l', d: 3, o: 0, b: 'tibia' }, 'Gy-40': { k: 'seg', seg: 'leg_l', d: 8, o: 0.5, b: 'tibia' },
  'Eh-34': { k: 'seg', seg: 'leg_l', d: 1, o: 1, b: 'fibula' }, 'H-60': { k: 'seg', seg: 'leg_l', from: 'B', d: 0, o: 0, b: 'fibula' },
  'H-40': { k: 'lm', lm: 'popliteal_c', b: 'knee' }, 'M-3': { k: 'lm', lm: 'mt12', b: 'metatarsals' }, 'Eh-20': { k: 'lm', lm: 'occiput', dx: 2, b: 'skull' }, 'Eh-21': { k: 'lm', lm: 'shoulder_mid', b: 'scapula' },
  'Kor-14': { k: 'sp', v: 0.5, o: 0, b: 'spine' }, 'Kor-4': { k: 'sp', v: 14.5, o: 0, b: 'spine' }, 'H-23': { k: 'sp', v: 14.5, o: 1.5, b: 'spine' },
  // xy: rögzített hely a rajzon, egy tájékozódási ponthoz (lm) viszonyítva; a mérés szövege a nyelvi csomagban (c.pmeas)
  'Eh-14': { k: 'xy', p: [156.5, 26], lm: 'brow', b: 'skull' },
  'H-2': { k: 'xy', p: [152.5, 30.5], lm: 'brow_in', b: 'orbit' },
  'Gy-2': { k: 'xy', p: [156.5, 41], lm: 'pupil', b: 'maxilla' },
  'Véb-19': { k: 'xy', p: [172, 41], lm: 'tragus', b: 'mandible' },
  'Gy-6': { k: 'xy', p: [166, 56], lm: 'jaw_angle', b: 'mandible' },
  'Kor-24': { k: 'xy', p: [150, 22], lm: 'hairline', b: 'skull' },
  'H-10': { k: 'xy', p: [156, 66], lm: 'occiput', b: 'spine' },
  'Bef-22': { k: 'seg', seg: 'sternum', d: 0, o: 0, b: 'sternum' },
  'Gy-25': { k: 'seg', seg: 'abd_lo', d: 0, o: 2, b: 'abd' },
  'Bef-14': { k: 'seg', seg: 'abd_up', d: 2, o: 0, b: 'abd' },
  'Bef-3': { k: 'seg', seg: 'abd_lo', d: 4, o: 0, b: 'pelvis' },
  'M-14': { k: 'seg', seg: 'sternum', d: 8, o: 4, b: 'ribs' },
  'M-13': { k: 'seg', seg: 'abd_up', d: 2.5, o: 6, b: 'ribs' },
  'T-2': { k: 'seg', seg: 'sternum', d: 0.4, o: 6, b: 'clavicle' },
  'V-27': { k: 'seg', seg: 'sternum', d: 0.4, o: 2, b: 'clavicle' },
  'H-13': { k: 'sp', v: 3.5, o: 1.5, b: 'spine' },
  'H-15': { k: 'sp', v: 5.5, o: 1.5, b: 'spine' },
  'H-17': { k: 'sp', v: 7.5, o: 1.5, b: 'spine' },
  'H-18': { k: 'sp', v: 9.5, o: 1.5, b: 'spine' },
  'H-20': { k: 'sp', v: 11.5, o: 1.5, b: 'spine' },
  'H-21': { k: 'sp', v: 12.5, o: 1.5, b: 'spine' },
  'H-25': { k: 'sp', v: 16.5, o: 1.5, b: 'spine' },
  'Kor-12': { k: 'sp', v: 3.5, o: 0, b: 'spine' },
  'Véb-11': { k: 'xy', p: [177, 122], lm: 'scapula', b: 'scapula' },
  'Vab-10': { k: 'seg', seg: 'farm', d: 2, o: 1.5, b: 'radius' },
  'Vab-15': { k: 'lm', lm: 'acromion', dy: 0.5, b: 'humerus' },
  'Hm-14': { k: 'lm', lm: 'acromion', dy: 0.5, b: 'humerus' },
  'Szb-7': { k: 'seg', seg: 'farm', from: 'B', d: 0, o: 0, b: 'forearm' },
  'Hm-4': { k: 'seg', seg: 'farm', from: 'B', d: 0, o: 0, b: 'forearm' },
  'T-6': { k: 'seg', seg: 'farm', from: 'B', d: 7, o: 1, b: 'radius' },
  'Gy-34': { k: 'xy', p: [181, 332], lm: 'patella_lat', b: 'femur' },
  'Gy-35': { k: 'xy', p: [178, 363], lm: 'patella_low', b: 'knee' },
  'Eh-30': { k: 'xy', p: [176, 252], lm: 'trochanter', b: 'pelvis' },
  'Eh-39': { k: 'seg', seg: 'leg_l', from: 'B', d: 3, o: 0.4, b: 'fibula' },
  'Eh-40': { k: 'xy', p: [187, 455], lm: 'mal_lat', b: 'tarsals' },
  'Eh-41': { k: 'xy', p: [186, 463], lm: 'mt45', b: 'metatarsals' },
  'H-57': { k: 'xy', p: [174, 405], lm: 'popliteal_c', b: 'tibia' },
  'H-62': { k: 'xy', p: [185, 456], lm: 'mal_lat', b: 'tarsals' },
  'V-6': { k: 'xy', p: [168, 456], lm: 'mal_med', b: 'tarsals' },
  'V-7': { k: 'seg', seg: 'leg_m', from: 'B', d: 2, o: -0.5, b: 'tibia' },
  'Lh-4': { k: 'xy', p: [166, 462], lm: 'mt1_base', b: 'metatarsals' },
  'M-8': { k: 'xy', p: [164, 360], lm: 'tibia_cond', b: 'knee' }
};
const SK = () => SKEL[MODEL] || SKEL.m;
function segGeo(S, k) { const [a, b, len] = SEG[k], A = S[a], B = S[b], dx = B[0] - A[0], dy = B[1] - A[1], Ln = Math.hypot(dx, dy); return { A, B, ux: dx / Ln, uy: dy / Ln, nx: dy / Ln, ny: -dx / Ln, s: Ln / len }; }
function place(S, sp) {
  if (sp.k === 'seg') { const g = segGeo(S, sp.seg), fb = sp.from === 'B', O = fb ? g.B : g.A, dir = fb ? -1 : 1; return [O[0] + dir * g.ux * sp.d * g.s + g.nx * sp.o * g.s, O[1] + dir * g.uy * sp.d * g.s + g.ny * sp.o * g.s]; }
  if (sp.k === 'xy') return sp.p;
  if (sp.k === 'lm') { const P = S[sp.lm]; return [P[0] + (sp.dx || 0) * HEADCUN, P[1] + (sp.dy || 0) * HEADCUN]; }
  return [S.c7[0] + (sp.o || 0) * BACKCUN, S.c7[1] + sp.v * VERT];
}
const r1 = (n) => Math.round(n * 10) / 10;
function layout() { const S = SK(); PTS.forEach((p) => { const [x, y] = place(S, PSPEC[p.id]); p.x = r1(x); p.y = r1(y); }); pathCache = {}; }
const VNAME = (v) => { const i = Math.floor(v); return i === 0 ? 'C7' : i <= 12 ? 'T' + i : 'L' + (i - 12); };
const sideKey = (g, o) => g === 'a' ? (o > 0 ? 'side_rad' : 'side_uln') : g === 'l' ? (o > 0 ? 'side_lat' : 'side_med') : 'side_t';
function measureText(p) {
  const sp = PSPEC[p.id], S = SK(), meas = []; let from;
  if (sp.k === 'seg') { const [a, b, , grp] = SEG[sp.seg], fb = sp.from === 'B', O = fb ? b : a, T2 = fb ? a : b; from = C('lm', O); if (sp.d) meas.push(t('m_along', { d: num(sp.d), dir: t(S[T2][1] < S[O][1] ? 'up' : 'down') })); if (sp.o) meas.push(t(sideKey(grp, sp.o), { o: num(Math.abs(sp.o)) })); }
  else if (sp.k === 'xy') { from = C('lm', sp.lm); const m = C('pmeas', p.id); if (m) meas.push(m); }
  else if (sp.k === 'lm') { from = C('lm', sp.lm); if (sp.dx) meas.push(t('side_t', { o: num(Math.abs(sp.dx)) })); }
  else { from = C('lm', 'c7'); meas.push(t('m_below', { v: VNAME(sp.v) })); if (sp.o) meas.push(t('side_t', { o: num(sp.o) })); }
  return { bone: C('bones', sp.b), from, meas: meas.length ? meas.join(' · ') : t('here') };
}
/* csatornautak: a számpárok a legközelebbi csonthoz horgonyozva, a @kód tokenek a pontok számított helyére esnek */
const ANCH = [['shoulder', 'elbow'], ['elbow', 'wrist'], ['wrist', 'fingertip'], ['hip', 'knee'], ['knee', 'ankle'], ['ankle', 'foot'], ['jugulum', 'xiphoid'], ['xiphoid', 'navel'], ['navel', 'pubis'], ['vertex', 'c7'], ['jugulum', 'acromion'], ['acromion', 'shoulder']];
function reanchor(x, y, S) {
  if (S === SKEL.m) return [x, y];
  const M0 = SKEL.m; let best = null;
  for (const [a, b] of ANCH) { const A = M0[a], B = M0[b], dx = B[0] - A[0], dy = B[1] - A[1], L2 = dx * dx + dy * dy, tt = ((x - A[0]) * dx + (y - A[1]) * dy) / L2, tc = Math.max(0, Math.min(1, tt)), dist = Math.hypot(x - A[0] - tc * dx, y - A[1] - tc * dy); if (!best || dist < best.dist) { const Ln = Math.sqrt(L2); best = { a, b, tt, o: ((x - A[0]) * dy / Ln - (y - A[1]) * dx / Ln) / Ln, dist }; } }
  const A = S[best.a], B = S[best.b], dx = B[0] - A[0], dy = B[1] - A[1], Ln = Math.hypot(dx, dy);
  return [A[0] + best.tt * dx + (dy / Ln) * best.o * Ln, A[1] + best.tt * dy + (-dx / Ln) * best.o * Ln];
}
let pathCache = {};
function chPath(c) {
  if (pathCache[c]) return pathCache[c]; const p = CHP[c]; if (!p) return '';
  const S = SK(), tk = p[1].match(/@[^\s]+|[MLQ]|-?\d+\.?\d*/g); const out = []; let pend = null;
  for (const x of tk) {
    if (x[0] === '@') { const q = PBY[x.slice(1)]; out.push(q.x + ' ' + q.y); }
    else if (/[MLQ]/.test(x)) out.push(x);
    else if (pend === null) pend = +x; else { const [a, b] = reanchor(pend, +x, S); out.push(r1(a) + ' ' + r1(b)); pend = null; }
  }
  return (pathCache[c] = out.join(' ').replace(/([MLQ]) /g, '$1'));
}

/* ================= testrajz (a csontvázból) ================= */
const TORSO = { m: 'M106 88 Q150 80 194 88 Q200 120 196 156 Q190 200 190 250 Q150 262 110 250 Q110 200 104 156 Q100 120 106 88 Z', f: 'M110 88 Q150 82 190 88 Q197 118 192 150 Q183 182 186 205 Q195 228 195 252 Q150 268 105 252 Q105 228 114 205 Q117 182 108 150 Q103 118 110 88 Z' };
const HAIR = 'M127 44 Q124 9 150 8 Q176 9 173 44 L175 72 Q163 76 158 66 L142 66 Q137 76 125 72 Z';
const LN = 'style="stroke:var(--body-line);fill:none" stroke-linecap="round"';
const mir = (P) => [300 - P[0], P[1]];
function limbsOf(S) { const R = [[S.shoulder, S.elbow, 24], [S.elbow, S.wrist, 20], [S.hip, S.knee, 34], [S.knee, S.ankle, 26]]; return [[[150, 58], [150, 84], 18], ...R, ...R.map(([a, b, w]) => [mir(a), mir(b), w])]; }
function ellsOf(S) { const r = Math.round(-Math.atan2(S.wrist[0] - S.elbow[0], S.wrist[1] - S.elbow[1]) * 180 / Math.PI); return [[150, 40, 21, 25, 0], [S.hand[0], S.hand[1], 10, 18, r], [300 - S.hand[0], S.hand[1], 10, 18, -r], [S.foot[0], S.foot[1], 15, 8, 0], [300 - S.foot[0], S.foot[1], 15, 8, 0]]; }
function bodyInner(v, model = MODEL) {
  const S = SKEL[model] || SKEL.m; let o = '', f = '';
  if (model === 'f' && v === 'f') o += `<path d="${HAIR}" style="fill:var(--body-line)"/>`;
  for (const [[a, b], [c, d], w] of limbsOf(S)) { o += `<line x1="${a}" y1="${b}" x2="${c}" y2="${d}" style="stroke:var(--body-line)" stroke-width="${w + 3}" stroke-linecap="round"/>`; f += `<line x1="${a}" y1="${b}" x2="${c}" y2="${d}" style="stroke:var(--body)" stroke-width="${w}" stroke-linecap="round"/>`; }
  const tor = TORSO[model] || TORSO.m;
  o += `<path d="${tor}" style="fill:var(--body-line);stroke:var(--body-line)" stroke-width="3" stroke-linejoin="round"/>`; f += `<path d="${tor}" style="fill:var(--body)"/>`;
  for (const [cx, cy, rx, ry, r] of ellsOf(S)) { const tr = r ? ` transform="rotate(${r} ${cx} ${cy})"` : ''; o += `<ellipse cx="${cx}" cy="${cy}" rx="${rx + 1.5}" ry="${ry + 1.5}" style="fill:var(--body-line)"${tr}/>`; f += `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" style="fill:var(--body)"${tr}/>`; }
  let x = '';
  if (v === 'f') {
    x += `<ellipse cx="143" cy="36" rx="3.2" ry="1.6" style="fill:var(--body-line)"/><ellipse cx="157" cy="36" rx="3.2" ry="1.6" style="fill:var(--body-line)"/><path d="M150 38 L148 46 Q150 48 153 46" ${LN} stroke-width="1.2"/><path d="M145 56 Q150 58 155 56" ${LN} stroke-width="1.2"/><circle cx="150" cy="205" r="1.8" style="fill:var(--body-line)"/>`;
    if (model === 'f') x += `<path d="M126 132 Q137 146 148 136 M152 136 Q163 146 174 132" ${LN} stroke-width="1.2"/>`;
  } else {
    x += `<path d="M150 70 L150 245" ${LN} stroke-width="1.4" stroke-dasharray="3 3"/><path d="M122 112 Q130 140 138 150 M178 112 Q170 140 162 150" ${LN} stroke-width="1.2"/><path d="M120 356 Q128 360 136 356 M164 356 Q172 360 180 356" ${LN} stroke-width="1.2"/>`;
    x += model === 'f' ? `<path d="${HAIR}" style="fill:var(--body-line)"/>` : `<path d="M132 22 Q150 12 168 22" ${LN} stroke-width="1.2"/>`;
  }
  return o + f + x;
}
/* csontváz-réteg */
function skelSvg(v, S) {
  const o = [], f = [];
  const line = (A, B, w) => { o.push(`<line x1="${r1(A[0])}" y1="${r1(A[1])}" x2="${r1(B[0])}" y2="${r1(B[1])}" class="bo" stroke-width="${w + 1.6}"/>`); f.push(`<line x1="${r1(A[0])}" y1="${r1(A[1])}" x2="${r1(B[0])}" y2="${r1(B[1])}" class="bf" stroke-width="${w}"/>`); };
  const off = (A, B, k, t0 = 0, t1 = 1) => { const dx = B[0] - A[0], dy = B[1] - A[1], l = Math.hypot(dx, dy), nx = dy / l, ny = -dx / l; return [[A[0] + dx * t0 + nx * k, A[1] + dy * t0 + ny * k], [A[0] + dx * t1 + nx * k, A[1] + dy * t1 + ny * k]]; };
  let s = '';
  for (const side of [0, 1]) {
    const P = (n) => side ? mir(S[n]) : S[n], sg = side ? -1 : 1;
    line(P('jugulum'), P('acromion'), 2.2);
    line(...off(P('shoulder'), P('elbow'), 0, 0.04, 0.96), 4.4);
    line(...off(P('elbow'), P('wrist'), 2.6 * sg, 0.04, 0.97), 2.3); line(...off(P('elbow'), P('wrist'), -2.3 * sg, 0.02, 0.97), 2.1);
    const W = P('wrist'), T = P('fingertip'), dx = T[0] - W[0], dy = T[1] - W[1], l = Math.hypot(dx, dy), ux = dx / l, uy = dy / l, nx = uy, ny = -ux;
    for (const k of [-3, -1, 1, 3]) line([W[0] + ux * 5 + nx * k * sg, W[1] + uy * 5 + ny * k * sg], [W[0] + ux * l * 0.62 + nx * k * 1.5 * sg, W[1] + uy * l * 0.62 + ny * k * 1.5 * sg], 1.3);
    line([W[0] + ux * 4 + nx * 5 * sg, W[1] + uy * 4 + ny * 5 * sg], [W[0] + ux * 16 + nx * 11 * sg, W[1] + uy * 16 + ny * 11 * sg], 1.5);
    line(...off(P('hip'), P('knee'), 0, 0.02, 0.95), 5.4);
    line(...off(P('knee'), P('ankle'), -2.2 * sg, 0.05, 0.98), 3.6); line(...off(P('knee'), P('ankle'), 4.4 * sg, 0.08, 0.97), 1.8);
    const A = P('ankle'), Fo = P('foot'); for (const k of [-4, 0, 4]) line([A[0] + k * 0.6, A[1] + 3], [Fo[0] + k * 1.3 * sg + 3 * sg, Fo[1] + 5], 1.3);
    if (v === 'f') { const K = P('knee'); s += `<ellipse cx="${K[0]}" cy="${K[1] - 6}" rx="4.6" ry="5.6" class="bs"/>`; }
    else { const sh = side ? -1 : 1; s += `<path d="M${150 + sh * 8} 102 L${150 + sh * 34} 98 L${150 + sh * 20} 150 Z" class="bs" stroke-linejoin="round"/>`; }
    s += `<circle cx="${P('hip')[0]}" cy="${P('hip')[1] - 2}" r="4.5" class="bs"/>`;
  }
  for (let i = 0; i < 10; i++) { const y0 = S.jugulum[1] + 9 + i * 7.6, w = 40 - Math.abs(i - 4) * 1.6; for (const sh of [1, -1]) s += `<path d="M${150 + sh * 4} ${y0} Q${150 + sh * (w * 0.6)} ${y0 - 4} ${150 + sh * w} ${y0 + 11}" fill="none" class="br"/>`; }
  s += `<path d="M118 222 Q110 238 124 252 Q138 258 150 251 Q162 258 176 252 Q190 238 182 222 Q166 233 150 238 Q134 233 118 222 Z" class="bs"/>`;
  if (v === 'f') {
    s += `<rect x="146.5" y="${S.jugulum[1]}" width="7" height="${S.xiphoid[1] - S.jugulum[1]}" rx="3" class="bs"/>`;
    for (let i = 13; i <= 17; i++) { const y = S.c7[1] + i * VERT; s += `<rect x="146" y="${y - 2.8}" width="8" height="5.6" rx="2" class="bs" opacity=".7"/>`; }
  } else {
    for (let i = -6; i <= 17; i++) { const y = S.c7[1] + i * VERT, w = i < 1 ? 6 : i < 13 ? 7 : 8.5; s += `<rect x="${150 - w / 2}" y="${y - 2.9}" width="${w}" height="5.8" rx="2" class="bs"/>`; }
    s += `<path d="M142 236 L158 236 L150 254 Z" class="bs" stroke-linejoin="round"/>`;
  }
  s += `<ellipse cx="150" cy="37" rx="17.5" ry="21.5" class="bs"/>`;
  if (v === 'f') s += `<ellipse cx="143" cy="36" rx="4" ry="3.4" class="bh"/><ellipse cx="157" cy="36" rx="4" ry="3.4" class="bh"/><path d="M148.5 44 L150 40 L151.5 44 Z" class="bh"/><path d="M137 50 Q139 63 150 64 Q161 63 163 50" fill="none" class="br"/>`;
  return o.join('') + f.join('') + s;
}
/* mérésrajz: honnan, hány cun, merre */
function measureSvg(p, S, fs) {
  const sp = PSPEC[p.id], ve = ' vector-effect="non-scaling-stroke"', R = (P) => `${r1(P[0])}" y="${r1(P[1])}`;
  const lbl = (P, txt, anchorRight) => `<text x="${R(P)}" text-anchor="${anchorRight ? 'start' : 'end'}" class="mt" style="font-size:${fs}px">${txt}</text>`;
  let s = '';
  if (sp.k === 'seg') {
    const g = segGeo(S, sp.seg), fb = sp.from === 'B', O = fb ? g.B : g.A, dir = fb ? -1 : 1, ux = dir * g.ux, uy = dir * g.uy;
    const F = [O[0] + ux * sp.d * g.s, O[1] + uy * sp.d * g.s];
    s += `<line x1="${r1(g.A[0])}" y1="${r1(g.A[1])}" x2="${r1(g.B[0])}" y2="${r1(g.B[1])}" class="mseg"${ve}/>`;
    s += `<circle cx="${r1(O[0])}" cy="${r1(O[1])}" r="${fs * 0.5}" class="mo"${ve}/>`;
    if (sp.d) {
      s += `<line x1="${r1(O[0])}" y1="${r1(O[1])}" x2="${r1(F[0])}" y2="${r1(F[1])}" class="mline"${ve}/>`;
      for (let i = 1; i <= Math.floor(sp.d + 1e-6); i++) { const T = [O[0] + ux * i * g.s, O[1] + uy * i * g.s]; s += `<line x1="${r1(T[0] - g.nx * 2.4)}" y1="${r1(T[1] - g.ny * 2.4)}" x2="${r1(T[0] + g.nx * 2.4)}" y2="${r1(T[1] + g.ny * 2.4)}" class="mtk"${ve}/>`; }
      const M = [(O[0] + F[0]) / 2 - g.nx * 4, (O[1] + F[1]) / 2 - g.ny * 4]; s += lbl(M, `${num(sp.d)} cun`, g.nx < 0);
    }
    if (sp.o) { s += `<line x1="${r1(F[0])}" y1="${r1(F[1])}" x2="${p.x}" y2="${p.y}" class="mline" stroke-dasharray="2 2"${ve}/>`; const right = sp.o > 0; s += lbl([p.x + (right ? 4 : -4), p.y + fs * 1.4], `${num(Math.abs(sp.o))} cun`, right); }
  } else if (sp.k === 'lm') {
    const P = S[sp.lm]; s += `<circle cx="${P[0]}" cy="${P[1]}" r="${fs * 0.5}" class="mo"${ve}/>`;
    if (sp.dx) { s += `<line x1="${P[0]}" y1="${P[1]}" x2="${p.x}" y2="${p.y}" class="mline"${ve}/>`; s += lbl([p.x + 4, p.y - 3], `${num(sp.dx)} cun`, true); }
  } else {
    const c7 = S.c7; for (let i = 0; i <= Math.floor(sp.v); i++) { const y = c7[1] + i * VERT; s += `<line x1="${c7[0] - 3}" y1="${y}" x2="${c7[0] + 3}" y2="${y}" class="mtk"${ve}/>`; }
    s += `<line x1="${c7[0]}" y1="${c7[1]}" x2="${c7[0]}" y2="${c7[1] + sp.v * VERT}" class="mline"${ve}/>`;
    s += lbl([c7[0] - 5, c7[1] + 2], 'C7', false) + lbl([c7[0] - 5, c7[1] + Math.floor(sp.v) * VERT + 2], VNAME(sp.v), false);
    if (sp.o) { const F = [c7[0], c7[1] + sp.v * VERT]; s += `<line x1="${F[0]}" y1="${F[1]}" x2="${p.x}" y2="${p.y}" class="mline" stroke-dasharray="2 2"${ve}/>` + lbl([p.x + 4, p.y + fs * 1.4], `${num(sp.o)} cun`, true); }
  }
  return s;
}
const flowPath = (c, nonScale) => { const d = chPath(c); if (!d) return ''; const col = ec(CHEL[c]).c, ve = nonScale ? ' vector-effect="non-scaling-stroke"' : ''; return `<path d="${d}" class="fbase" style="stroke:${col}"${ve}/><path d="${d}" class="fdots" style="stroke:${col}"${ve}/><path d="${d}" class="fcore"${ve}/>`; };

/* ================= Öt Elem ábra ================= */
function cycleSvg(key) {
  const PC = { x: 175, y: 160 }, PR = 108, CR = 38, ANG = { tuz: -90, fold: -18, fem: 54, viz: 126, fa: 198 }, P = {};
  for (const [k, a] of Object.entries(ANG)) { const r = a * Math.PI / 180; P[k] = { x: PC.x + PR * Math.cos(r), y: PC.y + PR * Math.sin(r) }; }
  const r1 = (n) => Math.round(n * 10) / 10, st = CYCST[key];
  let s = '';
  for (const [a, b] of st.pairs) {
    const A = P[a], B = P[b], dx = B.x - A.x, dy = B.y - A.y, d = Math.hypot(dx, dy), ux = dx / d, uy = dy / d;
    const sx = A.x + ux * (CR + 5), sy = A.y + uy * (CR + 5), ex = B.x - ux * (CR + 6), ey = B.y - uy * (CR + 6);
    let tx = ux, ty = uy, path; const hl = 11, hw = 6;
    if (st.curve) { const mx = (sx + ex) / 2, my = (sy + ey) / 2, nx = mx - PC.x, ny = my - PC.y, nd = Math.hypot(nx, ny), qx = mx + nx / nd * 22, qy = my + ny / nd * 22; tx = ex - qx; ty = ey - qy; const td = Math.hypot(tx, ty); tx /= td; ty /= td; path = `M${r1(sx)} ${r1(sy)} Q${r1(qx)} ${r1(qy)} ${r1(ex - tx * 7)} ${r1(ey - ty * 7)}`; }
    else path = `M${r1(sx)} ${r1(sy)} L${r1(ex - tx * 7)} ${r1(ey - ty * 7)}`;
    const bx = ex - tx * hl, by = ey - ty * hl;
    s += `<path d="${path}" fill="none" style="stroke:${st.c}" stroke-width="${st.w}" stroke-linecap="round"${st.dash ? ` stroke-dasharray="${st.dash}"` : ''}/><polygon points="${r1(ex)},${r1(ey)} ${r1(bx - ty * hw)},${r1(by + tx * hw)} ${r1(bx + ty * hw)},${r1(by - tx * hw)}" style="fill:${st.c}"/>`;
  }
  for (const [k, p] of Object.entries(P)) {
    const c = ec(k), o = ELORG[k], lines = o.length > 2 ? [o.slice(0, 2), o.slice(2)] : [o]; const ny = lines.length > 1 ? p.y - 8 : p.y - 2;
    s += `<a href="#elem-${k}" aria-label="${elT(k).n}"><circle cx="${r1(p.x)}" cy="${r1(p.y)}" r="${CR}" style="fill:${c.l};stroke:${c.c}" stroke-width="2"/><text x="${r1(p.x)}" y="${r1(ny)}" text-anchor="middle" font-size="15" font-weight="600" style="fill:${c.t}">${elT(k).n}</text>`;
    lines.forEach((ln, i) => { s += `<text x="${r1(p.x)}" y="${r1(ny + 15 + i * 13)}" text-anchor="middle" font-size="11" style="fill:var(--ink)">${ln.map(chA).join(' · ')}</text>`; });
    s += `</a><text x="${r1(p.x)}" y="${r1(p.y + CR + 15)}" text-anchor="middle" font-size="11" style="fill:var(--muted);stroke:var(--bg)" stroke-width="4" paint-order="stroke" stroke-linejoin="round">${elT(k).fn}</text>`;
  }
  const cy = C('cyc', key);
  return `<svg viewBox="0 0 350 312" role="img" aria-label="${esc(cy[1] + ': ' + cy[3])}" style="width:100%;max-width:400px;display:block;margin:0 auto;font-family:'Noto Sans',sans-serif">${s}</svg>`;
}

/* ================= szervóra ================= */
function clockSvg(d) {
  const CX = 170, CY = 170, R = 166, r = 102, cur = orgAt(d);
  const pol = (rad, deg) => { const a = deg * Math.PI / 180; return [(CX + rad * Math.sin(a)).toFixed(2), (CY - rad * Math.cos(a)).toFixed(2)]; };
  let s = '';
  for (const o of ORG) {
    const center = ((o.s + 1 - 12) * 15 + 360) % 360, a0 = center - 15, a1 = center + 15;
    const [ox0, oy0] = pol(R, a0), [ox1, oy1] = pol(R, a1), [ix1, iy1] = pol(r, a1), [ix0, iy0] = pol(r, a0);
    const on = o === cur, c = L.elemek ? ec(o.el) : { c: 'var(--jade)', l: 'var(--chip)' }, txt = on ? '#FFFFFF' : 'var(--ink)', [tx, ty] = pol((R + r) / 2, center);
    s += `<a class="seg" href="#szerv-${slug(o.c)}" aria-label="${esc(orgN(o.c))}, ${t('hours', { w: win(o) })}${on ? ', ' + t('active_now') : ''}"><path d="M${ox0} ${oy0} A${R} ${R} 0 0 1 ${ox1} ${oy1} L${ix1} ${iy1} A${r} ${r} 0 0 0 ${ix0} ${iy0} Z" style="fill:${on ? c.c : c.l};stroke:var(--bg)" stroke-width="3"/>`;
    s += `<text x="${tx}" y="${(+ty - 2).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="600" style="fill:${txt}">${C('org', o.c)[1]}</text><text x="${tx}" y="${(+ty + 12).toFixed(1)}" text-anchor="middle" font-size="11" style="fill:${txt}">${win(o)}</text></a>`;
  }
  const [nx, ny] = pol(R + 1, ((d.getHours() + d.getMinutes() / 60) - 12) * 15);
  s += `<circle cx="${nx}" cy="${ny}" r="8" style="fill:#fff;stroke:var(--ink)" stroke-width="3"/>`;
  return `<svg viewBox="-14 -14 368 368" style="font-family:'Noto Sans',sans-serif">${s}</svg>`;
}

const chName = (c) => CHEL[c] === 'er' ? chT(c)[0] : t('channel_of', { o: chT(c)[0] });
function miniFigure(c, cls = '') {
  const p = CHP[c]; const v = p ? p[0] : 'f';
  const pts = PTS.filter((q) => q.ch === c && q.v.includes(v)).map((q) => `<circle cx="${q.x}" cy="${q.y}" r="5" style="fill:${ec(q.el).c};stroke:#fff" stroke-width="2"/>`).join('');
  return `<svg viewBox="-10 0 330 480" class="${cls}" role="img" aria-label="${esc(t('live_label', { c: chName(c) }))}">${bodyInner(v)}${flowPath(c, true)}${pts}</svg>`;
}
/* ================= BodyMap: nagyítható testtérkép ================= */
function BodyMap(root, o) {
  const M = { v: o.v || 'f', z: 1, tx: 0, ty: 0, sel: null, ch: null, nums: null, list: o.list || PTS, route: null };
  root.insertAdjacentHTML('afterbegin', `<div class="stage"><svg viewBox="0 0 310 480" aria-hidden="true"><g class="bg"></g><g class="sk"></g><g class="cg"></g><g class="rg"></g><g class="ms"></g></svg></div><div class="ptl"></div>`);
  const stage = $('.stage', root), ptl = $('.ptl', root), bgG = $('.bg', root), cg = $('.cg', root), rg = $('.rg', root), skG = $('.sk', root), msG = $('.ms', root), sig = o.signal;
  M.bones = false; M.skin = true; M.pts = true; M.chOn = true;
  M.drawSk = () => { bgG.style.opacity = !M.skin ? (M.bones ? .1 : .16) : M.bones ? .42 : 1; skG.innerHTML = M.bones ? skelSvg(M.v, SK()) : ''; msG.innerHTML = M.bones && M.sel && PBY[M.sel].v.includes(M.v) ? measureSvg(PBY[M.sel], SK(), 5.5) : ''; const bb = $('[data-mz=bones]', root); if (bb) bb.setAttribute('aria-pressed', M.bones); };
  let W0 = 1, H0 = 1, k = 1, moved = false;
  const fit = () => { const r = root.getBoundingClientRect(); W0 = r.width || 1; H0 = r.height || 1; k = Math.min(W0 / 310, H0 / 480); };
  const clamp = () => { const cw = 310 * k * M.z, chh = 480 * k * M.z; M.tx = cw <= W0 ? (W0 - cw) / 2 : Math.min(0, Math.max(W0 - cw, M.tx)); M.ty = chh <= H0 ? (H0 - chh) / 2 : Math.min(0, Math.max(H0 - chh, M.ty)); };
  M.apply = (anim) => {
    clamp(); const sc = k * M.z;
    stage.classList.toggle('anim', !!anim); stage.style.transform = `translate(${M.tx}px,${M.ty}px) scale(${sc})`;
    for (const b of ptl.children) { const p = PBY[b.dataset.pt]; b.classList.toggle('anim', !!anim); b.style.transform = `translate(${M.tx + p.x * sc}px,${M.ty + p.y * sc}px)`; }
    ptl.classList.toggle('labels', M.z >= 2.2 || !!M.nums);
    const zl = $('[data-zl]', root); if (zl) zl.textContent = num(Math.round(M.z * 10) / 10) + '×';
  };
  M.drawCh = () => {
    cg.innerHTML = M.ch && M.chOn && CHP[M.ch] && CHP[M.ch][0] === M.v ? flowPath(M.ch, true) : '';
    const rp = (M.route || []).map((id) => PBY[id]).filter((p) => p.v.includes(M.v));
    rg.innerHTML = rp.length > 1 ? `<polyline points="${rp.map((p) => p.x + ',' + p.y).join(' ')}" fill="none" style="stroke:var(--muted)" stroke-width="1.5" stroke-dasharray="3 4" vector-effect="non-scaling-stroke"/>` : '';
  };
  M.renderPts = () => {
    ptl.innerHTML = M.list.filter((p) => p.v.includes(M.v) && (M.pts || p.id === M.sel)).map((p) => {
      const cls = ['pt']; if (o.dim && o.dim(p)) cls.push('dim'); if (p.id === M.sel) cls.push('sel'); if (o.done && o.done(p)) cls.push('done');
      const lbl = M.nums && M.nums[p.id] ? M.nums[p.id] : pc(p);
      return `<button type="button" class="${cls.join(' ')}" data-pt="${p.id}" style="--c:${ec(p.el).c}" aria-label="${esc(pc(p) + ' ' + p.py + (p.id === M.sel ? ', ' + t('selected') : ''))}"><i></i><b>${lbl}</b></button>`;
    }).join('');
    M.apply(false);
  };
  M.setView = (v) => { M.v = v; bgG.innerHTML = bodyInner(v); M.drawSk(); $$('[data-mz^="view-"]', root).forEach((b) => b.setAttribute('aria-pressed', b.dataset.mz === 'view-' + v)); M.drawCh(); M.renderPts(); if (o.onView) o.onView(v); };
  M.zoomAt = (f, cx, cy, anim) => { const nz = Math.min(6, Math.max(1, M.z * f)); M.tx = cx - (cx - M.tx) * (nz / M.z); M.ty = cy - (cy - M.ty) * (nz / M.z); M.z = nz; M.apply(anim); };
  M.centerOn = (p, anim) => { const sc = k * M.z; M.tx = W0 / 2 - p.x * sc; M.ty = H0 / 2 - p.y * sc; M.apply(anim); };
  M.select = (id, focus) => {
    const p = PBY[id]; M.sel = id; if (o.channelOfSel) M.ch = p.ch;
    if (!p.v.includes(M.v)) M.setView(p.v[0]); else { M.drawCh(); M.drawSk(); M.renderPts(); }
    if (focus) { M.z = Math.max(M.z, typeof focus === 'number' ? focus : 2.4); M.centerOn(p, true); } else if (M.z > 1) M.centerOn(p, true);
  };
  M.reset = () => { M.z = 1; M.apply(true); };
  fit(); M.setView(M.v);
  const ro = new ResizeObserver(() => { fit(); M.apply(false); }); ro.observe(root); sig.addEventListener('abort', () => ro.disconnect());
  root.addEventListener('click', (e) => {
    const b = e.target.closest('[data-mz],[data-pt]'); if (!b) return;
    if (b.dataset.pt) { if (!moved && o.onPick) o.onPick(b.dataset.pt); return; }
    const a = b.dataset.mz;
    if (a === 'bones') { M.bones = !M.bones; store.set('bones', M.bones); M.drawSk(); if (M.bones && M.sel && M.z < 2.2 && PBY[M.sel].v.includes(M.v)) { M.z = 2.6; M.centerOn(PBY[M.sel], true); } return; }
    if (a === 'zin') M.zoomAt(1.5, W0 / 2, H0 / 2, true); if (a === 'zout') M.zoomAt(1 / 1.5, W0 / 2, H0 / 2, true); if (a === 'zreset') M.reset();
    if (a.startsWith('view-')) { M.setView(a.slice(5)); if (M.sel && PBY[M.sel].v.includes(M.v) && M.z > 1) M.centerOn(PBY[M.sel], false); }
  }, { signal: sig });
  root.addEventListener('wheel', (e) => { e.preventDefault(); const r = root.getBoundingClientRect(); M.zoomAt(Math.exp(-e.deltaY * 0.0018), e.clientX - r.left, e.clientY - r.top, false); }, { passive: false, signal: sig });
  root.addEventListener('dblclick', (e) => { const r = root.getBoundingClientRect(); M.zoomAt(1.8, e.clientX - r.left, e.clientY - r.top, true); }, { signal: sig });
  const ptrs = new Map(); let start = null, pinch = null;
  root.addEventListener('pointerdown', (e) => {
    if (e.target.closest('.mapctl,.mapview,.layerbox')) return;
    ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (ptrs.size === 1) { start = { x: e.clientX, y: e.clientY, tx: M.tx, ty: M.ty }; moved = false; }
    if (ptrs.size === 2) { const [a, b] = [...ptrs.values()], r = root.getBoundingClientRect(); pinch = { d: Math.hypot(a.x - b.x, a.y - b.y), z: M.z, mx: (a.x + b.x) / 2 - r.left, my: (a.y + b.y) / 2 - r.top, tx: M.tx, ty: M.ty }; }
  }, { signal: sig });
  window.addEventListener('pointermove', (e) => {
    if (!ptrs.has(e.pointerId)) return; ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (ptrs.size >= 2 && pinch) { const [a, b] = [...ptrs.values()], r = root.getBoundingClientRect(), d = Math.hypot(a.x - b.x, a.y - b.y), nz = Math.min(6, Math.max(1, pinch.z * d / pinch.d)), mx = (a.x + b.x) / 2 - r.left, my = (a.y + b.y) / 2 - r.top; M.tx = mx - (pinch.mx - pinch.tx) * (nz / pinch.z); M.ty = my - (pinch.my - pinch.ty) * (nz / pinch.z); M.z = nz; moved = true; M.apply(false); }
    else if (start) { const dx = e.clientX - start.x, dy = e.clientY - start.y; if (Math.hypot(dx, dy) > 6) moved = true; if (moved) { M.tx = start.tx + dx; M.ty = start.ty + dy; M.apply(false); } }
  }, { signal: sig });
  const up = (e) => { if (!ptrs.has(e.pointerId)) return; ptrs.delete(e.pointerId); if (ptrs.size < 2) pinch = null; if (ptrs.size === 1) { const p = [...ptrs.values()][0]; start = { x: p.x, y: p.y, tx: M.tx, ty: M.ty }; } if (ptrs.size === 0) { start = null; setTimeout(() => { moved = false; }, 0); } };
  window.addEventListener('pointerup', up, { signal: sig }); window.addEventListener('pointercancel', up, { signal: sig });
  root.addEventListener('keydown', (e) => {
    const m = { ArrowLeft: [40, 0], ArrowRight: [-40, 0], ArrowUp: [0, 40], ArrowDown: [0, -40] };
    if (m[e.key]) { e.preventDefault(); M.tx += m[e.key][0]; M.ty += m[e.key][1]; M.apply(true); }
    if (e.key === '+' || e.key === '=') M.zoomAt(1.5, W0 / 2, H0 / 2, true); if (e.key === '-') M.zoomAt(1 / 1.5, W0 / 2, H0 / 2, true);
  }, { signal: sig });
  return M;
}