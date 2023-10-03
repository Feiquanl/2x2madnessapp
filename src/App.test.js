import Model from './model/Model.js'

test('validate config is default one', () => {

  let m = new Model()
  expect(m.currentConfig).toEqual(0)
});
