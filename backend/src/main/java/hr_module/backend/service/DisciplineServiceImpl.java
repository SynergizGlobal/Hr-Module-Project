package hr_module.backend.service;

import hr_module.backend.model.primary.Discipline;
import hr_module.backend.repository.primary.DisciplineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DisciplineServiceImpl implements DisciplineService {

    @Autowired
    private DisciplineRepository disciplineRepository;

    @Override
    public List<Discipline> getAllDisciplines() {
        return disciplineRepository.findAll();
    }

    @Override
    public Discipline saveDiscipline(Discipline discipline) {
        Optional<Discipline> existingDiscipline = disciplineRepository.findByName(discipline.getName());
        if (existingDiscipline.isPresent()) {
            throw new RuntimeException("Discipline with name '" + discipline.getName() + "' already exists.");
        }
        return disciplineRepository.save(discipline);
    }

    @Override
    public Discipline getOrCreateDiscipline(String name) {
        return disciplineRepository.findByName(name)
                .orElseGet(() -> disciplineRepository.save(new Discipline(name)));
    }
}
