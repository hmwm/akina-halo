import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import java.util.Scanner;

public class update_password {
    public static void main(String[] args) {
        // 使用与Halo相同的Argon2配置
        Argon2PasswordEncoder encoder = Argon2PasswordEncoder.defaultsForSpringSecurity_v5_8();
        
        Scanner scanner = new Scanner(System.in);
        System.out.print("请输入新密码: ");
        String newPassword = scanner.nextLine();
        
        String encodedPassword = encoder.encode(newPassword);
        System.out.println("编码后的密码: " + encodedPassword);
        
        scanner.close();
    }
}