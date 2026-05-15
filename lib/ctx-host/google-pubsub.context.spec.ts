import { createMessage } from '../../test/utilities';
import { GooglePubSubContext } from './google-pubsub.context';

const ackMock = jest.fn();
const nackMock = jest.fn();
const message = createMessage({ ack: ackMock, nack: nackMock, id: 'msg-123', deliveryAttempt: 3 });
const rawMetadata = '{"subscriptionName":"my-sub"}';

describe('GooglePubSubContext', () => {
    let ctx: GooglePubSubContext;

    beforeEach(() => {
        ctx = new GooglePubSubContext([message, rawMetadata, true, true]);
        jest.clearAllMocks();
    });

    describe('getMessage', () => {
        it('should return the message', () => {
            expect(ctx.getMessage()).toBe(message);
        });
    });

    describe('getRawMetadata', () => {
        it('should return the raw metadata string', () => {
            expect(ctx.getRawMetadata()).toBe(rawMetadata);
        });
    });

    describe('getAutoAck', () => {
        it('should return true when autoAck is enabled', () => {
            expect(ctx.getAutoAck()).toBe(true);
        });

        it('should return false when constructed with autoAck disabled', () => {
            const noAutoCtx = new GooglePubSubContext([message, rawMetadata, false, true]);
            expect(noAutoCtx.getAutoAck()).toBe(false);
        });
    });

    describe('getAutoNack', () => {
        it('should return true when autoNack is enabled', () => {
            expect(ctx.getAutoNack()).toBe(true);
        });

        it('should return false when constructed with autoNack disabled', () => {
            const noAutoCtx = new GooglePubSubContext([message, rawMetadata, true, false]);
            expect(noAutoCtx.getAutoNack()).toBe(false);
        });
    });

    describe('getAckFunction', () => {
        it('should return a function that acks the message', () => {
            const ack = ctx.getAckFunction();
            ack();
            expect(ackMock).toHaveBeenCalled();
        });

        it('should set autoAck to false', () => {
            expect(ctx.getAutoAck()).toBe(true);
            ctx.getAckFunction();
            expect(ctx.getAutoAck()).toBe(false);
        });
    });

    describe('getNackFunction', () => {
        it('should return a function that nacks the message', () => {
            const nack = ctx.getNackFunction();
            nack();
            expect(nackMock).toHaveBeenCalled();
        });

        it('should set autoNack to false', () => {
            expect(ctx.getAutoNack()).toBe(true);
            ctx.getNackFunction();
            expect(ctx.getAutoNack()).toBe(false);
        });
    });
});
