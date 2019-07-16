enum SA_SETTINGS_PANEL_TYPES {
  HELP     = 'help',
  SETTINGS = 'settings',
  PROFILE  = 'profile',
}

enum SA_SETTINGS_PANEL_ITEMS_LABELS {
  HELP     = 'Help',
  SETTINGS = 'Settings',
  PROFILE  = 'Profile',
}

enum SA_SETTINGS_PANEL_ITEMS_ICONS {
  HELP     = '#sa-help-icon',
  SETTINGS = '#sa-user-settings-icon',
  PROFILE  = '#sa-user-profile-icon',
}

const SA_SETTINGS_PANEL_HELP_ITEM = {
  id: SA_SETTINGS_PANEL_TYPES.HELP,
  label: SA_SETTINGS_PANEL_ITEMS_LABELS.HELP,
  icon: SA_SETTINGS_PANEL_ITEMS_ICONS.HELP,
};

const SA_SETTINGS_PANEL_SETTINGS_ITEM = {
  id: SA_SETTINGS_PANEL_TYPES.SETTINGS,
  label: SA_SETTINGS_PANEL_ITEMS_LABELS.SETTINGS,
  icon: SA_SETTINGS_PANEL_ITEMS_ICONS.SETTINGS,
};

const SA_SETTINGS_PANEL_PROFILE_ITEM = {
  id: SA_SETTINGS_PANEL_TYPES.PROFILE,
  label: SA_SETTINGS_PANEL_ITEMS_LABELS.PROFILE,
  icon: SA_SETTINGS_PANEL_ITEMS_ICONS.PROFILE,
};

export interface ISettingsPanelItem {
  id: string;
  label: string;
  icon: string;
}

export const SA_SETTINGS_PANEL_ITEMS: ISettingsPanelItem[] = [
  SA_SETTINGS_PANEL_HELP_ITEM,
  SA_SETTINGS_PANEL_SETTINGS_ITEM,
  SA_SETTINGS_PANEL_PROFILE_ITEM,
];
