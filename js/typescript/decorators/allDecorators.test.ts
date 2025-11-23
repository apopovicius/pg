import { describe, it, expect, vi } from 'vitest';
import { logTiming, timing, logAccess, format, getFormat, calledWith } from './perfDecorators';

describe('Decorators', () => {
    it('should log timing for class methods', async () => {
        const consoleSpy = vi.spyOn(console, 'log');

        @logTiming
        class TestClass {
            @timing()
            async method() {
                return 'result';
            }
        }

        const instance = new TestClass();
        await instance.method();
        // @ts-ignore
        instance.printTimings();

        expect(consoleSpy).toHaveBeenCalledWith(expect.arrayContaining([
            expect.objectContaining({
                method: 'method',
            })
        ]));
    });

    it('should log access for getters and setters', () => {
        const consoleSpy = vi.spyOn(console, 'log');

        class TestClass {
            private _prop = 'value';

            @logAccess
            get prop() {
                return this._prop;
            }

            set prop(val: string) {
                this._prop = val;
            }
        }

        const instance = new TestClass();
        const val = instance.prop;
        instance.prop = 'newValue';

        expect(consoleSpy).toHaveBeenCalledWith('Getting value of prop');
        expect(consoleSpy).toHaveBeenCalledWith('Setting value of prop to newValue');
    });

    it('should store and retrieve format metadata', () => {
        class TestClass {
            @format('test format')
            prop: string = '';
        }

        const instance = new TestClass();
        const formatString = getFormat(instance, 'prop');
        expect(formatString).toBe('test format');
    });

    it('should capture calledWith parameters', async () => {
        const consoleSpy = vi.spyOn(console, 'log');

        @logTiming
        class TestClass {
            @timing()
            method(@calledWith arg: string) {
                return arg;
            }
        }

        const instance = new TestClass();
        await instance.method('testArg');
        // @ts-ignore
        instance.printTimings();

        expect(consoleSpy).toHaveBeenCalledWith(expect.arrayContaining([
            expect.objectContaining({
                method: 'method',
                calledWith: ['testArg']
            })
        ]));
    });
});
