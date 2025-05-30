/**
 * Creates a mapping from accountnumber to a local aws profile
 */
export interface ProfileMapper {
    resolve(): {
        [key: string]: string;
    };
}
export interface JsonFileProfileMapperProps {
    workingDirectory: string;
    filename: string;
}
export declare class JsonFileProfileMapper implements ProfileMapper {
    private readonly _workingDirectory;
    private readonly _filename;
    constructor(props: JsonFileProfileMapperProps);
    resolve(): {
        [key: string]: string;
    };
}
export declare class PackageJsonProfileMapper implements ProfileMapper {
    resolve(): {
        [key: string]: string;
    };
}
export declare class EnvironmentAwareGlobalProfileMapper implements ProfileMapper {
    static readonly environmentVariableName = "CDK_MULTI_PROFILE_PLUGIN_CONFIG";
    private readonly _defaultGlobalConfigurationFile;
    private readonly _workingDirectory;
    private readonly _filename;
    constructor();
    resolve(): {
        [p: string]: string;
    };
}
export declare class LocalProjectDirMapper implements ProfileMapper {
    resolve(): {
        [p: string]: string;
    };
}
export declare class PrecedenceProfileMapper implements ProfileMapper {
    resolve(): {
        [p: string]: string;
    };
}
