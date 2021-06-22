import { test, useSpectron  } from "../helpers/spectron";
import { logIn } from '../helpers/spectron/user';
import { FormMonkey } from '../helpers/form-monkey';
import { sleep } from "../helpers/sleep";

useSpectron();

const GOAL_TITLE = 'My Custom Goal';
const GOAL_TOTAL = '5';

test('Goals Section', async t => {
    const app = t.context.app;
    const formMonkey = new FormMonkey(t);

    await logIn(t);
    await (await app.client.$('div[title=Grow]')).click();

    // t.true(await (await app.client.$('h2=My Goals')).isExisting());

    await (await app.client.$('span=Add Goal')).click();

    await sleep(10000);

    await (await app.client.$('[data-title="Goal Title"] input')).setValue(GOAL_TITLE);

    await sleep(10000);

    await (await app.client.$('[data-title="Goal Total"] input')).setValue(GOAL_TOTAL);

    await sleep(10000);

    // await formMonkey.setInputValue('Goal Title', GOAL_TITLE);
    // await formMonkey.setInputValue('Goal Total', GOAL_TOTAL);

    // await (await app.client.$('button=OK')).click();

    // t.true(await (await app.client.$('strong=My Custom Goal')).isExisting());
});