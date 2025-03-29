package hr_module.backend.controller;

import hr_module.backend.model.primary.Qualification;
import hr_module.backend.service.QualificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/qualification")
@CrossOrigin
public class QualificationsController {
    @Autowired
    private QualificationService qualificationService;

    @GetMapping("/getAll")
    public List<Qualification> getAllQualifications() {
        return qualificationService.getAllQualifications();
    }
    @PostMapping("/add")
    public ResponseEntity<String> add(@RequestBody Qualification qualification) {
        try {
            qualificationService.saveQualification(qualification);
            return ResponseEntity.ok("New qualification added!");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }
}
