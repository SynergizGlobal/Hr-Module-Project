package hr_module.backend.service;

import hr_module.backend.model.primary.Qualification;

import java.util.List;

public interface QualificationService {
    public Qualification saveQualification(Qualification qualification);

    public List<Qualification> getAllQualifications();

    public Qualification getOrCreateQualification (String name);
}
