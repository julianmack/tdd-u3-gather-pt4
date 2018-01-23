const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

const app = require('../../app');
const Item = require('../../models/item');

const {parseTextFromHTML, seedItemToDatabase} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

const findImageElementBySource = (htmlAsString, src) => {
  const image = jsdom(htmlAsString).querySelector(`img[src="${src}"]`);
  if (image !== null) {
    return image;
  } else {
    throw new Error(`Image with src "${src}" not found in HTML string`);
  }
};



describe('Server path: /items/:id', () => {
  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  it('contains description and title', async () => {
    const item = await seedItemToDatabase();
    id = item._id;

    const response = await request(app)
      .get('/items/'+ id);

    assert.include(parseTextFromHTML(response.text, '#item-description'), item.description);
    assert.include(parseTextFromHTML(response.text, '#item-title'), item.title);
  });
  it('displays correct image', async () => {
    const item = await seedItemToDatabase();
    id = item._id;

    const response = await request(app)
      .get('/items/'+ id);

    const imageElement = findImageElementBySource(response.text, item.imageUrl);

    assert.equal(imageElement.src, item.imageUrl);
  });
});
