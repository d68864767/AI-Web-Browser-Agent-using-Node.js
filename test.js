const assert = require('assert');
const BrowserAgent = require('./browserAgent');
const { validateTasks } = require('./utils');

describe('BrowserAgent', () => {
  let browserAgent;

  beforeEach(async () => {
    browserAgent = new BrowserAgent();
    await browserAgent.init();
  });

  afterEach(async () => {
    await browserAgent.close();
  });

  it('should navigate to a URL', async () => {
    const result = await browserAgent.navigate('http://example.com');
    assert.deepStrictEqual(result, { type: 'navigate', status: 'success' });
  });

  it('should click a button', async () => {
    const result = await browserAgent.click('#my-button');
    assert.deepStrictEqual(result, { type: 'click', status: 'success' });
  });

  it('should fill a form', async () => {
    const result = await browserAgent.fillForm('#my-form', { field1: 'value1', field2: 'value2' });
    assert.deepStrictEqual(result, { type: 'fillForm', status: 'success' });
  });

  it('should scrape data', async () => {
    const result = await browserAgent.scrape('#my-data');
    assert.deepStrictEqual(result, { type: 'scrape', data: 'Scraped data' });
  });

  it('should perform a sequence of tasks', async () => {
    const tasks = [
      { type: 'navigate', url: 'http://example.com' },
      { type: 'click', selector: '#my-button' },
      { type: 'fillForm', selector: '#my-form', data: { field1: 'value1', field2: 'value2' } },
      { type: 'scrape', selector: '#my-data' }
    ];
    const results = await browserAgent.performTasks(tasks);
    assert.deepStrictEqual(results, [
      { type: 'navigate', status: 'success' },
      { type: 'click', status: 'success' },
      { type: 'fillForm', status: 'success' },
      { type: 'scrape', data: 'Scraped data' }
    ]);
  });
});

describe('utils', () => {
  it('should validate tasks', () => {
    const tasks = [
      { type: 'navigate', url: 'http://example.com' },
      { type: 'click', selector: '#my-button' },
      { type: 'fillForm', selector: '#my-form', data: { field1: 'value1', field2: 'value2' } },
      { type: 'scrape', selector: '#my-data' }
    ];
    assert.doesNotThrow(() => validateTasks(tasks));
  });

  it('should throw an error for invalid tasks', () => {
    const tasks = [
      { type: 'navigate' },
      { type: 'click' },
      { type: 'fillForm', selector: '#my-form' },
      { type: 'scrape' }
    ];
    assert.throws(() => validateTasks(tasks));
  });
});
