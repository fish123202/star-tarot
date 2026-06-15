import type { TarotCard } from "./types";

const majorArcana: TarotCard[] = [
  { id: "major-0", name: "愚者", nameEn: "The Fool", arcana: "major", number: 0, upright: "新开始、自由、信任直觉", reversed: "鲁莽、逃避、缺乏计划" },
  { id: "major-1", name: "魔术师", nameEn: "The Magician", arcana: "major", number: 1, upright: "行动力、资源整合、显化", reversed: "欺骗、能力未发挥、方向不明" },
  { id: "major-2", name: "女祭司", nameEn: "The High Priestess", arcana: "major", number: 2, upright: "直觉、潜意识、内省", reversed: "压抑直觉、秘密、情绪混乱" },
  { id: "major-3", name: "女皇", nameEn: "The Empress", arcana: "major", number: 3, upright: "丰盛、滋养、创造力", reversed: "依赖、停滞、过度保护" },
  { id: "major-4", name: "皇帝", nameEn: "The Emperor", arcana: "major", number: 4, upright: "结构、权威、稳定", reversed: "控制欲、僵化、独断" },
  { id: "major-5", name: "教皇", nameEn: "The Hierophant", arcana: "major", number: 5, upright: "传统、学习、精神指引", reversed: "打破常规、质疑权威" },
  { id: "major-6", name: "恋人", nameEn: "The Lovers", arcana: "major", number: 6, upright: "选择、关系、价值观一致", reversed: "失衡、诱惑、沟通不畅" },
  { id: "major-7", name: "战车", nameEn: "The Chariot", arcana: "major", number: 7, upright: "意志力、胜利、前进", reversed: "失控、方向冲突、后劲不足" },
  { id: "major-8", name: "力量", nameEn: "Strength", arcana: "major", number: 8, upright: "勇气、耐心、内在力量", reversed: "自我怀疑、情绪失控" },
  { id: "major-9", name: "隐者", nameEn: "The Hermit", arcana: "major", number: 9, upright: "独处、反思、寻找答案", reversed: "孤立、逃避、迷失" },
  { id: "major-10", name: "命运之轮", nameEn: "Wheel of Fortune", arcana: "major", number: 10, upright: "转机、周期、机遇", reversed: "阻力、坏运气、抗拒变化" },
  { id: "major-11", name: "正义", nameEn: "Justice", arcana: "major", number: 11, upright: "公平、因果、清晰判断", reversed: "偏见、不公、逃避责任" },
  { id: "major-12", name: "倒吊人", nameEn: "The Hanged Man", arcana: "major", number: 12, upright: "暂停、换角度、牺牲换取领悟", reversed: "拖延、无效牺牲、固执" },
  { id: "major-13", name: "死神", nameEn: "Death", arcana: "major", number: 13, upright: "结束与重生、转型", reversed: "抗拒改变、停滞、恐惧" },
  { id: "major-14", name: "节制", nameEn: "Temperance", arcana: "major", number: 14, upright: "平衡、调和、耐心", reversed: "极端、失衡、急躁" },
  { id: "major-15", name: "恶魔", nameEn: "The Devil", arcana: "major", number: 15, upright: "欲望、束缚、物质依赖", reversed: "解脱、觉醒、打破枷锁" },
  { id: "major-16", name: "塔", nameEn: "The Tower", arcana: "major", number: 16, upright: "突变、真相揭露、重建", reversed: "灾难被避免、恐惧改变" },
  { id: "major-17", name: "星星", nameEn: "The Star", arcana: "major", number: 17, upright: "希望、疗愈、灵感", reversed: "失望、信心不足、脱离现实" },
  { id: "major-18", name: "月亮", nameEn: "The Moon", arcana: "major", number: 18, upright: "不确定、潜意识、迷雾", reversed: "恐惧消散、真相渐明" },
  { id: "major-19", name: "太阳", nameEn: "The Sun", arcana: "major", number: 19, upright: "成功、活力、清晰", reversed: "延迟的成功、过度乐观" },
  { id: "major-20", name: "审判", nameEn: "Judgement", arcana: "major", number: 20, upright: "觉醒、召唤、复盘", reversed: "自我批判、犹豫、未准备好" },
  { id: "major-21", name: "世界", nameEn: "The World", arcana: "major", number: 21, upright: "完成、整合、新周期", reversed: "未完成、缺少闭环" },
];

function minor(
  suit: TarotCard["suit"],
  suitName: string,
  entries: [string, string, string, string][],
): TarotCard[] {
  return entries.map(([id, name, upright, reversed], index) => ({
    id: `${suit}-${id}`,
    name: `${suitName}${name}`,
    nameEn: name,
    arcana: "minor" as const,
    suit,
    number: index + 1,
    upright,
    reversed,
  }));
}

const wands = minor("wands", "权杖", [
  ["ace", "Ace", "灵感火花、新行动", "延迟、动力不足"],
  ["2", "二", "规划、等待时机", "恐惧、缺乏远见"],
  ["3", "三", "扩张、远见", "障碍、合作不畅"],
  ["4", "四", "庆祝、稳定", "缺乏支持、根基不稳"],
  ["5", "五", "竞争、冲突", "避免冲突、内耗"],
  ["6", "六", "胜利、认可", "自负、延迟回报"],
  ["7", "七", "防守、坚持", "压力过载、想放弃"],
  ["8", "八", "快速行动、消息", "仓促、方向错误"],
  ["9", "九", "韧性、最后冲刺", "疲惫、防御心强"],
  ["10", "十", "负担、责任", "释放、Delegation"],
  ["page", "侍从", "探索、热情", "冲动、不成熟"],
  ["knight", "骑士", "冒险、冲劲", "鲁莽、急躁"],
  ["queen", "王后", "自信、独立", "嫉妒、控制"],
  ["king", "国王", "领导力、远见", "专断、压力"],
]);

const cups = minor("cups", "圣杯", [
  ["ace", "Ace", "新感情、情感开启", "情感压抑、空虚"],
  ["2", "二", "连接、伙伴", "失衡、误解"],
  ["3", "三", "庆祝、友谊", "过度、表面社交"],
  ["4", "四", "沉思、不满", "新机会、走出舒适区"],
  ["5", "五", "失落、遗憾", "接受、向前看"],
  ["6", "六", "回忆、善意", "沉溺过去、不现实"],
  ["7", "七", "选择、幻想", "清晰、做出决定"],
  ["8", "八", "离开、寻找更深意义", "恐惧改变、停滞"],
  ["9", "九", "满足、愿望实现", "贪婪、不感恩"],
  ["10", "十", "情感圆满、家庭", "不和、期望过高"],
  ["page", "侍从", "敏感、创意", "情绪化、不成熟"],
  ["knight", "骑士", "浪漫、追求", "不切实际、逃避"],
  ["queen", "王后", "共情、直觉", "依赖、边界模糊"],
  ["king", "国王", "情感成熟、平衡", "压抑、操控"],
]);

const swords = minor("swords", "宝剑", [
  ["ace", "Ace", "清晰、突破", "混乱、错误信息"],
  ["2", "二", "僵局、艰难选择", "信息明朗、做出决定"],
  ["3", "三", "心痛、分离", "疗愈、释放"],
  ["4", "四", "休息、恢复", "焦虑、无法休息"],
  ["5", "五", "冲突、得失", "和解、放下"],
  ["6", "六", "过渡、离开困境", "无法脱身、拖延"],
  ["7", "七", "策略、独行", "暴露、计划失败"],
  ["8", "八", "限制、自我束缚", "解脱、新视角"],
  ["9", "九", "焦虑、噩梦", "希望、面对恐惧"],
  ["10", "十", "结束、低谷", "恢复、黎明前"],
  ["page", "侍从", "好奇、新想法", "流言、轻率"],
  ["knight", "骑士", "直接、行动", "冲动、伤人"],
  ["queen", "王后", "独立、清晰边界", "冷酷、孤立"],
  ["king", "国王", "理性、权威", "操控、无情"],
]);

const pentacles = minor("pentacles", "星币", [
  ["ace", "Ace", "新机会、物质开端", "错失机会、不稳定"],
  ["2", "二", "平衡、多任务", "失衡、过度分散"],
  ["3", "三", "协作、技能成长", "缺乏合作、质量差"],
  ["4", "四", "稳定、保守", "贪婪、控制"],
  ["5", "五", "困难、匮乏感", "恢复、求助"],
  ["6", "六", "给予、公平", "债务、不平等"],
  ["7", "七", "耐心、长期投入", "缺乏回报、短视"],
  ["8", "八", "专注、 craftsmanship", "敷衍、缺乏热情"],
  ["9", "九", "独立、享受成果", "过度工作、物质主义"],
  ["10", "十", " legacy、长期稳定", "财务风险、家庭压力"],
  ["page", "侍从", "学习、务实", "拖延、缺乏进度"],
  ["knight", "骑士", "勤奋、可靠", "工作狂、固执"],
  ["queen", "王后", " nurturing、实用", "忽视自我、过度付出"],
  ["king", "国王", "成功、稳定", "物质主义、 rigid"],
]);

export const TAROT_DECK: TarotCard[] = [
  ...majorArcana,
  ...wands,
  ...cups,
  ...swords,
  ...pentacles,
];

export const TAROT_DECK_SIZE = TAROT_DECK.length;
