package hr_module.backend.service;

import hr_module.backend.model.primary.Discipline;

import java.util.List;

public interface DisciplineService {
    public Discipline saveDiscipline (Discipline discipline);

    public List<Discipline> getAllDisciplines();

    public Discipline getOrCreateDiscipline (String name);
}
