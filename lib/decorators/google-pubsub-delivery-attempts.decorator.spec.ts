import { createExecutionContext, createMessage } from '../../test/utilities';
import { GooglePubSubContext } from '../ctx-host';
import { getDeliveryAttempts } from './google-pubsub-delivery-attempts.decorator';

describe('Delivery Attempts Decorator', () => {
    it('should return the delivery attempt count', () => {
        const message = createMessage({ deliveryAttempt: 3 });
        const ctx = new GooglePubSubContext([message, '', true, true]);

        const result = getDeliveryAttempts(undefined, createExecutionContext(ctx));

        expect(result).toBe(3);
    });

    it('should return 0 when there are no delivery attempts', () => {
        const message = createMessage({ deliveryAttempt: 0 });
        const ctx = new GooglePubSubContext([message, '', true, true]);

        const result = getDeliveryAttempts(undefined, createExecutionContext(ctx));

        expect(result).toBe(0);
    });
});
