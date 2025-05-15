"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IniFileCredentialProviderSource = void 0;
const safe_1 = require("colors/safe");
const lodash_isempty_1 = __importDefault(require("lodash.isempty"));
const credential_providers_1 = require("@aws-sdk/credential-providers");
const client_sso_1 = require("@aws-sdk/client-sso");
const utils_1 = require("./utils");
const profile_credentials_cache_1 = require("./profile-credentials-cache");
const profile_config_1 = require("./profile-config");
const sso_login_cache_1 = require("./sso-login-cache");
const profileCredentialsCache = new profile_credentials_cache_1.ProfileCredentialsCache();
var ModeName;
(function (ModeName) {
    ModeName[ModeName["ForReading"] = 0] = "ForReading";
    ModeName[ModeName["ForWriting"] = 1] = "ForWriting";
})(ModeName || (ModeName = {}));
class IniFileCredentialProviderSource {
    constructor(name, profiles, filename) {
        this.name = name;
        this.profiles = profiles;
        this.filename = filename;
        this.profileConfig = new profile_config_1.ProfileConfig((0, utils_1.getConfigFilename)());
        this.ssoLoginCache = new sso_login_cache_1.SSOLoginCache((0, utils_1.getSSOCachePath)());
    }
    canProvideCredentials(accountId) {
        return Promise.resolve(Object.prototype.hasOwnProperty.call(this.profiles, accountId));
    }
    async getProvider(accountId, mode) {
        const profile = this.profiles[accountId];
        console.log('\n');
        console.log(` 🚀  Using profile ${(0, safe_1.green)(profile)} for account ${(0, safe_1.green)(accountId)} in mode ${(0, safe_1.green)(ModeName[mode])}`);
        console.log('\n');
        let credentials = profileCredentialsCache.get(profile);
        if (!credentials) {
            if (this.profileConfig.isSSOProfile(profile)) {
                const ssoProfile = this.profileConfig.getProfile(profile);
                const ssoSettings = this.profileConfig.getSSOSettings(profile);
                const ssoLogin = this.ssoLoginCache.getCachedLogin(ssoSettings);
                const ssoClient = new client_sso_1.SSO({ region: ssoSettings.sso_region });
                const response = await ssoClient.getRoleCredentials({
                    accessToken: ssoLogin.accessToken,
                    accountId: ssoProfile.sso_account_id,
                    roleName: ssoProfile.sso_role_name,
                });
                const roleCredentials = response.roleCredentials;
                if (!(roleCredentials === null || roleCredentials === void 0 ? void 0 : roleCredentials.accessKeyId) ||
                    !roleCredentials.secretAccessKey ||
                    !roleCredentials.sessionToken)
                    throw new Error('Invalid roleCredentials!');
                credentials = {
                    accessKeyId: roleCredentials.accessKeyId,
                    secretAccessKey: roleCredentials.secretAccessKey,
                    sessionToken: roleCredentials.sessionToken,
                    expiration: roleCredentials.expiration
                        ? new Date(roleCredentials.expiration)
                        : undefined
                };
            }
            else {
                // In SDK v3, fromIni returns a credential provider function
                const credentialProvider = (0, credential_providers_1.fromIni)({
                    profile,
                    filepath: this.filename,
                    mfaCodeProvider: utils_1.tokenCodeFn
                });
                // Execute the provider function to get credentials
                credentials = await credentialProvider();
            }
            profileCredentialsCache.set(profile, credentials);
        }
        return Promise.resolve(credentials);
    }
    isAvailable() {
        if (this.filename && !(0, lodash_isempty_1.default)(this.profiles))
            return Promise.resolve(true);
        return Promise.resolve(false);
    }
}
exports.IniFileCredentialProviderSource = IniFileCredentialProviderSource;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pLWZpbGUtY3JlZGVudGlhbC1wcm92aWRlci1zb3VyY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5pLWZpbGUtY3JlZGVudGlhbC1wcm92aWRlci1zb3VyY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsc0NBQW9DO0FBQ3BDLG9FQUFxQztBQUVyQyx3RUFBd0Q7QUFDeEQsb0RBQTBDO0FBRTFDLG1DQUEwRTtBQUMxRSwyRUFBc0U7QUFDdEUscURBQWlEO0FBQ2pELHVEQUFrRDtBQUVsRCxNQUFNLHVCQUF1QixHQUFHLElBQUksbURBQXVCLEVBQUUsQ0FBQztBQUU5RCxJQUFLLFFBR0o7QUFIRCxXQUFLLFFBQVE7SUFDWCxtREFBVSxDQUFBO0lBQ1YsbURBQVUsQ0FBQTtBQUNaLENBQUMsRUFISSxRQUFRLEtBQVIsUUFBUSxRQUdaO0FBRUQsTUFBYSwrQkFBK0I7SUFNMUMsWUFDa0IsSUFBWSxFQUNYLFFBQW1DLEVBQ25DLFFBQWdCO1FBRmpCLFNBQUksR0FBSixJQUFJLENBQVE7UUFDWCxhQUFRLEdBQVIsUUFBUSxDQUEyQjtRQUNuQyxhQUFRLEdBQVIsUUFBUSxDQUFRO1FBRWpDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSw4QkFBYSxDQUFDLElBQUEseUJBQWlCLEdBQUUsQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSwrQkFBYSxDQUFDLElBQUEsdUJBQWUsR0FBRSxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVNLHFCQUFxQixDQUFDLFNBQWlCO1FBQzVDLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FDcEIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQy9ELENBQUM7SUFDSixDQUFDO0lBRU0sS0FBSyxDQUFDLFdBQVcsQ0FDdEIsU0FBaUIsRUFDakIsSUFBYztRQUVkLE1BQU0sT0FBTyxH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LENBQUMsQ0FBQztJQUNoQyxDQUFDO0NBQ0Y7QUExRkQsMEVBMEZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ3JlZW4gfSBmcm9tICdjb2xvcnMvc2FmZSc7XG5pbXBvcnQgaXNFbXB0eSBmcm9tICdsb2Rhc2guaXNlbXB0eSc7XG5pbXBvcnQgeyBBd3NDcmVkZW50aWFsSWRlbnRpdHkgfSBmcm9tICdAYXdzLXNkay90eXBlcyc7XG5pbXBvcnQgeyBmcm9tSW5pIH0gZnJvbSAnQGF3cy1zZGsvY3JlZGVudGlhbC1wcm92aWRlcnMnO1xuaW1wb3J0IHsgU1NPIH0gZnJvbSAnQGF3cy1zZGsvY2xpZW50LXNzbyc7XG5cbmltcG9ydCB7IHRva2VuQ29kZUZuLCBnZXRDb25maWdGaWxlbmFtZSwgZ2V0U1NPQ2FjaGVQYXRoIH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgeyBQcm9maWxlQ3JlZGVudGlhbHNDYWNoZSB9IGZyb20gJy4vcHJvZmlsZS1jcmVkZW50aWFscy1jYWNoZSc7XG5pbXBvcnQgeyBQcm9maWxlQ29uZmlnIH0gZnJvbSAnLi9wcm9maWxlLWNvbmZpZyc7XG5pbXBvcnQgeyBTU09Mb2dpbkNhY2hlIH0gZnJvbSAnLi9zc28tbG9naW4tY2FjaGUnO1xuXG5jb25zdCBwcm9maWxlQ3JlZGVudGlhbHNDYWNoZSA9IG5ldyBQcm9maWxlQ3JlZGVudGlhbHNDYWNoZSgpO1xuXG5lbnVtIE1vZGVOYW1lIHtcbiAgRm9yUmVhZGluZyxcbiAgRm9yV3JpdGluZyxcbn1cblxuZXhwb3J0IGNsYXNzIEluaUZpbGVDcmVkZW50aWFsUHJvdmlkZXJTb3VyY2VcbiAgaW1wbGVtZW50cyBJbmlGaWxlQ3JlZGVudGlhbFByb3ZpZGVyU291cmNlXG57XG4gIHByaXZhdGUgcHJvZmlsZUNvbmZpZzogUHJvZmlsZUNvbmZpZztcbiAgcHJpdmF0ZSBzc29Mb2dpbkNhY2hlOiBTU09Mb2dpbkNhY2hlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyByZWFkb25seSBuYW1lOiBzdHJpbmcsXG4gICAgcHJpdmF0ZSByZWFkb25seSBwcm9maWxlczogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSxcbiAgICBwcml2YXRlIHJlYWRvbmx5IGZpbGVuYW1lOiBzdHJpbmcsXG4gICkge1xuICAgIHRoaXMucHJvZmlsZUNvbmZpZyA9IG5ldyBQcm9maWxlQ29uZmlnKGdldENvbmZpZ0ZpbGVuYW1lKCkpO1xuICAgIHRoaXMuc3NvTG9naW5DYWNoZSA9IG5ldyBTU09Mb2dpbkNhY2hlKGdldFNTT0NhY2hlUGF0aCgpKTtcbiAgfVxuXG4gIHB1YmxpYyBjYW5Qcm92aWRlQ3JlZGVudGlhbHMoYWNjb3VudElkOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKFxuICAgICAgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMucHJvZmlsZXMsIGFjY291bnRJZCksXG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBnZXRQcm92aWRlcihcbiAgICBhY2NvdW50SWQ6IHN0cmluZyxcbiAgICBtb2RlOiBNb2RlTmFtZSxcbiAgKTogUHJvbWlzZTxBd3NDcmVkZW50aWFsSWRlbnRpdHk+IHtcbiAgICBjb25zdCBwcm9maWxlID0gdGhpcy5wcm9maWxlc1thY2NvdW50SWRdO1xuXG4gICAgY29uc29sZS5sb2coJ1xcbicpO1xuICAgIGNvbnNvbGUubG9nKFxuICAgICAgYCDwn5qAICBVc2luZyBwcm9maWxlICR7Z3JlZW4ocHJvZmlsZSl9IGZvciBhY2NvdW50ICR7Z3JlZW4oXG4gICAgICAgIGFjY291bnRJZCxcbiAgICAgICl9IGluIG1vZGUgJHtncmVlbihNb2RlTmFtZVttb2RlXSl9YCwpO1xuICAgIGNvbnNvbGUubG9nKCdcXG4nKTtcblxuICAgIGxldCBjcmVkZW50aWFscyA9IHByb2ZpbGVDcmVkZW50aWFsc0NhY2hlLmdldChwcm9maWxlKTtcblxuICAgIGlmICghY3JlZGVudGlhbHMpIHtcbiAgICAgIGlmICh0aGlzLnByb2ZpbGVDb25maWcuaXNTU09Qcm9maWxlKHByb2ZpbGUpKSB7XG4gICAgICAgIGNvbnN0IHNzb1Byb2ZpbGUgPSB0aGlzLnByb2ZpbGVDb25maWcuZ2V0UHJvZmlsZShwcm9maWxlKTtcbiAgICAgICAgY29uc3Qgc3NvU2V0dGluZ3MgPSB0aGlzLnByb2ZpbGVDb25maWcuZ2V0U1NPU2V0dGluZ3MocHJvZmlsZSk7XG4gICAgICAgIGNvbnN0IHNzb0xvZ2luID0gdGhpcy5zc29Mb2dpbkNhY2hlLmdldENhY2hlZExvZ2luKHNzb1NldHRpbmdzKTtcblxuICAgICAgICBjb25zdCBzc29DbGllbnQgPSBuZXcgU1NPKHsgcmVnaW9uOiBzc29TZXR0aW5ncy5zc29fcmVnaW9uIH0pO1xuXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgc3NvQ2xpZW50LmdldFJvbGVDcmVkZW50aWFscyh7XG4gICAgICAgICAgYWNjZXNzVG9rZW46IHNzb0xvZ2luLmFjY2Vzc1Rva2VuLFxuICAgICAgICAgIGFjY291bnRJZDogc3NvUHJvZmlsZS5zc29fYWNjb3VudF9pZCxcbiAgICAgICAgICByb2xlTmFtZTogc3NvUHJvZmlsZS5zc29fcm9sZV9uYW1lLFxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCByb2xlQ3JlZGVudGlhbHMgPSByZXNwb25zZS5yb2xlQ3JlZGVudGlhbHM7XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgICFyb2xlQ3JlZGVudGlhbHM/LmFjY2Vzc0tleUlkIHx8XG4gICAgICAgICAgIXJvbGVDcmVkZW50aWFscy5zZWNyZXRBY2Nlc3NLZXkgfHxcbiAgICAgICAgICAhcm9sZUNyZWRlbnRpYWxzLnNlc3Npb25Ub2tlblxuICAgICAgICApXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHJvbGVDcmVkZW50aWFscyEnKTtcblxuICAgICAgICBjcmVkZW50aWFscyA9IHtcbiAgICAgICAgICBhY2Nlc3NLZXlJZDogcm9sZUNyZWRlbnRpYWxzLmFjY2Vzc0tleUlkLFxuICAgICAgICAgIHNlY3JldEFjY2Vzc0tleTogcm9sZUNyZWRlbnRpYWxzLnNlY3JldEFjY2Vzc0tleSxcbiAgICAgICAgICBzZXNzaW9uVG9rZW46IHJvbGVDcmVkZW50aWFscy5zZXNzaW9uVG9rZW4sXG4gICAgICAgICAgZXhwaXJhdGlvbjogcm9sZUNyZWRlbnRpYWxzLmV4cGlyYXRpb24gXG4gICAgICAgICAgICA/IG5ldyBEYXRlKHJvbGVDcmVkZW50aWFscy5leHBpcmF0aW9uKSBcbiAgICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBJbiBTREsgdjMsIGZyb21JbmkgcmV0dXJucyBhIGNyZWRlbnRpYWwgcHJvdmlkZXIgZnVuY3Rpb25cbiAgICAgICAgY29uc3QgY3JlZGVudGlhbFByb3ZpZGVyID0gZnJvbUluaSh7XG4gICAgICAgICAgcHJvZmlsZSxcbiAgICAgICAgICBmaWxlcGF0aDogdGhpcy5maWxlbmFtZSxcbiAgICAgICAgICBtZmFDb2RlUHJvdmlkZXI6IHRva2VuQ29kZUZuXG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgLy8gRXhlY3V0ZSB0aGUgcHJvdmlkZXIgZnVuY3Rpb24gdG8gZ2V0IGNyZWRlbnRpYWxzXG4gICAgICAgIGNyZWRlbnRpYWxzID0gYXdhaXQgY3JlZGVudGlhbFByb3ZpZGVyKCk7XG4gICAgICB9XG5cbiAgICAgIHByb2ZpbGVDcmVkZW50aWFsc0NhY2hlLnNldChwcm9maWxlLCBjcmVkZW50aWFscyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShjcmVkZW50aWFscyk7XG4gIH1cblxuICBwdWJsaWMgaXNBdmFpbGFibGUoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgaWYgKHRoaXMuZmlsZW5hbWUgJiYgIWlzRW1wdHkodGhpcy5wcm9maWxlcykpIHJldHVybiBQcm9taXNlLnJlc29sdmUodHJ1ZSk7XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGZhbHNlKTtcbiAgfVxufSJdfQ==