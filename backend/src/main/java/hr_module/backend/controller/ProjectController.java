package hr_module.backend.controller;

import hr_module.backend.model.primary.Project;
import hr_module.backend.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/project")
@CrossOrigin
public class ProjectController {
    @Autowired
    private ProjectService projectService;

    @GetMapping("/getAll")
    public List<Project> getAllProjects() {
        return projectService.getAllProjects();
    }

    @PostMapping("/add")
    public String add(@RequestBody Project project) {
        if (projectService.existsByName(project.getName())) {
            return "Project already exists!";
        }
        projectService.saveProject(project);
        return "New project added!";
    }
}
