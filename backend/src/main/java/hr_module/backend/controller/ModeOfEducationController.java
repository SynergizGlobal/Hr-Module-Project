package hr_module.backend.controller;

import hr_module.backend.model.primary.ModeOfEducation;
import hr_module.backend.service.ModeOfEducationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping ("/modeOfEducation")
@CrossOrigin
public class ModeOfEducationController {
    @Autowired
    private ModeOfEducationService modeOfEducationService;

    @GetMapping("/getAll")
    public List<ModeOfEducation> getAllModesOfEducation () {
        return modeOfEducationService.getAllModesOfEducation();
    }
}
