export const product = {
  image:
    'https://phongvu.vn/media/catalog/product/cache/23/small_image/60x60/9df78eab33525d08d6e5fb8d27136e95//1/_/1_45_45.jpg',
  isActive: 1,
  name: 'Máy tính xách tay/ Laptop Lenovo Legion Y530-81FV00SUVN (i7-8750H) (Đen)',
  price: 25000000,
  specialPrice: 22990000,
  pvSku: '1810056',
  url: 'https://phongvu.vn/may-tinh-xach-tay-laptop-lenovo-legion-y530-81fv00suvn-i7-8750h-den.html',
  urlKey: 'may-tinh-xach-tay-laptop-lenovo-legion-y530-81fv00suvn-i7-8750h-den',
  warranty: 12,
  saleInStock: 26,
  totalInStock: 29,
  storeInStock: [
    {
      branchId: 'CH0000',
      quantity: 2,
      storeCode: '000001',
      storeName: 'Kho hàng bán ở NTL của tổng kho HCM',
      storeStatus: 1,
      storeType: 'B',
    },
    {
      branchId: 'CH0000',
      quantity: 0,
      storeCode: '000003',
      storeName: 'Kho hàng bán ở NTL của tổng kho HCM gửi bảo hành',
      storeStatus: 1,
      storeType: 'KHAC',
    },
    {
      branchId: 'CP01',
      quantity: 0,
      storeCode: '0101',
      storeName: 'Kho hàng bán vi tính  264',
      storeStatus: 1,
      storeType: 'B',
    },
    {
      branchId: 'CP02',
      quantity: 0,
      storeCode: '0201',
      storeName: 'Kho hàng bán Bình Dương',
      storeStatus: 1,
      storeType: 'B',
    },
    {
      branchId: 'CP04',
      quantity: 2,
      storeCode: '0401',
      storeName: 'Kho hàng bán Tân Bình',
      storeStatus: 1,
      storeType: 'B',
    },
    {
      branchId: 'CP06',
      quantity: 1,
      storeCode: '0601',
      storeName: 'Kho hàng bán Q9',
      storeStatus: 1,
      storeType: 'B',
    },
    {
      branchId: 'CP09',
      quantity: 1,
      storeCode: '0901',
      storeName: 'Kho hàng bán Hà Nội (số 1 Thái Hà)',
      storeStatus: 1,
      storeType: 'B',
    },
    {
      branchId: 'CH1001',
      quantity: 0,
      storeCode: '100101',
      storeName: 'Kho hàng bán ở Nguyễn Văn Linh - Đà Nẵng',
      storeStatus: 1,
      storeType: 'B',
    },
    {
      branchId: 'CH1001',
      quantity: 1,
      storeCode: '100104',
      storeName: 'Kho hàng bán ở NVL - Đà Nẵng  chuyển ra t. bày',
      storeStatus: 1,
      storeType: 'B',
    },
    {
      branchId: 'CP18',
      quantity: 0,
      storeCode: '1801',
      storeName: 'Kho hàng bán Đồng Tháp (Kho kiểm hàng)',
      storeStatus: 1,
      storeType: 'B',
    },
    {
      branchId: 'CP18',
      quantity: 0,
      storeCode: '1803',
      storeName: 'Kho hàng bán Đồng Tháp gửi bảo hành (Kho kiểm hà',
      storeStatus: 1,
      storeType: 'K',
    },
    {
      branchId: 'CP18',
      quantity: 1,
      storeCode: '1804',
      storeName: 'Kho hàng bán Đồng Tháp chuyển tr bày (Kho kiểm h',
      storeStatus: 1,
      storeType: 'B',
    },
  ],
};

export const products = [...Array(14).keys()].map((item) => product);

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
      avatarUrl:
        'https://scontent.fhan7-1.fna.fbcdn.net/v/t1.0-9/p960x960/86380066_115114113398980_4003637134576582656_o.jpg?_nc_cat=110&_nc_sid=09cbfe&_nc_ohc=MwcCsfuWhCoAX_tjEHX&_nc_ht=scontent.fhan7-1.fna&_nc_tp=6&oh=cfd186bbbf2b872e894b0d10baf0525e&oe=5EC6F77E',
      facebookUrl: 'https://www.facebook.com/Doanh-Nghi%E1%BB%87p-Gi%C3%A0u-111264767117248',
    },
    missCount: 12,
  },
  {
    id: 3,
    type: 'messenger',
    uniqueKey: '1779447358956308',
    title: 'Phong Vũ',
    additionData: {
      avatarUrl:
        'https://scontent.fhan3-2.fna.fbcdn.net/v/t1.0-9/42160681_2223383707896002_6654138938443169792_n.jpg?_nc_cat=103&_nc_ht=scontent.fhan3-2.fna&oh=7e288e481fe47856e91ef4fecef8e359&oe=5C7D0C35',
    },
    missCount: 999,
  },
  {
    id: 4,
    type: 'messenger',
    uniqueKey: 'empty',
    title: 'Teko Channel',
  },
];

export const tags = [
  { id: 1, content: 'Build PC', color: '#f50' },
  { id: 2, content: 'Khiếu nại', color: '#2db7f5' },
  { id: 3, content: 'Bàn phím', color: '#87d068' },
  { id: 4, content: 'Màn hình', color: '#108ee9' },
  { id: 5, content: 'Card', color: '#f9530b' },
  { id: 6, content: 'Chuột', color: '#f9530b' },
  { id: 7, content: 'Loa', color: '#f9530b' },
  { id: 8, content: 'Tai nghe', color: '#f9530b' },
  { id: 9, content: 'Lót chuột', color: '#f9530b' },
  { id: 10, content: 'Khuyến mãi', color: '#f9530b' },
  { id: 11, content: 'Giảm giá', color: '#f9530b' },
];

export const filterTags = [...Array(4).keys()].map((item) => tags[item]);

export const customer = {
  id: 1,
  channelId: 1,
  uniqueKey: '1733419256704086',
  name: 'Hải Nam',
  additionData: {
    avatarUrl:
      'https://scontent.fhan2-3.fna.fbcdn.net/v/t1.0-1/p160x160/31543354_1718155341606200_4326898903939000265_n.jpg?_nc_cat=109&_nc_ht=scontent.fhan2-3.fna&oh=0f533f5d352b0019a6d0a6b21bb1f70a&oe=5C888934',
  },
  tags: filterTags,
  notes: [
    {
      id: 1,
      content: 'Note đầu tiên',
      creator: {
        name: 'Nguyễn Đức Thuần',
      },
      createdAt: '2018-11-19 14:23:03',
    },
    {
      id: 2,

      content: 'Note thứ hai',
      creator: {
        name: 'Nguyễn Đức Thuần',
      },
      createdAt: '2018-11-19 14:23:03',
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
  title: 'Hải Nam',
  status: 'processing',
  lastMessage: {
    mid: '4Qk-l3X8TG2wM_-AkAw',
    content: 'Xin chào thế giới',
    isVerified: true,
    customer,
  },
  missCount: null,
  missTime: null,
  additionData: {
    avatarUrl:
      'https://scontent.fhan2-3.fna.fbcdn.net/v/t1.0-1/p160x160/31543354_1718155341606200_4326898903939000265_n.jpg?_nc_cat=109&_nc_ht=scontent.fhan2-3.fna&oh=0f533f5d352b0019a6d0a6b21bb1f70a&oe=5C888934',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tincidunt dictum nisl et rutrum. Nullam placerat, tellus eget lacinia dapibus, ex augue egestas lacus, nec convallis enim lacus eget ligula. In ut est tempor, scelerisque velit at, ornare nunc. Aliquam hendrerit sagittis dapibus. Praesent neque velit, imperdiet nec elementum quis, lacinia non ex. Ut elementum eu lorem commodo tempus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce in dictum mi, eu eleifend neque. Nulla facilisi. Etiam pellentesque placerat velit, in gravida augue. Nullam volutpat sollicitudin lectus, laoreet scelerisque libero consequat eget. Interdum et malesuada fames ac ante ipsum primis in faucibus.',
  },
  createdAt: '2018-11-01 13:00:00',
  updatedAt: '2018-11-01 13:00:00',
};

export const threads = [...Array(20).keys()].map((item) => ({
  ...thread,
  id: item,
  missCount: item % 2,
  missTime: item % 2 > 0 ? '2018-11-01 00:00:00' : null,
}));

export const quickReplies = [
  { id: 1, content: 'Hello bạn' },
  { id: 2, content: 'Hello bạn 2' },
  { id: 3, content: 'Kết thúc trò truyện' },
];

export const user = {
  id: 7,
  name: 'Trần Thị Thùy Linh',
  email: 'linh.ttt@teko.vn',
  avatarUrl:
    'https://scontent.fhan3-3.fna.fbcdn.net/v/t1.0-1/c24.34.160.160/p200x200/39748370_1628852620553654_3694270288058384384_n.jpg?_nc_cat=100&_nc_eui2=AeGJdMmbLcJipteOAAcc64CFWKz6Z2nCRIRkIb66LzHfNnkeFyiHcbirI_k-mPl8qAZu-WKb1O0CpaIxmOpetARBvcpM67ce9Kh14o4F-eDujQ&_nc_ht=scontent.fhan3-3.fna&oh=d6a325ab5559abe37659a4672100d382&oe=5C73F921',
};

export const roles = [
  { id: 1, key: 'mnaintainer', name: 'Maintainer', color: '#6EC3C9' },
  { id: 2, key: 'Channel Owner', name: 'Channel Owner', color: '#7388C1' },
  {
    id: 3,
    key: 'Read All Channel',
    name: 'Read All Channel',
    color: '#FF9A00',
  },
  { id: 4, key: 'Change Role', name: 'Change Role', color: '#12b1ff' },
];

export const usersRole = [...Array(200).keys()].map((index) => {
  return {
    ...user,
    id: index + 1,
    roles,
  };
});

export const users = [user, { id: 2, name: 'Nguyễn Quang Trung' }, { id: 3, name: 'Nguyễn Đức Thuần' }];

const images = [
  {
    type: 'image',
    payload: {
      url:
        'https://scontent.fhan2-3.fna.fbcdn.net/v/t1.0-9/20228960_304522476676430_8830631724684947306_n.png?_nc_cat=109&_nc_oc=AQlzWglkVmI47dC69Z6zcIhf88eIsTR_mDnpZhs1NhChM3CIO5RXqqmoGrjMS7_UvTQ&_nc_ht=scontent.fhan2-3.fna&oh=1113b06e36984da5afef0e1a56504fd0&oe=5CC003E3',
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
        'https://video.fhan2-2.fna.fbcdn.net/v/t42.9040-2/10000000_315615409053435_4162200884693958656_n.mp4?_nc_cat=111&efg=eyJ2ZW5jb2RlX3RhZyI6ImRhc2hfdjRfaHE1X2ZyYWdfMl92aWRlbyJ9&_nc_oc=AQmtOQhZJuOTNDYlML_X5MkXxwlkoWoWv1jP9-0YcbpQtKsZoJRJD1LgeaEh2vqX4ZE&_nc_ht=video.fhan2-2.fna&oh=45e7fb7edf78986af7c379f3402a6174&oe=5C50374D',
    },
  },
];

const templates = [
  {
    type: 'template',
    payload: {
      template_type: 'generic',
      sharable: false,
      elements: [
        {
          title: 'Máy tính xách tay/ Laptop MSI GL63 8RC-436VN (i7-8750H)',
          item_url: 'https://phongvu.vn/may-tinh-xach-tay-laptop-msi-gl63-8rc-436vn-i7-8750h.html',
          image_url:
            'https://img1.phongvu.vn/media/catalog/product/cache/23/small_image/300x300/9df78eab33525d08d6e5fb8d27136e95/m/s/msi-gl63-8rc-436vn-1.jpg',
          subtitle: 'Giá: 2̶5̶4̶9̶0̶0̶0̶0̶\nGiá KM: 24490000\nXem thêm ưu đãi trong link chi tiết',
          buttons: [
            {
              type: 'postback',
              title: 'Đặt hàng online',
              payload: '{"type":"bot","value":"Onl_Order_1806288"}',
            },
            {
              type: 'postback',
              title: 'Xem store còn hàng',
              payload: '{"type":"bot","value":"Check_Stock_1806288"}',
            },
          ],
          default_action: {
            type: 'web_url',
            url: 'https://phongvu.vn/may-tinh-xach-tay-laptop-msi-gl63-8rc-436vn-i7-8750h.html',
            webview_height_ratio: 'tall',
          },
        },
        {
          title: 'Máy tính xách tay/ Laptop MSI GP63 8RD-434VN (i7-8750H)',
          item_url: 'https://phongvu.vn/may-tinh-xach-tay-laptop-msi-gp63-8rd-434vn-i7-8750h.html',
          image_url:
            'https://img1.phongvu.vn/media/catalog/product/cache/23/small_image/300x300/9df78eab33525d08d6e5fb8d27136e95/m/s/msi-gp63-8rd-434vn-1.jpg',
          subtitle: 'Giá: 3̶1̶4̶9̶0̶0̶0̶0̶\nGiá KM: 29490000\nXem thêm ưu đãi trong link chi tiết',
          buttons: [
            {
              type: 'postback',
              title: 'Đặt hàng online',
              payload: '{"type":"bot","value":"Onl_Order_1807423"}',
            },
            {
              type: 'postback',
              title: 'Xem store còn hàng',
              payload: '{"type":"bot","value":"Check_Stock_1807423"}',
            },
          ],
          default_action: {
            type: 'web_url',
            url: 'https://phongvu.vn/may-tinh-xach-tay-laptop-msi-gp63-8rd-434vn-i7-8750h.html',
            webview_height_ratio: 'tall',
          },
        },
        {
          title: 'Máy tính xách tay/ Laptop MSI GP63 8RE-411VN (i7-8750H)',
          item_url: 'https://phongvu.vn/may-tinh-xach-tay-laptop-msi-gp63-8re-411vn-i7-8750h.html',
          image_url:
            'https://img1.phongvu.vn/media/catalog/product/cache/23/small_image/300x300/9df78eab33525d08d6e5fb8d27136e95/m/s/msi-gp63-8re-411vn-0.jpg',
          subtitle: 'Giá: 3̶6̶9̶9̶0̶0̶0̶0̶\nGiá KM: 35990000\nXem thêm ưu đãi trong link chi tiết',
          buttons: [
            {
              type: 'postback',
              title: 'Đặt hàng online',
              payload: '{"type":"bot","value":"Onl_Order_1807484"}',
            },
            {
              type: 'postback',
              title: 'Xem store còn hàng',
              payload: '{"type":"bot","value":"Check_Stock_1807484"}',
            },
          ],
          default_action: {
            type: 'web_url',
            url: 'https://phongvu.vn/may-tinh-xach-tay-laptop-msi-gp63-8re-411vn-i7-8750h.html',
            webview_height_ratio: 'tall',
          },
        },
        {
          title: 'Không phải sản phẩm cần tìm',
          item_url: 'https://phongvu.vn/',
          image_url: 'https://phongvu.vn/landing/wp-content/uploads/2018/01/Logo-01.png',
          buttons: [
            {
              type: 'postback',
              title: 'Tìm sản phẩm',
              payload: '{"type":"bot","value":"Menu_Search_Product"}',
            },
            {
              type: 'postback',
              title: 'Quay về Menu',
              payload: '{"type":"bot","value":"Menu"}',
            },
            {
              type: 'postback',
              title: 'Gặp tư vấn viên',
              payload: '{"type":"bot","value":"Menu_Chat_CS"}',
            },
          ],
          default_action: {
            type: 'web_url',
            url: 'https://phongvu.vn/',
            webview_height_ratio: 'tall',
          },
        },
        {
          title: 'Máy tính xách tay/ Laptop MSI GF63 8RD-242VN (I5-8300H) (Đen)',
          item_url: 'https://phongvu.vn/may-tinh-xach-tay-laptop-msi-gf63-8rd-242vn-i5-8300h-den.html',
          image_url:
            'https://img1.phongvu.vn/media/catalog/product/cache/23/small_image/300x300/9df78eab33525d08d6e5fb8d27136e95/1/_/1_39_12.jpg',
          subtitle: 'Giá: 23490000\nXem thêm ưu đãi trong link chi tiết',
          buttons: [
            {
              type: 'postback',
              title: 'Đặt hàng online',
              payload: '{"type":"bot","value":"Onl_Order_1809175"}',
            },
            {
              type: 'postback',
              title: 'Xem store còn hàng',
              payload: '{"type":"bot","value":"Check_Stock_1809175"}',
            },
          ],
          default_action: {
            type: 'web_url',
            url: 'https://phongvu.vn/may-tinh-xach-tay-laptop-msi-gf63-8rd-242vn-i5-8300h-den.html',
            webview_height_ratio: 'tall',
          },
        },
        {
          title: 'Máy tính xách tay/ Laptop MSI GL73 8RC-230VN (i7-8750H)',
          item_url: 'https://phongvu.vn/may-tinh-xach-tay-laptop-msi-gl73-8rc-230vn-i7-8750h.html',
          image_url:
            'https://img1.phongvu.vn/media/catalog/product/cache/23/small_image/300x300/9df78eab33525d08d6e5fb8d27136e95/m/s/msi-gl73-8rc-230vn-1.jpg',
          subtitle: 'Giá: 2̶5̶9̶9̶0̶0̶0̶0̶\nGiá KM: 24690000\nXem thêm ưu đãi trong link chi tiết',
          buttons: [
            {
              type: 'postback',
              title: 'Đặt hàng online',
              payload: '{"type":"bot","value":"Onl_Order_1806289"}',
            },
            {
              type: 'postback',
              title: 'Xem store còn hàng',
              payload: '{"type":"bot","value":"Check_Stock_1806289"}',
            },
          ],
          default_action: {
            type: 'web_url',
            url: 'https://phongvu.vn/may-tinh-xach-tay-laptop-msi-gl73-8rc-230vn-i7-8750h.html',
            webview_height_ratio: 'tall',
          },
        },
      ],
    },
  },
];
export const attachments = [...images, ...videos, ...files, ...audios, ...templates];

export const message = {
  mid: '4Qk-l3X8TG2wM_VAFBByS7f3m3EggmMJ5P1xxyGP7X_SB5RzKqJMNtfsiKbv8u6MXPgzb7A-LA53RYXtl-AkAw',
  threadId: 1,
  customer,
  user,
  parentId: null,
  additionData: null,
  content: 'Hello world',
  isVerified: false,
  msgCreatedAt: '2018-11-07 15:50:00',
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

export const DEFAULT_IMAGES = [
  {
    id: '1470619549108-b85c56fe5be8',
    caption: 'Photo by Alan Emery',
    orientation: 'square',
    useForDemo: true,
  }, // https://unsplash.com/photos/SYzUF6XcWBY (Flamingo)
  {
    id: '1471079502516-250c19af6928',
    caption: 'Photo by Jeremy Bishop',
    orientation: 'landscape',
    useForDemo: true,
  }, // https://unsplash.com/photos/GIpGxe2_cT4 (Turtle)
  {
    id: '1454023492550-5696f8ff10e1',
    caption: 'Photo by Jessica Weiller',
    orientation: 'landscape',
    useForDemo: true,
  }, // https://unsplash.com/photos/LmVSKeDy6EA (Tiger)
  {
    id: '1470854989922-5be2f7456d78',
    caption: 'Photo by Piotr Łaskawski',
    orientation: 'landscape',
    useForDemo: true,
  }, // https://unsplash.com/photos/GXMr7BadXQo (Hedgehog)
  {
    id: '1470317596697-cbdeda56f999',
    caption: 'Photo by Michel Bosma',
    orientation: 'landscape',
    useForDemo: true,
  }, // https://unsplash.com/photos/XgF9e93Tkt0 (Ladybug)
];

export const invitationLink =
  'http://127.0.0.1:3000/api/invitation-link?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlSWRzIjpbMl0sImNoYW5uZWxJZCI6IjEiLCJpYXQiOjE1NDc3MDAzOTAsImV4cCI6MTU0NzcwMDM5MH0.TX1OJPbODJWG7vTWDsdNO0UZsTw3FJFKg3XjxXIo3J4';
