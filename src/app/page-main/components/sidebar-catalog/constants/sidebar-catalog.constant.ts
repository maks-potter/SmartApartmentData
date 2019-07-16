import { SA_PAGE_MAIN_ROUTE_URLS } from '../../../constants/route-urls.constant';

export enum SA_SIDEBAR_CATALOG_TYPES {
  LINK_1 = 'link_1',
  LINK_2 = 'link_2',
  LINK_3 = 'link_3',
}

enum SA_SIDEBAR_CATALOG_LABELS {
  LINK_1 = 'Link 1',
  LINK_2 = 'Link 2',
  LINK_3 = 'Link 3',
}

enum SA_SIDEBAR_CATALOG_ICONS {
  LINK_1 = '#sa-link-icon',
  LINK_2 = '#sa-link-icon',
  LINK_3 = '#sa-link-icon',
}

const SA_SIDEBAR_CATALOG_LINK_1_ITEM = {
  id: SA_SIDEBAR_CATALOG_TYPES.LINK_1,
  label: SA_SIDEBAR_CATALOG_LABELS.LINK_1,
  icon: SA_SIDEBAR_CATALOG_ICONS.LINK_1,
  route: SA_PAGE_MAIN_ROUTE_URLS.CATALOG,
};

const SA_SIDEBAR_CATALOG_LINK_2_ITEM = {
  id: SA_SIDEBAR_CATALOG_TYPES.LINK_2,
  label: SA_SIDEBAR_CATALOG_LABELS.LINK_2,
  icon: SA_SIDEBAR_CATALOG_ICONS.LINK_2,
  route: SA_PAGE_MAIN_ROUTE_URLS.CATALOG,
};

const SA_SIDEBAR_CATALOG_LINK_3_ITEM = {
  id: SA_SIDEBAR_CATALOG_TYPES.LINK_3,
  label: SA_SIDEBAR_CATALOG_LABELS.LINK_3,
  icon: SA_SIDEBAR_CATALOG_ICONS.LINK_3,
  route: SA_PAGE_MAIN_ROUTE_URLS.CATALOG,
};

export interface ISidebarCatalogItem {
  id: string;
  label: string;
  icon: string;
  route: string;
}

export const SA_SIDEBAR_CATALOG_ITEMS: ISidebarCatalogItem[] = [
  SA_SIDEBAR_CATALOG_LINK_1_ITEM,
  SA_SIDEBAR_CATALOG_LINK_2_ITEM,
  SA_SIDEBAR_CATALOG_LINK_3_ITEM,
];
