/* ============================================================
   НАСТРОЙКИ — здесь Алеся меняет контакты и ссылки на проекты.
   Пустая строка '' — ссылка просто не покажется на сайте.
   У каждого проекта есть блок en: { ... } — это английская версия.
   ============================================================ */
const CONFIG = {
  github:   '',          // например 'https://github.com/username'
  telegram: 'alessstis',  // ник в Telegram без @
  phone:    '+79995288988',
  email:    '',          // например 'alesya@mail.ru'

  // Технологии — впишите свой стек (одинаковый для обоих языков)
  stack: ['HTML', 'CSS', 'JavaScript', 'Python', 'Node.js', 'React', 'Django', 'SQL', 'PostgreSQL', 'MongoDB', 'Git', 'Docker'],

  projects: [
    {
      title: 'CRM для агрегатора заявок',
      role:  'Менеджер проекта',
      desc:  'Единая база для управления заявками, рекламой и бухгалтерией небольшой службы бытового ремонта.',
      url:   'https://docs.google.com/presentation/d/16yZVwII9pjvKSot1GM-i-0wvH7UrpT1DziM3VpMRDdU/edit?usp=sharing',
      en: {
        title: 'CRM for a service request aggregator',
        role:  'Project manager',
        desc:  'A single system for managing requests, advertising and accounting for a small home repair service.'
      }
    },
    {
      title: 'Видеоконференции во внутренней сети',
      role:  'Тимлид',
      desc:  'Разработка высокопроизводительного и удобного сервиса для видеоконференций, сочетающего богатый функционал популярных аналогов с современной технической реализацией.',
      url:   'https://docs.google.com/presentation/d/18D_ciZPjcyScoSYJiglOrLQ3TXoHy8blSz_BJmtouOo/edit?usp=sharing',
      en: {
        title: 'Video conferencing on an internal network',
        role:  'Team lead',
        desc:  'A fast, easy-to-use video conferencing service that combines the rich features of popular alternatives with a modern technical implementation.'
      }
    },
    {
      title: 'ТГ-бот для путешественников',
      role:  'Фуллстек',
      desc:  'Поступила задача: «Хочу себе в компанию бота, с которым буду отправлять своих клиентов по разным городам России». ' +
             'Остальное — наша задача: от идеи до реализации.',
      url:   'https://docs.google.com/presentation/d/1aFZ9oMPxnuX5VPzGbtBziPQZmrQBNlvrpITH5WyXnWc/edit?usp=sharing',
      en: {
        title: 'Telegram bot for travelers',
        role:  'Full-stack',
        desc:  'The brief: “I want a bot for my company to send my clients on trips to different cities across Russia.” ' +
               'Everything else was on us — from idea to launch.'
      }
    },
  ],

  // Сертификаты — показываются во вкладке «Сертификаты» у маркетолога.
  // Чтобы добавить новый: положите картинку в img/certificates/ и скопируйте блок { ... }.
  certificates: [
    {
      img:   'img/certificates/netology-product-marketing.jpg',
      title: '«Продуктовый маркетинг: как создать продукт, который хотят купить»',
      org:   'Нетология',
      year:  '2026',
      en: {
        title: 'Product Marketing: How to Build a Product People Want to Buy',
        org:   'Netology'
      }
    },
    {
      img:   'img/certificates/hp-life-selling-online.jpg',
      title: 'Selling Online — продажи в интернете: стратегии онлайн-продаж и маркетинга, карточки товаров, клиентский сервис',
      org:   'HP LIFE, HP Foundation',
      year:  '2026',
      en: {
        title: 'Selling Online: online sales and marketing strategies, product listings, customer service',
        org:   'HP LIFE, HP Foundation'
      }
    },
  ]
};
