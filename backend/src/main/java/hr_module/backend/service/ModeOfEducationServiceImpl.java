package hr_module.backend.service;

import hr_module.backend.model.primary.ModeOfEducation;
import hr_module.backend.model.primary.Project;
import hr_module.backend.repository.primary.ModeOfEducationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ModeOfEducationServiceImpl implements ModeOfEducationService{
    @Autowired
    private ModeOfEducationRepository modeOfEducationRepository;

    @Override
    public List<ModeOfEducation> getAllModesOfEducation() {
        return modeOfEducationRepository.findAll();
    }
}
