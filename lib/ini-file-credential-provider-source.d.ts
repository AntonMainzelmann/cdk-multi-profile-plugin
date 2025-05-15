import { AwsCredentialIdentity } from '@aws-sdk/types';
declare enum ModeName {
    ForReading = 0,
    ForWriting = 1
}
export declare class IniFileCredentialProviderSource implements IniFileCredentialProviderSource {
    readonly name: string;
    private readonly profiles;
    private readonly filename;
    private profileConfig;
    private ssoLoginCache;
    constructor(name: string, profiles: {
        [key: string]: string;
    }, filename: string);
    canProvideCredentials(accountId: string): Promise<boolean>;
    getProvider(accountId: string, mode: ModeName): Promise<AwsCredentialIdentity>;
    isAvailable(): Promise<boolean>;
}
export {};
