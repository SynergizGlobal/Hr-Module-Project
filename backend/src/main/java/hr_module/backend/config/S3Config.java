package hr_module.backend.config;


import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class S3Config {
    @Value("${ACCESS_KEY}")
    private String awsAccessKey;

    @Value("${SECRET_KEY}")
    private String awsSecretKey;

    @Bean
    public S3Client s3client() {
        AwsBasicCredentials awsCreds = AwsBasicCredentials.create(awsAccessKey, awsSecretKey);

        return S3Client.builder()
                .credentialsProvider(StaticCredentialsProvider.create(awsCreds))
                .region(Region.AP_SOUTH_1)
                .build();
    }
}
