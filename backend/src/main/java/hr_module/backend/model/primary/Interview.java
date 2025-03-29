package hr_module.backend.model.primary;

import hr_module.backend.model.secondary.EmployeeDetails;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Setter
@Getter
@Entity
@Table (name = "interviews")
public class Interview {
    public int getInterviewId() {
		return interviewId;
	}

	public void setInterviewId(int interviewId) {
		this.interviewId = interviewId;
	}

	public CandidateStatus getInterviewStatus() {
		return interviewStatus;
	}

	public void setInterviewStatus(CandidateStatus interviewStatus) {
		this.interviewStatus = interviewStatus;
	}

	public Employee getFirstInterviewer() {
		return firstInterviewer;
	}

	public void setFirstInterviewer(Employee firstInterviewer) {
		this.firstInterviewer = firstInterviewer;
	}

	public Employee getSecondInterviewer() {
		return secondInterviewer;
	}

	public void setSecondInterviewer(Employee secondInterviewer) {
		this.secondInterviewer = secondInterviewer;
	}

	public Employee getThirdInterviewer() {
		return thirdInterviewer;
	}

	public void setThirdInterviewer(Employee thirdInterviewer) {
		this.thirdInterviewer = thirdInterviewer;
	}

	public Candidate getCandidate() {
		return candidate;
	}

	public void setCandidate(Candidate candidate) {
		this.candidate = candidate;
	}

	public Date getPlannedDateForInterview() {
		return plannedDateForInterview;
	}

	public void setPlannedDateForInterview(Date plannedDateForInterview) {
		this.plannedDateForInterview = plannedDateForInterview;
	}

	public Date getActualDateForInterview() {
		return actualDateForInterview;
	}

	public void setActualDateForInterview(Date actualDateForInterview) {
		this.actualDateForInterview = actualDateForInterview;
	}

	@Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column (name = "interview_id")
    private int interviewId;

    @ManyToOne
    @JoinColumn (name = "interview_status_id_fk", referencedColumnName = "candidate_status_id")
    private CandidateStatus interviewStatus;

    @ManyToOne
    @JoinColumn (name = "first_interviewer_id_fk", referencedColumnName = "employee_id")
    private Employee firstInterviewer;

    @ManyToOne
    @JoinColumn (name = "second_interviewer_id_fk", referencedColumnName = "employee_id")
    private Employee secondInterviewer;

    @ManyToOne
    @JoinColumn (name = "third_interviewer_id_fk", referencedColumnName = "employee_id")
    private Employee thirdInterviewer;

    @ManyToOne
    @JoinColumn (name = "candidate_id_fk", referencedColumnName = "candidate_id")
    private Candidate candidate;

    @Column (name = "planned_date_for_interview")
    private Date plannedDateForInterview;

    @Column (name = "actual_date_for_interview")
    private Date actualDateForInterview;

    public Interview() {
    }

    public Interview(CandidateStatus interviewStatus, Employee firstInterviewer, Employee secondInterviewer, Employee thirdInterviewer, Candidate candidate, Date plannedDateForInterview, Date actualDateForInterview) {
        this.interviewStatus = interviewStatus;
        this.firstInterviewer = firstInterviewer;
        this.secondInterviewer = secondInterviewer;
        this.thirdInterviewer = thirdInterviewer;
        this.candidate = candidate;
        this.plannedDateForInterview = plannedDateForInterview;
        this.actualDateForInterview = actualDateForInterview;
    }
}
