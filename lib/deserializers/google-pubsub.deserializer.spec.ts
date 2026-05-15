import { createMessage } from '../../test/utilities';
import { GooglePubSubMessageDeserializer } from './google-pubsub.deserializer';

describe('GooglePubSubMessageDeserializer', () => {
    const deserializer = new GooglePubSubMessageDeserializer();

    it('should return a ReadPacket with the pattern and data', () => {
        const message = createMessage({ id: 'msg-456' });
        const metadata = '{"subscriptionName":"my-sub"}';

        const result = deserializer.deserialize(message, { metadata });

        expect(result.pattern).toBe(metadata);
        expect(result.data).toBe(message);
    });

    it('should preserve the original message as data', () => {
        const message = createMessage({
            id: 'msg-789',
            deliveryAttempt: 5,
        });

        const result = deserializer.deserialize(message, { metadata: 'test-pattern' });

        expect(result.data.id).toBe('msg-789');
        expect(result.data.deliveryAttempt).toBe(5);
    });
});
