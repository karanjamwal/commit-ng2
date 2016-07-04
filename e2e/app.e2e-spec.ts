import { CommitProjectPage } from './app.po';

describe('commit-project App', function() {
  let page: CommitProjectPage;

  beforeEach(() => {
    page = new CommitProjectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
