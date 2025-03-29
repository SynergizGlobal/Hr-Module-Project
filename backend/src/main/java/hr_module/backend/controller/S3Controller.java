package hr_module.backend.controller;

import hr_module.backend.service.S3Service;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;

@RestController
@RequestMapping("/resume")
@CrossOrigin
public class S3Controller {

    private final S3Service s3Service;

    public S3Controller(S3Service s3Service) {
        this.s3Service = s3Service;
    }

    @GetMapping
    public String health() {
        return "UP";
    }

    @PostMapping(path = "/upload", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public String uploadFile(@RequestParam("file") MultipartFile file) throws IOException {
        s3Service.uploadFile(file.getOriginalFilename(), file);
        return "File uploaded";
    }

    @GetMapping("/download/{fileName}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName) {
        InputStream fileStream = s3Service.getFile(fileName);
        MediaType mediaType = getMediaTypeForFileName(fileName);
        return ResponseEntity.ok()
                .contentType(mediaType)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"")
                .body(new InputStreamResource(fileStream));
    }

    @GetMapping("/view/{fileName}")
    public ResponseEntity<InputStreamResource> viewFile(@PathVariable String fileName) {
        InputStream content = s3Service.getFile(fileName);
        MediaType mediaType = getMediaTypeForFileName(fileName);
        return ResponseEntity.ok()
                .contentType(mediaType)
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + fileName + "\"")
                .body(new InputStreamResource(content));
    }

    @DeleteMapping("/delete/{fileName}")
    public String deleteFile(@PathVariable String fileName) {
        s3Service.deleteObject(fileName);
        return "File deleted";
    }

    private MediaType getMediaTypeForFileName(String fileName) {
        if (fileName.endsWith(".pdf")) {
            return MediaType.APPLICATION_PDF;
        } else if (fileName.endsWith(".doc") || fileName.endsWith(".docx")) {
            return MediaType.parseMediaType("application/msword");
        }

        return MediaType.APPLICATION_OCTET_STREAM;
    }
}
