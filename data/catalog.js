window.AUTOBAN_SITE = {
  business: {
    name: "Автобан-Юг",
    city: "Новороссийск",
    address: "Пионерская улица, 2д, 1 этаж",
    email: "office@avtoban.pro",
    phones: ["+7 (918) 645-90-98", "+7 (918) 375-10-07", "+7 (8617) 62-11-99"],
    whatsapp: "79186459098",
    workHours: [
      { days: "Пн-Пт", time: "09:00-18:00" },
      { days: "Сб-Вс", time: "10:00-15:00" }
    ],
    payments: ["Карта", "Наличные", "Банк", "Перевод", "QR-код"],
    features: ["Доставка", "Розница", "Опт", "Бесплатная парковка", "Доступный вход"]
  },

  heroSlides: [
    {
      title: "Фасад магазина",
      note: "Замените на фото входа: assets/img/hero/storefront.webp",
      image: "assets/img/hero/storefront.webp",
      fallback:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1800&q=82"
    },
    {
      title: "Склад и наличие",
      note: "Замените на фото полок/склада: assets/img/hero/warehouse.webp",
      image: "assets/img/hero/warehouse.webp",
      fallback:
        "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1800&q=82"
    },
    {
      title: "Выдача заказа",
      note: "Замените на фото стойки выдачи: assets/img/hero/counter.webp",
      image: "assets/img/hero/counter.webp",
      fallback:
        "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1800&q=82"
    }
  ],

  flow: [
    {
      title: "1. Клиент пишет VIN",
      text: "Форма на первом экране собирает VIN, марку или название детали и отправляет запрос в WhatsApp."
    },
    {
      title: "2. Менеджер сверяет аналоги",
      text: "В карточке можно указать бренды, сроки, наличие и подсказки для подбора."
    },
    {
      title: "3. Заказ собирается в заявку",
      text: "Покупатель добавляет позиции из каталога, а сайт формирует готовое сообщение."
    },
    {
      title: "4. Выдача или доставка",
      text: "Контакты, график, способы оплаты и карта всегда доступны внизу страницы."
    }
  ],

  services: [
    {
      title: "Запчасти для иномарок",
      text: "Подбор по VIN, оригинальные номера, аналоги и быстрый заказ."
    },
    {
      title: "Масла и автохимия",
      text: "Моторные масла, жидкости, очистители, сезонные расходники."
    },
    {
      title: "Аккумуляторы",
      text: "Подбор по емкости, полярности и размерам под конкретный автомобиль."
    },
    {
      title: "Опт и розница",
      text: "От единичной покупки до регулярных заказов для сервисов и мастеров."
    }
  ],

  photoTemplates: [
    {
      title: "Фото фасада",
      path: "assets/img/hero/storefront.webp",
      caption: "Главный экран, доверие и узнаваемость точки",
      image: "assets/img/hero/storefront.webp",
      fallback:
        "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80"
    },
    {
      title: "Фото склада",
      path: "assets/img/hero/warehouse.webp",
      caption: "Подтверждает наличие и скорость выдачи",
      image: "assets/img/hero/warehouse.webp",
      fallback:
        "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=1200&q=80"
    },
    {
      title: "Фото менеджеров",
      path: "assets/img/team/counter.webp",
      caption: "Добавляет человеческий контакт в блок подбора",
      image: "assets/img/team/counter.webp",
      fallback:
        "https://images.unsplash.com/photo-1625047509168-a7026f36de04?auto=format&fit=crop&w=1200&q=80"
    },
    {
      title: "Фото товара",
      path: "assets/catalog/brakes/brake-kit.webp",
      caption: "Используется в карточках каталога",
      image: "assets/catalog/brakes/brake-kit.webp",
      fallback:
        "https://images.unsplash.com/photo-1632823469850-1b7b1e8b7e1e?auto=format&fit=crop&w=1200&q=80"
    }
  ],

  reviews: [
    {
      name: "Постоянный клиент",
      text: "Покупает запчасти с 2005 года и отмечает быстрый подбор для Mercedes, VW, BMW и Opel."
    },
    {
      name: "Покупатель из отзывов",
      text: "Пишет, что запчасти часто есть в наличии, а под заказ приходят за 1-2 дня."
    },
    {
      name: "Клиент магазина",
      text: "Отмечает нормальные цены, понятную доставку и внимательный подбор менеджера."
    }
  ],

  brands: [
    "Mercedes-Benz",
    "BMW",
    "Volkswagen",
    "Audi",
    "Opel",
    "Toyota",
    "Hyundai",
    "Kia",
    "Renault",
    "Nissan",
    "Skoda",
    "Ford",
    "Chevrolet",
    "Mazda",
    "Lexus",
    "Volvo"
  ],

  products: [
    {
      id: "vin-order",
      title: "Подбор запчастей по VIN",
      category: "Под заказ",
      description: "Для сложных деталей: кузов, двигатель, электрика, оригинальные номера и аналоги.",
      price: "Расчет менеджера",
      stock: "Под заказ",
      delivery: "1-3 дня по популярным позициям",
      tags: ["VIN", "оригинал", "аналоги"],
      brands: ["Mercedes-Benz", "BMW", "Volkswagen", "Audi", "Toyota"],
      priority: 1,
      image: "assets/catalog/vin/vin-order.webp",
      fallback:
        "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: "brake-kit",
      title: "Тормозные диски и колодки",
      category: "Тормозная система",
      description: "Комплекты для обслуживания тормозов: диски, колодки, датчики, жидкости.",
      price: "от 1 900 ₽",
      stock: "Есть позиции в наличии",
      delivery: "самовывоз сегодня",
      tags: ["диски", "колодки", "датчики"],
      brands: ["TRW", "ATE", "BOSCH", "Textar"],
      priority: 2,
      image: "assets/catalog/brakes/brake-kit.webp",
      fallback:
        "https://images.unsplash.com/photo-1632823469850-1b7b1e8b7e1e?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: "oil-service",
      title: "Моторные масла и жидкости",
      category: "Масла и автохимия",
      description: "Масла, антифризы, тормозные жидкости, очистители и сезонная химия.",
      price: "от 650 ₽",
      stock: "В наличии",
      delivery: "самовывоз сегодня",
      tags: ["масло", "антифриз", "автохимия"],
      brands: ["Liqui Moly", "Shell", "Mobil", "Lukoil"],
      priority: 3,
      image: "assets/catalog/oils/motor-oil.webp",
      fallback:
        "https://images.unsplash.com/photo-1605164599901-0c8dd75944aa?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: "filters",
      title: "Фильтры для ТО",
      category: "Расходные материалы",
      description: "Масляные, воздушные, салонные и топливные фильтры для популярных марок.",
      price: "от 450 ₽",
      stock: "Часто в наличии",
      delivery: "день в день или под заказ",
      tags: ["ТО", "фильтр", "расходники"],
      brands: ["MANN", "Mahle", "BOSCH", "Filtron"],
      priority: 4,
      image: "assets/catalog/service/filters.webp",
      fallback:
        "https://images.unsplash.com/photo-1606577924006-27d39b132ae2?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: "suspension",
      title: "Подвеска и ходовая",
      category: "Подвеска и ходовая",
      description: "Амортизаторы, рычаги, сайлентблоки, ступицы и шаровые опоры.",
      price: "по запросу",
      stock: "Наличие зависит от модели",
      delivery: "1-2 дня по складам",
      tags: ["рычаги", "ступицы", "амортизаторы"],
      brands: ["Lemforder", "Sachs", "KYB", "Febi"],
      priority: 5,
      image: "assets/catalog/suspension/suspension.webp",
      fallback:
        "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: "battery",
      title: "Аккумуляторы",
      category: "Электрика",
      description: "Подбор АКБ по размеру, полярности, емкости и пусковому току.",
      price: "от 5 900 ₽",
      stock: "Уточнить наличие",
      delivery: "самовывоз или доставка",
      tags: ["АКБ", "пусковой ток", "электрика"],
      brands: ["Bosch", "Varta", "Mutlu"],
      priority: 6,
      image: "assets/catalog/electric/battery.webp",
      fallback:
        "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: "lights",
      title: "Автооптика",
      category: "Автооптика",
      description: "Фары, фонари, лампы, корректоры и элементы крепления оптики.",
      price: "по запросу",
      stock: "Под заказ",
      delivery: "1-3 дня",
      tags: ["фары", "лампы", "фонари"],
      brands: ["DEPO", "TYC", "Hella", "Valeo"],
      priority: 7,
      image: "assets/catalog/lights/headlights.webp",
      fallback:
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: "engine",
      title: "Детали двигателя",
      category: "Двигатели",
      description: "Свечи, катушки, ремни, ролики, прокладки и элементы навесного оборудования.",
      price: "по запросу",
      stock: "Популярные позиции в наличии",
      delivery: "1-2 дня по складам",
      tags: ["свечи", "ремни", "ролики"],
      brands: ["NGK", "INA", "Gates", "Contitech"],
      priority: 8,
      image: "assets/catalog/engine/engine-parts.webp",
      fallback:
        "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?auto=format&fit=crop&w=900&q=80"
    }
  ]
};
