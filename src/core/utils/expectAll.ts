export async function expectAll(
    arg1?: string | (() => Promise<void>),
    ...expects: (() => Promise<void>)[]
): Promise<void> {
    let assertionHeading: string | undefined;
    let remainingExpects: (() => Promise<void>)[];

    if (typeof arg1 === 'string') {
        assertionHeading = arg1;
        remainingExpects = expects;
    } else if (typeof arg1 === 'function') {
        remainingExpects = [arg1, ...expects];
    } else {
        remainingExpects = expects;
    }

    const errors: Error[] = [];

    for (const expectFn of remainingExpects) {
        try {
            await expectFn();
        } catch (err) {
            errors.push(err as Error);
        }
    }

    if (errors.length > 0) {
        const errorMessage = errors
            .map((error, i) => {
                const nameAndMessage = `${error.name}: ${error.message}`;
                const stackLines = error.stack?.split(/\r?\n/).slice(1, 6).join('\n') ?? '';
                return `Failure ${i + 1}: ${nameAndMessage}\n${stackLines}`.trim();
            })
            .join('\n\n');

        const heading = assertionHeading ?? 'expectAll'; // safe default
        throw new Error(`${heading}\nExpectation(s) failed:\n${errorMessage}`);
    }
}
