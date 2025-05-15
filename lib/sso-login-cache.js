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
exports.SSOLoginCache = void 0;
const fs = __importStar(require("fs-extra"));
const path = __importStar(require("path"));
class SSOLoginCache {
    constructor(ssoCachePath) {
        try {
            this.files = fs
                .readdirSync(ssoCachePath)
                .map((file) => path.join(ssoCachePath, file));
        }
        catch (e) {
            this.files = [];
        }
    }
    getCachedLogin(ssoProfile) {
        for (const file of this.files) {
            const json = fs.readJSONSync(file);
            if ((json === null || json === void 0 ? void 0 : json.startUrl) === ssoProfile.sso_start_url &&
                (json === null || json === void 0 ? void 0 : json.region) === ssoProfile.sso_region) {
                return {
                    accessToken: json.accessToken,
                };
            }
        }
        throw new Error('Current cached SSO login is expired or invalid');
    }
}
exports.SSOLoginCache = SSOLoginCache;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3NvLWxvZ2luLWNhY2hlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3Nzby1sb2dpbi1jYWNoZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBK0I7QUFDL0IsMkNBQTZCO0FBRTdCLE1BQWEsYUFBYTtJQUd4QixZQUFZLFlBQW9CO1FBQzlCLElBQUksQ0FBQztZQUNILElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRTtpQkFDWixXQUFXLENBQUMsWUFBWSxDQUFDO2lCQUN6QixHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDbEQsQ0FBQztRQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7WUFDWCxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNsQixDQUFDO0lBQ0gsQ0FBQztJQUVNLGNBQWMsQ0FBQyxVQUFrQztRQUd0RCxLQUFLLE1BQU0sSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUM5QixNQUFNLElBQUksR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ25DLElBQ0UsQ0FBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsUUFBUSxNQUFLLFVBQVUsQ0FBQyxhQUFhO2dCQUMzQyxDQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxNQUFNLE1BQUssVUFBVSxDQUFDLFVBQVUsRUFDdEMsQ0FBQztnQkFDRCxPQUFPO29CQUNMLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztpQkFDOUIsQ0FBQztZQUNKLENBQUM7UUFDSCxDQUFDO1FBRUQsTUFBTSxJQUFJLEtBQUssQ0FBQyxnREFBZ0QsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7Q0FDRjtBQTlCRCxzQ0E4QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBmcyBmcm9tICdmcy1leHRyYSc7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuXG5leHBvcnQgY2xhc3MgU1NPTG9naW5DYWNoZSB7XG4gIHByaXZhdGUgZmlsZXM6IHN0cmluZ1tdO1xuXG4gIGNvbnN0cnVjdG9yKHNzb0NhY2hlUGF0aDogc3RyaW5nKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuZmlsZXMgPSBmc1xuICAgICAgICAucmVhZGRpclN5bmMoc3NvQ2FjaGVQYXRoKVxuICAgICAgICAubWFwKChmaWxlKSA9PiBwYXRoLmpvaW4oc3NvQ2FjaGVQYXRoLCBmaWxlKSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhpcy5maWxlcyA9IFtdO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXRDYWNoZWRMb2dpbihzc29Qcm9maWxlOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+KToge1xuICAgIGFjY2Vzc1Rva2VuOiBzdHJpbmc7XG4gIH0ge1xuICAgIGZvciAoY29uc3QgZmlsZSBvZiB0aGlzLmZpbGVzKSB7XG4gICAgICBjb25zdCBqc29uID0gZnMucmVhZEpTT05TeW5jKGZpbGUpO1xuICAgICAgaWYgKFxuICAgICAgICBqc29uPy5zdGFydFVybCA9PT0gc3NvUHJvZmlsZS5zc29fc3RhcnRfdXJsICYmXG4gICAgICAgIGpzb24/LnJlZ2lvbiA9PT0gc3NvUHJvZmlsZS5zc29fcmVnaW9uXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBhY2Nlc3NUb2tlbjoganNvbi5hY2Nlc3NUb2tlbixcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0N1cnJlbnQgY2FjaGVkIFNTTyBsb2dpbiBpcyBleHBpcmVkIG9yIGludmFsaWQnKTtcbiAgfVxufVxuIl19