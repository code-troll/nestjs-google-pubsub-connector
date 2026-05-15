import { createExecutionContext, createMessage } from '../../test/utilities';
import { GooglePubSubContext } from '../ctx-host';
import { getMessageId } from './google-pubsub-message-id.decorator';

describe('Message Id Decorator', () => {
    it('should return the message id', () => {
        const message = createMessage({ id: 'msg-123' });
        const ctx = new GooglePubSubContext([message, '', true, true]);

        const result = getMessageId(undefined, createExecutionContext(ctx));

        expect(result).toBe('msg-123');
    });
});
