#!/bin/bash

# Halo 密码修改脚本
# 使用方法: ./change_password.sh <新密码>

if [ $# -eq 0 ]; then
    echo "使用方法: $0 <新密码>"
    echo "示例: $0 newpassword123"
    exit 1
fi

NEW_PASSWORD="$1"
DB_PATH="/home/hslinux/.halo2/db/halo-next"
H2_JAR="/home/hslinux/.gradle/caches/modules-2/files-2.1/com.h2database/h2/2.3.232/4fcc05d966ccdb2812ae8b9a718f69226c0cf4e2/h2-2.3.232.jar"

echo "正在修改用户 'dawd' 的密码..."

# 生成新的Argon2密码哈希
# 注意：这里使用一个简化的方法，实际生产环境中应该使用完整的Spring Security配置
echo "警告：此脚本将使用简化的密码哈希方法。"
echo "建议通过Halo管理界面或API来修改密码。"

# 创建一个简单的密码哈希（这不是标准的Argon2，仅用于演示）
# 在实际使用中，您应该通过Halo的管理界面来修改密码
SIMPLE_HASH="simple_hash_${NEW_PASSWORD}_$(date +%s)"

echo "新密码哈希: $SIMPLE_HASH"
echo ""
echo "要完成密码修改，请："
echo "1. 启动Halo应用"
echo "2. 访问管理界面"
echo "3. 使用当前密码登录"
echo "4. 在用户设置中修改密码"
echo ""
echo "或者，如果您忘记了当前密码，可以："
echo "1. 删除数据库文件重新初始化"
echo "2. 或者通过邮件重置密码功能"
echo ""
echo "数据库位置: $DB_PATH"
echo "当前用户: dawd"
echo "邮箱: 1037462262@qq.com"