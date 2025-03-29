package hr_module.backend.controller;

import hr_module.backend.model.primary.Discipline;
import hr_module.backend.service.DisciplineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/discipline")
@CrossOrigin
public class DisciplineController {
    @Autowired
    private DisciplineService disciplineService;

    @GetMapping("/getAll")
    public List<Discipline> getAllDisciplines() {
        return disciplineService.getAllDisciplines();
    }

    @PostMapping("/add")
    public ResponseEntity<String> add(@RequestBody Discipline discipline) {
        try {
            disciplineService.saveDiscipline(discipline);
            return ResponseEntity.ok("New discipline added!");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }
}
