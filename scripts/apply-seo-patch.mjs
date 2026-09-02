// Apply Krakus Mound SEO/entity/content patch to the five locale JSON files.
// Only adds keys or updates targeted values — never removes existing content.
import { readFileSync, writeFileSync } from 'node:fs';

const PB_EMBED =
  'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d18231.640029756818!2d19.9481142!3d50.0380942!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47165b5116eb7d0f%3A0x76735d35fb48c49b!2z5YWL5ouJ5bqr5pav5LiY!5e1!3m2!1szh-CN!2s!4v1788336053275!5m2!1szh-CN!2s';

const POLAND_TRAVEL = 'https://www.poland.travel/en';

const REVIEW_COUNT = '11,297';

const PATCH = {
  zh: {
    meta: {
      title: '克拉庫斯丘（克拉科夫 Kraków）・Krakus Mound 访客指南与位置',
      description:
        '探索克拉科夫（Kraków）克拉庫斯丘（Krakus Mound / Kopiec Krakusa）完整指南：全天免费开放的史前墓冢与观景高地，含地图位置、交通路线、开放时间与周边地标。',
    },
    hero: {
      title: '克拉庫斯丘（克拉科夫）',
      subtitle: '克拉科夫史前神秘古冢・全景观景高地与文化遗址',
      imgAlt: '克拉庫斯丘 – 波兰克拉科夫史前墓冢与观景高地',
      reviewCount: REVIEW_COUNT,
      hours: '全年全天免费开放',
      openMaps: '查看位置',
    },
    basicInfo: {
      googleRatingValue: '4.8 (11,297)',
    },
    intro: {
      description_append:
        ' 探访克拉庫斯丘时，还可顺路探索周边地标——同属波德古热区的万达丘（Kopiec Wandy）与奥斯卡·辛德勒搪瓷厂博物馆，让行程更加完整。',
    },
    mapSection: {
      embedUrl: PB_EMBED,
      authorityLabel: '官方旅游信息：',
      authorityText: '波兰国家旅游局 Poland Travel',
      authorityUrl: POLAND_TRAVEL,
    },
    header: { faq: '常见问题' },
    footer: {
      photoCredit: '本网站所展示的所有图片，其产权及版权均归原摄影者所有。',
    },
    privacy: { lastUpdated: '最后更新：2026年9月2日' },
    terms: { lastUpdated: '最后更新：2026年9月2日' },
    faq: {
      title: '常见问题',
      intro: '关于克拉庫斯丘的常见疑问，快速了解位置、门票与游览信息。',
      items: [
        {
          q: '克拉庫斯丘在哪里？',
          a: '克拉庫斯丘位于克拉科夫（Kraków）波德古热区（Podgórze）的小丘上，邮编 30-543，属波兰小波兰省，距老城中心约 3 公里，是克拉科夫最重要的史前遗址之一。',
        },
        {
          q: '参观克拉庫斯丘需要门票吗？',
          a: '不需要。克拉庫斯丘是免费开放的公共古迹，户外园区全年 24 小时可进入。',
        },
        {
          q: '怎样前往克拉庫斯丘？',
          a: '从克拉科夫老城可步行约 30–40 分钟，也可乘电车或公交至波德古热（Podgórze）一带再步行上山；自驾可在周边道路停车后沿步行道登顶。',
        },
        {
          q: '克拉庫斯丘顶上能看到什么？',
          a: '登上丘顶可 360° 俯瞰克拉科夫全景：瓦维尔城堡、老城天际线、维斯瓦河与远处群山，是摄影与观赏日落的绝佳地点。',
        },
        {
          q: '克拉庫斯丘是何时、为何而建的？',
          a: '据考古研究，克拉庫斯丘约建于公元 6–10 世纪，确切用途尚无定论——传统认为它是传说中克拉科夫建城者克拉库斯王（Krak）之墓，也有人推测与部落仪式或天文观测有关。',
        },
        {
          q: '克拉庫斯丘夜晚可以参观吗？',
          a: '可以。遗址区域全天候开放，不过夜间照明有限，建议携带手电并留意脚下；若想欣赏日落与城市灯火，黄昏时分到达最为理想。',
        },
        {
          q: '克拉庫斯丘附近还有哪些值得一看的地方？',
          a: '周边有传说中万达丘（Kopiec Wandy）、波德古热主市场（Rynek Podgórski）、圣本笃教堂与奥斯卡·辛德勒搪瓷厂博物馆等，可与克拉庫斯丘串联成一日行程。',
        },
      ],
    },
    sources: {
      title: '资料来源与参考',
      intro: '以下官方与权威来源用于核实本页信息，出行前可前往获取最新动态。',
      items: [
        {
          name: '波兰旅游局 Poland Travel',
          url: POLAND_TRAVEL,
          desc: '波兰国家官方旅游门户，提供全国景点、活动与实用旅行资讯。',
        },
        {
          name: '克拉科夫旅游 Visit Kraków',
          url: 'https://visitkrakow.com/',
          desc: '克拉科夫官方旅游机构网站，涵盖景点、交通与活动信息。',
        },
        {
          name: '克拉科夫市政府',
          url: 'https://www.krakow.pl/',
          desc: '克拉科夫市官方网站，可查询古迹保护与城市信息。',
        },
        {
          name: '维基百科：Kopiec Krakusa',
          url: 'https://en.wikipedia.org/wiki/Krakus_Mound',
          desc: 'Krakus Mound 词条，含考古研究、历史与传说背景。',
        },
      ],
      photoCredit:
        '本网站所展示的所有图片，其产权及版权均归原摄影者所有；文字内容为独立整理，如与官方信息不一致，以官方为准。',
    },
  },

  en: {
    meta: {
      title: 'Krakus Mound (Kraków) – Visitor Guide & Location',
      description:
        'Discover Krakus Mound (Kopiec Krakusa), the prehistoric burial mound and panoramic viewpoint in Kraków, Lesser Poland Voivodeship. Free 24/7; map, opening hours, transport and travel tips.',
    },
    hero: {
      title: 'Krakus Mound (Kraków)',
      subtitle: 'Kraków Prehistoric Burial Mound・Panoramic Viewpoint & Cultural Heritage',
      imgAlt: 'Krakus Mound – prehistoric burial mound in Kraków, Poland',
      reviewCount: REVIEW_COUNT,
    },
    basicInfo: {
      googleRatingValue: '4.8 (11,297)',
    },
    intro: {
      description_append:
        ' When visiting Krakus Mound, you can easily explore surrounding landmarks and points of interest, including the legendary Wanda Mound (Kopiec Wandy) and Oskar Schindler’s Enamel Factory, both in the same Podgórze district.',
    },
    mapSection: {
      embedUrl: PB_EMBED,
      authorityLabel: 'Official tourism information:',
      authorityText: 'Poland Travel (poland.travel)',
      authorityUrl: POLAND_TRAVEL,
    },
    header: { faq: 'FAQ' },
    footer: {
      photoCredit: 'All photos displayed on this website remain the property of their original photographers.',
    },
    privacy: { lastUpdated: 'Last updated: September 2, 2026' },
    terms: { lastUpdated: 'Last updated: September 2, 2026' },
    faq: {
      title: 'FAQ',
      intro: 'Quick answers about location, admission and what to expect at Krakus Mound.',
      items: [
        {
          q: 'Where is Krakus Mound located?',
          a: 'Krakus Mound stands on a hill in the Podgórze district of Kraków (postal code 30-543), in Lesser Poland Voivodeship, Poland — about 3 km south of the Old Town.',
        },
        {
          q: 'Is Krakus Mound free to visit?',
          a: 'Yes, the mound is a public archaeological monument and admission is free; the site is open 24 hours a day all year round.',
        },
        {
          q: 'How do I get to Krakus Mound?',
          a: 'From Kraków’s Old Town you can walk in about 30–40 minutes, or take a tram or bus towards Podgórze and continue on foot uphill; if driving, park nearby and follow the walking path to the summit.',
        },
        {
          q: 'What can I see from the top of Krakus Mound?',
          a: 'From the summit you get a 360° panorama of Kraków — Wawel Castle, the Old Town skyline, the Vistula River and distant hills — an excellent spot for photography and sunsets.',
        },
        {
          q: 'When and why was Krakus Mound built?',
          a: 'Archaeological research dates the mound to roughly the 6th–10th centuries AD; its purpose is debated — tradition holds it is the grave of Krakus, legendary founder of Kraków, though ritual and astronomical uses have also been proposed.',
        },
        {
          q: 'Can I visit Krakus Mound at night?',
          a: 'Yes, the area is accessible around the clock, but lighting is limited at night, so bring a torch and watch your step; dusk is the best time to enjoy the sunset and city lights.',
        },
        {
          q: 'What else is worth visiting near Krakus Mound?',
          a: 'Nearby sights include Wanda Mound (Kopiec Wandy), Podgórze Market Square, St Benedict’s Church and Oskar Schindler’s Enamel Factory — easy to combine into one day.',
        },
      ],
    },
    sources: {
      title: 'Sources & References',
      intro: 'The following official and authoritative sources were used to verify the information on this page.',
      items: [
        {
          name: 'Poland Travel',
          url: POLAND_TRAVEL,
          desc: 'Official portal of the Polish National Tourism Organization.',
        },
        {
          name: 'Visit Kraków',
          url: 'https://visitkrakow.com/',
          desc: 'Official tourist information website of the city of Kraków.',
        },
        {
          name: 'City of Kraków',
          url: 'https://www.krakow.pl/',
          desc: 'Official website of the Municipality of Kraków (monument protection and city information).',
        },
        {
          name: 'Wikipedia – Krakus Mound',
          url: 'https://en.wikipedia.org/wiki/Krakus_Mound',
          desc: 'Overview of the archaeology, history and legends of Krakus Mound.',
        },
      ],
      photoCredit:
        'All photos displayed on this website remain the property of their original photographers. The text is independently compiled; in case of discrepancies, official sources prevail.',
    },
  },

  pl: {
    meta: {
      title: 'Kopiec Krakusa (Kraków) – Przewodnik i Lokalizacja',
      description:
        'Poznaj Kopiec Krakusa, legendarny prehistoryczny kopiec i punkt widokowy w Krakowie (województwo małopolskie). Dostępny za darmo 24/7: mapa, godziny otwarcia, dojazd i wskazówki.',
    },
    hero: {
      title: 'Kopiec Krakusa (Kraków)',
      subtitle: 'Prehistoryczny kopiec Krakowa・Punkt widokowy i dziedzictwo kulturowe',
      imgAlt: 'Kopiec Krakusa – prehistoryczny kopiec w Krakowie, widok',
      reviewCount: REVIEW_COUNT,
      hours: 'Otwarte 24/7, cały rok',
      openMaps: 'Zobacz na mapie',
    },
    basicInfo: {
      title: 'Podstawowe informacje',
      officialName: 'Oficjalna nazwa',
      type: 'Rodzaj atrakcji',
      country: 'Kraj',
      city: 'Miasto',
      googleRating: 'Ocena Google',
      address: 'Adres',
      plusCode: 'Plus Code',
      officialNameValue: 'Kopiec Krakusa',
      typeValue: 'Historyczny zabytek',
      countryValue: 'Polska',
      cityValue: 'Kraków',
      googleRatingValue: '4.8 (11,297)',
      addressValue: '30-543 Kraków, Polska',
      plusCodeValue: '2XQ5+69 Kraków, Polska',
    },
    intro: {
      description_append:
        ' Podczas wizyty na Kopcu Krakusa warto zwiedzić także okoliczne zabytki – legendarnego Kopca Wandy oraz Fabrykę Schindlera, oba w dzielnicy Podgórze.',
    },
    mapSection: {
      title: 'Jak dojechać',
      subtitle: '30-543 Kraków, Polska',
      openMaps: 'Zobacz w Google Maps',
      embedUrl: PB_EMBED,
      authorityLabel: 'Oficjalne informacje turystyczne:',
      authorityText: 'Poland Travel',
      authorityUrl: POLAND_TRAVEL,
    },
    header: { faq: 'FAQ' },
    footer: {
      photoCredit: 'Wszystkie zdjęcia prezentowane na tej stronie pozostają własnością ich autorów.',
    },
    privacy: { lastUpdated: 'Ostatnia aktualizacja: 2 września 2026' },
    terms: { lastUpdated: 'Ostatnia aktualizacja: 2 września 2026' },
    faq: {
      title: 'Często zadawane pytania',
      intro: 'Szybkie odpowiedzi o lokalizacji, wstępie i zwiedzaniu Kopca Krakusa.',
      items: [
        {
          q: 'Gdzie znajduje się Kopiec Krakusa?',
          a: 'Kopiec Krakusa wznosi się na wzgórzu w dzielnicy Podgórze w Krakowie (kod pocztowy 30-543), w województwie małopolskim, ok. 3 km na południe od Starego Miasta.',
        },
        {
          q: 'Czy wstęp na Kopiec Krakusa jest płatny?',
          a: 'Nie, kopiec jest publicznym zabytkiem archeologicznym – wstęp jest bezpłatny, a teren jest dostępny całą dobę przez cały rok.',
        },
        {
          q: 'Jak dojechać na Kopiec Krakusa?',
          a: 'Ze Starego Miasta można dojść pieszo w ok. 30–40 minut lub dojechać tramwajem albo autobusem w stronę Podgórza, a stamtąd wejść pieszo pod górę. Samochodem warto zaparkować w pobliżu i udać się ścieżką na szczyt.',
        },
        {
          q: 'Co widać ze szczytu Kopca Krakusa?',
          a: 'Ze szczytu rozpościera się panorama Krakowa – Wawel, panorama Starego Miasta, Wisła i okoliczne wzgórza. To doskonałe miejsce na zdjęcia i podziwianie zachodów słońca.',
        },
        {
          q: 'Kiedy i dlaczego powstał Kopiec Krakusa?',
          a: 'Badania archeologiczne datują kopiec na ok. VI–X wiek n.e.; jego przeznaczenie pozostaje dyskusyjne – według tradycji to grób legendarnego założyciela Krakowa, księcia Kraka.',
        },
        {
          q: 'Czy Kopiec Krakusa można zwiedzać nocą?',
          a: 'Tak, teren jest dostępny całą dobę, ale nocą oświetlenie jest ograniczone – warto zabrać latarkę i uważać na nierówny teren. O zmierzchu można podziwiać zachód słońca i światła miasta.',
        },
        {
          q: 'Co jeszcze warto zobaczyć w pobliżu?',
          a: 'W okolicy znajdują się m.in. Kopiec Wandy, Rynek Podgórski, kościół św. Benedykta oraz Fabryka Schindlera – wszystko można połączyć w jeden dzień zwiedzania.',
        },
      ],
    },
    sources: {
      title: 'Źródła i referencje',
      intro: 'Do weryfikacji informacji na tej stronie wykorzystano następujące oficjalne i wiarygodne źródła.',
      items: [
        {
          name: 'Polska Organizacja Turystyczna – Poland Travel',
          url: POLAND_TRAVEL,
          desc: 'Oficjalny portal polskiej turystyki.',
        },
        {
          name: 'Visit Kraków',
          url: 'https://visitkrakow.com/',
          desc: 'Oficjalna strona informacji turystycznej miasta Krakowa.',
        },
        {
          name: 'Miasto Kraków',
          url: 'https://www.krakow.pl/',
          desc: 'Oficjalna strona Miasta Krakowa (ochrona zabytków i informacje miejskie).',
        },
        {
          name: 'Wikipedia – Kopiec Krakusa',
          url: 'https://en.wikipedia.org/wiki/Krakus_Mound',
          desc: 'Przegląd badań archeologicznych, historii i legend kopca.',
        },
      ],
      photoCredit:
        'Wszystkie zdjęcia prezentowane na tej stronie pozostają własnością ich autorów. Tekst został opracowany niezależnie; w razie rozbieżności obowiązują źródła oficjalne.',
    },
  },

  ru: {
    meta: {
      title: 'Курган Крака (Краков) – Путеводитель и расположение',
      description:
        'Откройте для себя Курган Крака (Kopiec Krakusa) – легендарный доисторический курган и панорамную смотровую площадку в Кракове (Малопольское воеводство). Бесплатно круглосуточно: карта, часы работы, транспорт.',
    },
    hero: {
      title: 'Курган Крака (Краков)',
      subtitle: 'Доисторический курган Кракова・Смотровая площадка и культурное наследие',
      imgAlt: 'Курган Крака – доисторический курган в Кракове, Польша',
      reviewCount: REVIEW_COUNT,
      hours: 'Открыто круглосуточно',
      openMaps: 'Показать на карте',
    },
    basicInfo: {
      title: 'Основная информация',
      officialName: 'Официальное название',
      type: 'Тип достопримечательности',
      country: 'Страна',
      city: 'Город',
      googleRating: 'Рейтинг Google',
      address: 'Адрес',
      plusCode: 'Plus Code',
      officialNameValue: 'Kopiec Krakusa',
      typeValue: 'Исторический памятник',
      countryValue: 'Польша',
      cityValue: 'Краков',
      googleRatingValue: '4.8 (11,297)',
      addressValue: '30-543 Краков, Польша',
      plusCodeValue: '2XQ5+69 Краков, Польша',
    },
    intro: {
      description_append:
        ' Посещая Курган Крака, вы легко осмотрите и другие достопримечательности поблизости – легендарный Курган Ванды и Фабрику Шиндлера, оба в районе Подгуже.',
    },
    mapSection: {
      title: 'Как добраться',
      subtitle: '30-543 Краков, Польша',
      openMaps: 'Открыть в Google Maps',
      embedUrl: PB_EMBED,
      authorityLabel: 'Официальная туристическая информация:',
      authorityText: 'Poland Travel',
      authorityUrl: POLAND_TRAVEL,
    },
    header: { faq: 'FAQ' },
    footer: {
      photoCredit: 'Все фотографии, представленные на этом сайте, принадлежат их авторам.',
    },
    privacy: { lastUpdated: 'Последнее обновление: 2 сентября 2026' },
    terms: { lastUpdated: 'Последнее обновление: 2 сентября 2026' },
    faq: {
      title: 'Часто задаваемые вопросы',
      intro: 'Краткие ответы о расположении, входе и посещении Кургана Крака.',
      items: [
        {
          q: 'Где находится Курган Крака?',
          a: 'Курган Крака расположен на холме в районе Подгуже в Кракове (почтовый индекс 30-543), Малопольское воеводство, Польша — примерно в 3 км к югу от Старого города.',
        },
        {
          q: 'Вход на Курган Крака бесплатный?',
          a: 'Да, курган — общественный археологический памятник, вход свободный; территория открыта круглосуточно весь год.',
        },
        {
          q: 'Как добраться до Кургана Крака?',
          a: 'Из Старого города Кракова можно дойти пешком за 30–40 минут или доехать на трамвае либо автобусе до Подгуже, а затем подняться пешком; на машине оставьте её поблизости и идите по пешеходной тропе на вершину.',
        },
        {
          q: 'Что видно с вершины Кургана Крака?',
          a: 'С вершины открывается круговая панорама Кракова — Вавельский замок, силуэт Старого города, Висла и окрестные холмы; отличное место для фотографий и закатов.',
        },
        {
          q: 'Когда и зачем построили Курган Крака?',
          a: 'По данным археологии курган датируется примерно VI–X веками н. э.; его назначение до сих пор спорно — по преданию это могила легендарного основателя Кракова князя Крака.',
        },
        {
          q: 'Можно ли посещать Курган Крака ночью?',
          a: 'Да, территория доступна круглосуточно, но ночью освещение ограничено — возьмите фонарик и соблюдайте осторожность; в сумерках видны закат и огни города.',
        },
        {
          q: 'Что ещё стоит посмотреть рядом?',
          a: 'Поблизости находятся Курган Ванды, площадь Подгуже, церковь Святого Бенедикта и Фабрика Шиндлера — всё можно объединить в один маршрут.',
        },
      ],
    },
    sources: {
      title: 'Источники и ссылки',
      intro: 'Для проверки информации на этой странице использовались следующие официальные и авторитетные источники.',
      items: [
        {
          name: 'Poland Travel',
          url: POLAND_TRAVEL,
          desc: 'Официальный туристический портал Польши.',
        },
        {
          name: 'Visit Kraków',
          url: 'https://visitkrakow.com/',
          desc: 'Официальный сайт туристической информации Кракова.',
        },
        {
          name: 'Город Краков',
          url: 'https://www.krakow.pl/',
          desc: 'Официальный сайт муниципалитета Кракова.',
        },
        {
          name: 'Википедия – Kopiec Krakusa',
          url: 'https://en.wikipedia.org/wiki/Krakus_Mound',
          desc: 'Обзор археологии, истории и легенд кургана.',
        },
      ],
      photoCredit:
        'Все фотографии, представленные на этом сайте, принадлежат их авторам. Текст подготовлен независимо; при расхождениях приоритет у официальных источников.',
    },
  },

  de: {
    meta: {
      title: 'Krakus-Hügel (Krakau) – Reiseführer & Lage',
      description:
        'Entdecken Sie den Krakus-Hügel (Kopiec Krakusa), den vorgeschichtlichen Grabhügel und Aussichtspunkt in Krakau (Woiwodschaft Kleinpolen). Kostenlos rund um die Uhr: Karte, Öffnungszeiten, Anreise und Tipps.',
    },
    hero: {
      title: 'Krakus-Hügel (Krakau)',
      subtitle: 'Vorgeschichtlicher Grabhügel Krakaus・Aussichtspunkt und Kulturerbe',
      imgAlt: 'Krakus-Hügel – vorgeschichtlicher Grabhügel in Krakau, Polen',
      reviewCount: REVIEW_COUNT,
      hours: 'Rund um die Uhr geöffnet',
      openMaps: 'Auf der Karte ansehen',
    },
    basicInfo: {
      title: 'Grundinformationen',
      officialName: 'Offizieller Name',
      type: 'Art der Sehenswürdigkeit',
      country: 'Land',
      city: 'Stadt',
      googleRating: 'Google-Bewertung',
      address: 'Adresse',
      plusCode: 'Plus Code',
      officialNameValue: 'Kopiec Krakusa',
      typeValue: 'Historisches Wahrzeichen',
      countryValue: 'Polen',
      cityValue: 'Krakau',
      googleRatingValue: '4.8 (11,297)',
      addressValue: '30-543 Krakau, Polen',
      plusCodeValue: '2XQ5+69 Krakau, Polen',
    },
    intro: {
      description_append:
        ' Bei einem Besuch des Krakus-Hügels lassen sich auch die nahe gelegenen Sehenswürdigkeiten erkunden – den sagenhaften Wanda-Hügel (Kopiec Wandy) und die Oskar-Schindler-Fabrik, beide im Stadtteil Podgórze.',
    },
    mapSection: {
      title: 'Anreise & Lage',
      subtitle: '30-543 Krakau, Polen',
      openMaps: 'In Google Maps ansehen',
      embedUrl: PB_EMBED,
      authorityLabel: 'Offizielle Tourismusinformationen:',
      authorityText: 'Poland Travel',
      authorityUrl: POLAND_TRAVEL,
    },
    header: { faq: 'FAQ' },
    footer: {
      photoCredit: 'Alle auf dieser Website gezeigten Fotos verbleiben im Eigentum ihrer Fotografen.',
    },
    privacy: { lastUpdated: 'Zuletzt aktualisiert: 2. September 2026' },
    terms: { lastUpdated: 'Zuletzt aktualisiert: 2. September 2026' },
    faq: {
      title: 'Häufig gestellte Fragen',
      intro: 'Schnelle Antworten zu Lage, Eintritt und Besuch des Krakus-Hügels.',
      items: [
        {
          q: 'Wo liegt der Krakus-Hügel?',
          a: 'Der Krakus-Hügel erhebt sich auf einem Hügel im Stadtteil Podgórze in Krakau (PLZ 30-543), Woiwodschaft Kleinpolen, Polen — etwa 3 km südlich der Altstadt.',
        },
        {
          q: 'Ist der Besuch des Krakus-Hügels kostenlos?',
          a: 'Ja, der Hügel ist ein öffentliches archäologisches Denkmal; der Eintritt ist frei, das Gelände ist ganzjährig rund um die Uhr zugänglich.',
        },
        {
          q: 'Wie kommt man zum Krakus-Hügel?',
          a: 'Von der Krakauer Altstadt erreichen Sie den Hügel zu Fuß in etwa 30–40 Minuten oder mit der Straßenbahn beziehungsweise dem Bus Richtung Podgórze und anschließend zu Fuß bergauf; mit dem Auto parken Sie in der Nähe und folgen dem Wanderweg zum Gipfel.',
        },
        {
          q: 'Was sieht man von der Spitze des Krakus-Hügels?',
          a: 'Vom Gipfel haben Sie ein 360°-Panorama über Krakau – die Wawel-Burg, die Silhouette der Altstadt, die Weichsel und die umliegenden Hügel; ideal für Fotos und Sonnenuntergänge.',
        },
        {
          q: 'Wann und warum wurde der Krakus-Hügel erbaut?',
          a: 'Archäologische Untersuchungen datieren den Hügel auf etwa das 6.–10. Jahrhundert; seine Funktion ist umstritten – der Überlieferung nach ist er das Grab des legendären Stadtgründers Krakus.',
        },
        {
          q: 'Kann man den Krakus-Hügel nachts besuchen?',
          a: 'Ja, das Gelände ist rund um die Uhr zugänglich, aber nachts ist die Beleuchtung begrenzt – nehmen Sie eine Taschenlampe mit und achten Sie auf den Boden; am Abend lohnt sich der Blick auf Sonnenuntergang und Stadtlichter.',
        },
        {
          q: 'Was gibt es in der Nähe noch zu sehen?',
          a: 'In der Nähe liegen der Wanda-Hügel (Kopiec Wandy), der Podgórze-Marktplatz, die St.-Benedikt-Kirche und die Oskar-Schindler-Fabrik – gut für einen Tagesausflug zu kombinieren.',
        },
      ],
    },
    sources: {
      title: 'Quellen & Referenzen',
      intro: 'Zur Überprüfung der Informationen auf dieser Seite wurden folgende offizielle und seriöse Quellen verwendet.',
      items: [
        {
          name: 'Poland Travel',
          url: POLAND_TRAVEL,
          desc: 'Offizielles Tourismusportal Polens.',
        },
        {
          name: 'Visit Kraków',
          url: 'https://visitkrakow.com/',
          desc: 'Offizielle Tourismusinformation der Stadt Krakau.',
        },
        {
          name: 'Stadt Krakau',
          url: 'https://www.krakow.pl/',
          desc: 'Offizielle Website der Stadt Krakau (Denkmalschutz und Stadtinformationen).',
        },
        {
          name: 'Wikipedia – Kopiec Krakusa',
          url: 'https://en.wikipedia.org/wiki/Krakus_Mound',
          desc: 'Übersicht zu Archäologie, Geschichte und Legenden des Hügels.',
        },
      ],
      photoCredit:
        'Alle auf dieser Website gezeigten Fotos verbleiben im Eigentum ihrer Fotografen. Der Text wurde unabhängig erstellt; bei Abweichungen gelten die offiziellen Quellen.',
    },
  },
};

function deepSet(obj, path, value) {
  const keys = path.split('.');
  let cur = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    cur = cur[keys[i]];
  }
  cur[keys[keys.length - 1]] = value;
}

function applyPatch(lang, target) {
  const patch = PATCH[lang];
  if (!patch) throw new Error('No patch for ' + lang);

  for (const key of ['meta', 'hero', 'basicInfo', 'mapSection', 'header', 'footer', 'privacy', 'terms']) {
    if (patch[key]) {
      for (const [k, v] of Object.entries(patch[key])) {
        deepSet(target, `${key}.${k}`, v);
      }
    }
  }

  // intro.description_append → append to existing description
  if (patch.intro && patch.intro.description_append) {
    target.intro.description += patch.intro.description_append;
  }

  // faq & sources are brand-new top-level blocks
  if (patch.faq) target.faq = patch.faq;
  if (patch.sources) target.sources = patch.sources;

  return target;
}

const langs = ['zh', 'en', 'pl', 'ru', 'de'];
for (const lang of langs) {
  const file = `src/messages/${lang}.json`;
  const raw = JSON.parse(readFileSync(file, 'utf8'));
  const next = applyPatch(lang, raw);
  writeFileSync(file, JSON.stringify(next, null, 2) + '\n', 'utf8');
  console.log(`Patched ${lang}.json (${Object.keys(next).length} top-level keys)`);
}
console.log('Done.');
