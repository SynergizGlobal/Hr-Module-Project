package hr_module.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectResponse;

import java.io.IOException;
import java.io.InputStream;

@Service
public class S3Service {
    public final S3Client s3Client;

    @Value("${S3_BUCKET}")
    public String bucketName;

    public S3Service (S3Client s3Client) {
        this.s3Client = s3Client;
    }

    public void uploadFile(String objectName, MultipartFile file) throws IOException {
        String objectKey = "hr-module/resumes/" + objectName;

        try (InputStream inputStream = file.getInputStream()) {
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(objectKey)
                    .build();

            PutObjectResponse putObjectResponse = s3Client.putObject(putObjectRequest,
                    RequestBody.fromInputStream(inputStream, file.getSize()));
        }
    }

    public InputStream getFile(String objectName) {
        String objectKey = "hr-module/resumes/" + objectName;

        GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                .bucket(bucketName)
                .key(objectKey)
                .build();

        return s3Client.getObject(getObjectRequest);
    }

    public void deleteObject(String objectName) {
        String objectKey = "hr-module/resumes/" + objectName;

        DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                .bucket(bucketName)
                .key(objectKey)
                .build();

        s3Client.deleteObject(deleteObjectRequest);
    }
}
