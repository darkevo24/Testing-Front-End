import history, { initTracking } from '../history';

describe('history', () => {
  it('history', () => {
    expect(initTracking(history)).toEqual();
  });
});
