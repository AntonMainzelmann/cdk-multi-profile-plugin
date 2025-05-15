"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrecedenceProfileMapper = exports.LocalProjectDirMapper = exports.EnvironmentAwareGlobalProfileMapper = exports.PackageJsonProfileMapper = exports.JsonFileProfileMapper = void 0;
const fs = __importStar(require("fs-extra"));
const path = __importStar(require("path"));
const os = __importStar(require("os"));
/*
 * Resolves profiles from a json file. The key for resolving a mapping is "awsProfiles".
 *
 * example:
 *  `{
 *      "awsProfiles": {
 *        "123": "default123",
 *        "456": "default123"
 *      }
 *  }`
 *
 */
class JsonFileProfileMapper {
    constructor(props) {
        this._workingDirectory = props.workingDirectory;
        this._filename = props.filename;
    }
    resolve() {
        const filename = path.join(this._workingDirectory, this._filename);
        if (!fs.existsSync(filename)) {
            return {};
        }
        try {
            const pkg = JSON.parse(fs.readFileSync(filename, {
                encoding: 'utf8',
                flag: 'r',
            }));
            const { awsProfiles } = pkg;
            return awsProfiles;
        }
        catch (e) {
            console.log(`Failed to parse file ${this._filename}: `, e.message);
        }
        return {};
    }
}
exports.JsonFileProfileMapper = JsonFileProfileMapper;
// Will use local package.json for mapping an accountnumber to a local profile
class PackageJsonProfileMapper {
    resolve() {
        return new JsonFileProfileMapper({
            workingDirectory: process.cwd(),
            filename: 'package.json',
        }).resolve();
    }
}
exports.PackageJsonProfileMapper = PackageJsonProfileMapper;
// Will default to ~/.cdkmultiprofileplung.json and can be overriden by environment variable
// CDK_MULTI_PROFILE_PLUGIN_CONFIG=/path/to/file.json
class EnvironmentAwareGlobalProfileMapper {
    constructor() {
        this._defaultGlobalConfigurationFile = '.cdkmultiprofileplugin.json';
        this._workingDirectory = os.homedir();
        this._filename = this._defaultGlobalConfigurationFile;
        const configFileLocationOverride = process.env[EnvironmentAwareGlobalProfileMapper.environmentVariableName];
        if (configFileLocationOverride) {
            const configFile = path.parse(configFileLocationOverride);
            this._workingDirectory = configFile.dir;
            this._filename = configFile.base;
        }
    }
    resolve() {
        return new JsonFileProfileMapper({
            workingDirectory: this._workingDirectory,
            filename: this._filename,
        }).resolve();
    }
}
exports.EnvironmentAwareGlobalProfileMapper = EnvironmentAwareGlobalProfileMapper;
EnvironmentAwareGlobalProfileMapper.environmentVariableName = 'CDK_MULTI_PROFILE_PLUGIN_CONFIG';
// Can be used in local project directory. Can be added or ignored by your VCS
class LocalProjectDirMapper {
    resolve() {
        return new JsonFileProfileMapper({
            workingDirectory: process.cwd(),
            filename: 'cdkmultiprofileplugin.json',
        }).resolve();
    }
}
exports.LocalProjectDirMapper = LocalProjectDirMapper;
// Uses all mappers and applies precedence
class PrecedenceProfileMapper {
    resolve() {
        // Temporary in order to get it working again
        const packageJsonMappings = new PackageJsonProfileMapper().resolve();
        const projectLocalMappings = new LocalProjectDirMapper().resolve();
        const globalMappings = new EnvironmentAwareGlobalProfileMapper().resolve();
        return {
            ...packageJsonMappings,
            ...projectLocalMappings,
            ...globalMappings,
        };
    }
}
exports.PrecedenceProfileMapper = PrecedenceProfileMapper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZS1tYXBwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcHJvZmlsZS1tYXBwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQStCO0FBQy9CLDJDQUE2QjtBQUM3Qix1Q0FBeUI7QUFjekI7Ozs7Ozs7Ozs7O0dBV0c7QUFDSCxNQUFhLHFCQUFxQjtJQUloQyxZQUFZLEtBQWlDO1FBQzNDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUMsZ0JBQWdCLENBQUM7UUFDaEQsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDO0lBQ2xDLENBQUM7SUFFRCxPQUFPO1FBQ0wsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ25FLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUM7WUFDN0IsT0FBTyxFQUFFLENBQUM7UUFDWixDQUFDO1FBQ0QsSUFBSSxDQUFDO1lBQ0gsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FDcEIsRUFBRSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUU7Z0JBQ3hCLFFBQVEsRUFBRSxNQUFNO2dCQUNoQixJQUFJLEVBQUUsR0FBRzthQUNWLENBQUMsQ0FDSCxDQUFDO1lBQ0YsTUFBTSxFQUFFLFdBQVcsRUFBRSxHQUFHLEdBQUcsQ0FBQztZQUM1QixPQUFPLFdBQVcsQ0FBQztRQUNyQixDQUFDO1FBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztZQUNYLE9BQU8sQ0FBQyxHQUFHLENBQ1Qsd0JBQXdCLElBQUksQ0FBQyxTQUFTLElBQUksRUFDekMsQ0FBVyxDQUFDLE9BQU8sQ0FDckIsQ0FBQztRQUNKLENBQUM7UUFDRCxPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUM7Q0FDRjtBQS9CRCxzREErQkM7QUFFRCw4RUFBOEU7QUFDOUUsTUFBYSx3QkFBd0I7SUFDbkMsT0FBTztRQUNMLE9BQU8sSUFBSSxxQkFBcUIsQ0FBQztZQUMvQixnQkFBZ0IsRUFBRSxPQUFPLENBQUMsR0FBRyxFQUFFO1lBQy9CLFFBQVEsRUFBRSxjQUFjO1NBQ3pCLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNmLENBQUM7Q0FDRjtBQVBELDREQU9DO0FBRUQsNEZBQTRGO0FBQzVGLHFEQUFxRDtBQUNyRCxNQUFhLG1DQUFtQztJQVE5QztRQUxpQixvQ0FBK0IsR0FDOUMsNkJBQTZCLENBQUM7UUFLOUIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUN0QyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQywrQkFBK0IsQ0FBQztRQUN0RCxNQUFNLDBCQUEwQixHQUM5QixPQUFPLENBQUMsR0FBRyxDQUFDLG1DQUFtQyxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFDM0UsSUFBSSwwQkFBMEIsRUFBRSxDQUFDO1lBQy9CLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsMEJBQTBCLENBQUMsQ0FBQztZQUMxRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQztZQUN4QyxJQUFJLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUM7UUFDbkMsQ0FBQztJQUNILENBQUM7SUFFRCxPQUFPO1FBQ0wsT0FBTyxJQUFJLHFCQUFxQixDQUFDO1lBQy9CLGdCQUFnQixFQUFFLElBQUksQ0FBQyxpQkFBaUI7WUFDeEMsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTO1NBQ3pCLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNmLENBQUM7O0FBekJILGtGQTBCQztBQXpCd0IsMkRBQXVCLEdBQzVDLGlDQUFpQyxBQURXLENBQ1Y7QUEwQnRDLDhFQUE4RTtBQUM5RSxNQUFhLHFCQUFxQjtJQUNoQyxPQUFPO1FBQ0wsT0FBTyxJQUFJLHFCQUFxQixDQUFDO1lBQy9CLGdCQUFnQixFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUU7WUFDL0IsUUFBUSxFQUFFLDRCQUE0QjtTQUN2QyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDZixDQUFDO0NBQ0Y7QUFQRCxzREFPQztBQUVELDBDQUEwQztBQUMxQyxNQUFhLHVCQUF1QjtJQUNsQyxPQUFPO1FBQ0wsNkNBQTZDO1FBQzdDLE1BQU0sbUJBQW1CLEdBQUcsSUFBSSx3QkFBd0IsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3JFLE1BQU0sb0JBQW9CLEdBQUcsSUFBSSxxQkFBcUIsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ25FLE1BQU0sY0FBYyxHQUFHLElBQUksbUNBQW1DLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUMzRSxPQUFPO1lBQ0wsR0FBRyxtQkFBbUI7WUFDdEIsR0FBRyxvQkFBb0I7WUFDdkIsR0FBRyxjQUFjO1NBQ2xCLENBQUM7SUFDSixDQUFDO0NBQ0Y7QUFaRCwwREFZQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzLWV4dHJhJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgKiBhcyBvcyBmcm9tICdvcyc7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG1hcHBpbmcgZnJvbSBhY2NvdW50bnVtYmVyIHRvIGEgbG9jYWwgYXdzIHByb2ZpbGVcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBQcm9maWxlTWFwcGVyIHtcbiAgcmVzb2x2ZSgpOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEpzb25GaWxlUHJvZmlsZU1hcHBlclByb3BzIHtcbiAgd29ya2luZ0RpcmVjdG9yeTogc3RyaW5nO1xuICBmaWxlbmFtZTogc3RyaW5nO1xufVxuXG4vKlxuICogUmVzb2x2ZXMgcHJvZmlsZXMgZnJvbSBhIGpzb24gZmlsZS4gVGhlIGtleSBmb3IgcmVzb2x2aW5nIGEgbWFwcGluZyBpcyBcImF3c1Byb2ZpbGVzXCIuXG4gKlxuICogZXhhbXBsZTpcbiAqICBge1xuICogICAgICBcImF3c1Byb2ZpbGVzXCI6IHtcbiAqICAgICAgICBcIjEyM1wiOiBcImRlZmF1bHQxMjNcIixcbiAqICAgICAgICBcIjQ1NlwiOiBcImRlZmF1bHQxMjNcIlxuICogICAgICB9XG4gKiAgfWBcbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBKc29uRmlsZVByb2ZpbGVNYXBwZXIgaW1wbGVtZW50cyBQcm9maWxlTWFwcGVyIHtcbiAgcHJpdmF0ZSByZWFkb25seSBfd29ya2luZ0RpcmVjdG9yeTogc3RyaW5nO1xuICBwcml2YXRlIHJlYWRvbmx5IF9maWxlbmFtZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzOiBKc29uRmlsZVByb2ZpbGVNYXBwZXJQcm9wcykge1xuICAgIHRoaXMuX3dvcmtpbmdEaXJlY3RvcnkgPSBwcm9wcy53b3JraW5nRGlyZWN0b3J5O1xuICAgIHRoaXMuX2ZpbGVuYW1lID0gcHJvcHMuZmlsZW5hbWU7XG4gIH1cblxuICByZXNvbHZlKCk6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0ge1xuICAgIGNvbnN0IGZpbGVuYW1lID0gcGF0aC5qb2luKHRoaXMuX3dvcmtpbmdEaXJlY3RvcnksIHRoaXMuX2ZpbGVuYW1lKTtcbiAgICBpZiAoIWZzLmV4aXN0c1N5bmMoZmlsZW5hbWUpKSB7XG4gICAgICByZXR1cm4ge307XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICBjb25zdCBwa2cgPSBKU09OLnBhcnNlKFxuICAgICAgICBmcy5yZWFkRmlsZVN5bmMoZmlsZW5hbWUsIHtcbiAgICAgICAgICBlbmNvZGluZzogJ3V0ZjgnLFxuICAgICAgICAgIGZsYWc6ICdyJyxcbiAgICAgICAgfSksXG4gICAgICApO1xuICAgICAgY29uc3QgeyBhd3NQcm9maWxlcyB9ID0gcGtnO1xuICAgICAgcmV0dXJuIGF3c1Byb2ZpbGVzO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICBgRmFpbGVkIHRvIHBhcnNlIGZpbGUgJHt0aGlzLl9maWxlbmFtZX06IGAsXG4gICAgICAgIChlIGFzIEVycm9yKS5tZXNzYWdlLFxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIHt9O1xuICB9XG59XG5cbi8vIFdpbGwgdXNlIGxvY2FsIHBhY2thZ2UuanNvbiBmb3IgbWFwcGluZyBhbiBhY2NvdW50bnVtYmVyIHRvIGEgbG9jYWwgcHJvZmlsZVxuZXhwb3J0IGNsYXNzIFBhY2thZ2VKc29uUHJvZmlsZU1hcHBlciBpbXBsZW1lbnRzIFByb2ZpbGVNYXBwZXIge1xuICByZXNvbHZlKCk6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0ge1xuICAgIHJldHVybiBuZXcgSnNvbkZpbGVQcm9maWxlTWFwcGVyKHtcbiAgICAgIHdvcmtpbmdEaXJlY3Rvcnk6IHByb2Nlc3MuY3dkKCksXG4gICAgICBmaWxlbmFtZTogJ3BhY2thZ2UuanNvbicsXG4gICAgfSkucmVzb2x2ZSgpO1xuICB9XG59XG5cbi8vIFdpbGwgZGVmYXVsdCB0byB+Ly5jZGttdWx0aXByb2ZpbGVwbHVuZy5qc29uIGFuZCBjYW4gYmUgb3ZlcnJpZGVuIGJ5IGVudmlyb25tZW50IHZhcmlhYmxlXG4vLyBDREtfTVVMVElfUFJPRklMRV9QTFVHSU5fQ09ORklHPS9wYXRoL3RvL2ZpbGUuanNvblxuZXhwb3J0IGNsYXNzIEVudmlyb25tZW50QXdhcmVHbG9iYWxQcm9maWxlTWFwcGVyIGltcGxlbWVudHMgUHJvZmlsZU1hcHBlciB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgZW52aXJvbm1lbnRWYXJpYWJsZU5hbWUgPVxuICAgICdDREtfTVVMVElfUFJPRklMRV9QTFVHSU5fQ09ORklHJztcbiAgcHJpdmF0ZSByZWFkb25seSBfZGVmYXVsdEdsb2JhbENvbmZpZ3VyYXRpb25GaWxlID1cbiAgICAnLmNka211bHRpcHJvZmlsZXBsdWdpbi5qc29uJztcbiAgcHJpdmF0ZSByZWFkb25seSBfd29ya2luZ0RpcmVjdG9yeTogc3RyaW5nO1xuICBwcml2YXRlIHJlYWRvbmx5IF9maWxlbmFtZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuX3dvcmtpbmdEaXJlY3RvcnkgPSBvcy5ob21lZGlyKCk7XG4gICAgdGhpcy5fZmlsZW5hbWUgPSB0aGlzLl9kZWZhdWx0R2xvYmFsQ29uZmlndXJhdGlvbkZpbGU7XG4gICAgY29uc3QgY29uZmlnRmlsZUxvY2F0aW9uT3ZlcnJpZGUgPVxuICAgICAgcHJvY2Vzcy5lbnZbRW52aXJvbm1lbnRBd2FyZUdsb2JhbFByb2ZpbGVNYXBwZXIuZW52aXJvbm1lbnRWYXJpYWJsZU5hbWVdO1xuICAgIGlmIChjb25maWdGaWxlTG9jYXRpb25PdmVycmlkZSkge1xuICAgICAgY29uc3QgY29uZmlnRmlsZSA9IHBhdGgucGFyc2UoY29uZmlnRmlsZUxvY2F0aW9uT3ZlcnJpZGUpO1xuICAgICAgdGhpcy5fd29ya2luZ0RpcmVjdG9yeSA9IGNvbmZpZ0ZpbGUuZGlyO1xuICAgICAgdGhpcy5fZmlsZW5hbWUgPSBjb25maWdGaWxlLmJhc2U7XG4gICAgfVxuICB9XG5cbiAgcmVzb2x2ZSgpOiB7IFtwOiBzdHJpbmddOiBzdHJpbmcgfSB7XG4gICAgcmV0dXJuIG5ldyBKc29uRmlsZVByb2ZpbGVNYXBwZXIoe1xuICAgICAgd29ya2luZ0RpcmVjdG9yeTogdGhpcy5fd29ya2luZ0RpcmVjdG9yeSxcbiAgICAgIGZpbGVuYW1lOiB0aGlzLl9maWxlbmFtZSxcbiAgICB9KS5yZXNvbHZlKCk7XG4gIH1cbn1cblxuLy8gQ2FuIGJlIHVzZWQgaW4gbG9jYWwgcHJvamVjdCBkaXJlY3RvcnkuIENhbiBiZSBhZGRlZCBvciBpZ25vcmVkIGJ5IHlvdXIgVkNTXG5leHBvcnQgY2xhc3MgTG9jYWxQcm9qZWN0RGlyTWFwcGVyIGltcGxlbWVudHMgUHJvZmlsZU1hcHBlciB7XG4gIHJlc29sdmUoKTogeyBbcDogc3RyaW5nXTogc3RyaW5nIH0ge1xuICAgIHJldHVybiBuZXcgSnNvbkZpbGVQcm9maWxlTWFwcGVyKHtcbiAgICAgIHdvcmtpbmdEaXJlY3Rvcnk6IHByb2Nlc3MuY3dkKCksXG4gICAgICBmaWxlbmFtZTogJ2Nka211bHRpcHJvZmlsZXBsdWdpbi5qc29uJyxcbiAgICB9KS5yZXNvbHZlKCk7XG4gIH1cbn1cblxuLy8gVXNlcyBhbGwgbWFwcGVycyBhbmQgYXBwbGllcyBwcmVjZWRlbmNlXG5leHBvcnQgY2xhc3MgUHJlY2VkZW5jZVByb2ZpbGVNYXBwZXIgaW1wbGVtZW50cyBQcm9maWxlTWFwcGVyIHtcbiAgcmVzb2x2ZSgpOiB7IFtwOiBzdHJpbmddOiBzdHJpbmcgfSB7XG4gICAgLy8gVGVtcG9yYXJ5IGluIG9yZGVyIHRvIGdldCBpdCB3b3JraW5nIGFnYWluXG4gICAgY29uc3QgcGFja2FnZUpzb25NYXBwaW5ncyA9IG5ldyBQYWNrYWdlSnNvblByb2ZpbGVNYXBwZXIoKS5yZXNvbHZlKCk7XG4gICAgY29uc3QgcHJvamVjdExvY2FsTWFwcGluZ3MgPSBuZXcgTG9jYWxQcm9qZWN0RGlyTWFwcGVyKCkucmVzb2x2ZSgpO1xuICAgIGNvbnN0IGdsb2JhbE1hcHBpbmdzID0gbmV3IEVudmlyb25tZW50QXdhcmVHbG9iYWxQcm9maWxlTWFwcGVyKCkucmVzb2x2ZSgpO1xuICAgIHJldHVybiB7XG4gICAgICAuLi5wYWNrYWdlSnNvbk1hcHBpbmdzLFxuICAgICAgLi4ucHJvamVjdExvY2FsTWFwcGluZ3MsXG4gICAgICAuLi5nbG9iYWxNYXBwaW5ncyxcbiAgICB9O1xuICB9XG59XG4iXX0=