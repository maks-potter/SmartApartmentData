declare module '*.html' {
  const content: any;
  export default content;
}

declare module '*.svg' {
  const value: any;
  export default value;
}

declare module '*.less' {
  const content: any;
  export default content;
}

declare module '*.json' {
  const value: any;
  export default value;
}

declare interface Dictionary<T> {
  [index: string]: T;
}
