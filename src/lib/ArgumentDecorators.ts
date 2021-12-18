export const Body: ParameterDecorator = (target, _key, index) => {
  console.log('TODO', target, index);
};

export const Path: (path: string) => ParameterDecorator =
  (path) => (target, _key, index) => {
    console.log('TODO', target, index, path);
  };
