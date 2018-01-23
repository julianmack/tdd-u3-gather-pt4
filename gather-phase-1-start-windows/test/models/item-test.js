const Item = require('../../models/item');
const {assert} = require('chai');
const {mongoose, databaseUrl, options} = require('../../database');

describe('Model: Item', () => {
  beforeEach(async () => {
    await mongoose.connect(databaseUrl, options);
    await mongoose.connection.db.dropDatabase();
  });

  afterEach(async () => {
    await mongoose.disconnect();
  });

  describe('#title', () => {
    it('should be a string', async () => {
      titleAsInt = 3;
      const item = new Item({title: titleAsInt, description: 'here is the description', imageUrl: 'aSKSak'});
      assert.strictEqual(item.title, titleAsInt.toString())
    });
    it('is required', async () => {
      const item = new Item({title: '', description: 'here is the description', imageUrl: 'aSKSak'});
      item.validateSync();
      assert.equal(item.errors.title.message, 'Path `title` is required.')
    });
  });
  describe('#description', () => {
    it('should be a string', async () => {
      descriptionAsInt = 3;
      const item = new Item({title: 'hi', description: descriptionAsInt, imageUrl: 'aSKSak'});
      assert.strictEqual(item.description, descriptionAsInt.toString())
    });
    it('is required', async () => {
      const item = new Item({title: 'hi', description: '', imageUrl: 'aSKSak'});
      item.validateSync();
      assert.equal(item.errors.description.message, 'Path `description` is required.')
    });
  });
  describe('#imageUrl', () => {
    it('should be a string', async () => {
      imageUrlAsInt = 3;
      const item = new Item({title: 'hi', description: 'here is the description', imageUrl: imageUrlAsInt});
      assert.strictEqual(item.imageUrl, imageUrlAsInt.toString())
    });
    it('is required', async () => {
      const item = new Item({title: 'hi', description: 'here is the description', imageUrl: ''});
      item.validateSync();
      assert.equal(item.errors.imageUrl.message, 'Path `imageUrl` is required.')
    });
  });

});
