import { type Topics } from '@moonjot/moon';
export declare const getKeywordFromOpenAi: ({ text, token, model }: {
    text: string;
    token: string;
    model?: string | undefined;
}) => Promise<Topics | false>;
