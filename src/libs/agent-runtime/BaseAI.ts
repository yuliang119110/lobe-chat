import { StreamingTextResponse } from 'ai';

import { ChatCompetitionOptions, ChatStreamPayload } from './types';

export interface LobeRuntimeAI {
  baseURL?: string;

  chat(
    payload: ChatStreamPayload,
    options?: ChatCompetitionOptions,
    authorization?: string, ///新增参数
  ): Promise<StreamingTextResponse>;
}
