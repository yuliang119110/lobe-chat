import { getPreferredRegion } from '@/app/api/config';
import { createErrorResponse } from '@/app/api/errorResponse';
import { LOBE_CHAT_AUTH_HEADER, OAUTH_AUTHORIZED } from '@/const/auth';
import { AgentRuntimeError, ChatCompletionErrorPayload } from '@/libs/agent-runtime';
import { ChatErrorType } from '@/types/fetch';
import { ChatStreamPayload } from '@/types/openai/chat';
import { getTracePayload } from '@/utils/trace';

import { checkAuthMethod, getJWTPayload } from '../auth';
import AgentRuntime from './agentRuntime';

export const runtime = 'edge';

export const preferredRegion = getPreferredRegion();

export const POST = async (req: Request, { params }: { params: { provider: string } }) => {
  const { provider } = params;
  console.log('Provider:', provider);
  try {
    // ============  1. init chat model   ============ //

    // get Authorization from header
    const authorization = req.headers.get(LOBE_CHAT_AUTH_HEADER);
    console.log('authorization:', authorization);
    const oauthAuthorized = !!req.headers.get(OAUTH_AUTHORIZED);
    console.log('oauthAuthorized:', oauthAuthorized);

    if (!authorization) throw AgentRuntimeError.createError(ChatErrorType.Unauthorized);

    // check the Auth With payload
    const jwtPayload = await getJWTPayload(authorization);
    console.log('JWT Payload:', jwtPayload);
    checkAuthMethod(jwtPayload.accessCode, jwtPayload.apiKey, oauthAuthorized);

    const body = await req.clone().json();
    console.log('body', body);
    const agentRuntime = await AgentRuntime.initializeWithUserPayload(provider, jwtPayload, {
      apiVersion: jwtPayload.azureApiVersion,
      model: body.model,
      useAzure: jwtPayload.useAzure,
    });

    // ============  2. create chat completion   ============ //

    const data = (await req.json()) as ChatStreamPayload;

    console.log('Data1:', data);

    const tracePayload = getTracePayload(req);

    return await agentRuntime.chat(data, {
      enableTrace: tracePayload?.enabled,
      provider,
      trace: tracePayload,
      authorization,
    });
  } catch (e) {
    const {
      errorType = ChatErrorType.InternalServerError,
      error: errorContent,
      ...res
    } = e as ChatCompletionErrorPayload;

    const error = errorContent || e;
    // track the error at server side
    console.error(`Route: [${provider}] ${errorType}:`, error);

    return createErrorResponse(errorType, { error, ...res, provider });
  }
};
