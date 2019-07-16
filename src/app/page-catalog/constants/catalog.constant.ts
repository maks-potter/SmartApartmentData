export enum SA_CATALOG_TYPES {
  NEW_CONSTRUCTION = 'NEW_CONSTRUCTION',
  MARKET_REPORT    = 'MARKET_REPORT',
}

enum SA_CATALOG_ITEMS_TITLES {
  NEW_CONSTRUCTION = 'New construction',
  MARKET_REPORT    = 'Market report',
}

// TODO: get texts from BE
enum SA_CATALOG_ITEMS_TEXTS {
  NEW_CONSTRUCTION = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has ' +
    'been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type ' +
    'and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into ' +
    'electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of ' +
    'Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus ' +
    'PageMaker including versions of Lorem Ipsum.',

  MARKET_REPORT    = 'It is a long established fact that a reader will be distracted by the readable content of a ' +
    'page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal ' +
    'distribution of letters, as opposed to using \'Content here, content here\', making it look like readable ' +
    'English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, ' +
    'and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have ' +
    'evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
}

enum SA_CATALOG_ITEMS_ICONS {
  NEW_CONSTRUCTION = '#sa-construction-house-icon',
  MARKET_REPORT    = '#sa-market-report',
}

const SA_CATALOG_NEW_CONSTRUCTION_ITEM = {
  id: SA_CATALOG_TYPES.NEW_CONSTRUCTION,
  icon: SA_CATALOG_ITEMS_ICONS.NEW_CONSTRUCTION,
  title: SA_CATALOG_ITEMS_TITLES.NEW_CONSTRUCTION,
  text: SA_CATALOG_ITEMS_TEXTS.NEW_CONSTRUCTION,
};

const SA_CATALOG_MARKET_REPORT_ITEM = {
  id: SA_CATALOG_TYPES.MARKET_REPORT,
  icon: SA_CATALOG_ITEMS_ICONS.MARKET_REPORT,
  title: SA_CATALOG_ITEMS_TITLES.MARKET_REPORT,
  text: SA_CATALOG_ITEMS_TEXTS.MARKET_REPORT,
};

export interface ICatalogItem {
  id: string;
  icon: string;
  title: string;
  text: string;
}

export const SA_CATALOG_ITEMS: ICatalogItem[] = [
  SA_CATALOG_NEW_CONSTRUCTION_ITEM,
  SA_CATALOG_MARKET_REPORT_ITEM,
];
