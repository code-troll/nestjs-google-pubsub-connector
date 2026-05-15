import { Message } from '@google-cloud/pubsub';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GooglePubSubContext } from '../ctx-host';

export const getMessageBody = (
    key: string | undefined,
    ctx: ExecutionContext,
): Record<string, unknown> | null => {
    const message: Message = ctx.switchToRpc().getContext<GooglePubSubContext>().getMessage();
    try {
        const body: Record<string, unknown> = JSON.parse(message.data.toString()) as Record<
            string,
            unknown
        >;
        if (key != null) {
            return body[key] as Record<string, unknown>;
        }
        return body;
    } catch {
        return null;
    }
};

export const GooglePubSubMessageBody = createParamDecorator<string | undefined>(getMessageBody);
