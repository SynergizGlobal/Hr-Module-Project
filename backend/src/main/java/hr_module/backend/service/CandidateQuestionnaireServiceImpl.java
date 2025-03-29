package hr_module.backend.service;

import hr_module.backend.model.primary.Candidate;
import hr_module.backend.model.primary.CandidateQuestionnaire;
import hr_module.backend.model.primary.Question;
import hr_module.backend.repository.primary.CandidateQuestionnaireRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CandidateQuestionnaireServiceImpl implements CandidateQuestionnaireService {
    @Autowired
    CandidateQuestionnaireRepository candidateQuestionnaireRepository;

    @Override
    public CandidateQuestionnaire saveCandidateQuestionnaire(CandidateQuestionnaire candidateQuestionnaire) {
        return candidateQuestionnaireRepository.save(candidateQuestionnaire);
    }

    @Override
    public List<Question> getQuestionsByCandidate(Candidate candidate) {
        List<CandidateQuestionnaire> questionnaires = candidateQuestionnaireRepository.findByCandidate(candidate);

        return questionnaires.stream()
                             .map(CandidateQuestionnaire::getQuestion)
                             .collect(Collectors.toList());
    }

    @Override
    public void deleteByCandidate (Candidate candidate) {
        candidateQuestionnaireRepository.deleteByCandidate (candidate);
    }
}
