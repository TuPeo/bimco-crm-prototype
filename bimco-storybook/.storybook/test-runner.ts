import type { TestRunnerConfig } from '@storybook/test-runner';
import { getStoryContext } from '@storybook/test-runner';
import { injectAxe, checkA11y, configureAxe } from 'axe-playwright';
import { toMatchImageSnapshot } from 'jest-image-snapshot';

const customSnapshotsDir = `${process.cwd()}/__snapshots__`;

const config: TestRunnerConfig = {
  setup() {
    expect.extend({ toMatchImageSnapshot });
  },
  async preVisit(page) {
    await injectAxe(page);
  },
  async postVisit(page, context) {
    const { parameters } = await getStoryContext(page, context);

    if (!parameters?.a11y?.disable) {
      await configureAxe(page, {
        rules: parameters?.a11y?.config?.rules,
      });

      await checkA11y(page, '#storybook-root', {
        detailedReport: true,
        detailedReportOptions: {
          html: true,
        },
        axeOptions: parameters?.a11y?.options,
      });
    }

    if (!parameters?.snapshot?.disable) {
      await page.waitForLoadState('domcontentloaded');
      await page.waitForLoadState('load');
      await page.evaluate(() => document.fonts.ready);

      const screenshot = await page.screenshot({
        fullPage: true
      });

      expect(screenshot).toMatchImageSnapshot({
        customSnapshotsDir,
        customSnapshotIdentifier: context.id,
        diffDirection: 'vertical'
      });
    }
  }
};

export default config;
