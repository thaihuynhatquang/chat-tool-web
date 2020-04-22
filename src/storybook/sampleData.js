export const channel = {
  id: 1,
  type: 'messenger',
  uniqueKey: '1524236341229289',
  title: 'SGuet confessions',
  additionData: {
    name: 'SGuet confessions',
    avatarUrl:
      'https://scontent.fhan7-1.fna.fbcdn.net/v/t31.0-8/p960x960/14708071_1698871510432437_7066549912353019610_o.jpg?_nc_cat=108&_nc_sid=09cbfe&_nc_ohc=cYjL4cfY2vMAX8mHxgr&_nc_ht=scontent.fhan7-1.fna&_nc_tp=6&oh=4d6b3c96e95df8cdd608e1501ca85f76&oe=5EC72696',
    facebookUrl: 'https://www.facebook.com/sgcfs',
  },
};

export const channels = [
  channel,
  {
    id: 2,
    type: 'messenger',
    uniqueKey: '111264767117248',
    title: 'Doanh Nghiệp Giàu',
    additionData: {
      name: 'Doanh Nghiệp Giàu',
      avatarUrl:
        'https://scontent.fhan7-1.fna.fbcdn.net/v/t1.0-9/p960x960/86380066_115114113398980_4003637134576582656_o.jpg?_nc_cat=110&_nc_sid=09cbfe&_nc_ohc=MwcCsfuWhCoAX_tjEHX&_nc_ht=scontent.fhan7-1.fna&_nc_tp=6&oh=cfd186bbbf2b872e894b0d10baf0525e&oe=5EC6F77E',
      facebookUrl: 'https://www.facebook.com/Doanh-Nghi%E1%BB%87p-Gi%C3%A0u-111264767117248',
    },
  },
  {
    id: 3,
    type: 'messenger',
    uniqueKey: 'empty',
    title: 'Teko Channel',
  },
];

export const tags = [
  { name: 'buildpc', color: '#2d5757' },
  { name: 'hoitham', color: '#c58df4' },
  { name: 'banphim', color: '#ffa500' },
  { name: 'man hinh', color: '#f9530b' },
  { name: 'card', color: '#f9530b' },
  { name: 'chuot', color: '#f9530b' },
  { name: 'loa', color: '#f9530b' },
  { name: 'tai nghe', color: '#f9530b' },
  { name: 'lot chuot', color: '#f9530b' },
  { name: 'khuyen mai', color: '#f9530b' },
  { name: 'giam gia', color: '#f9530b' },
];

export const customer = {
  id: 1,
  channelId: 1,
  uniqueKey: '2739751926141954',
  name: 'Thái Huy Nhật Quang',
  additionData: {
    avatarUrl:
      'https://scontent.fhan7-1.fna.fbcdn.net/v/t1.0-9/p960x960/89656869_2739751932808620_5657951167108349952_o.jpg?_nc_cat=110&_nc_sid=09cbfe&_nc_ohc=OkpPDsCftNIAX9Vi9Bs&_nc_ht=scontent.fhan7-1.fna&_nc_tp=6&oh=95818f0c5e1578cd4535cb8ff28cf70a&oe=5EC72F96',
  },
  tags: [...Array(4).keys()].map((item) => tags[item]),
  notes: [
    {
      id: 1,
      content: 'Note đầu tiên',
      creator: {
        name: 'Nguyễn Đức Thuần',
      },
      createdAt: '2020-04-19 14:23:03',
    },
    {
      id: 2,

      content: 'Note thứ hai',
      creator: {
        name: 'Nguyễn Đức Thuần',
      },
      createdAt: '2020-04-19 14:23:03',
    },
  ],
};

export const customers = [...Array(5).keys()].map((item) => ({
  ...customer,
  id: item,
}));

export const thread = {
  id: 1,
  channelId: 1,
  uniqueKey: '719821268410677',
  title: 'Thái Huy Nhật Quang',
  status: 'unread',
  lastMsg: {
    mid: '4Qk-l3X8TG2wM_-AkAw',
    content: 'Xin chào thế giới',
    isVerified: true,
    customer,
  },
  missCount: null,
  missTime: null,
  additionData: {
    avatarUrl:
      'https://scontent.fhan7-1.fna.fbcdn.net/v/t1.0-9/p960x960/89656869_2739751932808620_5657951167108349952_o.jpg?_nc_cat=110&_nc_sid=09cbfe&_nc_ohc=OkpPDsCftNIAX9Vi9Bs&_nc_ht=scontent.fhan7-1.fna&_nc_tp=6&oh=95818f0c5e1578cd4535cb8ff28cf70a&oe=5EC72F96',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tincidunt dictum nisl et rutrum. Nullam placerat, tellus eget lacinia dapibus, ex augue egestas lacus, nec convallis enim lacus eget ligula. In ut est tempor, scelerisque velit at, ornare nunc. Aliquam hendrerit sagittis dapibus. Praesent neque velit, imperdiet nec elementum quis, lacinia non ex. Ut elementum eu lorem commodo tempus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce in dictum mi, eu eleifend neque. Nulla facilisi. Etiam pellentesque placerat velit, in gravida augue. Nullam volutpat sollicitudin lectus, laoreet scelerisque libero consequat eget. Interdum et malesuada fames ac ante ipsum primis in faucibus.',
  },
  createdAt: '2020-11-01 13:00:00',
  updatedAt: '2020-11-01 13:00:00',
};

export const threads = [...Array(20).keys()].map((item) => ({
  ...thread,
  id: item,
  missCount: item % 2,
  missTime: item % 2 > 0 ? '2020-11-01 00:00:00' : null,
}));

export const user = {
  id: 7,
  name: 'Trương Hoàng Giang',
  email: 'giangth2310@gmail.com',
  avatarUrl:
    'https://scontent.fhan7-1.fna.fbcdn.net/v/t1.0-9/p960x960/43122170_2183078375037900_7127556299964809216_o.jpg?_nc_cat=111&_nc_sid=174925&_nc_ohc=ALVn9Sg7s44AX8HIBwX&_nc_ht=scontent.fhan7-1.fna&_nc_tp=6&oh=006a36f710059733144da9f33771842e&oe=5EC5F327',
};

export const users = [user, { id: 2, name: 'Lưu Quang Tùng' }, { id: 3, name: 'Lê Quang Hưng' }];

const images = [
  {
    type: 'image',
    payload: {
      url: 'https://image.thanhnien.vn/660/uploaded/congnguyen/2019_09_09/huanhoahong-1_ugww.jpg',
    },
  },
];
const files = [
  {
    type: 'file',
    payload: {
      url:
        'https://cdn.fbsbx.com/v/t59.2708-21/45164750_2121488618165893_3902727659641110528_n.csv/Test_T%E1%BB%89-l%E1%BB%87-KH-review-agent_2018_11_05.csv?_nc_cat=102&_nc_ht=cdn.fbsbx.com&oh=5bd38e7e4f6d9d5ba4c1625e9210d78b&oe=5BE69859',
    },
  },
  {
    type: 'file',
    payload: {
      url:
        'https://cdn.fbsbx.com/v/t59.2708-21/11274302_870622036318448_1328626505_n.pdf/Practical-Vim-Drew-Neil.pdf?_nc_cat=108&_nc_ht=cdn.fbsbx.com&oh=b092107a5da5165788eba3c3fd311caf&oe=5BE5D662',
    },
  },
];
const audios = [
  {
    type: 'audio',
    payload: {
      url:
        'https://cdn.fbsbx.com/v/t59.3654-21/11695442_868802019842444_1820274907_n.mp3/SampleAudio_0.4mb.mp3?_nc_cat=109&_nc_ht=cdn.fbsbx.com&oh=f7b8156bf82a029c8df055cd3d7ab50f&oe=5BE5DE62',
    },
  },
];
const videos = [
  {
    type: 'video',
    payload: {
      url:
        'https://video-ams4-1.xx.fbcdn.net/v/t39.24130-2/93349220_163851278414489_1533592582790720217_n.mp4?_nc_cat=109&_nc_sid=985c63&efg=eyJ2ZW5jb2RlX3RhZyI6Im9lcF9oZCJ9&_nc_ohc=9P0HuYZ-_HMAX8Yf4Wg&_nc_ht=video-ams4-1.xx&oh=06ca974dbf126518b2bf1d90090cfb41&oe=5EC60BFA',
    },
  },
];
export const attachments = [...images, ...videos, ...files, ...audios];

export const message = {
  mid: '4Qk-l3X8TG2wM_VAFBByS7f3m3EggmMJ5P1xxyGP7X_SB5RzKqJMNtfsiKbv8u6MXPgzb7A-LA53RYXtl-AkAw',
  threadId: 1,
  customer,
  user,
  parentId: null,
  additionData: null,
  content: 'Có làm thì mới có ăn',
  isVerified: false,
  msgCreatedAt: '2020-04-07 15:50:00',
};

export const messages = [
  { ...message, mid: 10, isVerified: true },
  { ...message, mid: 9, isVerified: true },
  { ...message, mid: 8 },
  { ...message, mid: 7 },
  { ...message, mid: 6 },
  {
    ...message,
    mid: 5,
    isVerified: true,
  },
  { ...message, mid: 4, isVerified: true },
  { ...message, mid: 3 },
  { ...message, mid: 2 },
  message,
];
