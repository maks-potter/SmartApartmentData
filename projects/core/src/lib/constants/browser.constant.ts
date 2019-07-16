const chromeVersionMatch = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);

export const SA_CHROME_VERSION = chromeVersionMatch ? parseInt(chromeVersionMatch[2], 10) : null;

/**
 * Property documentMode  is defined only in IE
 * Property StyleMedia is defined only in IE & EDGE
 *
 * @see https://www.w3schools.com/jsref/prop_doc_documentmode.asp
 */
export const IS_IE = 'documentMode' in document;
export const IS_EDGE = !IS_IE && !! (window as any).StyleMedia;

export const IS_MS_BROWSER = IS_EDGE || IS_IE;

export const IE_MODE_CLASS = 'ie-mode';
