export declare class ProfileConfig {
    private config;
    constructor(path: string);
    getProfile(profile: string): Record<string, string>;
    getSSOSession(ssoSession: string): Record<string, string>;
    getSSOSettings(profile: string): Record<string, string>;
    isSSOProfile(profile: string): boolean;
}
