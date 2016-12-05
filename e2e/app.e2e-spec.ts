import { StepTrackerFrontEndPage } from './app.po';

describe('step-tracker-front-end App', function() {
  let page: StepTrackerFrontEndPage;

  beforeEach(() => {
    page = new StepTrackerFrontEndPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
