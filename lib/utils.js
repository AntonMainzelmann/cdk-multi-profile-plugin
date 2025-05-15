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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSSOCachePath = exports.getConfigFilename = exports.getSharedCredentialsFilename = exports.readProfiles = exports.tokenCodeFn = void 0;
const path = __importStar(require("path"));
const os = __importStar(require("os"));
const inquirer_1 = __importDefault(require("inquirer"));
const mfa_token_cache_1 = require("./mfa-token-cache");
const profile_mapper_1 = require("./profile-mapper");
const tokenCache = new mfa_token_cache_1.MfaTokenCache();
// Für SDK v3 muss die Token-Funktion eine Promise zurückgeben statt einen Callback zu verwenden
const tokenCodeFn = async (mfaSerial) => {
    try {
        const { token } = await inquirer_1.default.prompt({
            name: 'token',
            type: 'input',
            default: '',
            message: `MFA token for ${mfaSerial}:`,
            validate: async (input) => {
                if (tokenCache.has(mfaSerial, input)) {
                    return `Token ${input} has already been used in this run`;
                }
                tokenCache.set(mfaSerial, input);
                return true;
            },
        });
        return token;
    }
    catch (e) {
        console.error('error:', e);
        throw e; // In SDK v3 sollten wir den Fehler werfen statt ihn an einen Callback zu übergeben
    }
};
exports.tokenCodeFn = tokenCodeFn;
const readProfiles = () => {
    const profileMapper = new profile_mapper_1.PrecedenceProfileMapper();
    return profileMapper.resolve();
};
exports.readProfiles = readProfiles;
const getSharedCredentialsFilename = () => {
    var _a;
    return (_a = process.env.AWS_SHARED_CREDENTIALS_FILE) !== null && _a !== void 0 ? _a : path.join(os.homedir(), '.aws', 'credentials');
};
exports.getSharedCredentialsFilename = getSharedCredentialsFilename;
const getConfigFilename = () => { var _a; return (_a = process.env.AWS_CONFIG_FILE) !== null && _a !== void 0 ? _a : path.join(os.homedir(), '.aws', 'config'); };
exports.getConfigFilename = getConfigFilename;
const getSSOCachePath = () => path.join(os.homedir(), '.aws', 'sso', 'cache');
exports.getSSOCachePath = getSSOCachePath;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkNBQTZCO0FBQzdCLHVDQUF5QjtBQUN6Qix3REFBZ0M7QUFFaEMsdURBQWtEO0FBQ2xELHFEQUEyRDtBQUUzRCxNQUFNLFVBQVUsR0FBRyxJQUFJLCtCQUFhLEVBQUUsQ0FBQztBQUV2QyxnR0FBZ0c7QUFDekYsTUFBTSxXQUFXLEdBQUcsS0FBSyxFQUFFLFNBQWlCLEVBQW1CLEVBQUU7SUFDdEUsSUFBSSxDQUFDO1FBQ0gsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLE1BQU0sa0JBQVEsQ0FBQyxNQUFNLENBQUM7WUFDdEMsSUFBSSxFQUFFLE9BQU87WUFDYixJQUFJLEVBQUUsT0FBTztZQUNiLE9BQU8sRUFBRSxFQUFFO1lBQ1gsT0FBTyxFQUFFLGlCQUFpQixTQUFTLEdBQUc7WUFDdEMsUUFBUSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRTtnQkFDeEIsSUFBSSxVQUFVLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFDO29CQUNyQyxPQUFPLFNBQVMsS0FBSyxvQ0FBb0MsQ0FBQztnQkFDNUQsQ0FBQztnQkFFRCxVQUFVLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFFakMsT0FBTyxJQUFJLENBQUM7WUFDZCxDQUFDO1NBQ0YsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztRQUNYLE9BQU8sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzNCLE1BQU0sQ0FBQyxDQUFDLENBQUMsbUZBQW1GO0lBQzlGLENBQUM7QUFDSCxDQUFDLENBQUM7QUF0QlcsUUFBQSxXQUFXLGVBc0J0QjtBQUVLLE1BQU0sWUFBWSxHQUFHLEdBQTJCLEVBQUU7SUFDdkQsTUFBTSxhQUFhLEdBQUcsSUFBSSx3Q0FBdUIsRUFBRSxDQUFDO0lBQ3BELE9BQU8sYUFBYSxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ2pDLENBQUMsQ0FBQztBQUhXLFFBQUEsWUFBWSxnQkFHdkI7QUFFSyxNQUFNLDRCQUE0QixHQUFHLEdBQVcsRUFBRTs7SUFDdkQsT0FBQSxNQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLG1DQUN2QyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxNQUFNLEVBQUUsYUFBYSxDQUFDLENBQUE7Q0FBQSxDQUFDO0FBRnBDLFFBQUEsNEJBQTRCLGdDQUVRO0FBRTFDLE1BQU0saUJBQWlCLEdBQUcsR0FBVyxFQUFFLFdBQzVDLE9BQUEsTUFBQSxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsbUNBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFBLEVBQUEsQ0FBQztBQUQ5RCxRQUFBLGlCQUFpQixxQkFDNkM7QUFFcEUsTUFBTSxlQUFlLEdBQUcsR0FBVyxFQUFFLENBQzFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFEckMsUUFBQSxlQUFlLG1CQUNzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgKiBhcyBvcyBmcm9tICdvcyc7XG5pbXBvcnQgaW5xdWlyZXIgZnJvbSAnaW5xdWlyZXInO1xuXG5pbXBvcnQgeyBNZmFUb2tlbkNhY2hlIH0gZnJvbSAnLi9tZmEtdG9rZW4tY2FjaGUnO1xuaW1wb3J0IHsgUHJlY2VkZW5jZVByb2ZpbGVNYXBwZXIgfSBmcm9tICcuL3Byb2ZpbGUtbWFwcGVyJztcblxuY29uc3QgdG9rZW5DYWNoZSA9IG5ldyBNZmFUb2tlbkNhY2hlKCk7XG5cbi8vIEbDvHIgU0RLIHYzIG11c3MgZGllIFRva2VuLUZ1bmt0aW9uIGVpbmUgUHJvbWlzZSB6dXLDvGNrZ2ViZW4gc3RhdHQgZWluZW4gQ2FsbGJhY2sgenUgdmVyd2VuZGVuXG5leHBvcnQgY29uc3QgdG9rZW5Db2RlRm4gPSBhc3luYyAobWZhU2VyaWFsOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4gPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHsgdG9rZW4gfSA9IGF3YWl0IGlucXVpcmVyLnByb21wdCh7XG4gICAgICBuYW1lOiAndG9rZW4nLFxuICAgICAgdHlwZTogJ2lucHV0JyxcbiAgICAgIGRlZmF1bHQ6ICcnLFxuICAgICAgbWVzc2FnZTogYE1GQSB0b2tlbiBmb3IgJHttZmFTZXJpYWx9OmAsXG4gICAgICB2YWxpZGF0ZTogYXN5bmMgKGlucHV0KSA9PiB7XG4gICAgICAgIGlmICh0b2tlbkNhY2hlLmhhcyhtZmFTZXJpYWwsIGlucHV0KSkge1xuICAgICAgICAgIHJldHVybiBgVG9rZW4gJHtpbnB1dH0gaGFzIGFscmVhZHkgYmVlbiB1c2VkIGluIHRoaXMgcnVuYDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRva2VuQ2FjaGUuc2V0KG1mYVNlcmlhbCwgaW5wdXQpO1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSxcbiAgICB9KTtcbiAgICByZXR1cm4gdG9rZW47XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLmVycm9yKCdlcnJvcjonLCBlKTtcbiAgICB0aHJvdyBlOyAvLyBJbiBTREsgdjMgc29sbHRlbiB3aXIgZGVuIEZlaGxlciB3ZXJmZW4gc3RhdHQgaWhuIGFuIGVpbmVuIENhbGxiYWNrIHp1IMO8YmVyZ2ViZW5cbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IHJlYWRQcm9maWxlcyA9ICgpOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0+IHtcbiAgY29uc3QgcHJvZmlsZU1hcHBlciA9IG5ldyBQcmVjZWRlbmNlUHJvZmlsZU1hcHBlcigpO1xuICByZXR1cm4gcHJvZmlsZU1hcHBlci5yZXNvbHZlKCk7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0U2hhcmVkQ3JlZGVudGlhbHNGaWxlbmFtZSA9ICgpOiBzdHJpbmcgPT5cbiAgcHJvY2Vzcy5lbnYuQVdTX1NIQVJFRF9DUkVERU5USUFMU19GSUxFID8/XG4gIHBhdGguam9pbihvcy5ob21lZGlyKCksICcuYXdzJywgJ2NyZWRlbnRpYWxzJyk7XG5cbmV4cG9ydCBjb25zdCBnZXRDb25maWdGaWxlbmFtZSA9ICgpOiBzdHJpbmcgPT5cbiAgcHJvY2Vzcy5lbnYuQVdTX0NPTkZJR19GSUxFID8/IHBhdGguam9pbihvcy5ob21lZGlyKCksICcuYXdzJywgJ2NvbmZpZycpO1xuXG5leHBvcnQgY29uc3QgZ2V0U1NPQ2FjaGVQYXRoID0gKCk6IHN0cmluZyA9PlxuICBwYXRoLmpvaW4ob3MuaG9tZWRpcigpLCAnLmF3cycsICdzc28nLCAnY2FjaGUnKTsiXX0=