declare const require: any;

const context = require.context('.', true, /\.svg$/);

export const SA_ICONS = context.keys().map((key) => {
  const value = context(key).default;

  value.id = value.id.replace('-usage', '');

  return value;
});
