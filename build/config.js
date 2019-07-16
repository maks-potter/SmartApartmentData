'use strict';

const path = require('path');
const argv = require('yargs').argv;

const sourceDir = path.join(__dirname, '../src');

const env      = process.env.NODE_ENV || 'development';
const isDevEnv = (env === 'development');

const prefix                    = argv.prefix;
const getTranslationFromComment = argv['from-comment'];

module.exports = {
  env,

  iconsDir: path.resolve(__dirname, '../projects/icons'),
  prefix,
  getTranslationFromComment: getTranslationFromComment,

  tsConfig: path.resolve(__dirname, '../tsconfig.json'),
  tsLintConfig: path.resolve(__dirname, '../tslint.json'),
  environmentVariables: Object.assign({}, process.env, {
    DEBUG_ANGULAR_COMPILER: isDevEnv,
    DEPLOY_TIMESTAMP: new Date(),
    _: 'purge', // Replace undefined env variable with empty string
  }),

  scripts: [`${sourceDir}/**/*.js`, `!${sourceDir}/**/*.spec.js`],
  styles: [
    path.resolve(`${sourceDir}/styles.less`),
  ],
  icons: [`${sourceDir}/icons/**/*.svg`],
};
