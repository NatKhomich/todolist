describe('TaskIsDone', () => {
    it('base example, visually looks correct', async () => {
        // APIs from jest-puppeteer
        await page.goto('http://localhost:6006/?path=/story/todolist-task--task-is-done-story',
            {waitUntil: "networkidle2"});

        const image = await page.screenshot();

        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot();
    });
});


describe('TaskNotIsDone', () => {
    it('base example, visually looks correct', async () => {
        // APIs from jest-puppeteer
        await page.goto('http://localhost:6006/?path=/story/todolist-task--task-is-not-done-story',
            {waitUntil: "networkidle2"});

        const image = await page.screenshot();

        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot();
    });
});


