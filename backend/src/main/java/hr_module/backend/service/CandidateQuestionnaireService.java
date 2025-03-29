package hr_module.backend.service;

import hr_module.backend.model.primary.Candidate;
import hr_module.backend.model.primary.CandidateQuestionnaire;
import hr_module.backend.model.primary.Question;

import java.util.List;

public interface CandidateQuestionnaireService {
    public CandidateQuestionnaire saveCandidateQuestionnaire (CandidateQuestionnaire candidateQuestionnaire);

    public List<Question> getQuestionsByCandidate (Candidate candidate);

    public void deleteByCandidate (Candidate candidate);
}
