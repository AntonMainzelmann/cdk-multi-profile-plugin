import { PluginHost } from '@aws-cdk/toolkit-lib';
export declare class MultiProfilePlugin extends PluginHost {
    private readonly profiles;
    private readonly filename;
    readonly version = "1";
    constructor(profiles: {
        [key: string]: string;
    }, filename: string);
    init(host: PluginHost): void;
}
