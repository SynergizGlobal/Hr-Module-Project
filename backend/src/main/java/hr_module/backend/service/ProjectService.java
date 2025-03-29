package hr_module.backend.service;

import hr_module.backend.model.primary.Project;

import java.util.List;

public interface ProjectService {
    public Project saveProject (Project project);

    public List<Project> getAllProjects();

	public boolean existsByName(String name);

}
