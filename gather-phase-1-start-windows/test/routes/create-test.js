const {assert} = require('chai');
const request = require('supertest');


const app = require('../../app');
const Item = require('../../models/item');

const {parseTextFromHTML, buildItemObject} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');


describe('Server path: /items/create', () => {


  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  describe('GET', () => {
    it('renders empty input fields', async () => {
      const response = await request(app)
        .get('/items/create');

      assert.equal(parseTextFromHTML(response.text, 'input#title-input'), '')
      assert.equal(parseTextFromHTML(response.text, 'input#imageUrl-input'), '')
      assert.equal(parseTextFromHTML(response.text, 'textarea#description-input'), '')
    });
  });

  describe('POST', () => {
    it('creates new item in db', async () => {
      const newItem = buildItemObject();
      const response = await request(app)
        .post('/items/create')
        .type('form')
        .send(newItem);

      const createdItem = await Item.findOne(newItem);
      assert.isOk(createdItem, 'Item was not created successfully in the database');
    });

    it('redirects to /', async () => {
      const newItem = buildItemObject();
      const response = await request(app)
        .post('/items/create')
        .type('form')
        .send(newItem);
      assert.equal(response.status, 302);
      assert.equal(response.headers.location, '/');
    });
    it('throws error when no title is submitted', async () => {
      newItem = {description: 'hello', imageUrl: 'https://lh4.ggpht.com/mJDgTDUOtIyHcrb69WM0cpaxFwCNW6f0VQ2ExA7dMKpMDrZ0A6ta64OCX3H-NMdRd20=w300'}
      const response = await request(app)
        .post('/items/create')
        .type('form')
        .send(newItem);

      const returnedItems = await Item.find({});

      assert.equal(returnedItems.length, 0);
      assert.equal(response.status, 400);
      assert.include(parseTextFromHTML(response.text, 'form'), 'required');
    });
    it('throws error when no description is submitted', async () => {
      newItem = {title: 'hello', imageUrl: 'https://lh4.ggpht.com/mJDgTDUOtIyHcrb69WM0cpaxFwCNW6f0VQ2ExA7dMKpMDrZ0A6ta64OCX3H-NMdRd20=w300'}
      const response = await request(app)
        .post('/items/create')
        .type('form')
        .send(newItem);

      const returnedItems = await Item.find({});

      assert.equal(returnedItems.length, 0);
      assert.equal(response.status, 400);
      assert.include(parseTextFromHTML(response.text, 'form'), 'required');
    });
    it('throws error when no URL is submitted', async () => {
      newItem = {title: 'hi', description: 'hello'}
      const response = await request(app)
        .post('/items/create')
        .type('form')
        .send(newItem);

      const returnedItems = await Item.find({});

      assert.equal(returnedItems.length, 0);
      assert.equal(response.status, 400);
      assert.include(parseTextFromHTML(response.text, 'form'), 'required');
    });

  });

});
