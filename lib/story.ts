export type StoryPage = {
  chapter: string;
  title: string;
  text: string;
  quote?: string;
  speaker?: string;
  image: string;
  alt: string;
  align: "left" | "right" | "bottom";
  face: { x: number; y: number; size: number; rotate?: number };
};

export type StoryTemplate = {
  id: string;
  title: string;
  lesson: string;
  summary: string;
  ageRange: string;
  pages: StoryPage[];
};

export const baseStoryPages: StoryPage[] = [
  {
    chapter: "银河星桥",
    title: "年糕与糯米",
    text: "中秋夜，星灯镇的银河突然少了一块。两个小小守护者，踏上了一场关于勇气、理解与回家的星光冒险。",
    quote: "只要我们在一起，黑夜也能找到光。",
    image: "/story/galaxy/01-cover.png",
    alt: "小守护者和糯米站在星灯镇屋顶，仰望断裂的银河星桥",
    align: "right",
    face: { x: 28.2, y: 29.1, size: 10.2 },
  },
  {
    chapter: "第一章",
    title: "星灯熄灭了",
    text: "正当月亮升到屋檐上，整条长街的灯忽然一盏接一盏暗了下来。年糕护住最后一粒微光，糯米用小手替它挡住夜风。",
    quote: "它在发抖。我们送它回家吧！",
    speaker: "糯米",
    image: "/story/galaxy/02-last-starlight.png",
    alt: "小守护者和糯米在灯笼街上保护最后一粒星光",
    align: "right",
    face: { x: 28.6, y: 38.2, size: 10.8 },
  },
  {
    chapter: "第二章",
    title: "月饼盒里的来信",
    text: "阁楼里的月饼盒突然叮咚一响，一只由星尘变成的月兔跳了出来。它捧着破碎的星石：银河星桥断了，星灯才迷了路。",
    quote: "要修好星桥，必须找回三块星石。",
    speaker: "月兔",
    image: "/story/galaxy/03-moon-rabbit.png",
    alt: "月兔从月饼盒中现身并展示破碎的星石",
    align: "right",
    face: { x: 30.7, y: 28.4, size: 13.4 },
  },
  {
    chapter: "第三章",
    title: "牵手穿过星光门",
    text: "年糕举起星石，屋顶上便张开一圈蓝金色的星门。他回头握紧糯米的手，两个伙伴一起跑向银河。",
    quote: "抓紧我。三、二、一——出发！",
    speaker: "年糕",
    image: "/story/galaxy/04-star-portal.png",
    alt: "小守护者牵着糯米穿过屋顶上的星光门",
    align: "left",
    face: { x: 71.1, y: 35.3, size: 9 },
  },
  {
    chapter: "第四章",
    title: "风谷的第一块星石",
    text: "第一块星石落在浮空风谷的另一端。年糕把银河光连成护栏，糯米踩着时空涟漪跃过浮石——一个稳住路，一个勇敢向前。",
    quote: "我的光给你铺路，你的勇气带我们过去。",
    speaker: "年糕",
    image: "/story/galaxy/05-wind-valley.png",
    alt: "小守护者和糯米合作跨越风谷取得星石",
    align: "left",
    face: { x: 69.6, y: 24, size: 7.4 },
  },
  {
    chapter: "第五章",
    title: "时间迷宫",
    text: "银竹林里的路不停重复，连落叶都一遍遍飘回枝头。糯米静下心寻找方向，年糕用星光照亮了唯一真正的路。",
    quote: "跑得快不算厉害，知道往哪儿跑才厉害！",
    speaker: "糯米",
    image: "/story/galaxy/06-bamboo-maze.png",
    alt: "小守护者和糯米在银竹林中找到正确道路",
    align: "right",
    face: { x: 24.1, y: 27.5, size: 9.4 },
  },
  {
    chapter: "第六章",
    title: "云背后的哭声",
    text: "最后一块星石被大家害怕的无声兽抱在怀里。可年糕看见的不是怪兽，而是一团孤零零的云。糯米掰开月饼，把更大的一半递了过去。",
    quote: "你不用一个人躲在黑夜里。跟我们回家吧。",
    speaker: "糯米",
    image: "/story/galaxy/07-sharing-cloud.png",
    alt: "小守护者和糯米用月饼安慰孤独的云团",
    align: "left",
    face: { x: 75.4, y: 31.5, size: 11.3 },
  },
  {
    chapter: "第七章",
    title: "两束光，一座桥",
    text: "云团松开双手，最后的星石飞上天空。年糕的银河光化成万千星线，糯米的时空环让碎片回到原位。两束不同的光，织成了同一座桥。",
    quote: "真正强大的光，是愿意和另一束光并肩。",
    image: "/story/galaxy/08-repair-bridge.png",
    alt: "小守护者和伙伴们合力修复银河星桥",
    align: "bottom",
    face: { x: 28, y: 15.4, size: 8 },
  },
  {
    chapter: "第八章",
    title: "星灯重新亮起",
    text: "他们沿着新生的星桥奔向故乡。脚步每落下一次，星灯镇就亮起一片金色灯火。河面、窗边和每一双等待的眼睛，都重新装满了星光。",
    quote: "看！我们的家认出我们啦！",
    speaker: "糯米",
    image: "/story/galaxy/09-homecoming.png",
    alt: "小守护者和糯米沿星桥跑回重新点亮的故乡",
    align: "left",
    face: { x: 70, y: 28.5, size: 8.4 },
  },
  {
    chapter: "尾声",
    title: "屋顶上的约定",
    text: "月饼还温热，银河已经完整。小云团提着自己的星灯，月兔在大家中间打起了哈欠。他们约好：哪里有人害怕，哪里就会有他们的光。",
    quote: "真正的英雄，是让每一颗心都找到回家的路。",
    image: "/story/galaxy/10-rooftop-feast.png",
    alt: "小守护者和朋友们在屋顶分享月饼并仰望银河",
    align: "right",
    face: { x: 25.4, y: 37.2, size: 12.4 },
  },
];

type StoryCopy = Pick<StoryPage, "chapter" | "title" | "text"> &
  Partial<Pick<StoryPage, "quote" | "speaker">>;

function pagesWithCopy(copy: StoryCopy[]): StoryPage[] {
  return copy.map((page, index) => ({ ...baseStoryPages[index], ...page }));
}

const mannersPages = pagesWithCopy([
  { chapter: "星光邮局", title: "会说谢谢的星光邮差", text: "中秋夜，星灯镇有三封重要的信没有送到。{{name}}戴上星光邮差徽章，和糯米一起出发，学习用礼貌的话打开每一扇心门。", quote: "一句温柔的话，也能像星星一样照亮别人。" },
  { chapter: "第一章", title: "先说一声你好", text: "长街的灯忽然暗了。{{name}}没有急着往前跑，而是先向守灯的爷爷问好，再礼貌地询问发生了什么。爷爷笑着指出第一封信的方向。", quote: "爷爷您好，请问我们可以帮忙吗？", speaker: "{{name}}" },
  { chapter: "第二章", title: "请帮帮我们", text: "月兔从月饼盒里跳出来，却打不开星光信封。{{name}}认真听完它的话，说了一声“请让我试试”，信封便亮起柔和的蓝光。", quote: "需要帮助时，好好说“请”就可以。", speaker: "月兔" },
  { chapter: "第三章", title: "邀请也要有礼貌", text: "星光门打开了。{{name}}没有拉着糯米就跑，而是伸出手问：“你愿意和我一起去吗？”糯米开心地点点头。", quote: "我愿意，我们一起出发！", speaker: "糯米" },
  { chapter: "第四章", title: "谢谢你的护栏", text: "风谷吹得人站不稳，糯米用时间环稳住浮石。{{name}}安全走过后认真道谢，第一封信也在感谢声中飞向远方。", quote: "谢谢你为我守住了路。", speaker: "{{name}}" },
  { chapter: "第五章", title: "先听完再回答", text: "银竹林的路会重复。{{name}}忍住没有打断月兔，等它把提示说完，才发现真正的出口藏在最后一句话里。", quote: "认真听别人说完，也是一种尊重。" },
  { chapter: "第六章", title: "对不起，我误会你了", text: "大家都说云团藏起了最后一封信，{{name}}也差点相信。发现真相后，{{name}}主动向云团道歉，云团终于露出了笑脸。", quote: "对不起，我不该没有问清楚就责怪你。", speaker: "{{name}}" },
  { chapter: "第七章", title: "礼貌织成的星桥", text: "你好、请、谢谢和对不起化作四束星光，和最后一封信一起飞向天空。每一句真诚的话，都成了星桥的一部分。", quote: "礼貌不是口令，是把别人放在心上。" },
  { chapter: "第八章", title: "每一封信都到了", text: "他们沿星桥回到星灯镇。收到信的人互相问好、道谢，长街的灯一盏接一盏亮了起来。", quote: "原来好好说话，真的会让一座城变亮！", speaker: "糯米" },
  { chapter: "尾声", title: "屋顶上的四句话", text: "{{name}}和伙伴们在屋顶分享月饼，把“你好、请、谢谢、对不起”写进新的邮差守则，并约好每天都认真练习。", quote: "最好的礼貌，是尊重每一个人。" },
]);

const safetyPages = pagesWithCopy([
  { chapter: "星灯安全队", title: "迷雾竹林的安全约定", text: "星灯镇突然起了蓝色迷雾。{{name}}和糯米组成安全队，要把三条重要的安全约定送到迷路的星灯身边。", quote: "真正的勇敢，是先保护好自己。" },
  { chapter: "第一章", title: "停下来先观察", text: "灯笼街变暗时，{{name}}没有追着陌生亮光跑，而是停在熟悉的屋檐下，观察周围并呼喊可信任的大人。", quote: "看不清的时候，先停下，不乱跑。", speaker: "{{name}}" },
  { chapter: "第二章", title: "记住可信任的人", text: "月兔带来安全卡，上面画着家人、老师和守灯人。{{name}}记住：遇到困难，要找认识并可信任的大人求助。", quote: "不确定时，我会先找可信任的大人。" },
  { chapter: "第三章", title: "出发前做好检查", text: "穿过星光门前，{{name}}检查护具、确认路线，并和糯米约好不松开手。准备好了，他们才一起出发。", quote: "准备不是胆小，是对自己负责。" },
  { chapter: "第四章", title: "只走安全标记", text: "风谷里有许多近路，{{name}}却只沿着月兔标记的蓝色光圈前进。虽然慢一点，却稳稳到达了对岸。", quote: "安全的路，才是最快回家的路。" },
  { chapter: "第五章", title: "迷路后的三件事", text: "银竹林忽然看不见出口。{{name}}记起约定：停在原地、发出信号、等待可信任的大人来找，不独自钻进更深的树林。", quote: "停、说、等，我记住了！", speaker: "{{name}}" },
  { chapter: "第六章", title: "陌生邀请不跟随", text: "云团说有一条没人知道的小路。{{name}}礼貌拒绝，没有跟着离开，并请月兔一起确认路线。云团也明白了安全约定。", quote: "谢谢你，但我要先和可信任的人确认。", speaker: "{{name}}" },
  { chapter: "第七章", title: "互相照看才安全", text: "大家用光圈标出边界，轮流确认伙伴都在身边。三条安全约定连成一座清楚、明亮的星桥。", quote: "安全不是一个人的事，我们要互相提醒。" },
  { chapter: "第八章", title: "平安回到星灯镇", text: "他们沿着标记完整的星桥回家，把安全卡送给每一户人家。大人和孩子一起练习遇到迷路时该怎么做。", quote: "知道怎么保护自己，心里就更有力量。" },
  { chapter: "尾声", title: "屋顶上的安全演练", text: "月饼吃完前，{{name}}又把安全约定说了一遍：先停下、找可信任的人、不跟陌生人离开。伙伴们都为他鼓掌。", quote: "安全习惯，要在平常多练习。" },
]);

const honestyPages = pagesWithCopy([
  { chapter: "诚实星石", title: "会发光的诚实星石", text: "{{name}}不小心碰落了一块星石，银河星桥因此少了一角。虽然心里很紧张，{{name}}还是决定说出事情的真相。", quote: "承认错误需要勇气，也会让心重新发光。" },
  { chapter: "第一章", title: "灯灭了以后", text: "星灯一盏盏熄灭，大家都在寻找原因。{{name}}本想躲开，却发现胸前的光也越来越暗，于是主动走到大家面前。", quote: "那块星石，是我不小心碰落的。", speaker: "{{name}}" },
  { chapter: "第二章", title: "真话不会赶走朋友", text: "月兔认真听完，没有责骂{{name}}，而是拿出修桥地图。糯米也握住他的手，告诉他大家可以一起补救。", quote: "犯错不可怕，隐瞒才会让问题变大。", speaker: "月兔" },
  { chapter: "第三章", title: "一起面对错误", text: "{{name}}向伙伴说明经过，并请求一起找回星石。星光门随真诚的话打开，原来真话能让回去的路变清楚。", quote: "谢谢你愿意相信我。", speaker: "{{name}}" },
  { chapter: "第四章", title: "不把责任推给风", text: "风谷里，{{name}}差点说是大风碰落了星石，但他停下来改口，承认是自己没有听提醒。第一块碎片立刻亮了。", quote: "是我做的，我愿意把它修好。", speaker: "{{name}}" },
  { chapter: "第五章", title: "借口组成的迷宫", text: "银竹林里每一个借口都会变成一条假路。{{name}}不再为自己找理由，坦白说出全部经过，真正的出口便出现在脚下。", quote: "真话也许不容易，但它不会让人迷路。" },
  { chapter: "第六章", title: "云团也说了实话", text: "云团承认自己捡到碎片后，因为害怕被误会才藏了起来。{{name}}没有责怪它，而是分享了自己说出真相的经历。", quote: "我们一起说清楚，也一起补救。", speaker: "{{name}}" },
  { chapter: "第七章", title: "担当让星石复原", text: "{{name}}把碎片放回原位，认真完成每一步修补。伙伴们的信任化作星线，让诚实星石重新变得完整。", quote: "担当，就是说到以后认真做到。" },
  { chapter: "第八章", title: "把经过告诉大家", text: "回到星灯镇，{{name}}没有只说自己修好了桥，也坦然讲出错误是怎样发生的。大家为他的诚实和担当点亮了灯。", quote: "谢谢你把真相告诉我们。", speaker: "守灯人" },
  { chapter: "尾声", title: "屋顶上的勇敢真话", text: "{{name}}明白，诚实不是永远不犯错，而是犯错后愿意承认、道歉并想办法补救。胸前的星光比从前更亮了。", quote: "诚实让我们值得被信任。" },
]);

export const storyTemplates: StoryTemplate[] = [
  { id: "galaxy-bridge", title: "银河星桥", lesson: "勇气与合作", summary: "和伙伴修复星桥，学会理解、合作与帮助他人。", ageRange: "4–9 岁", pages: baseStoryPages },
  { id: "star-mail", title: "星光邮差", lesson: "礼貌与感谢", summary: "在送信冒险中练习你好、请、谢谢和对不起。", ageRange: "3–8 岁", pages: mannersPages },
  { id: "bamboo-safety", title: "迷雾安全队", lesson: "安全与求助", summary: "学会迷路时停下来，并向可信任的大人求助。", ageRange: "4–9 岁", pages: safetyPages },
  { id: "honest-star", title: "诚实星石", lesson: "诚实与担当", summary: "犯错后说出真相、认真道歉，并一起解决问题。", ageRange: "5–10 岁", pages: honestyPages },
];

export function getStoryTemplate(templateId: string) {
  return storyTemplates.find((template) => template.id === templateId) ?? storyTemplates[0];
}

export function makeDemoStory(templateId: string, name: string, age: number): StoryPage[] {
  const template = getStoryTemplate(templateId);
  return template.pages.map((page, index) => {
    const text = page.text
      .replaceAll("{{name}}", name)
      .replaceAll("年糕", name);
    return {
      ...page,
      title: index === 0 ? `${name}的${template.title}` : page.title,
      text: index === 0 ? (text.startsWith(name) ? `${age}岁的${text}` : `${age}岁的${name}来到星灯镇。${text}`) : text,
      quote: page.quote?.replaceAll("{{name}}", name).replaceAll("年糕", name),
      speaker: page.speaker?.replaceAll("{{name}}", name).replaceAll("年糕", name),
    };
  });
}
