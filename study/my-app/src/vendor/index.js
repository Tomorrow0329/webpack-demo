import(/* webpackPrefetch: true */'./prefetch.js')
export default () => {
  console.log('Test loader !');
  return 'I am vendor!!';
};