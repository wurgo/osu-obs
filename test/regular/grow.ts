import { test, useSpectron  } from "../helpers/spectron";
import { logIn } from '../helpers/spectron/user';
import { sleep } from "../helpers/sleep";

useSpectron();

const BAD_GOAL_TITLE = '123456789012345678901234567890123';
const BAD_GOAL_TOTAL = '\uE003\uE003100';

const GOOD_GOAL_TITLE = 'Automated Custom Goal';
const GOOD_GOAL_TOTAL = '\uE003\uE00310';

test('Each Section Loads Properly', async t => {
    const app = t.context.app;

    await logIn(t);
    await (await app.client.$('div[title=Grow]')).click();

    // Check for My Goals section
    t.true(await (await app.client.$('h2=My Goals')).isExisting());
    // Check for Growth Tips section
    t.true(await (await app.client.$('h2=Growth Tips')).isExisting());
    // Check for Community Reach section
    t.true(await (await app.client.$('span=Twitch')).isExisting());
    // Check for Stream Pulse section
    t.true(await (await app.client.$('h2=Stream Pulse')).isExisting());
    // Check for Streamer Resources section
    t.true(await (await app.client.$('h2=Streamer Resources')).isExisting());
});

test('Add Goal Field Validation Works', async t => {
    const app = t.context.app;

    await logIn(t);
    await (await app.client.$('div[title=Grow]')).click();

    // Have to click twice due to some weirdness w/ AntD buttons/modals
    await (await app.client.$('span=Add Goal')).click();
    await (await app.client.$('.ant-modal-wrap')).click();

    // Set title and total to invalid values
    await (await app.client.$('[data-title="Goal Title"]')).setValue(BAD_GOAL_TITLE);
    await (await app.client.$('[data-title="Goal Total"]')).setValue(BAD_GOAL_TOTAL);

    // Check Title validation
    t.true(await (await app.client.$('div=Goal Title cannot be more than 32 characters')).isExisting());

    // Check Total validation
    t.true(await (await app.client.$('div=Goal Total must be between 1 and 50')).isExisting());
});

test('Add a Custom Goal', async t => {
    const app = t.context.app;

    await logIn(t);
    await (await app.client.$('div[title=Grow]')).click();

    // Have to click twice due to some weirdness w/ AntD buttons/modals
    await (await app.client.$('span=Add Goal')).click();
    await (await app.client.$('.ant-modal-wrap')).click();

    // Set title and total to valid values
    await (await app.client.$('[data-title="Goal Title"]')).setValue(GOOD_GOAL_TITLE);
    await (await app.client.$('[data-title="Goal Total"]')).setValue(GOOD_GOAL_TOTAL);

    await (await app.client.$('button=OK')).click();
    await (await app.client.$('.ant-modal-wrap')).click();

    await sleep(100000);
})