-- 更新用户密码的SQL脚本
-- 注意：这里使用的是明文密码，实际使用时应该使用加密后的密码

-- 查看当前用户信息
SELECT NAME, DATA FROM EXTENSIONS WHERE NAME = '/registry/users/dawd';

-- 更新密码（这里需要替换为实际的加密密码）
-- UPDATE EXTENSIONS SET DATA = '{"spec":{"displayName":"Administrator","email":"1037462262@qq.com","emailVerified":false,"password":"{argon2@SpringSecurity_v5_8}$argon2id$v=19$m=16384,t=2,p=1$NEW_SALT$NEW_HASH","registeredAt":"2025-08-29T08:48:06.522507317Z","twoFactorAuthEnabled":false,"disabled":false},"status":{"permalink":"/authors/dawd"},"apiVersion":"v1alpha1","kind":"User","metadata":{"finalizers":["user-protection"],"name":"dawd","annotations":{"rbac.authorization.halo.run/role-names":"[\"super-role\"]"},"version":0,"creationTimestamp":"2025-08-29T08:48:06.862973346Z"}}' WHERE NAME = '/registry/users/dawd';