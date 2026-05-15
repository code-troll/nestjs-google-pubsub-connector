import * as fc from 'fast-check';
import { BasicTopicNamingStrategy } from './basic-topic-naming-strategy';

describe(BasicTopicNamingStrategy.name, () => {
    it('returns its argument unmodified', () => {
        const strat = new BasicTopicNamingStrategy();

        // prettier-ignore
        fc.assert(fc.property(
            fc.string(),
            (s: string) => {
                expect(strat.generateTopicName(s)).toBe(s)
            }
        ))
    });
});
