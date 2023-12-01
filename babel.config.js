module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'expo-router/babel',
      'react-native-paper/babel',
      'transform-inline-environment-variables',
      'react-native-reanimated/plugin',
    ],
  };
};
