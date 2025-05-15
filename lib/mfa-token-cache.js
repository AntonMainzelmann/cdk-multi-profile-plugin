"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MfaTokenCache = void 0;
class MfaTokenCache {
    constructor() {
        this.cache = {};
    }
    has(mfaSerial, token) {
        if (this.cache[mfaSerial]) {
            return this.cache[mfaSerial].includes(token);
        }
        return false;
    }
    set(mfaSerial, token) {
        if (this.cache[mfaSerial]) {
            this.cache[mfaSerial].push(token);
            return;
        }
        this.cache[mfaSerial] = [token];
    }
}
exports.MfaTokenCache = MfaTokenCache;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWZhLXRva2VuLWNhY2hlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21mYS10b2tlbi1jYWNoZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxNQUFhLGFBQWE7SUFHeEI7UUFDRSxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBRU0sR0FBRyxDQUFDLFNBQWlCLEVBQUUsS0FBYTtRQUN6QyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQztZQUMxQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9DLENBQUM7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFTSxHQUFHLENBQUMsU0FBaUIsRUFBRSxLQUFhO1FBQ3pDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDO1lBQzFCLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2xDLE9BQU87UUFDVCxDQUFDO1FBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xDLENBQUM7Q0FDRjtBQXJCRCxzQ0FxQkMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgTWZhVG9rZW5DYWNoZSB7XG4gIHByaXZhdGUgcmVhZG9ubHkgY2FjaGU6IHsgW21mYVNlcmlhbDogc3RyaW5nXTogc3RyaW5nW10gfTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmNhY2hlID0ge307XG4gIH1cblxuICBwdWJsaWMgaGFzKG1mYVNlcmlhbDogc3RyaW5nLCB0b2tlbjogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuY2FjaGVbbWZhU2VyaWFsXSkge1xuICAgICAgcmV0dXJuIHRoaXMuY2FjaGVbbWZhU2VyaWFsXS5pbmNsdWRlcyh0b2tlbik7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQobWZhU2VyaWFsOiBzdHJpbmcsIHRva2VuOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jYWNoZVttZmFTZXJpYWxdKSB7XG4gICAgICB0aGlzLmNhY2hlW21mYVNlcmlhbF0ucHVzaCh0b2tlbik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuY2FjaGVbbWZhU2VyaWFsXSA9IFt0b2tlbl07XG4gIH1cbn1cbiJdfQ==