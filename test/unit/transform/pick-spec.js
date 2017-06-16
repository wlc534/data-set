const {
  map,
  pick
} = require('lodash');
const {
  expect
} = require('chai');
const {
  DataSet,
  DataView,
  getTransform
} = require('../../../index');
const populationChina = require('../../fixtures/population-china.json');

describe('DataView.transform(): pick', () => {
  const dataSet = new DataSet();
  let dataView;

  beforeEach(() => {
    dataView = new DataView(dataSet);
    dataView.source(populationChina);
  });

  it('api', () => {
    expect(getTransform('pick')).to.be.a('function');
  });

  it('default', () => {
    dataView.transform({
      type: 'pick'
    });
    expect(dataView.rows).to.be.deep.equal(populationChina);
  });

  it('pick', () => {
    dataView.transform({
      type: 'pick',
      columns: [ 'year' ]
    });
    expect(dataView.rows).to.be.deep.equal(map(populationChina, row => pick(row, [ 'year' ])));
  });
});
