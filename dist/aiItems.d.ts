import { type AI_APIS } from './aiApis';
export declare const AIs: Array<{
    title: string;
    prompt?: string;
    output?: string;
    type: keyof typeof AI_APIS;
}>;
