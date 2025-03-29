package hr_module.backend.service;

import hr_module.backend.model.primary.Project;
import hr_module.backend.repository.primary.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectServiceImpl implements ProjectService{
    @Autowired
    private ProjectRepository projectRepository;

    @Override
    public Project saveProject(Project project) {
        return projectRepository.save(project);
    }

    public boolean existsByName(String projectName) {
        return projectRepository.existsByName(projectName); // Check if project exists
    }
    
    @Override
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }
}
