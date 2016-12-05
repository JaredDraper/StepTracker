import { StepTrackerPage } from './app.po';

describe('step-tracker App', function() {
  let page: StepTrackerPage;

  beforeEach(() => {
    page = new StepTrackerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
