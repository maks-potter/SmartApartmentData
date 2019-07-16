export enum SA_MAIN_PANEL_TYPES {
  SEARCH    = 'search',
  DASHBOARD = 'dashboard',
  CATALOG   = 'catalog',
}

enum SA_MAIN_PANEL_ITEMS_LABELS {
  SEARCH    = 'Search',
  DASHBOARD = 'Dashboard',
  CATALOG   = 'Catalog',
}

enum SA_MAIN_PANEL_ITEMS_ICONS {
  SEARCH    = '#sa-search-icon',
  DASHBOARD = '#sa-bar-graph-icon',
  CATALOG   = '#sa-document-icon',
}

const SA_MAIN_PANEL_SEARCH_ITEM = {
  id: SA_MAIN_PANEL_TYPES.SEARCH,
  label: SA_MAIN_PANEL_ITEMS_LABELS.SEARCH,
  icon: SA_MAIN_PANEL_ITEMS_ICONS.SEARCH,
  hasSidebar: false,
};

const SA_MAIN_PANEL_DASHBOARD_ITEM = {
  id: SA_MAIN_PANEL_TYPES.DASHBOARD,
  label: SA_MAIN_PANEL_ITEMS_LABELS.DASHBOARD,
  icon: SA_MAIN_PANEL_ITEMS_ICONS.DASHBOARD,
  hasSidebar: false,
  route: '',
};

const SA_MAIN_PANEL_CATALOG_ITEM = {
  id: SA_MAIN_PANEL_TYPES.CATALOG,
  label: SA_MAIN_PANEL_ITEMS_LABELS.CATALOG,
  icon: SA_MAIN_PANEL_ITEMS_ICONS.CATALOG,
  hasSidebar: true,
};

export interface IMainPanelItem {
  id: string;
  label: string;
  icon: string;
  hasSidebar: boolean;
  route?: string;
}

export const SA_MAIN_PANEL_ITEMS: IMainPanelItem[] = [
  SA_MAIN_PANEL_SEARCH_ITEM,
  SA_MAIN_PANEL_DASHBOARD_ITEM,
  SA_MAIN_PANEL_CATALOG_ITEM,
];
