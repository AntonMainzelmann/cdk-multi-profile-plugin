import { AwsCredentialIdentity } from '@aws-sdk/types';
export declare class ProfileCredentialsCache {
    private readonly cache;
    constructor();
    set(profile: string, credentials: AwsCredentialIdentity): void;
    get(profile: string): AwsCredentialIdentity | undefined;
    has(profile: string): boolean;
}
