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

export const lessonOptions = [
  { value: "礼貌待人", label: "礼貌待人", icon: "你好" },
  { value: "勇敢尝试", label: "勇敢尝试", icon: "勇气" },
  { value: "安全常识", label: "安全常识", icon: "守护" },
  { value: "分享与合作", label: "分享合作", icon: "一起" },
] as const;

export const baseStoryPages: StoryPage[] = [
  {
    chapter: "银河星桥",
    title: "年糕与糯米",
    text: "中秋夜，星灯镇的银河突然少了一块。两个小小守护者，踏上了一场关于勇气、理解与回家的星光冒险。",
    quote: "只要我们在一起，黑夜也能找到光。",
    image: "/story/01-cover.png",
    alt: "两位小守护者站在星灯镇屋顶，仰望断裂的银河星桥",
    align: "right",
    face: { x: 28.4, y: 29.5, size: 8.4 },
  },
  {
    chapter: "第一章",
    title: "星灯熄灭了",
    text: "正当月亮升到屋檐上，整条长街的灯忽然一盏接一盏暗了下来。年糕护住最后一粒微光，糯米用小手替它挡住夜风。",
    quote: "它在发抖。我们送它回家吧！",
    speaker: "糯米",
    image: "/story/02-scene.png",
    alt: "两位小守护者在灯笼街上保护最后一粒星光",
    align: "right",
    face: { x: 34.1, y: 38.3, size: 8.2, rotate: 2 },
  },
  {
    chapter: "第二章",
    title: "月饼盒里的来信",
    text: "阁楼里的月饼盒突然叮咚一响，一只由星尘变成的月兔跳了出来。它捧着破碎的星石：银河星桥断了，星灯才迷了路。",
    quote: "要修好星桥，必须找回三块星石。",
    speaker: "月兔",
    image: "/story/03-scene.png",
    alt: "月兔从月饼盒中现身并展示破碎的星石",
    align: "right",
    face: { x: 33.8, y: 36.5, size: 8.6, rotate: -1 },
  },
  {
    chapter: "第三章",
    title: "牵手穿过星光门",
    text: "年糕举起星石，屋顶上便张开一圈蓝金色的星门。他回头握紧糯米的手，两个人一起跑向银河。",
    quote: "抓紧我。三、二、一——出发！",
    speaker: "年糕",
    image: "/story/04-scene.png",
    alt: "两位小守护者牵手穿过屋顶上的星光门",
    align: "left",
    face: { x: 33.7, y: 20.8, size: 9.2, rotate: -4 },
  },
  {
    chapter: "第四章",
    title: "风谷的第一块星石",
    text: "第一块星石落在浮空风谷的另一端。年糕把银河光连成护栏，糯米踩着时空涟漪跃过浮石——一个稳住路，一个勇敢向前。",
    quote: "我的光给你铺路，你的勇气带我们过去。",
    speaker: "年糕",
    image: "/story/05-scene.png",
    alt: "两位小守护者合作跨越风谷取得星石",
    align: "left",
    face: { x: 27.7, y: 28.4, size: 7.2, rotate: -2 },
  },
  {
    chapter: "第五章",
    title: "时间迷宫",
    text: "银竹林里的路不停重复，连落叶都一遍遍飘回枝头。糯米静下心寻找方向，年糕用星光照亮了唯一真正的路。",
    quote: "跑得快不算厉害，知道往哪儿跑才厉害！",
    speaker: "糯米",
    image: "/story/06-scene.png",
    alt: "两位小守护者在银竹林中找到正确道路",
    align: "right",
    face: { x: 55.4, y: 25.5, size: 7.1, rotate: 4 },
  },
  {
    chapter: "第六章",
    title: "云背后的哭声",
    text: "最后一块星石被大家害怕的无声兽抱在怀里。可年糕看见的不是怪兽，而是一团孤零零的云。糯米掰开月饼，把更大的一半递了过去。",
    quote: "你不用一个人躲在黑夜里。跟我们回家吧。",
    speaker: "糯米",
    image: "/story/07-scene.png",
    alt: "两位小守护者用月饼安慰孤独的云团",
    align: "left",
    face: { x: 26.9, y: 32.8, size: 7.4, rotate: 1 },
  },
  {
    chapter: "第七章",
    title: "两束光，一座桥",
    text: "云团松开双手，最后的星石飞上天空。年糕的银河光化成万千星线，糯米的时空环让碎片回到原位。两束不同的光，织成了同一座桥。",
    quote: "真正强大的光，是愿意和另一束光并肩。",
    image: "/story/08-scene.png",
    alt: "两位小守护者合力修复银河星桥",
    align: "bottom",
    face: { x: 27.9, y: 25.1, size: 7.5, rotate: -2 },
  },
  {
    chapter: "第八章",
    title: "星灯重新亮起",
    text: "他们沿着新生的星桥奔向故乡。脚步每落下一次，星灯镇就亮起一片金色灯火。河面、窗边和每一双等待的眼睛，都重新装满了星光。",
    quote: "看！我们的家认出我们啦！",
    speaker: "糯米",
    image: "/story/09-scene.png",
    alt: "两位小守护者沿星桥跑回重新点亮的故乡",
    align: "left",
    face: { x: 36.4, y: 29.1, size: 7.5, rotate: -3 },
  },
  {
    chapter: "尾声",
    title: "屋顶上的约定",
    text: "月饼还温热，银河已经完整。小云团提着自己的星灯，月兔在大家中间打起了哈欠。他们约好：哪里有人害怕，哪里就会有他们的光。",
    quote: "真正的英雄，是让每一颗心都找到回家的路。",
    image: "/story/10-scene.png",
    alt: "小守护者和朋友们在屋顶分享月饼并仰望银河",
    align: "right",
    face: { x: 34.1, y: 36.1, size: 8.1, rotate: -4 },
  },
];

export function makeDemoStory(name: string, age: number, lesson: string): StoryPage[] {
  return baseStoryPages.map((page, index) => ({
    ...page,
    title: index === 0 ? `${name}的银河星桥` : page.title,
    text:
      index === 0
        ? `${age}岁的${name}来到星灯镇，发现银河星桥少了一块。为了让迷路的星灯回家，${name}和糯米踏上了一场关于${lesson}的星光冒险。`
        : page.text.replaceAll("年糕", name),
    quote:
      index === 0
        ? `这一次，${name}要用${lesson}点亮回家的路。`
        : page.quote?.replaceAll("年糕", name),
    speaker: page.speaker === "年糕" ? name : page.speaker,
  }));
}
