import { expect } from 'chai';
import config from './config/config';

describe('config tests', () => {

  it('have property name',() => {
    expect(config).to.have.property('name');
  })

});
