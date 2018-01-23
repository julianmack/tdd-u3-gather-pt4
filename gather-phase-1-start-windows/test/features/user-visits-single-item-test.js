const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

const app = require('../../app');
const Item = require('../../models/item');

const {parseTextFromHTML, buildItemObject} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

const findImageElementBySource = (htmlAsString, src) => {
  const image = jsdom(htmlAsString).querySelector(`img[src="${src}"]`);
  if (image !== null) {
    return image;
  } else {
    throw new Error(`Image with src "${src}" not found in HTML string`);
  }
};


describe('Single Item View', () => {

  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  it('description is present', async () => {
    const newItem = buildItemObject();
    id = newItem._id;

    browser.url('/items/create')
    browser.setValue('#title-input', newItem.title);
    browser.setValue('#description-input', newItem.description);
    browser.setValue('#imageUrl-input', newItem.imageUrl);
    browser.click('#submit-button')
    browser.click('.item-card a');

    assert.include(browser.getText('#item-description'), newItem.description);
  });
});
