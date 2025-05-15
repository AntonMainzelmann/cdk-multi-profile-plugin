export declare const tokenCodeFn: (mfaSerial: string) => Promise<string>;
export declare const readProfiles: () => Record<string, string>;
export declare const getSharedCredentialsFilename: () => string;
export declare const getConfigFilename: () => string;
export declare const getSSOCachePath: () => string;
