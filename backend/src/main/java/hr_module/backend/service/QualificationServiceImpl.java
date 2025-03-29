package hr_module.backend.service;

import hr_module.backend.model.primary.Qualification;
import hr_module.backend.repository.primary.QualificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QualificationServiceImpl implements QualificationService {
    @Autowired
    private QualificationRepository qualificationRepository;

    @Override
    public Qualification saveQualification(Qualification qualification) {
        Optional<Qualification> existingQualification = qualificationRepository.findByName(qualification.getName());
        if (existingQualification.isPresent()) {
            throw new RuntimeException("Qualification with name '" + qualification.getName() + "' already exists.");
        }
        return qualificationRepository.save(qualification);
    }

    @Override
    public List<Qualification> getAllQualifications() {
        return qualificationRepository.findAll();
    }

    @Override
    public Qualification getOrCreateQualification(String name) {
        return qualificationRepository.findByName(name)
                .orElseGet(() -> qualificationRepository.save(new Qualification(name)));
    }
}
