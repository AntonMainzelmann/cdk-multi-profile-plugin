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
exports.ProfileConfig = void 0;
const fs = __importStar(require("fs-extra"));
const ini = __importStar(require("ini"));
class ProfileConfig {
    constructor(path) {
        try {
            const raw = fs.readFileSync(path, {
                encoding: 'utf-8',
            });
            this.config = ini.parse(raw);
        }
        catch (e) {
            this.config = {};
        }
    }
    getProfile(profile) {
        return this.config[`profile ${profile}`];
    }
    getSSOSession(ssoSession) {
        return this.config[`sso-session ${ssoSession}`];
    }
    getSSOSettings(profile) {
        var _a, _b;
        if (!this.isSSOProfile(profile))
            return {};
        const config = this.getProfile(profile);
        let ssoConfig = {};
        if (config === null || config === void 0 ? void 0 : config.sso_session) {
            ssoConfig = this.getSSOSession(config.sso_session);
        }
        const ssoSettings = {
            sso_start_url: (_a = config === null || config === void 0 ? void 0 : config.sso_start_url) !== null && _a !== void 0 ? _a : ssoConfig === null || ssoConfig === void 0 ? void 0 : ssoConfig.sso_start_url,
            sso_region: (_b = config === null || config === void 0 ? void 0 : config.sso_region) !== null && _b !== void 0 ? _b : ssoConfig === null || ssoConfig === void 0 ? void 0 : ssoConfig.sso_region,
        };
        return ssoSettings;
    }
    isSSOProfile(profile) {
        const config = this.getProfile(profile);
        return Boolean((config === null || config === void 0 ? void 0 : config.sso_start_url) || (config === null || config === void 0 ? void 0 : config.sso_session));
    }
}
exports.ProfileConfig = ProfileConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZS1jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcHJvZmlsZS1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQStCO0FBQy9CLHlDQUEyQjtBQUUzQixNQUFhLGFBQWE7SUFHeEIsWUFBWSxJQUFZO1FBQ3RCLElBQUksQ0FBQztZQUNILE1BQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFO2dCQUNoQyxRQUFRLEVBQUUsT0FBTzthQUNsQixDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDL0IsQ0FBQztRQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7WUFDWCxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNuQixDQUFDO0lBQ0gsQ0FBQztJQUVNLFVBQVUsQ0FBQyxPQUFlO1FBQy9CLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVNLGFBQWEsQ0FBQyxVQUFrQjtRQUNyQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxVQUFVLEVBQUUsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFTSxjQUFjLENBQUMsT0FBZTs7UUFDbkMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDO1lBQUUsT0FBTyxFQUFFLENBQUM7UUFFM0MsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4QyxJQUFJLFNBQVMsR0FBMkIsRUFBRSxDQUFDO1FBQzNDLElBQUksTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLFdBQVcsRUFBRSxDQUFDO1lBQ3hCLFNBQVMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNyRCxDQUFDO1FBQ0QsTUFBTSxXQUFXLEdBQUc7WUFDbEIsYUFBYSxFQUFFLE1BQUEsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLGFBQWEsbUNBQUksU0FBUyxhQUFULFNBQVMsdUJBQVQsU0FBUyxDQUFFLGFBQWE7WUFDaEUsVUFBVSxFQUFFLE1BQUEsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLFVBQVUsbUNBQUksU0FBUyxhQUFULFNBQVMsdUJBQVQsU0FBUyxDQUFFLFVBQVU7U0FDeEQsQ0FBQztRQUNGLE9BQU8sV0FBVyxDQUFDO0lBQ3JCLENBQUM7SUFFTSxZQUFZLENBQUMsT0FBZTtRQUNqQyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRXhDLE9BQU8sT0FBTyxDQUFDLENBQUEsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLGFBQWEsTUFBSSxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsV0FBVyxDQUFBLENBQUMsQ0FBQztJQUMvRCxDQUFDO0NBQ0Y7QUEzQ0Qsc0NBMkNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZnMgZnJvbSAnZnMtZXh0cmEnO1xuaW1wb3J0ICogYXMgaW5pIGZyb20gJ2luaSc7XG5cbmV4cG9ydCBjbGFzcyBQcm9maWxlQ29uZmlnIHtcbiAgcHJpdmF0ZSBjb25maWc6IFJlY29yZDxzdHJpbmcsIFJlY29yZDxzdHJpbmcsIHN0cmluZz4+O1xuXG4gIGNvbnN0cnVjdG9yKHBhdGg6IHN0cmluZykge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByYXcgPSBmcy5yZWFkRmlsZVN5bmMocGF0aCwge1xuICAgICAgICBlbmNvZGluZzogJ3V0Zi04JyxcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmNvbmZpZyA9IGluaS5wYXJzZShyYXcpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRoaXMuY29uZmlnID0ge307XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldFByb2ZpbGUocHJvZmlsZTogc3RyaW5nKTogUmVjb3JkPHN0cmluZywgc3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnW2Bwcm9maWxlICR7cHJvZmlsZX1gXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRTU09TZXNzaW9uKHNzb1Nlc3Npb246IHN0cmluZyk6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZ1tgc3NvLXNlc3Npb24gJHtzc29TZXNzaW9ufWBdO1xuICB9XG5cbiAgcHVibGljIGdldFNTT1NldHRpbmdzKHByb2ZpbGU6IHN0cmluZyk6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4ge1xuICAgIGlmICghdGhpcy5pc1NTT1Byb2ZpbGUocHJvZmlsZSkpIHJldHVybiB7fTtcblxuICAgIGNvbnN0IGNvbmZpZyA9IHRoaXMuZ2V0UHJvZmlsZShwcm9maWxlKTtcbiAgICBsZXQgc3NvQ29uZmlnOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge307XG4gICAgaWYgKGNvbmZpZz8uc3NvX3Nlc3Npb24pIHtcbiAgICAgIHNzb0NvbmZpZyA9IHRoaXMuZ2V0U1NPU2Vzc2lvbihjb25maWcuc3NvX3Nlc3Npb24pO1xuICAgIH1cbiAgICBjb25zdCBzc29TZXR0aW5ncyA9IHtcbiAgICAgIHNzb19zdGFydF91cmw6IGNvbmZpZz8uc3NvX3N0YXJ0X3VybCA/PyBzc29Db25maWc/LnNzb19zdGFydF91cmwsXG4gICAgICBzc29fcmVnaW9uOiBjb25maWc/LnNzb19yZWdpb24gPz8gc3NvQ29uZmlnPy5zc29fcmVnaW9uLFxuICAgIH07XG4gICAgcmV0dXJuIHNzb1NldHRpbmdzO1xuICB9XG5cbiAgcHVibGljIGlzU1NPUHJvZmlsZShwcm9maWxlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBjb25zdCBjb25maWcgPSB0aGlzLmdldFByb2ZpbGUocHJvZmlsZSk7XG5cbiAgICByZXR1cm4gQm9vbGVhbihjb25maWc/LnNzb19zdGFydF91cmwgfHwgY29uZmlnPy5zc29fc2Vzc2lvbik7XG4gIH1cbn1cbiJdfQ==